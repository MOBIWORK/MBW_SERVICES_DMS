import { SearchOutlined, VerticalAlignBottomOutlined } from "@ant-design/icons";
import { FormItemCustom, HeaderPage } from "../../components";
import { Input, Select, Table, Typography } from "antd";
import type { TableColumnsType } from "antd";
import { TableReport } from "../ReportSales/tableCustom";
import {
  area,
  customergroup,
  department,
  ordernew,
  psorder,
  typecustomer,
} from "../ReportSales/data";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { AxiosService } from "../../services/server";
import useDebounce from "../../hooks/useDebount";

interface DataTypeCustomNew {
  key: React.Key;
  name: string;
  stt?: number;
  department: string;
  employee_id: string;
  employee_name: string;
  customer_code: string;
  customer_name: string;
  customer_type: string; //loại khách hàng
  customer_group: string; //nhóm khách hàng
  contact: string;
  phone: string;
  tax_id: string;
  territory: string;
  address: string;
  creation: string;
  totals_checkin: number; //số lần vt
  first_checkin: string;
  last_checkin: string;
  totals_so: number;
  last_sale_order: string; // đơn hàng cuối
}

const columns: TableColumnsType<DataTypeCustomNew> = [
  {
    title: "STT",
    dataIndex: "stt",
    key: "stt",
    render: (_, record: any, index: number) => index + 1,
  },
  {
    title: "Phòng ban",
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
    dataIndex: "contact",
    key: "contact",
    render: (_, record: any) => (
      <div className="!w-[175px]">{record.contact}</div>
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
    title: "Khu vưc",
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
      <div className="!w-[175px]">{record.contribution}</div>
    ),
  },
  {
    title: "Ngày thu thập",
    dataIndex: "creation",
    key: "creation",
    render: (_, record: any) => (
      <div className="!w-[175px]">
        {dayjs(record.creation * 1000).format("DD/MM/YYYY")}
      </div>
    ),
  },
  {
    title: "Nguồn",
    dataIndex: "f1",
    key: "f1",
  },
  {
    title: "Số lần VT",
    dataIndex: "totals_checkin",
    key: "totals_checkin",
  },
  {
    title: "VT đầu",
    dataIndex: "first_checkin",
    key: "first_checkin",
  },
  {
    title: "VT cuối",
    dataIndex: "last_checkin",
    key: "last_checkin",
  },
  {
    title: "Số đơn hàng",
    dataIndex: "totals_so",
    key: "totals_so",
  },
  {
    title: "Đơn hàng cuối",
    dataIndex: "last_sale_order",
    key: "last_sale_order",
    render: (_, record: any) => (
      <div className="!w-[175px]">
        {dayjs(record.last_sale_order * 1000).format("DD/MM/YYYY")}
      </div>
    ),
  },
];

export default function ReportCustomNew() {
  const [dataCustomNew, setDataCustomNew] = useState<DataTypeCustomNew[]>([]);
  const [total, setTotal] = useState<number>(0);
  const PAGE_SIZE = 20;
  const [page, setPage] = useState<number>(1);
  const [employee, setEmployee] = useState("");
  const [listEmployee, setListEmployee] = useState<any[]>([]);
  const [keySEmployee, setKeySEmployee] = useState("");
  let keySearchEmployee = useDebounce(keySEmployee, 500);
  const [listDepartment, setListDepartment] = useState<any[]>([]);
  const [department, setDepartment] = useState("");
  const [keySDepartment, setKeySDepartment] = useState("");
  const [customer_type, setCustomerType] = useState("");
  let keySearchDepartment = useDebounce(keySDepartment, 500);
  const [customer_group, setCustomerGroup] = useState("");
  const [listCustomerGroup, setListCustomerGroup] = useState<any[]>([]);
  const [keySCustomerGroup, setKeySCustomerGroup] = useState("");
  let keySearchCustomerGroup = useDebounce(keySCustomerGroup, 500);
  const [territory, setTerritory] = useState("");
  const [listTerritory, setListTerritory] = useState<any[]>([]);
  const [keySTerritory, setKeySTerritory] = useState("");
  let keySearchTerritory = useDebounce(keySTerritory, 500);
  const [has_sales_order, setHasSaleOrder] = useState<boolean>()

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

      console.log("Customer Group", results);

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
        "/api/method/mbw_dms.api.report.customer_report.customer_report",
        {
          params: {
            page_size: PAGE_SIZE,
            page_number: page,
            customer_type: customer_type,
            customer_group: customer_group,
            territory: territory,
            employee: employee,
            has_sales_order: has_sales_order,
            department: department,
          },
        }
      );

      let { result } = rsData;
      console.log("result", result);
      setDataCustomNew(result);
      setTotal(result?.totals_cus);
    })();
  }, [page, customer_type, customer_group, territory, employee, has_sales_order, department]);
  return (
    <>
      <HeaderPage
        title="Báo cáo khách hàng mới"
        buttons={[
          {
            label: "Xuất dữ liệu",
            type: "primary",
            icon: <VerticalAlignBottomOutlined className="text-xl" />,
            size: "20px",
            className: "flex items-center",
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
              showSearch
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
              showSearch
            />
          </FormItemCustom>

          <FormItemCustom className="w-[200px] border-none mr-2">
            <Select
              className="!bg-[#F4F6F8] options:bg-[#F4F6F8]"
              options={typecustomer}
              filterOption={false}
              allowClear
              showSearch
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
              showSearch
            />
          </FormItemCustom>

          <FormItemCustom className="w-[200px] border-none mr-2">
            <Select
              className="!bg-[#F4F6F8] options:bg-[#F4F6F8]"
              defaultValue={""}
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
              showSearch
            />
          </FormItemCustom>
        </div>

        <div className="flex justify-start items-center pt-4">
          <FormItemCustom
            className="w-[200px] border-none mr-2"
            label={"Phát sinh đơn hàng"}
          ></FormItemCustom>
        </div>

        <div className="flex justify-start items-center">
          <FormItemCustom className="w-[200px] border-none mr-2">
            <Select
              className="!bg-[#F4F6F8] options:bg-[#F4F6F8]"
              options={psorder}
              filterOption={false}
              allowClear
              showSearch
              onSelect={(value) => {
                setHasSaleOrder(value);
              }}
              onClear={() => setHasSaleOrder(undefined)}
            />
          </FormItemCustom>
        </div>

        <div className="pt-5">
          <TableReport
            dataSource={dataCustomNew?.data?.map(
              (dataSale: DataTypeCustomNew) => {
                return {
                  ...dataSale,
                  key: dataSale.name,
                };
              }
            )}
            bordered
            columns={columns}
            pagination={{
              defaultPageSize: PAGE_SIZE,
              total,
              onChange(page) {
                setPage(page);
              },
            }}
            scroll={{ x: true }}
            summary={() => {
              return (
                <Table.Summary.Row>
                  <Table.Summary.Cell index={0}></Table.Summary.Cell>
                  <Table.Summary.Cell index={1}>Tổng</Table.Summary.Cell>
                  <Table.Summary.Cell index={2}></Table.Summary.Cell>
                  <Table.Summary.Cell index={3}></Table.Summary.Cell>
                  <Table.Summary.Cell index={4}></Table.Summary.Cell>
                  <Table.Summary.Cell index={5}></Table.Summary.Cell>
                  <Table.Summary.Cell index={6}></Table.Summary.Cell>
                  <Table.Summary.Cell index={7}></Table.Summary.Cell>
                  <Table.Summary.Cell index={8}></Table.Summary.Cell>
                  <Table.Summary.Cell index={9}></Table.Summary.Cell>
                  <Table.Summary.Cell index={10}></Table.Summary.Cell>
                  <Table.Summary.Cell index={11}></Table.Summary.Cell>
                  <Table.Summary.Cell index={12}></Table.Summary.Cell>
                  <Table.Summary.Cell index={13}></Table.Summary.Cell>
                  <Table.Summary.Cell index={14}></Table.Summary.Cell>
                  <Table.Summary.Cell index={15}>
                    {dataCustomNew?.sum?.sum_checkin}
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={16}></Table.Summary.Cell>
                  <Table.Summary.Cell index={17}></Table.Summary.Cell>
                  <Table.Summary.Cell index={18}>
                    {dataCustomNew?.sum?.sum_so}
                  </Table.Summary.Cell>
                </Table.Summary.Row>
              );
            }}
          />
        </div>
      </div>
    </>
  );
}
