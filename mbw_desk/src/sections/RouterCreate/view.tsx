// @mui

import React, { useCallback, useEffect, useState } from "react";
import {Tabs, Form,notification, message } from "antd";
import GeneralInformation from "./general-information";
import Customer from "./customer";
import { HeaderPage } from "../../components";
import { AxiosService } from "../../services/server";
import { useNavigate, useParams } from "react-router-dom";
import { customer, router } from "../../types/router";
import { rsData } from "../../types/response";
// ----------------------------------------------------------------------

export default function RouterCreate() {
  const [form] = Form.useForm();
  const navigate = useNavigate()
  const { type } = useParams();
  const [customerRouter,setCustomerRouter] = useState<any[]>([])
  const [messageApi, contextHolder] = message.useMessage();
  const [detailRouter,setDetailRouter] = useState<router>()
  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Success!!',
    });
  };

  const error = () => {
    messageApi.open({
      type: 'error',
      content: 'Something was wrong',
    });
  };
  const handleCreateRouter = useCallback(async(value:any) => {
    value = {...value,customers: customerRouter.map((customer)=> {
      let key_push = ["customer_id","customer_code","customer_name","display_address","phone_number","customer","frequency","latitude","longitude"]

      for (let key in customer) {
        if(!key_push.includes(key)) {
          delete customer[key]
        }
      }
      return customer
    })}
    try {
      await AxiosService.post("/api/method/mbw_dms.api.router.create_router",value)
      success()
      navigate('/router-control')
    } catch (err) {
      error()
      console.log("error create",err);

      
    }
  },[customerRouter])

  const handleUpdateRouter = useCallback(async(value:any) => {
    value = {...value,customers: customerRouter.map((customer)=> {
      let key_push = ["customer_id","customer_code","customer_name","display_address","phone_number","customer","frequency","lat","long"]
      for (let key in customer) {
        if(!key_push.includes(key)) {
          delete customer[key]
        }
      }
      return customer
    })}
    try {
      await AxiosService.patch("/api/method/mbw_dms.api.router.update_router",{name:type,...value})
      success()
      navigate('/router-control')
    } catch (err) {
      error()
      console.log("error create",err);

      
    }
  },[customerRouter])
  useEffect(()=> {
    if(type !== 'create-dms-router') {
      (async() => {
        try {
          const rsRouter:rsData<router> = await AxiosService.get(`/api/method/mbw_dms.api.router.get_router`, {
            params: {
              id: type
            }
          })
          setDetailRouter(rsRouter.result)
          if(rsRouter.result)
            form.setFieldsValue(rsRouter.result)
            setCustomerRouter(rsRouter.result?.customers || [])

        }catch(err) {
          console.log("error");
          
        }
      })()
    }
  },[type])
  return (
    <>
    {contextHolder}
      <HeaderPage
        title="Thêm tuyến"
        buttons={[
          detailRouter ?
          {
            label: "Lưu",
            action: form.submit,
            type: "primary",
          }: {
            label: "Thêm",
            action: form.submit,
            type: "primary",
          }
        ]}
      />
      <div className="bg-white rounded-md border border-solid border-[#DFE3E8] overflow-hidden">
        <Form
          layout="vertical"
          form={form}
          onFinish={detailRouter ? handleUpdateRouter: handleCreateRouter}
        >
          <Tabs
            defaultActiveKey="1"
            items={[
              {
                label: <p className="px-4 mb-0"> Thông tin chung</p>,
                key: "1",
                children: <GeneralInformation form={form}/>,
              },
              {
                label: <p className="px-4 mb-0">Khách hàng</p>,
                key: "2",
                children: <Customer handleCustomer={setCustomerRouter} listCustomer={customerRouter} />,
              },
            ]}
            indicatorSize={(origin) => origin - 18}
          />
        </Form>
      </div>
    </>
  );
}
