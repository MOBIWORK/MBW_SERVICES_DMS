import React, { useEffect, useState } from "react";
import { FormItemCustom, HeaderPage } from "../../components";
import { Col, Row, Select, Tabs } from "antd";
import ActiveEmployee from "./active-employee";
import UnActiveEmployee from "./unactive-employee";
import { MapEkgis } from "../../components/mapEkgis/map";
import { chitieu, desc, psorder, vt,chitieud } from "../ReportSales/data";
import { AxiosService } from "../../services/server";
import useDebounce from "../../hooks/useDebount";
import {SupervisoryStaffRealTime} from '@/components'
export default function EmployeeMonitor() {
  const [listDepartment, setListDepartment] = useState<any[]>([]);
  const [department, setDepartment] = useState("");
  const [keySDepartment, setKeySDepartment] = useState("");
  const [des, setDes] = useState("")
  const [ct, setCt] = useState("")
  const [od, setOr] = useState("")
  const [vt1, setVt] = useState("")
  const [ctd1, setCtd] = useState("")
  let keySearchDepartment = useDebounce(keySDepartment, 500);

  useEffect(() => {
    (async () => {
      let rsDepartment: any = await AxiosService.get(
        "/api/method/frappe.desk.search.search_link",
        {
          params: {
            txt: keySearchDepartment,
            doctype: "Department",
            ignore_user_permissions: 0,
            query: "",
          },
        }
      );

      let { message: results } = rsDepartment;

      console.log("Customer Group", results);

      setListDepartment(
        results.map((dtDepartment: any) => ({
          value: dtDepartment.value.trim(),
          label: dtDepartment.value.trim(),
        }))
      );
    })();
  }, [keySearchDepartment]);
  return (
    <>
      {/* <HeaderPage title="Giám sát viếng thăm khách hàng" />
      <div className="bg-white rounded-md pt-7 border-[#DFE3E8] border-[0.2px] border-solid w-full">
        <div className="flex justify-start items-center pt-2">
          <FormItemCustom
            className="w-[200px] border-none ml-3"
            label={"Phòng ban"}
          ></FormItemCustom>
          <FormItemCustom
            className="w-[200px] border-none ml-3"
            label={"Sắp xếp"}
          ></FormItemCustom>
          <FormItemCustom
            className="w-[200px] border-none ml-3"
            label={"Chỉ tiêu"}
          ></FormItemCustom>
          <FormItemCustom
            className="w-[200px] border-none ml-3"
            label={"Đơn hàng"}
          ></FormItemCustom>
          <FormItemCustom
            className="w-[200px] border-none ml-3"
            label={"Viếng thăm"}
          ></FormItemCustom>
          <FormItemCustom
            className="w-[200px] border-none ml-3"
            label={"Chỉ tiêu theo"}
          ></FormItemCustom>
        </div>
        <div className="flex justify-start items-center">
          <FormItemCustom className="w-[200px] border-none ml-3">
            <Select
              className="!bg-[#F4F6F8] options:bg-[#F4F6F8]"
              options={listDepartment}
              onSelect={(value) => {
                setDepartment(value);
              }}
              onSearch={(value: string) => {
                setKeySDepartment(value);
              }}
              onClear={() => setDepartment("")}
              filterOption={false}
              allowClear
              showSearch
            />
          </FormItemCustom>
          <FormItemCustom className="w-[200px] border-none ml-3">
            <Select
              className="!bg-[#F4F6F8] options:bg-[#F4F6F8]"
              defaultValue={""}
              options={desc}
              onSelect={(value) => {
                setDes(value);
              }}
              filterOption={false}
              allowClear
              showSearch
            />
          </FormItemCustom>
          <FormItemCustom className="w-[200px] border-none ml-3">
            <Select
              className="!bg-[#F4F6F8] options:bg-[#F4F6F8]"
              defaultValue={""}
              options={chitieu}
              onSelect={(value) => {
                setCt(value);
              }}
              filterOption={false}
              allowClear
              showSearch
            />
          </FormItemCustom>
          <FormItemCustom className="w-[200px] border-none ml-3">
            <Select
              className="!bg-[#F4F6F8] options:bg-[#F4F6F8]"
              defaultValue={""}
              options={psorder}
              onSelect={(value) => {
                setCt(value);
              }}
              filterOption={false}
              allowClear
              showSearch
            />
          </FormItemCustom>
          <FormItemCustom className="w-[200px] border-none ml-3">
            <Select
              className="!bg-[#F4F6F8] options:bg-[#F4F6F8]"
              defaultValue={""}
              options={vt}
              onSelect={(value) => {
                setVt(value);
              }}
              filterOption={false}
              allowClear
              showSearch
            />
          </FormItemCustom>
          <FormItemCustom className="w-[200px] border-none ml-3">
            <Select
              className="!bg-[#F4F6F8] options:bg-[#F4F6F8]"
              defaultValue={""}
              options={chitieud}
              onSelect={(value) => {
                setCtd(value);
              }}
              filterOption={false}
              allowClear
              showSearch
            />
          </FormItemCustom>
        </div>
        <div className="pt-3 rounded-xl">
          <Row>
            <Tabs
              centered
              className="w-[400px] border border-b-0 border-solid border-[#F5F5F5]"
              defaultActiveKey="1"
              items={[
                {
                  label: (
                    <p className="text-base font-medium px-10"> Hoạt động</p>
                  ),
                  key: "1",
                  children: <ActiveEmployee />,
                },
                {
                  label: (
                    <p className="text-base font-medium px-10 ">
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
      </div> */}
      < SupervisoryStaffRealTime />
    </>
  );
}
