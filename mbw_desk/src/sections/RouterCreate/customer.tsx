import React, { useState } from "react";
import RowCustom from "./styled";
import { Button, Col, Input, Radio, Row, Select } from "antd";
import { FormItemCustom } from "../../components/form-item";
import { addCustomerOption } from "./data";
import { List, ThunderIcon } from "../../icons";
import { SearchOutlined } from "@ant-design/icons";
import { Map } from "../../icons/map";
import CustomerList from "./customer-list";
import CustomerMap from "./customer-map";
import { CustomerType } from "./type";
export default function Customer() {
  const [viewMode,setViewMode] = useState('list')
  const [customerList,setCustomerList] = useState<CustomerType[] | false>(false)
  return (
    <>
      <RowCustom className={"justify-between"}>
        <Col>
          <Row gutter={8}>
            <Col span={9} className="text-[#1677ff]">
              <FormItemCustom>
                <Select defaultValue={"add"} options={addCustomerOption} />
              </FormItemCustom>
            </Col>
            <Col span={7}>
              <Button
                className="w-full flex items-center text-[#1677ff] bg-[#1877f214] "
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
          <Radio.Group defaultValue={viewMode} onChange={(e:any)=> setViewMode(e.target.value)} >
            <Radio.Button value="list"><List size={28}/></Radio.Button>
            <Radio.Button value="map"><Map size={28}/></Radio.Button>
          </Radio.Group>
        </Col>
      </RowCustom>
      <div>
        {viewMode == 'list' ? <CustomerList data={customerList} handleData={setCustomerList}/> : <CustomerMap data={customerList}/>}
      </div>
    </>
  );
}
