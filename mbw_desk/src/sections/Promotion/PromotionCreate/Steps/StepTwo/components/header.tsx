/** @format */

import { Col, Row } from "antd";
import React, { useEffect } from "react";
import { PdContext } from "..";
import { PlusOutlined } from "@ant-design/icons";
import { ContextProm } from "../modalWrapper";

type Props = any;

function HeaderStep2(props: Props) {
  const { title, choosePd } = props;
  const {
    handleModal: { setModalC },
  } = React.useContext(PdContext);

  return (
    <Col className="pb-4" span={24}>
      <Row className="justify-between">
        <Col>
          <p className="font-medium text-xl leading-6 text-[#212B36]">
            {title}
          </p>
        </Col>
        {choosePd && (
          <Col>
            <div
              className="h-[35px] border border-solid border-[#EBEBEB] rounded-[4px] inline-flex items-center px-[12px] py-[7px] cursor-pointer"
              onClick={setModalC.bind(null, { status: true })}>
              <PlusOutlined />{" "}
              <span className="text-sm whitespace-nowrap">Chọn sản phẩm</span>
            </div>
          </Col>
        )}
      </Row>
    </Col>
  );
}

export default HeaderStep2;
