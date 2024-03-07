import React, { useState } from "react";
import { HeaderPage } from "../../components";
import { Col, Row, Tabs } from "antd";
import ActiveEmployee from "./active-employee";
import UnActiveEmployee from "./unactive-employee";
import { Helmet } from "react-helmet-async";
import MapEkgis from "../../components/mapEkgis/map";

export default function EmployeeMonitor() {
  return (
    <>
      <HeaderPage title="Giám sát viếng thăm khách hàng" />
      <div className="pt-3 mx-2 rounded-xl">
        <Row>
          <Col span={16} push={8}>
            <div className="h-48 w-full">
              <MapEkgis/>
            </div>
          </Col>
          <Col span={8} pull={16}>
            <Tabs
              className=""
              defaultActiveKey="1"
              items={[
                {
                  label: (
                    <p className="pl-8 pr-16 mb-0 font-medium text-sm leading-[21px]">
                      {" "}
                      Hoạt động
                    </p>
                  ),
                  key: "1",
                  children: <ActiveEmployee />,
                },
                {
                  label: (
                    <p className="pl-8 pr-16 mb-0 font-medium text-sm leading-[21px]">
                      Không hoạt động
                    </p>
                  ),
                  key: "2",
                  children: <UnActiveEmployee />,
                },
              ]}
              indicatorSize={(origin) => origin - 1}
            />
          </Col>
        </Row>
      </div>
    </>
  );
}
