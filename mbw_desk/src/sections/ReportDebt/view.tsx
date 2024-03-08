import { VerticalAlignBottomOutlined } from "@ant-design/icons";
import { FormItemCustom, HeaderPage } from "../../components";
import {
  DatePicker,
  InputNumber,
  Select,
  Table,
  TableColumnsType,
  Typography,
} from "antd";
import { TableReport } from "../ReportSales/tableCustom";
import {
  company,
  customergroup,
  party,
  partyType,
  salePerson,
  salepartner,
  territory,
} from "../ReportSales/data";
import { DatePickerProps } from "antd/lib";
import { data } from "./data";


const columns: TableColumnsType<DataReportDebt> = [
  {
    title: "STT",
    dataIndex: "stt",
    key: "stt",
    render: (_, record: any, index: number) => index + 1,
  },
  {
    title: "Party type",
    dataIndex: "partytype",
    key: "partytype",
    render: (_, record: any) => (
      <div className="!w-[173px]">{record.partytype}</div>
    ),
  },
  {
    title: "Party",
    dataIndex: "party",
    key: "party",
    render: (_, record: any) => (
      <div className="!w-[173px]">{record.party}</div>
    ),
  },
  {
    title: "Advance amount",
    dataIndex: "advanceamount",
    key: "advanceamount",
    render: (_, record: any) => (
      <>
        <span className="mr-2">VND</span>
        {Intl.NumberFormat().format(record.advanceamount)}
      </>
    ),
  },
  {
    title: "Invoice amount",
    dataIndex: "invoiceamount",
    key: "invoiceamount",
    render: (_, record: any) => (
      <>
        <span className="mr-2">VND</span>
        {Intl.NumberFormat().format(record.invoiceamount)}
      </>
    ),
  },
  {
    title: "Paid amount",
    dataIndex: "paidamount",
    key: "paidamount",
    render: (_, record: any) => (
      <>
        <span className="mr-2">VND</span>
        {Intl.NumberFormat().format(record.paidamount)}
      </>
    ),
  },
  {
    title: "Credit note",
    dataIndex: "creditnote",
    key: "creditnote",
    render: (_, record: any) => (
      <>
        <span className="mr-2">VND</span>
        {Intl.NumberFormat().format(record.creditnote)}
      </>
    ),
  },
  {
    title: "Oustanding amount",
    dataIndex: "oustandingamount",
    key: "oustandingamount",
    render: (_, record: any) => (
      <>
        <span className="mr-2">VND</span>
        {Intl.NumberFormat().format(record.oustandingamount)}
      </>
    ),
  },
  {
    title: "0-30",
    dataIndex: "field1",
    key: "field1",
    render: (_, record: any) => (
      <>
        <span className="mr-2">VND</span>
        {Intl.NumberFormat().format(record.field1)}
      </>
    ),
  },
  {
    title: "31-60",
    dataIndex: "field2",
    key: "field2",
    render: (_, record: any) => (
      <>
        <span className="mr-2">VND</span>
        {Intl.NumberFormat().format(record.field2)}
      </>
    ),
  },
  {
    title: "61-90",
    dataIndex: "field3",
    key: "field3",
    render: (_, record: any) => (
      <>
        <span className="mr-2">VND</span>
        {Intl.NumberFormat().format(record.field3)}
      </>
    ),
  },
  {
    title: "91-120",
    dataIndex: "field4",
    key: "field4",
    render: (_, record: any) => (
      <>
        <span className="mr-2">VND</span>
        {Intl.NumberFormat().format(record.field4)}
      </>
    ),
  },
  {
    title: "121-Above",
    dataIndex: "field5",
    key: "field5",
    render: (_, record: any) => (
      <>
        <span className="mr-2">VND</span>
        {Intl.NumberFormat().format(record.field5)}
      </>
    ),
  },
  {
    title: "Total amount",
    dataIndex: "totalamount",
    key: "totalamount",
    render: (_, record: any) => (
      <>
        <span className="mr-2">VND</span>
        {Intl.NumberFormat().format(record.totalamount)}
      </>
    ),
  },
  {
    title: "Territory",
    dataIndex: "territory",
    key: "territory",
    render: (_, record: any) => (
      <div className="!w-[173px]">{record.territory}</div>
    ),
  },
  {
    title: "Customer group",
    dataIndex: "customergroup",
    key: "customergroup",
    render: (_, record: any) => (
      <div className="!w-[173px]">{record.customergroup}</div>
    ),
  },
  {
    title: "Currency",
    dataIndex: "currency",
    key: "currency",
    render: (_, record: any) => (
      <div className="!w-[173px]">{record.currency}</div>
    ),
  },
];

export default function ReportDebt() {
  const onChange: DatePickerProps["onChange"] = (dateString) => {
    console.log(dateString);
  };
  const onChange1: DatePickerProps["onChange"] = (dateString) => {
    console.log(dateString);
  };
  return (
    <>
      <HeaderPage
        title="Báo cáo công nợ khách hàng"
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
              options={[{ label: "Company", value: "" }, ...company]}
              showSearch
            />
          </FormItemCustom>
          <FormItemCustom className="w-[200px] border-none mr-2">
            <DatePicker
              format={"DD-MM-YYYY"}
              placeholder="Posting date"
              className="!bg-[#F4F6F8]"
              onChange={onChange}
            />
          </FormItemCustom>
          <FormItemCustom className="w-[200px] border-none mr-2">
            <DatePicker
              format={"DD-MM-YYYY"}
              placeholder="Due Date"
              className="!bg-[#F4F6F8]"
              onChange={onChange1}
            />
          </FormItemCustom>
          <FormItemCustom className="w-[200px] border-none mr-2">
            <InputNumber
              className="w-[200px]"
              controls={false}
              max={30}
              min={0}
              placeholder="Ageing range 1"
            />
          </FormItemCustom>
          <FormItemCustom className="w-[200px] border-none mr-2">
            <InputNumber
              className="w-[200px]"
              controls={false}
              max={31}
              min={60}
              placeholder="Ageing range 2"
            />
          </FormItemCustom>
        </div>
        <div className="pt-4 flex justify-start items-center">
          <FormItemCustom className="w-[200px] border-none mr-2">
            <InputNumber
              className="w-[200px]"
              controls={false}
              max={61}
              min={90}
              placeholder="Ageing range 3"
            />
          </FormItemCustom>
          <FormItemCustom className="w-[200px] border-none mr-2">
            <InputNumber
              className="w-[200px]"
              controls={false}
              max={120}
              min={91}
              placeholder="Ageing range 4"
            />
          </FormItemCustom>
          <FormItemCustom className="w-[200px] border-none mr-2">
            <Select
              className="!bg-[#F4F6F8] options:bg-[#F4F6F8]"
              defaultValue={""}
              options={[{ label: "Party type", value: "" }, ...partyType]}
              showSearch
            />
          </FormItemCustom>
          <FormItemCustom className="w-[200px] border-none mr-2">
            <Select
              className="!bg-[#F4F6F8] options:bg-[#F4F6F8]"
              defaultValue={""}
              options={[{ label: "Party", value: "" }, ...party]}
              showSearch
            />
          </FormItemCustom>
          <FormItemCustom className="w-[200px] border-none mr-2">
            <Select
              className="!bg-[#F4F6F8] options:bg-[#F4F6F8]"
              defaultValue={""}
              options={[
                { label: "Customer group", value: "" },
                ...customergroup,
              ]}
              showSearch
            />
          </FormItemCustom>
        </div>
        <div className="pt-4 flex justify-start items-center">
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
              options={[{ label: "Sales partner", value: "" }, ...salepartner]}
              showSearch
            />
          </FormItemCustom>
          <FormItemCustom className="w-[200px] border-none mr-2">
            <Select
              className="!bg-[#F4F6F8] options:bg-[#F4F6F8]"
              defaultValue={""}
              options={[{ label: "Sales person", value: "" }, ...salePerson]}
              showSearch
            />
          </FormItemCustom>
        </div>
        <div className="pt-5">
          <TableReport
            dataSource={data}
            columns={columns}
            bordered
            scroll={{ x: true }}
            summary={(pageData) => {
              let total = 0;
              pageData.forEach((record) => {
                // Calculate total from data rows
                total += record.khvisiting;
              });

              return (
                <Table.Summary.Row>
                  <Table.Summary.Cell index={0}></Table.Summary.Cell>
                  <Table.Summary.Cell index={1}>Tổng</Table.Summary.Cell>
                  <Table.Summary.Cell index={2}></Table.Summary.Cell>
                  <Table.Summary.Cell index={3}></Table.Summary.Cell>
                  <Table.Summary.Cell index={4}>{total}</Table.Summary.Cell>
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
