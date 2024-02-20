import React from "react";
import { Row, Col,Avatar } from "antd";
import { Link } from "react-router-dom";
import logo from '../../assets/react.svg'

export default function Header() {
  return (
    <div className="w-full border-[#E2E6E9] border bg-white py-4">
      <Row className="justify-between max-w-full w-[80%] mx-auto">
        <Col>
          <Link to="/" className="w-[50px] h-[50px]">
            <img src={logo} className="object-contain w-full h-full"/>
          </Link>
        </Col>
        <Col>
        <Avatar style={{ backgroundColor: '#f56a00' }} size={40}>A</Avatar>
        </Col>
      </Row>
    </div>
  );
}
