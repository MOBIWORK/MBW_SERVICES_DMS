import { VerticalAlignBottomOutlined } from "@ant-design/icons";
import { FormItemCustom, HeaderPage, TableCustom } from "../../components";
import { DatePicker, Select, Table } from "antd";
import type { TableColumnsType } from "antd";
import { useEffect, useState } from "react";
import { AxiosService } from "../../services/server";
import dayjs from "dayjs";
import useDebounce from "../../hooks/useDebount";
import { DatePickerProps } from "antd/lib";

interface DataSaleOrder {
  key: React.Key;
  name: string;
  stt?: number;
  posting_date: string;
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
    render: (_, record: any) => (
      <div className="!w-[175px]">
        <a
          className="text-[#212B36]"
          href={`app/sales-invoice/${record.name}`}
          target="_blank"
        >
          {record.name}
        </a>
      </div>
    ),
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
    render: (_, record: any) => (
      <div className="!w-[175px]">{record.territory}</div>
    ),
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
    dataIndex: "posting_date",
    key: "posting_date",
    render: (_, record: any) => (
      <div className="!w-[175px]">
        {dayjs(record.posting_date * 1000).format("DD/MM/YYYY")}
      </div>
    ),
  },
  {
    title: "Nhân viên",
    dataIndex: "employee",
    key: "employee",
    render: (_, record: any) => (
      <div className="!w-[150px]">{record.employee}</div>
    ),
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

export default function ReportSales() {
  const [dataSaleOrder, setDataSaleOrder] = useState<DataSaleOrder[]>([]);
  const [total, setTotal] = useState<number>(0);
  const PAGE_SIZE = 20;
  const [page, setPage] = useState<number>(1);
  const [listCompany, setListCompany] = useState<any[]>([]);
  const [company, setCompany] = useState("");
  const [keySCompany, setKeySCompany] = useState("");
  const [territory, setTerritory] = useState("");
  const [listTerritory, setListTerritory] = useState<any[]>([]);
  const [keySTerritory, setKeySTerritory] = useState("");
  const [customer, setCustomer] = useState("");
  const [listCustomer, setListCustomer] = useState<any[]>([]);
  const [keySCustomer, setKeySCustomer] = useState("");
  const [from_date, setFromDate] = useState<any>();
  const [to_date, setToDate] = useState<any>();
  const [warehouse, setWarehouse] = useState("");
  const [listWarehouse, setListWarehouse] = useState<any[]>([]);
  const [keySWarehouse, setKeySWarehouse] = useState("");
  const [employee, setEmployee] = useState("");
  const [listEmployee, setListEmployee] = useState<any[]>([]);
  const [keySEmployee, setKeySEmployee] = useState("");
  let keySearchCompany = useDebounce(keySCompany, 500);
  let keySearchTerritory = useDebounce(keySTerritory, 500);
  let keySearchCustomer = useDebounce(keySCustomer, 500);
  let keySearchWarehouse = useDebounce(keySWarehouse, 500);
  let keySearchEmployee = useDebounce(keySEmployee, 500);

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
      let rsCustomer: any = await AxiosService.get(
        "/api/method/frappe.desk.search.search_link",
        {
          params: {
            txt: keySearchCustomer,
            doctype: "Customer",
            ignore_user_permissions: 0,
            query: "",
          },
        }
      );

      let { message: results } = rsCustomer;

      setListCustomer(
        results.map((dtCustomer: any) => ({
          value: dtCustomer.value,
          label: dtCustomer.value,
        }))
      );
    })();
  }, [keySearchCustomer]);

  useEffect(() => {
    (async () => {
      let rsWarehouse: any = await AxiosService.get(
        "/api/method/frappe.desk.search.search_link",
        {
          params: {
            txt: keySearchWarehouse,
            doctype: "Warehouse",
            ignore_user_permissions: 0,
            query: "",
          },
        }
      );

      let { message: results } = rsWarehouse;

      setListWarehouse(
        results.map((dtCustomer: any) => ({
          value: dtCustomer.value,
          label: dtCustomer.value,
        }))
      );
    })();
  }, [keySearchWarehouse]);

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
      let rsEmployee: any = await AxiosService.get(
        "/api/method/frappe.desk.search.search_link",
        {
          params: {
            txt: keySearchTerritory,
            doctype: "Employee",
            ignore_user_permissions: 0,
            query: "mbw_dms.api.report.so_report.employee_query",
          },
        }
      );

      let { message: results } = rsEmployee;

      console.log("rsEmployee", results);

      setListEmployee(
        results.map((dtEmployee: any) => ({
          value: dtEmployee.description.split(",")[1].trim(),
          label: dtEmployee.description.split(",")[0].trim(),
        }))
      );
    })();
  }, [keySearchEmployee]);

  useEffect(() => {
    (async () => {
      const rsData = await AxiosService.get(
        "/api/method/mbw_dms.api.report.so_report.si_report",
        {
          params: {
            page_size: PAGE_SIZE,
            page_number: page,
            company: company,
            territory: territory,
            customer: customer,
            from_date: from_date,
            to_date: to_date,
            warehouse: warehouse,
            employee: employee,
          },
        }
      );

      let { result } = rsData;

      setDataSaleOrder(result);
      setTotal(result?.totals);
    })();
  }, [
    page,
    company,
    territory,
    customer,
    from_date,
    to_date,
    warehouse,
    employee,
  ]);

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
        {/* label */}
        <div className="flex justify-start items-center">
          <FormItemCustom
            className="w-[200px] border-none mr-2"
            label={"Công ty"}
          ></FormItemCustom>
          <FormItemCustom
            className="w-[200px] border-none mr-2"
            label={"Khách hàng"}
          ></FormItemCustom>
          <FormItemCustom
            className="w-[200px] border-none mr-2"
            label={"Khu vực"}
          ></FormItemCustom>
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
            <Select
              className="!bg-[#F4F6F8] options:bg-[#F4F6F8]"
              options={listCompany}
              onSelect={(value) => {
                setCompany(value);
              }}
              onSearch={(value: string) => {
                setKeySCompany(value);
              }}
              onClear={() => setCompany("")}
              filterOption={false}
              allowClear
              showSearch
            />
          </FormItemCustom>

          <FormItemCustom className="w-[200px] border-none mr-2">
            <Select
              className="!bg-[#F4F6F8] options:bg-[#F4F6F8]"
              options={listCustomer}
              onSelect={(value) => {
                setCustomer(value);
              }}
              onSearch={(value: string) => {
                setKeySCustomer(value);
              }}
              onClear={() => setCustomer("")}
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

          <FormItemCustom className="w-[200px] border-none mr-2">
            <DatePicker
              format={"DD-MM-YYYY"}
              className="!bg-[#F4F6F8]"
              onChange={onChange}
            />
          </FormItemCustom>

          <FormItemCustom className="w-[200px] border-none mr-2">
            <DatePicker
              format={"DD-MM-YYYY"}
              className="!bg-[#F4F6F8]"
              onChange={onChange1}
            />
          </FormItemCustom>
        </div>
        
        {/* label */}
        <div className="flex justify-start items-center pt-2">
          <FormItemCustom
            className="w-[200px] border-none mr-2"
            label={"Kho"}
          ></FormItemCustom>
          <FormItemCustom
            className="w-[200px] border-none mr-2"
            label={"Nhân viên"}
          ></FormItemCustom>
        </div>

        <div className="flex justify-start items-center h-8 mt-2 pb-5">
          <FormItemCustom className="w-[200px] border-none mr-2">
            <Select
              className="!bg-[#F4F6F8] options:bg-[#F4F6F8]"
              options={listWarehouse}
              onSelect={(value) => {
                setWarehouse(value);
              }}
              onSearch={(value: string) => {
                setKeySWarehouse(value);
              }}
              onClear={() => setWarehouse("")}
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
