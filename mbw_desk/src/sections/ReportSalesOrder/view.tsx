import { SearchOutlined, VerticalAlignBottomOutlined } from "@ant-design/icons";
import { FormItemCustom, HeaderPage } from "../../components";
import { Input, Select, Table, Typography } from "antd";
import type { TableColumnsType } from "antd";
import { TableReport } from "../ReportSales/tableCustom";
import {
  brand,
  company,
  customer,
  itemgroup,
  salePerson,
  territory,
  warehouse,
} from "../ReportSales/data";

interface DataTypeKPI {
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
}

const columns: TableColumnsType<DataTypeKPI> = [
  {
    title: "STT",
    dataIndex: "stt",
    key: "stt",
    render: (_, record: any, index: number) => index + 1,
  },
  {
    title: "Sales order",
    dataIndex: "saleorder",
    key: "saleorder",
    render: (_, record: any) => (
      <div className="!w-[175px]">{record.saleorder}</div>
    ),
  },
  {
    title: "Customer",
    dataIndex: "customer",
    key: "customer",
  },
  {
    title: "Territory",
    dataIndex: "territory",
    key: "territory",
  },
  {
    title: "Warehouse",
    dataIndex: "warehouse",
    key: "warehouse",
  },
  {
    title: "Posting date",
    dataIndex: "postingdate",
    key: "postingdate",
  },
  {
    title: "Item code",
    dataIndex: "itemcode",
    key: "itemcode",
  },
  {
    title: "Item group",
    dataIndex: "itemgroup",
    key: "itemgroup",
  },
  {
    title: "Brand",
    dataIndex: "brand",
    key: "brand",
  },
  {
    title: "Qty",
    dataIndex: "qty",
    key: "qty",
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
    render: (_, record: any) => (
      <>
        <span className="mr-2">VND</span>
        {record.amount}
      </>
    ),
  },
  {
    title: "Sale person",
    dataIndex: "saleperson",
    key: "saleperson",
  },
  {
    title: "Contribution",
    dataIndex: "contribution",
    key: "contribution",
  },
  {
    title: "Contribution Amount",
    dataIndex: "contributionamount",
    key: "contributionamount",
    render: (_, record: any) => (
      <>
        <span className="mr-2">VND</span>
        {record.contributionamount}
      </>
    ),
  },
];

const data: DataTypeKPI[] = [
  {
    key: "KDA",
    name: "7382jsd",
    saleorder: "SHUAL211",
    customer: "Thiên Tần",
    territory: "Hà Nội",
    warehouse: "Kho Hà Nội",
    postingdate: "16/04/2024",
    itemcode: "OU-11",
    itemgroup: "Nhóm sp KM",
    brand: "ABB",
    qty: 25,
    amount: 45666666,
    saleperson: "Trần Bảo",
    contribution: 100000,
    contributionamount: 30000000,
  },
  {
    key: "KDSD",
    name: "7382112",
    saleorder: "DHDCCC233",
    customer: "Đặng Hoắc",
    territory: "Hà Nội",
    warehouse: "Kho Hà Nội",
    postingdate: "15/04/2024",
    itemcode: "UI-11",
    itemgroup: "Nhóm sp KM",
    brand: "ABB",
    qty: 78,
    amount: 45666666,
    saleperson: "Hạ Trang",
    contribution: 100000,
    contributionamount: 30000000,
  },
];

export default function ReportSalesOrder() {
  return (
    <>
      <HeaderPage
        title="Báo cáo tổng hợp đặt hàng"
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
          <FormItemCustom className="w-[320px] border-none pr-2">
            <Input
              className="!bg-[#F4F6F8] options:bg-[#F4F6F8] !h-8"
              placeholder="Sale order"
              prefix={<SearchOutlined />}
            />
          </FormItemCustom>

          <FormItemCustom className="w-[200px] border-none mr-2">
            <Select
              className="!bg-[#F4F6F8] options:bg-[#F4F6F8]"
              defaultValue={""}
              options={[{ label: "Customer", value: "" }, ...customer]}
              showSearch
            />
          </FormItemCustom>
          <FormItemCustom className="w-[200px] border-none mr-2">
            <Select
              className="!bg-[#F4F6F8] options:bg-[#F4F6F8]"
              defaultValue={""}
              options={[{ label: "Territory", value: "" }, ...territory]}
              showSearch
            />
          </FormItemCustom>
          <FormItemCustom className="w-[200px] border-none mr-2">
            <Select
              className="!bg-[#F4F6F8] options:bg-[#F4F6F8]"
              defaultValue={""}
              options={[{ label: "Warehouse", value: "" }, ...warehouse]}
              showSearch
            />
          </FormItemCustom>
        </div>
        <div className="flex justify-start items-center h-8 pt-9">
          <FormItemCustom className="w-[200px] border-none mr-2">
            <Select
              className="!bg-[#F4F6F8] options:bg-[#F4F6F8]"
              defaultValue={""}
              options={[{ label: "Company", value: "" }, ...company]}
              showSearch
            />
          </FormItemCustom>

          <FormItemCustom className="w-[200px] border-none mr-2">
            <Select
              className="!bg-[#F4F6F8] options:bg-[#F4F6F8]"
              defaultValue={""}
              options={[{ label: "Item group", value: "" }, ...itemgroup]}
              showSearch
            />
          </FormItemCustom>
          <FormItemCustom className="w-[200px] border-none mr-2">
            <Select
              className="!bg-[#F4F6F8] options:bg-[#F4F6F8]"
              defaultValue={""}
              options={[{ label: "Brand", value: "" }, ...brand]}
              showSearch
            />
          </FormItemCustom>
          <FormItemCustom className="w-[200px] border-none mr-2">
            <Select
              className="!bg-[#F4F6F8] options:bg-[#F4F6F8]"
              defaultValue={""}
              options={[{ label: "Sale person", value: "" }, ...salePerson]}
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
