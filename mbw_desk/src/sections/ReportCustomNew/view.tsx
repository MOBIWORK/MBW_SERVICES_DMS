import { SearchOutlined, VerticalAlignBottomOutlined } from "@ant-design/icons";
import { FormItemCustom, HeaderPage } from "../../components";
import { Input, Select, Table, Typography } from "antd";
import type { TableColumnsType } from "antd";
import { TableReport } from "../ReportSales/tableCustom";
import {
  area,
  customer,
  customergroup,
  department,
  ordernew,
  typecustomer,
} from "../ReportSales/data";
import React from "react";

interface DataTypeCustomNew {
  key: React.Key;
  name: string;
  stt?: number;
  saleorder: string;
  customer: string;
  territory: string;
  warehouse: string;
  postingdate: string;
  itemcode: string;
  itemgroup: string;
  brand: string;
  qty?: number;
  amount?: number;
  saleperson?: string;
  contribution?: number;
  contributionamount?: number;
  f1?: string;
  f2?: string;
  f3?: string;
  f4?: string;
  f5?: string;
}

const columns: TableColumnsType<DataTypeCustomNew> = [
  {
    title: "STT",
    dataIndex: "stt",
    key: "stt",
    render: (_, record: any, index: number) => index + 1,
  },
  {
    title: "Phòng/nhóm",
    dataIndex: "saleorder",
    key: "saleorder",
    render: (_, record: any) => (
      <div className="!w-[175px]">{record.saleorder}</div>
    ),
  },
  {
    title: "Mã nhân viên",
    dataIndex: "customer",
    key: "customer",
    render: (_, record: any) => (
      <div className="!w-[175px]">{record.customer}</div>
    ),
  },
  {
    title: "Mã khách hàng",
    dataIndex: "territory",
    key: "territory",
    render: (_, record: any) => (
      <div className="!w-[175px]">{record.territory}</div>
    ),
  },
  {
    title: "Tên khách hàng",
    dataIndex: "warehouse",
    key: "warehouse",
    render: (_, record: any) => (
      <div className="!w-[175px]">{record.warehouse}</div>
    ),
  },
  {
    title: "Loại khách hàng",
    dataIndex: "postingdate",
    key: "postingdate",
    render: (_, record: any) => (
      <div className="!w-[175px]">{record.postingdate}</div>
    ),
  },
  {
    title: "Nhóm khách hàng",
    dataIndex: "itemcode",
    key: "itemcode",
    render: (_, record: any) => (
      <div className="!w-[175px]">{record.itemcode}</div>
    ),
  },
  {
    title: "Người liên hệ",
    dataIndex: "itemgroup",
    key: "itemgroup",
    render: (_, record: any) => (
      <div className="!w-[175px]">{record.itemgroup}</div>
    ),
  },
  {
    title: "SDT",
    dataIndex: "brand",
    key: "brand",
    render: (_, record: any) => (
      <div className="!w-[175px]">{record.brand}</div>
    ),
  },
  {
    title: "Mã số Thuế",
    dataIndex: "qty",
    key: "qty",
    render: (_, record: any) => <div className="!w-[175px]">{record.qty}</div>,
  },
  {
    title: "Khu vực",
    dataIndex: "amount",
    key: "amount",
    render: (_, record: any) => (
      <div className="!w-[175px]">{record.amount}</div>
    ),
  },
  {
    title: "Địa chỉ",
    dataIndex: "saleperson",
    key: "saleperson",
    render: (_, record: any) => (
      <div className="!w-[175px]">{record.saleperson}</div>
    ),
  },
  {
    title: "Ngày thu thập",
    dataIndex: "contribution",
    key: "contribution",
    render: (_, record: any) => (
      <div className="!w-[175px]">{record.contribution}</div>
    ),
  },
  {
    title: "Nguồn",
    dataIndex: "contributionamount",
    key: "contributionamount",
    render: (_, record: any) => (
      <div className="!w-[175px]">{record.contributionamount}</div>
    ),
  },
  {
    title: "Số lần VT",
    dataIndex: "f1",
    key: "f1",
  },
  {
    title: "VT đầu",
    dataIndex: "f2",
    key: "f2",
  },
  {
    title: "VT cuối",
    dataIndex: "f3",
    key: "f3",
  },
  {
    title: "Số đơn hàng",
    dataIndex: "f4",
    key: "f4",
  },
  {
    title: "Đơn hàng cuối",
    dataIndex: "f5",
    key: "f5",
  },
];

const data: DataTypeCustomNew[] = [
  {
    key: "KDA",
    name: "7382jsd",
    saleorder: "Phòng sale",
    customer: "NV-1243",
    territory: "Chu Quỳnh Anh",
    warehouse: "KH-1234",
    postingdate: "Winmart",
    itemcode: "Cá nhân",
    itemgroup: "Thân thiết",
    brand: "Chú Cá",
    qty: 1239237235,
    amount: 449003,
    saleperson: "Hà Nội",
    contribution: 100000,
    contributionamount: 30000000,
    f1: "1",
    f2: "16/08/2013",
    f3: "16/08/2013",
    f4: "2",
    f5: "07/05/2016",
  },
  {
    key: "KDSD",
    name: "7382112",
    saleorder: "Phòng sale 1",
    customer: "NV-34321",
    territory: "Ba La Đôn",
    warehouse: "KH-12342",
    postingdate: "Winmart",
    itemcode: "Cá nhân",
    itemgroup: "Thân thiết",
    brand: "Chú Mèo",
    qty: 1239237235,
    amount: 449003,
    saleperson: "Hà Nội",
    contribution: 100000,
    contributionamount: 30000000,
    f1: "1",
    f2: "16/08/2013",
    f3: "16/08/2013",
    f4: "2",
    f5: "07/05/2016",
  },
];

export default function ReportCustomNew() {
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
        <div className="flex justify-start items-center">
          <FormItemCustom className="w-[200px] border-none mr-2">
            <Select
              className="!bg-[#F4F6F8] options:bg-[#F4F6F8]"
              defaultValue={""}
              options={[
                { label: "Phòng ban/ nhân viên", value: "" },
                ...department,
              ]}
              showSearch
            />
          </FormItemCustom>
          <FormItemCustom className="w-[200px] border-none mr-2">
            <Select
              className="!bg-[#F4F6F8] options:bg-[#F4F6F8]"
              defaultValue={""}
              options={[
                { label: "Loại khách hàng", value: "" },
                ...typecustomer,
              ]}
              showSearch
            />
          </FormItemCustom>
          <FormItemCustom className="w-[200px] border-none mr-2">
            <Select
              className="!bg-[#F4F6F8] options:bg-[#F4F6F8]"
              defaultValue={""}
              options={[
                { label: "Nhóm khách hàng", value: "" },
                ...customergroup,
              ]}
              showSearch
            />
          </FormItemCustom>

          <FormItemCustom className="w-[200px] border-none mr-2">
            <Select
              className="!bg-[#F4F6F8] options:bg-[#F4F6F8]"
              defaultValue={""}
              options={[{ label: "Khu vực", value: "" }, ...area]}
              showSearch
            />
          </FormItemCustom>
          <FormItemCustom className="w-[200px] border-none mr-2">
            <Select
              className="!bg-[#F4F6F8] options:bg-[#F4F6F8]"
              defaultValue={""}
              options={[{ label: "Phát sinh đơn hàng", value: "" }, ...ordernew]}
              showSearch
            />
          </FormItemCustom>
        </div>
        <div className="pt-5">
          <TableReport
            dataSource={data}
            bordered
            columns={columns}
            scroll={{ x: true }}
            summary={(pageData) => {
              let total = 0;
              pageData.forEach((record) => {
                // Calculate total from data rows
                // total += record.khvisiting
              });

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
                </Table.Summary.Row>
              );
            }}
          />
        </div>
      </div>
    </>
  );
}
