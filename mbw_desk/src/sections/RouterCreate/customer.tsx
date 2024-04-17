import React, { memo, useContext, useEffect, useRef, useState } from "react";
import { Button, Col, Input, Modal, Radio, Row } from "antd";
import { FormItemCustom } from "../../components/form-item";
import { SelectCommon } from '@/components'
import { addCustomerOption } from "./data";
import { List } from "../../icons";
import { SearchOutlined, DownloadOutlined } from "@ant-design/icons";
import { Map } from "../../icons/map";
import CustomerList from "./customer-list";
import CustomerMap from "./customer-map";
import { ChooseCustomer, ImportCustomer } from "./modal";
import * as XLSX from 'xlsx';
import { getAttrInArray } from "../../util";
import { AxiosService } from "../../services/server";
import { CustomerContext } from "./view";
import Optimize from "./components/optimize";
import { GlobalContext } from "@/App";
import { CustomerType } from "./type";
import useDebounce from "@/hooks/useDebount";

export default memo(function Customer() {
  const { setCustomerRouter, customerRouter, refCustomer } = useContext(CustomerContext)
  // const refCustomer = useRef<CustomerType[]>(customerRouter)
  const [keyS, setKeyS] = useState<string>("")
  let searchCustomer = useDebounce(keyS, 1000)
  const { warningMsg,
    errorMsg,
  } = useContext(GlobalContext)
  const [viewMode, setViewMode] = useState('list')
  const [openChoose, setOpenChoose] = useState<boolean>(false)
  const [openImport, setOpenImport] = useState<boolean>(false)
  const [dataImport, setDataImport] = useState<any[]>([])
  const handeClose = (type: 'Choose' | 'Import' | null) => {
    switch (type) {
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
  const handeOpen = (type: 'Choose' | 'Import' | any) => {
    switch (type) {
      case "Choose":
        setOpenChoose(true)
        break
      case "Import":
        setOpenImport(true)
        break
      default:
    }
  }

  const handleUpdateFile = async (file: any) => {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const data = new Uint8Array(e?.target?.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      console.log("json_data", jsonData);
      setDataImport(jsonData)
    };
    reader.readAsArrayBuffer(file);
  }

  const handleImportCusTomer = async () => {
    // console.log(dataImport);
    let importCustomers = getAttrInArray(dataImport, ["Mã khách hàng", "Thứ tự VT", "Tần suất"], { isNull: false })
    const list_customerCodes = importCustomers.map(customer => customer["Mã khách hàng"]).filter(code => !!code && !setCustomerRouter.map((cust: CustomerType) => cust.customer_code).includes(code))

    try {
      const rsImport = await AxiosService.post("/api/method/mbw_dms.api.router.get_customer_import", {
        customer_codes: list_customerCodes
      })

      setCustomerRouter((prev: any) => [...prev, ...rsImport.result])
      warningMsg(rsImport.message)
      setOpenImport(false)

    } catch (err: any) {
      errorMsg(err?.response?.data?.message || "Something was wrong")
    }
  }


  return (
    <>
      <Row gutter={16} className={"justify-between p-4 pb-5 pt-10 mt-0"}>
        <Col className="flex-1">
          <Row gutter={8}>
            <Col span={6} className="text-[#1677ff]">
              <FormItemCustom>
                <SelectCommon placeholder="Thêm khách hàng" options={addCustomerOption} onSelect={handeOpen} />
              </FormItemCustom>
            </Col>
            {viewMode == 'list' ? <Col span={6}>
              <FormItemCustom>
                <Input
                  placeholder="Tìm kiếm khách hàng"
                  prefix={<SearchOutlined />}
                  onChange={(e) => {
                    setKeyS(e.target.value)
                  }}
                />
              </FormItemCustom>
            </Col> : 
            <Col span={6}>
              <Optimize />
            </Col>}

          </Row>
        </Col>
        <Col>
          {" "}
          <Radio.Group defaultValue={viewMode} onChange={(e: any) => setViewMode(e.target.value)} size="middle" >
            <Radio.Button value="list"><List size={28} /></Radio.Button>
            <Radio.Button value="map"><Map size={28} /></Radio.Button>
          </Radio.Group>
        </Col>
      </Row>
      <div>
        {viewMode == 'list' ? <CustomerList search={searchCustomer} /> : <CustomerMap />}
      </div>
      <Modal width={1240} open={openChoose} onCancel={handeClose.bind(null, 'Choose')} title={<strong className="text-xl">Chọn khách hàng</strong>} footer={false}>
        <ChooseCustomer closeModal={setOpenChoose.bind(null, false)} />
      </Modal>
      <Modal
        width={777}
        open={openImport}
        onCancel={handeClose.bind(null, 'Import')}
        okText='Tiếp tục'
        cancelText='Hủy'
        title={<>
          <strong className="text-xl">Nhập dữ liệu khách hàng</strong><br />
          <Button type="link" className="px-0">
            Tải về file mẫu <DownloadOutlined />
          </Button>
        </>}
        onOk={handleImportCusTomer}
      >
        <ImportCustomer handleFile={handleUpdateFile} />
      </Modal>
    </>
  );
})
