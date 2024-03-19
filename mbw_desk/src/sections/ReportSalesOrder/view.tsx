import { SearchOutlined, VerticalAlignBottomOutlined } from "@ant-design/icons";
import { FormItemCustom, HeaderPage, TableCustom } from "../../components";
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
import { useEffect, useState } from "react";
import { AxiosService } from "../../services/server";
import dayjs from "dayjs";
import useDebounce from "../../hooks/useDebount";

interface DataSaleOrder {
  key: React.Key;
  name: string;
  stt?: number;
  transaction_date: string;
  customer: string;
  territory: string;
  set_warehouse: string;
  employee: string;
  total: number; // thành tiền
  tax_amount: number; // tiền vat
  discount_amount: number; // chiết khấu
  grand_total: number; // tổng tiền
}

interface DataItem {
  item_name: string;
  item_code: string;
  brand: string;
  item_group: string;
  rate: number; // đơn giá
  qty: number;
  discount_percentage: number; // chiết khấu phần trăm
  discount_amount: number; // tiền triết khấu
  amount: number; // tổng tiền
}

const columns: TableColumnsType<DataSaleOrder> = [
  {
    title: "STT",
    dataIndex: "stt",
    key: "stt",
    render: (_, record: any, index: number) => index + 1,
  },
  {
    title: "Đơn đặt",
    dataIndex: "name",
    key: "name",
    render: (_, record: any) => <div className="!w-[175px]">{record.name}</div>,
  },
  {
    title: "Khách hàng",
    dataIndex: "customer",
    key: "customer",
    render: (_, record: any) => (
      <div className="!w-[175px]">{record.customer}</div>
    ),
  },
  {
    title: "Khu vực",
    dataIndex: "territory",
    key: "territory",
  },
  {
    title: "Kho",
    dataIndex: "set_warehouse",
    key: "set_warehouse",
    render: (_, record: any) => (
      <div className="!w-[175px]">{record.set_warehouse}</div>
    ),
  },
  {
    title: "Ngày tạo",
    dataIndex: "transaction_date",
    key: "transaction_date",
    render: (_, record: any) => (
      <div className="!w-[175px]">
        {dayjs(record.transaction_date).format("DD/MM/YYYY")}
      </div>
    ),
  },
  {
    title: "Nhân viên",
    dataIndex: "employee",
    key: "employee",
  },
  {
    title: "Thành tiền",
    dataIndex: "total",
    key: "total",
    render: (_, record: any) => (
      <>
        <span className="mr-2">VND</span>
        {Intl.NumberFormat().format(record.total)}
      </>
    ),
  },
  {
    title: "Tiền VAT",
    dataIndex: "tax_amount",
    key: "tax_amount",
    render: (_, record: any) => (
      <>
        <span className="mr-2">VND</span>
        {Intl.NumberFormat().format(record.tax_amount)}
      </>
    ),
  },
  {
    title: "Chiết khấu",
    dataIndex: "discount_amount",
    key: "discount_amount",
    render: (_, record: any) => (
      <>
        <span className="mr-2">VND</span>
        {Intl.NumberFormat().format(record.discount_amount)}
      </>
    ),
  },
  {
    title: "Tổng tiền",
    dataIndex: "grand_total",
    key: "grand_total",
    render: (_, record: any) => (
      <>
        <span className="mr-2">VND</span>
        {Intl.NumberFormat().format(record.grand_total)}
      </>
    ),
  },
];

export default function ReportSalesOrder() {
  const [dataSaleOrder, setDataSaleOrder] = useState<DataSaleOrder[]>([]);
  const [total, setTotal] = useState<number>(0);
  const PAGE_SIZE = 20;
  const [page, setPage] = useState<number>(1);
  const [listCompany, setListCompany] = useState<any[]>([]);
  const [company, setCompany] = useState("");
  const [keySCompany, setKeySCompany] = useState("");
  // const [company, setcCompany] = useState
  let keySearchCompany = useDebounce(keySCompany, 500);

  const expandedRowRender = (recordTable: any) => {
    const columns: TableColumnsType<DataItem> = [
      {
        title: "STT",
        dataIndex: "stt",
        key: "stt",
        render: (_, record: any, index) => index + 1,
      },
      { title: "Mã sản phẩm", dataIndex: "item_code", key: "item_code" },
      { title: "Tên sản phẩm", dataIndex: "item_name", key: "item_name" },
      { title: "Nhóm sản phẩm", dataIndex: "item_group", key: "item_group" },
      { title: "Nhãn hàng", dataIndex: "brand", key: "brand" },
      { title: "Đơn giá", dataIndex: "rate", key: "rate" },
      { title: "Số lượng", dataIndex: "qty", key: "qty" },
      {
        title: "Chiết khấu (%)",
        dataIndex: "discount_percentage",
        key: "discount_percentage",
      },
      {
        title: "Tiền chiết khấu",
        dataIndex: "discount_amount",
        key: "discount_amount",
        render: (_, record: any) => (
          <>
            <span className="mr-2">VND</span>
            {Intl.NumberFormat().format(record.discount_amount)}
          </>
        ),
      },
      {
        title: "Tổng tiền",
        dataIndex: "amount",
        key: "amount",
        render: (_, record: any) => (
          <>
            <span className="mr-2">VND</span>
            {Intl.NumberFormat().format(record.amount)}
          </>
        ),
      },
    ];
    return (
      <Table
        columns={columns}
        dataSource={recordTable.items.map((item: DataItem) => {
          return {
            ...item,
            key: item.item_code,
          };
        })}
        pagination={false}
      />
    );
  };

  useEffect(() => {
    (async () => {
      let rsCompany: any = await AxiosService.get(
        "/api/method/frappe.desk.search.search_link",
        {
          params: {
            txt: keySearchCompany,
            doctype: "Company",
            ignore_user_permissions: 0,
            query: "",
          },
        }
      );

      let { message: results } = rsCompany;

      console.log("rsCom", results);

      setListCompany(
        results.map((dtCompany: any) => ({
          value: dtCompany.value,
          label: dtCompany.value,
        }))
      );
    })();
  }, [keySearchCompany]);

  useEffect(() => {
    (async () => {
      console.log("abc", company)
      
      const rsData = await AxiosService.get(
        "/api/method/mbw_dms.api.report.so_report.so_report",
        {
          params: {
            page_size: PAGE_SIZE,
            page_number: page,
            company: company,
          },
        }
      );

      let { result } = rsData;
      console.log("data", result);

      setDataSaleOrder(result);
      setTotal(result?.totals);
    })();
  }, [page, company]);

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
          <FormItemCustom className="w-[200px] border-none mr-2">
            <Select
              className="!bg-[#F4F6F8] options:bg-[#F4F6F8]"
              defaultValue={""}
              options={[{ label: "Công ty", value: "" }, ...listCompany]}
              onSelect={(value) => {
                console.log(value,[{ label: "Công ty", value: "" }, ...listCompany])
                
                setCompany(value);
              }}
              onSearch={(value: string) => {
                setKeySCompany(value);
              }}
              filterOption={false}
              allowClear
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
        <div className="flex justify-start items-center h-8 pt-9 pb-5">
          <FormItemCustom className="w-[200px] border-none mr-2">
            <Select
              className="!bg-[#F4F6F8] options:bg-[#F4F6F8]"
              defaultValue={""}
              options={[{ label: "Company", value: "" }]}
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
          <TableCustom
            dataSource={dataSaleOrder?.data?.map((dataSale: DataSaleOrder) => {
              return {
                ...dataSale,
                key: dataSale.name,
              };
            })}
            expandable={{ expandedRowRender, defaultExpandedRowKeys: ["0"] }}
            bordered
            columns={columns}
            scroll={{ x: true }}
            pagination={{
              defaultPageSize: PAGE_SIZE,
              total,
              onChange(page) {
                setPage(page);
              },
            }}
            summary={() => {
              console.log("sale", dataSaleOrder);

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
                  <Table.Summary.Cell index={8}>
                    <span className="mr-2">VND</span>
                    {Intl.NumberFormat().format(dataSaleOrder?.sum?.sum_total)}
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={9}>
                    <span className="mr-2">VND</span>
                    {Intl.NumberFormat().format(dataSaleOrder?.sum?.sum_vat)}
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={10}>
                    <span className="mr-2">VND</span>
                    {Intl.NumberFormat().format(
                      dataSaleOrder?.sum?.sum_discount_amount
                    )}
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={11}>
                    <span className="mr-2">VND</span>
                    {Intl.NumberFormat().format(
                      dataSaleOrder?.sum?.sum_grand_total
                    )}
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
