import { SearchOutlined, VerticalAlignBottomOutlined } from "@ant-design/icons";
import { FormItemCustom, HeaderPage } from "../../components";
import { DatePicker, Input, Select, Table, Typography } from "antd";
import type { TableColumnsType } from "antd";
import { TableReport } from "../ReportSales/tableCustom";
import {
  area,
  customergroup,
  department,
  ordernew,
  typecustomer,
} from "../ReportSales/data";
import React, { useEffect, useState } from "react";
import { AxiosService } from "@/services/server";
import useDebounce from "@/hooks/useDebount";
import { DatePickerProps } from "antd/lib";
import { translationUrl } from "@/util";

interface DataCheckinFirst {
  key: React.Key;
  name: string;
  stt?: number;
  department: string;
  employee_id: string;
  employee_name: string;
  customer_name: string;
  customer_code: string;
  customer_type: string;
  customer_group: string;
  contact_person: string;
  phone: string;
  tax_id: string;
  territory: string;
  address: string;
  date_checkin: string;
}

const columns: TableColumnsType<DataCheckinFirst> = [
  {
    title: "STT",
    dataIndex: "stt",
    key: "stt",
    render: (_, record: any, index: number) => index + 1,
  },
  {
    title: "Phòng/nhóm",
    dataIndex: "department",
    key: "department",
    render: (_, record: any) => (
      <div className="!w-[175px]">{record.department}</div>
    ),
  },
  {
    title: "Mã nhân viên",
    dataIndex: "employee_id",
    key: "employee_id",
    render: (_, record: any) => (
      <div className="!w-[175px]">{record.employee_id}</div>
    ),
  },
  {
    title: "Tên nhân viên",
    dataIndex: "employee_name",
    key: "employee_name",
    render: (_, record: any) => (
      <div className="!w-[175px]">{record.employee_name}</div>
    ),
  },
  {
    title: "Mã khách hàng",
    dataIndex: "customer_code",
    key: "customer_code",
    render: (_, record: any) => (
      <div className="!w-[175px]">{record.customer_code}</div>
    ),
  },
  {
    title: "Tên khách hàng",
    dataIndex: "customer_name",
    key: "customer_name",
    render: (_, record: any) => (
      <div className="!w-[175px]">{record.customer_name}</div>
    ),
  },
  {
    title: "Loại khách hàng",
    dataIndex: "customer_type",
    key: "customer_type",
    render: (_, record: any) => (
      <div className="!w-[175px]">{record.customer_type}</div>
    ),
  },
  {
    title: "Nhóm khách hàng",
    dataIndex: "customer_group",
    key: "customer_group",
    render: (_, record: any) => (
      <div className="!w-[175px]">{record.customer_group}</div>
    ),
  },
  {
    title: "Người liên hệ",
    dataIndex: "contact_person",
    key: "contact_person",
    render: (_, record: any) => (
      <div className="!w-[175px]">{record.contact_person}</div>
    ),
  },
  {
    title: "SDT",
    dataIndex: "phone",
    key: "phone",
    render: (_, record: any) => (
      <div className="!w-[175px]">{record.phone}</div>
    ),
  },
  {
    title: "Mã số thuế",
    dataIndex: "tax_id",
    key: "tax_id",
    render: (_, record: any) => (
      <div className="!w-[175px]">{record.tax_id}</div>
    ),
  },
  {
    title: "Khu vực",
    dataIndex: "territory",
    key: "territory",
    render: (_, record: any) => (
      <div className="!w-[175px]">{record.territory}</div>
    ),
  },
  {
    title: "Địa chỉ",
    dataIndex: "address",
    key: "address",
    render: (_, record: any) => (
      <div className="!w-[175px] truncate hover:whitespace-normal">
        {record.address}
      </div>
    ),
  },
  {
    title: "Ngày viếng thăm",
    dataIndex: "date_checkin",
    key: "date_checkin",
    render: (_, record: any) => (
      <div className="!w-[175px]">
        {record.date_checkin
          ?.split("-")
          ?.reverse()
          ?.toString()
          ?.replaceAll(",", "-")}
      </div>
    ),
  },
];

export default function ReportCheckinFirst() {
  const [dataReport, setDataReport] = useState<DataCheckinFirst[]>([]);
  const [total, setTotal] = useState<number>(0);
  const PAGE_SIZE = 20;
  const [page, setPage] = useState<number>(1);
  const [listDepartment, setListDepartment] = useState<any[]>([]);
  const [department, setDepartment] = useState("");
  const [keySDepartment, setKeySDepartment] = useState("");
  let keySearchDepartment = useDebounce(keySDepartment, 500);
  const [employee, setEmployee] = useState("");
  const [listEmployee, setListEmployee] = useState<any[]>([]);
  const [keySEmployee, setKeySEmployee] = useState("");
  let keySearchEmployee = useDebounce(keySEmployee, 500);
  const [customer_group, setCustomerGroup] = useState("");
  const [listCustomerGroup, setListCustomerGroup] = useState<any[]>([]);
  const [keySCustomerGroup, setKeySCustomerGroup] = useState("");
  let keySearchCustomerGroup = useDebounce(keySCustomerGroup, 500);
  const [customer_type, setCustomerType] = useState("");
  const [territory, setTerritory] = useState("");
  const [listTerritory, setListTerritory] = useState<any[]>([]);
  const [keySTerritory, setKeySTerritory] = useState("");
  let keySearchTerritory = useDebounce(keySTerritory, 500);
  const [from_date, setFromDate] = useState<any>();
  const [to_date, setToDate] = useState<any>();

  const onChange: DatePickerProps["onChange"] = (dateString: any) => {
    if (dateString === null || dateString === undefined) {
      setFromDate("");
    } else {
      let fDate = Date.parse(dateString["$d"]) / 1000;
      setFromDate(fDate);
    }
  };

  const onChange1: DatePickerProps["onChange"] = (dateString: any) => {
    if (dateString === null || dateString === undefined) {
      setToDate("");
    } else {
      let tDate = Date.parse(dateString["$d"]) / 1000;
      setToDate(tDate);
    }
  };

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

  useEffect(() => {
    (async () => {
      let rsEmployee: any = await AxiosService.get(
        "/api/method/frappe.desk.search.search_link",
        {
          params: {
            txt: keySearchEmployee,
            doctype: "Employee",
            ignore_user_permissions: 0,
            query: "",
          },
        }
      );

      let { message: results } = rsEmployee;

      console.log("rsEmployee", results);

      setListEmployee(
        results.map((dtEmployee: any) => ({
          value: dtEmployee.description.trim(),
          label: dtEmployee.description.trim(),
        }))
      );
    })();
  }, [keySearchEmployee]);

  useEffect(() => {
    (async () => {
      let rsCustomerGroup: any = await AxiosService.get(
        "/api/method/frappe.desk.search.search_link",
        {
          params: {
            txt: keySearchCustomerGroup,
            doctype: "Customer Group",
            ignore_user_permissions: 0,
            query: "",
          },
        }
      );

      let { message: results } = rsCustomerGroup;

      setListCustomerGroup(
        results.map((dtCustomerGroup: any) => ({
          value: dtCustomerGroup.value.trim(),
          label: dtCustomerGroup.value.trim(),
        }))
      );
    })();
  }, [keySearchCustomerGroup]);

  useEffect(() => {
    (async () => {
      let rsTerritory: any = await AxiosService.get(
        "/api/method/frappe.desk.search.search_link",
        {
          params: {
            txt: keySearchTerritory,
            doctype: "Territory",
            ignore_user_permissions: 0,
            query: "",
          },
        }
      );

      let { message: results } = rsTerritory;

      setListTerritory(
        results.map((dtTerritory: any) => ({
          value: dtTerritory.value,
          label: dtTerritory.value,
        }))
      );
    })();
  }, [keySearchTerritory]);

  useEffect(() => {
    (async () => {
      const rsData = await AxiosService.get(
        "/api/method/mbw_dms.api.report.first_checkin_rp.first_checkin_report",
        {
          params: {
            page_size: PAGE_SIZE,
            page_number: page,
            department: department,
            employee: employee,
            customer_group: customer_group,
            customer_type: customer_type,
            territory: territory,
            from_date: from_date,
            to_date: to_date,
          },
        }
      );

      let { result } = rsData;

      console.log("dt", result);

      setDataReport(result);
      setTotal(result?.totals);
    })();
  }, [
    page,
    department,
    employee,
    customer_group,
    customer_type,
    territory,
    from_date,
    to_date,
  ]);

  return (
    <>
      <HeaderPage
        title="Báo cáo thống kê khách hàng viếng thăm lần đầu"
        buttons={[
          {
            label: "Xuất dữ liệu",
            type: "primary",
            icon: <VerticalAlignBottomOutlined className="text-xl" />,
            size: "20px",
            className: "flex items-center",
            action: () => {
              translationUrl("/app/data-export/Data%20Export")
            }
          },
        ]}
      />
      <div className="bg-white rounded-md py-7 px-4 border-[#DFE3E8] border-[0.2px] border-solid">
        <div className="flex justify-start items-center pt-2">
          <FormItemCustom
            className="w-[200px] border-none mr-2"
            label={"Phòng ban"}
          ></FormItemCustom>
          <FormItemCustom
            className="w-[200px] border-none mr-2"
            label={"Nhân viên"}
          ></FormItemCustom>
          <FormItemCustom
            className="w-[200px] border-none mr-2"
            label={"Loại khách hàng"}
          ></FormItemCustom>
          <FormItemCustom
            className="w-[200px] border-none mr-2"
            label={"Nhóm khách hàng"}
          ></FormItemCustom>
          <FormItemCustom
            className="w-[200px] border-none mr-2"
            label={"Khu vực"}
          ></FormItemCustom>
        </div>
        <div className="flex justify-start items-center">
          <FormItemCustom className="w-[200px] border-none mr-2">
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
              placeholder="Tất cả phòng ban"
            />
          </FormItemCustom>
          <FormItemCustom className="w-[200px] border-none mr-2">
            <Select
              className="!bg-[#F4F6F8] options:bg-[#F4F6F8]"
              options={listEmployee}
              onSelect={(value) => {
                setEmployee(value);
              }}
              onSearch={(value: string) => {
                setKeySEmployee(value);
              }}
              onClear={() => setEmployee("")}
              filterOption={false}
              allowClear
              placeholder="Tất cả nhân viên"
            />
          </FormItemCustom>

          <FormItemCustom className="w-[200px] border-none mr-2">
            <Select
              className="!bg-[#F4F6F8] options:bg-[#F4F6F8]"
              options={typecustomer}
              filterOption={false}
              allowClear
              placeholder="Tất cả loại khách hàng"
              onSelect={(value) => {
                setCustomerType(value);
              }}
              onClear={() => setCustomerType("")}
            />
          </FormItemCustom>

          <FormItemCustom className="w-[200px] border-none mr-2">
            <Select
              className="!bg-[#F4F6F8] options:bg-[#F4F6F8]"
              options={listCustomerGroup}
              onSelect={(value) => {
                setCustomerGroup(value);
              }}
              onSearch={(value: string) => {
                setKeySCustomerGroup(value);
              }}
              onClear={() => setCustomerGroup("")}
              filterOption={false}
              allowClear
              placeholder="Tất cả nhóm khách hàng"
            />
          </FormItemCustom>

          <FormItemCustom className="w-[200px] border-none mr-2">
            <Select
              className="!bg-[#F4F6F8] options:bg-[#F4F6F8]"
              options={listTerritory}
              onSelect={(value) => {
                setTerritory(value);
              }}
              onSearch={(value: string) => {
                setKeySTerritory(value);
              }}
              onClear={() => setTerritory("")}
              filterOption={false}
              allowClear
              placeholder="Tất cả khu vực"
            />
          </FormItemCustom>
        </div>

        <div className="flex justify-start items-center pt-2">
          <FormItemCustom
            className="w-[200px] border-none mr-2"
            label={"Từ ngày"}
          ></FormItemCustom>
          <FormItemCustom
            className="w-[200px] border-none mr-2"
            label={"Đến ngày"}
          ></FormItemCustom>
        </div>

        <div className="flex justify-start items-center">
          <FormItemCustom className="w-[200px] border-none mr-2">
            <DatePicker
              format={"DD-MM-YYYY"}
              placeholder="Từ ngày"
              className="!bg-[#F4F6F8]"
              onChange={onChange}
            />
          </FormItemCustom>

          <FormItemCustom className="w-[200px] border-none mr-2">
            <DatePicker
              format={"DD-MM-YYYY"}
              placeholder="Đến ngày"
              className="!bg-[#F4F6F8]"
              onChange={onChange1}
            />
          </FormItemCustom>
        </div>
        <div className="pt-5">
          <TableReport
            dataSource={dataReport?.data?.map(
              (dataCheckin: DataCheckinFirst) => {
                return {
                  ...dataCheckin,
                  key: dataCheckin.name,
                };
              }
            )}
            bordered
            pagination={{
              defaultPageSize: PAGE_SIZE,
              total,
              showSizeChanger: false,
              onChange(page) {
                setPage(page);
              },
            }}
            columns={columns}
            scroll={{ x: true }}
          />
        </div>
      </div>
    </>
  );
}
