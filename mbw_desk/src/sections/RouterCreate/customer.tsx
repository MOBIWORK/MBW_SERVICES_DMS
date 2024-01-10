import React from "react";
import RowCustom from "./styled";
import { Button, Col, Input, Radio, Row, Select } from "antd";
import { FormItemCustom } from "../../components/form-item";
import { addCustomerOption } from "./data";
import { List, ThunderIcon } from "../../icons";
import { SearchOutlined } from "@ant-design/icons";
import { Map } from "../../icons/map";
export default function Customer() {
  
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
                className="w-full flex items-center text-[#1677ff] "
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
          <Radio.Group defaultValue="list" >
            <Radio.Button value="list"><List size={28}/></Radio.Button>
            <Radio.Button value="map"><Map size={28}/></Radio.Button>
          </Radio.Group>
        </Col>
      </RowCustom>
    </>
  );
}
