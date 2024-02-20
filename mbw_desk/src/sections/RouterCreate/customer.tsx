import React, { useEffect, useState } from "react";
import RowCustom from "./styled";
import { Button, Col, Input, Modal, Radio, Row, Select, message, Space  } from "antd";
import { FormItemCustom } from "../../components/form-item";
import {SelectCommon} from '@/components'
import { addCustomerOption, baseCustomers } from "./data";
import { List, ThunderIcon } from "../../icons";
import { SearchOutlined ,DownloadOutlined} from "@ant-design/icons";
import { Map } from "../../icons/map";
import CustomerList from "./customer-list";
import CustomerMap from "./customer-map";
import { CustomerType } from "./type";
import { ChooseCustomer, ImportCustomer } from "./modal";
import * as XLSX from 'xlsx';
import { getAttrInArray } from "../../util";
import { AxiosService } from "../../services/server";

type Props = {
  listCustomer: any[],
  handleCustomer: any
}

export default function Customer({listCustomer,handleCustomer}:Props) {
  const [messageApi, contextHolder] = message.useMessage();
  const [viewMode,setViewMode] = useState('list')
  const [openChoose,setOpenChoose] = useState<boolean>(false)
  const [openImport,setOpenImport] = useState<boolean>(false)
  const [file,setFile] = useState()
  const [dataImport,setDataImport] = useState<any[]>([])
  const warning = (message: string) => {
    messageApi.open({
      type: 'warning',
      content: message,
    });
  };
  const error = () => {
    messageApi.open({
      type: 'error',
      content: 'Error',
    });
  };
  const handeClose = (type:'Choose'| 'Import' | null) => {
    switch(type) {
      case "Choose":
        setOpenChoose(false)
        break
      case "Import":
        setOpenImport(false)
        break
      default: 
        setOpenChoose(false)
        setOpenImport(false)
    }
  }
  const handeOpen = (type:'Choose'| 'Import' | any) => {
    switch(type) {
      case "Choose":
        setOpenChoose(true)
        break
      case "Import":
        setOpenImport(true)
        break
      default: 
    }
  }

  const handleUpdateFile = async(file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      console.log("json_data",jsonData);
      setDataImport(jsonData)
    };
    reader.readAsArrayBuffer(file);    
  }

  const handleImportCusTomer = async () => {
    // console.log(dataImport);
    let importCustomers =  getAttrInArray(dataImport,["Mã khách hàng", "Thứ tự VT", "Tần suất"],{isNull: false})
    const list_customerCodes = importCustomers.map(customer => customer["Mã khách hàng"]).filter(code => !!code && !listCustomer.map(cust => cust.customer_code).includes(code))

    try {
      const rsImport  = await AxiosService.post("/api/method/mbw_dms.api.router.get_customer_import",{
        customer_codes: list_customerCodes
      })
      console.log("rsImport:::",rsImport);
  
      handleCustomer(prev => [...prev,...rsImport.result])
      warning(rsImport.message)
      setOpenImport(false)
      
    } catch (err) {
      error()
    }
  }

  return (
    <>
      <Row gutter={16} className={"justify-between p-4 pb-5 pt-10 mt-0"}>
        <Col>
          <Row gutter={8}>
            <Col span={9} className="text-[#1677ff]">
              <FormItemCustom>
                <SelectCommon defaultValue={"add"} options={addCustomerOption} onSelect={handeOpen} />
              </FormItemCustom>
            </Col>
            <Col span={7}>
              <Button
                className="w-full flex items-center text-[#1677ff] bg-[#1877f214] h-[36px]"
                icon={<ThunderIcon />}
              >
                Tối ưu tuyến
              </Button>
            </Col>
            <Col span={8}>
              <FormItemCustom>
                <Input
                  placeholder="Tìm kiếm khách hàng"
                  prefix={<SearchOutlined />}
                />
              </FormItemCustom>
            </Col>
          </Row>
        </Col>
        <Col>
          {" "}
          <Radio.Group defaultValue={viewMode} onChange={(e:any)=> setViewMode(e.target.value)} size="middle" >
            <Radio.Button value="list"><List size={28}/></Radio.Button>
            <Radio.Button value="map"><Map size={28}/></Radio.Button>
          </Radio.Group>
        </Col>
      </Row>
      <div>
        {viewMode == 'list' ? <CustomerList data={listCustomer} handleData={handleCustomer}/> : <CustomerMap data={listCustomer}/>}
      </div>
      <Modal width={1240} open={openChoose} onCancel={handeClose.bind(null,'Choose')} title={<strong className="text-xl">Chọn khách hàng</strong>} footer={false}> 
        <ChooseCustomer selected={listCustomer} handleAdd={handleCustomer} closeModal={setOpenChoose.bind(null,false)}/>
      </Modal>
      <Modal 
      width={777}   
      open={openImport} 
      onCancel={handeClose.bind(null,'Import')} 
      okText='Tiếp tục' 
      cancelText='Hủy' 
      title={<>
        <strong className="text-xl">Nhập dữ liệu khách hàng</strong><br/>
        <Button type="link" className="px-0">
          Tải về file mẫu <DownloadOutlined />
      </Button>
      </>}
      onOk={handleImportCusTomer}
      >
        <ImportCustomer handleFile={handleUpdateFile}/>
      </Modal>
    </>
  );
}
