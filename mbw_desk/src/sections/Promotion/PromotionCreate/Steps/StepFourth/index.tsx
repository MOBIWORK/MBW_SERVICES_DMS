/** @format */

import { FormItemCustom, SelectCommon } from "@/components";
import { Col, Form, Row } from "antd";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import ConditionComp from "./components/type_cond";
import CustomerInfo from "./components/type_info";
import { FuncType } from "@/types";
interface Props {}

function StepFourth(props: Props) {
  const [disableList, setDisableList] = useState<boolean>(false);
  const {} = props;
  const [typeApply, setType] = React.useState<"info" | "condition">(
    "condition"
  );
  const optionsApply = [
    {
      label: "Điều kiện khách hàng",
      value: "condition",
    },
    {
      label: "Thông tin khách hàng",
      value: "info",
    },
  ];
  return (
    <>
      <Helmet>
        <title>Chọn khách hàng</title>
      </Helmet>
      <div>
        <Form layout="vertical">
          <Row
            gutter={[38, 38]}
            className={`${
              typeApply == "condition" && "flex-nowrap"
            } flex-col lg:flex-row`}>
            <Col span={8} className="max-w-[338px] w-[100%] ml-5 lg:ml-0">
              <FormItemCustom label="Chọn áp dụng CTKM theo:">
                <SelectCommon
                  options={optionsApply}
                  onChange={setType as FuncType}
                  value={typeApply}
                />
              </FormItemCustom>
            </Col>
            {typeApply == "condition" && (
              <ConditionComp disableList={disableList} />
            )}
            {typeApply == "info" && (
              <CustomerInfo setDisableList={setDisableList} />
            )}
          </Row>
        </Form>
      </div>
    </>
  );
}

export default StepFourth;
