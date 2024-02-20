import React, { useEffect, useState } from "react";
import { Row, Col,Avatar } from "antd";
import { useFrappeAuth } from 'frappe-react-sdk';

import { Link } from "react-router-dom";
import logo from '../../assets/react.svg'
import { AxiosService } from "../../services/server";
import { rsData } from "../../types/response";

export default function Header() {
  const [empDetail,setEmpDetail] = useState<employeeType>()
  useEffect(()=> {
    (async() => {
      const rsEmployee:rsData<employeeType> = await AxiosService.get("api/method/mbw_service_v2.api.user.get_employee_info")
      console.log("employee",rsEmployee);
      setEmpDetail(rsEmployee.result)
      
    })()
  },[])
  
  return (
    <div className="w-full border-[#E2E6E9] border bg-white py-[7px]">
      <Row className="justify-between max-w-full w-[80%] mx-auto">
        <Col>
          <Link to="/" className="w-[32px] h-[32px]">
            <img src={logo} className="object-contain w-[32px] h-[32px]"/>
          </Link>
        </Col>
        <Col>
        <Avatar style={{ backgroundColor: '#f56a00' }} size={40} {...empDetail?.image ? {src: empDetail?.image } : {} }>{!empDetail?.image && empDetail?.employee_name[0] }</Avatar>
        </Col>
      </Row>
    </div>
  );
}
