import React, { useState } from "react";
import { FormItemCustom, HeaderPage } from "../../components";
import { Col, Row, Select, Tabs } from "antd";
import ActiveEmployee from "./active-employee";
import UnActiveEmployee from "./unactive-employee";
import MapEkgis from "../../components/mapEkgis/map";
import { department } from "../ReportSales/data";

export default function EmployeeMonitor() {
  return (
    <>
      <HeaderPage title="Giám sát viếng thăm khách hàng" />
      <div className="bg-white rounded-md pt-7 border-[#DFE3E8] border-[0.2px] border-solid w-full">
        <div className="flex justify-start items-center">
          <FormItemCustom className="w-[200px] border-none ml-3">
            <Select
              className="!bg-[#F4F6F8] options:bg-[#F4F6F8]"
              defaultValue={""}
              options={[{ label: "Phòng ban", value: "" }, ...department]}
              showSearch
            />
          </FormItemCustom>
        </div>
        <div className="pt-3 rounded-xl">
          <Row>
            <Tabs
              className="w-[400px] border border-b-0 border-solid border-[#F5F5F5]"
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
            <div className="h-[82vh] flex-1">
              <MapEkgis id={"monitor"} />
            </div>
          </Row>
        </div>
      </div>
    </>
  );
}
