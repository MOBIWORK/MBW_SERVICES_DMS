// @mui

import React, { useCallback, useEffect, useRef, useState ,createContext,useContext} from "react";
import {Tabs, Form,notification, message } from "antd";
import GeneralInformation from "./general-information";
import Customer from "./customer";
import { HeaderPage } from "../../components";
import { AxiosService } from "../../services/server";
import { useNavigate, useParams } from "react-router-dom";
import {  router } from "../../types/router";
import { rsData } from "../../types/response";
import { GlobalContext } from "@/App";


// ----------------------------------------------------------------------
export const SaleGroupContext = createContext<any>(null)
export const CustomerContext = createContext<any>(null);
export default function RouterCreate() {
  const [form] = Form.useForm();
  const navigate = useNavigate()
  const { type } = useParams();
  const [customerRouter,setCustomerRouter] = useState<any[]>([])
  const [detailRouter,setDetailRouter] = useState<router>()
  const {errorMsg,successMsg} = useContext(GlobalContext)
  const [teamSale,setTeamSale] = useState<string>()
  const handleCreateRouter = useCallback(async(value:any) => {
    console.log({customerRouter});
    
    value = {...value,customers: customerRouter.map((customer)=> {
      let key_push = ["customer_id","customer_code","customer_name","display_address","phone_number","customer","frequency","lat","long"]

      for (let key in customer) {
        if(!key_push.includes(key)) {
          delete customer[key]
        }
      }
      return customer
    }).map(customer => {
      if(!customer.frequency) customer.frequency= "1;2;3;4"

      return customer
    })
  }
    console.log({value});
    
    try {
      await AxiosService.post("/api/method/mbw_dms.api.router.create_router",value)
      successMsg()
      navigate('/router-control')
    } catch (err:any) {
      console.error(err);
      errorMsg(typeof err == 'string' ? err : err.toString())
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
      successMsg()
      setTimeout(() => {
        navigate('/router-control')
      },500)
    } catch (err) {
      errorMsg(err as string)
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
            setTeamSale(rsRouter.result?.team_sale)
        }catch(err) {
          console.log("error");
          
        }
      })()
    }
  },[type])
  return (
    <>
      <HeaderPage
        title={type == 'create-dms-router' ? "Thêm tuyến" : detailRouter?.channel_name}
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
         <SaleGroupContext.Provider value={{teamSale,setTeamSale}}>
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
                  children: <CustomerContext.Provider value={{setCustomerRouter,customerRouter}}><Customer /></CustomerContext.Provider>,
                },
              ]}
              indicatorSize={(origin) => origin - 18}
            />
         </SaleGroupContext.Provider>
        </Form>
      </div>
    </>
  );
}
