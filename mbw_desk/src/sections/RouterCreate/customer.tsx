import React from "react";
import RowCustom from "./styled";
import { Button, Col, Input, Row, Select } from "antd";
import { FormItemCustom } from "../../components/form-item";
import { addCustomerOption } from "./data";

export default function Customer() {
  return (
    <>
      <RowCustom className={"justify-between"}>
        <Col>
          <Row gutter={8}>
            <Col span={9}>
              <FormItemCustom><Select defaultValue={'add'} options={addCustomerOption}/></FormItemCustom>
            </Col>
            <Col span={7}>
              <Button className="w-full">
                Tối ưu tuyến 
              </Button>
            </Col>
            <Col span={8}>
              <FormItemCustom>
                <Select showSearch placeholder="Tìm kiếm khách hàng"/>
              </FormItemCustom>
            </Col>
          </Row>
        </Col>
        <Col> Col right</Col>
      </RowCustom>
    </>
  );
}
