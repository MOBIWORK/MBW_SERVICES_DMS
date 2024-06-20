import { VerticalAlignBottomOutlined } from "@ant-design/icons";
import {
  ContentFrame,
  DropDownCustom,
  FormItemCustom,
  HeaderPage,
  TableCustom,
} from "../../components";
import {
  Button,
  Col,
  DatePicker,
  Dropdown,
  Form,
  Row,
  Select,
  Table,
  TreeSelect,
  message,
} from "antd";
import type { TableColumnsType } from "antd";
import { useEffect, useRef, useState } from "react";
import { AxiosService } from "../../services/server";
import dayjs from "dayjs";
import useDebounce from "../../hooks/useDebount";
import { DatePickerProps } from "antd/lib";
import { translationUrl, treeArray } from "@/util";
import { employee } from "@/types/employeeFilter";
import { rsData, rsDataFrappe } from "@/types/response";
import { listSale } from "@/types/listSale";
import { useForm } from "antd/es/form/Form";
import { LuFilter, LuFilterX } from "react-icons/lu";
import { useResize } from "@/hooks";
import { SelectCommon, TreeSelectCommon } from "@/components/select/select";

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

const startOfMonth: any = dayjs().startOf("month");
const endOfMonth: any = dayjs().endOf("month");
let start = Date.parse(startOfMonth["$d"]) / 1000;
let end = Date.parse(endOfMonth["$d"]) / 1000;

const columns: TableColumnsType<DataSaleOrder> = [
  {
    title: (
      <div className="relative">
        <span className="absolute -top-[11px] -left-8">STT</span>
      </div>
    ),
    dataIndex: "stt",
    key: "stt",
    render: (_, record: any, index) => index + 1,
  },
  {
    title: "Đơn đặt",
    dataIndex: "name",
    key: "name",
    render: (_, record: any) => (
      <div>
        <a
          className="text-[#212B36]"
          href={`/app/sales-order/${record.name}`}
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
    render: (_, record: any) => <div>{record.customer}</div>,
  },
  {
    title: "Khu vực",
    dataIndex: "territory",
    key: "territory",
    render: (_, record: any) => <div>{record.territory}</div>,
  },
  {
    title: "Kho",
    dataIndex: "set_warehouse",
    key: "set_warehouse",
  },
  {
    title: "Ngày tạo",
    dataIndex: "transaction_date",
    key: "transaction_date",
    render: (value) => {
      return value ? <p>{dayjs(value * 1000).format("DD/MM/YYYY")}</p> : <></>;
    },
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
    title: <div className="text-right">Thành tiền (VNĐ)</div>,
    dataIndex: "total",
    key: "total",
    width: 160,
    render: (_, record: any) => (
      <div className="!text-right">
        {Intl.NumberFormat().format(record.total)}
      </div>
    ),
  },
  {
    title: <div className="text-right">Tiền VAT (VNĐ)</div>,
    dataIndex: "tax_amount",
    key: "tax_amount",
    width: 160,
    render: (_, record: any) => (
      <div className="!text-right">
        {Intl.NumberFormat().format(record.tax_amount)}
      </div>
    ),
  },
  {
    title: <div className="text-right">Chiết khấu (VNĐ)</div>,
    dataIndex: "discount_amount",
    key: "discount_amount",
    width: 160,
    render: (_, record: any) => (
      <div className="!text-right">
        {Intl.NumberFormat().format(record.discount_amount)}
      </div>
    ),
  },
  {
    title: <div className="text-right">Tổng tiền (VNĐ)</div>,
    dataIndex: "grand_total",
    key: "grand_total",
    width: 160,
    render: (_, record: any) => (
      <div className="!text-right">
        {Intl.NumberFormat().format(record.grand_total)}
      </div>
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
  const [territory, setTerritory] = useState("");
  const [listTerritory, setListTerritory] = useState<any[]>([]);
  const [keySTerritory, setKeySTerritory] = useState("");
  const [customer, setCustomer] = useState("");
  const [listCustomer, setListCustomer] = useState<any[]>([]);
  const [keySCustomer, setKeySCustomer] = useState("");
  const [from_date, setFromDate] = useState<any>(start);
  const [to_date, setToDate] = useState<any>(end);
  const [warehouse, setWarehouse] = useState("");
  const [formFilter] = useForm();
  const [listWarehouse, setListWarehouse] = useState<any[]>([]);
  const [keySWarehouse, setKeySWarehouse] = useState("");
  const [employee, setEmployee] = useState("");
  const [listEmployees, setListEmployees] = useState<any[]>([]);
  const [listSales, setListSales] = useState<any[]>([]);
  const [sales_team, setTeamSale] = useState<string>();
  let keySearchCompany = useDebounce(keySCompany, 500);
  let keySearchTerritory = useDebounce(keySTerritory, 500);
  let keySearchCustomer = useDebounce(keySCustomer, 500);
  let keySearchWarehouse = useDebounce(keySWarehouse, 500);
  const [keySearch4, setKeySearch4] = useState("");
  let seachbykey = useDebounce(keySearch4);
  const containerRef1 = useRef(null);
  const size = useResize();
  const [containerHeight, setContainerHeight] = useState<any>(0);
  const [scrollYTable1, setScrollYTable1] = useState<number>(size?.h * 0.52);

  useEffect(() => {
    setScrollYTable1(size.h * 0.52);
  }, [size]);

  useEffect(() => {
    const containerElement = containerRef1.current;
    if (containerElement) {
      const resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
          setContainerHeight(entry.contentRect.height);
        }
      });
      resizeObserver.observe(containerElement);
      return () => resizeObserver.disconnect();
    }
  }, [containerRef1]);

  const expandedRowRender = (recordTable: any) => {
    const columns: TableColumnsType<DataItem> = [
      {
        title: "STT",
        dataIndex: "stt",
        key: "stt",
        render: (_, record: any, index) => (
          <div className="text-center">{index + 1}</div>
        ),
      },
      { title: "Mã sản phẩm", dataIndex: "item_code", key: "item_code" },
      { title: "Tên sản phẩm", dataIndex: "item_name", key: "item_name" },
      { title: "Nhóm sản phẩm", dataIndex: "item_group", key: "item_group" },
      { title: "Nhãn hàng", dataIndex: "brand", key: "brand" },
      {
        title: <div className="text-right">Đơn giá</div>,
        dataIndex: "rate",
        key: "rate",
        render: (_, record: any) => (
          <div className="!text-right">
            {Intl.NumberFormat().format(record.rate)}
          </div>
        ),
      },
      {
        title: <div className="text-right">Số lượng</div>,
        dataIndex: "qty",
        key: "qty",
        render: (_, record: any) => (
          <div className="!text-right">{record.qty}</div>
        ),
      },
      {
        title: <div className="text-right">Chiết khấu (%)</div>,
        dataIndex: "discount_percentage",
        key: "discount_percentage",
        render: (_, record: any) => (
          <div className="!text-right">
            {Intl.NumberFormat().format(record.discount_percentage)}
          </div>
        ),
      },
      {
        title: <div className="text-right">Tiền chiết khấu</div>,
        dataIndex: "discount_amount",
        key: "discount_amount",
        render: (_, record: any) => (
          <div className="!text-right">
            {Intl.NumberFormat().format(record.discount_amount)}
          </div>
        ),
      },
      {
        title: <div className="text-right">Tổng tiền (VNĐ)</div>,
        dataIndex: "amount",
        key: "amount",
        render: (_, record: any) => (
          <div className="!text-right">
            {Intl.NumberFormat().format(record.amount)}
          </div>
        ),
      },
    ];
    return (
      <Table
        bordered
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
      let rsSales: rsData<listSale[]> = await AxiosService.get(
        "/api/method/mbw_dms.api.router.get_team_sale"
      );

      setListSales(
        treeArray({
          data: rsSales.result.map((team_sale: listSale) => ({
            title: team_sale.name,
            value: team_sale.name,
            ...team_sale,
          })),
          keyValue: "value",
          parentField: "parent_sales_person",
        })
      );
    })();
  }, []);
  useEffect(() => {
    (async () => {
      let rsEmployee: rsDataFrappe<employee[]> = await AxiosService.get(
        "/api/method/mbw_dms.api.router.get_sale_person",
        {
          params: {
            team_sale: sales_team,
            key_search: seachbykey,
          },
        }
      );
      let { message: results } = rsEmployee;
      setListEmployees(
        results.map((employee_filter: employee) => ({
          value: employee_filter.employee_code,
          label: employee_filter.employee_name || employee_filter.employee_code,
        }))
      );
    })();
  }, [sales_team, seachbykey]);

  useEffect(() => {
    (async () => {
      const rsData = await AxiosService.get(
        "/api/method/mbw_dms.api.report.so_report.so_report",
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
    } else if (
      endOfMonth &&
      dateString &&
      dateString.isAfter(endOfMonth, "day")
    ) {
      message.error("Từ ngày phải nhỏ hơn hoặc bằng Đến ngày");
    } else {
      let fDate = Date.parse(dateString["$d"]) / 1000;
      setFromDate(fDate);
    }
  };

  const onChange1: DatePickerProps["onChange"] = (dateString: any) => {
    if (dateString === null || dateString === undefined) {
      setToDate("");
    } else if (
      startOfMonth &&
      dateString &&
      dateString.isBefore(startOfMonth, "day")
    ) {
      message.error("Đến ngày phải lớn hơn hoặc bằng Từ ngày");
    } else {
      let tDate = Date.parse(dateString["$d"]) / 1000;
      setToDate(tDate);
    }
  };

  const handleSearchFilter = (val: any) => {
    if (val.company) {
      setCompany(val.company);
    } else {
      setCompany("");
    }
    if (val.customer) {
      setCustomer(val.customer);
    } else {
      setCustomer("");
    }
    if (val.territory) {
      setTerritory(val.territory);
    } else {
      setTerritory("");
    }
    if (val.warehouse) {
      setWarehouse(val.warehouse);
    } else {
      setWarehouse("");
    }
  };

  return (
    <>
      <ContentFrame
        header={
          <HeaderPage
            title="Báo cáo tổng hợp đặt hàng"
            buttons={[
              {
                label: "Xuất dữ liệu",
                type: "primary",
                icon: <VerticalAlignBottomOutlined className="text-xl" />,
                size: "20px",
                className: "flex items-center",
                action: () => {
                  translationUrl("/app/data-export/Data%20Export");
                },
              },
            ]}
          />
        }
      >
        <div className="bg-white rounded-2xl pt-4 pb-7 border-[#DFE3E8] border-[0.2px] border-solid">
          <Row gutter={[16, 16]} className="justify-between items-end w-full">
            <Col className="ml-4">
              <Row gutter={[8, 8]}>
                <Col span={5}>
                  <DatePicker
                    format={"DD-MM-YYYY"}
                    className="!bg-[#F4F6F8] w-full rounded-lg h-7"
                    placeholder="Từ ngày"
                    onChange={onChange}
                    defaultValue={startOfMonth}
                  />
                </Col>
                <Col span={5}>
                  <DatePicker
                    format={"DD-MM-YYYY"}
                    className="!bg-[#F4F6F8] w-full rounded-lg h-7"
                    onChange={onChange1}
                    placeholder="Đến ngày"
                    defaultValue={endOfMonth}
                  />
                </Col>
                <Col span={7}>
                  <TreeSelectCommon
                    placeholder="Tất cả nhóm bán hàng"
                    allowClear
                    showSearch
                    treeData={listSales}
                    onChange={(value: string) => {
                      setTeamSale(value);
                    }}
                    dropdownStyle={{
                      maxHeight: 400,
                      overflow: "auto",
                      minWidth: 350,
                    }}
                  />
                </Col>
                <Col span={7}>
                  <SelectCommon
                    filterOption={false}
                    notFoundContent={null}
                    allowClear
                    showSearch
                    placeholder="Tất cả nhân viên"
                    onSearch={(value: string) => {
                      setKeySearch4(value);
                    }}
                    options={listEmployees}
                    onSelect={(value: any) => {
                      setEmployee(value);
                    }}
                    onClear={() => {
                      setEmployee("");
                    }}
                  />
                </Col>
              </Row>
            </Col>
            <Col className="!ml-4">
              <div className="flex flex-wrap items-center">
                <div className="flex justify-center items-center mr-4">
                  <Dropdown
                    className="!h-8"
                    placement="bottomRight"
                    trigger={["click"]}
                    dropdownRender={() => (
                      <DropDownCustom title={"Bộ lọc"}>
                        <div className="">
                          <Form
                            layout="vertical"
                            form={formFilter}
                            onFinish={handleSearchFilter}
                          >
                            <Form.Item
                              name="company"
                              label={"Công ty"}
                              className="w-[468px] border-none"
                            >
                              <SelectCommon
                                showSearch
                                className="!bg-[#F4F6F8] options:bg-[#F4F6F8]"
                                options={listCompany}
                                allowClear
                                onSearch={(value: string) => {
                                  setKeySCompany(value);
                                }}
                                placeholder="Tất cả công ty"
                              />
                            </Form.Item>

                            <Form.Item
                              name="customer"
                              label={"Khách hàng"}
                              className="w-[468px] border-none"
                            >
                              <SelectCommon
                                showSearch
                                className="!bg-[#F4F6F8] options:bg-[#F4F6F8]"
                                options={listCustomer}
                                filterOption={false}
                                allowClear
                                onSearch={(value: string) => {
                                  setKeySCustomer(value);
                                }}
                                placeholder="Tất cả khách hàng"
                              />
                            </Form.Item>

                            <Form.Item
                              name="territory"
                              label={"Khu vực"}
                              className="w-[468px] border-none"
                            >
                              <SelectCommon
                                showSearch
                                className="!bg-[#F4F6F8] options:bg-[#F4F6F8]"
                                options={listTerritory}
                                allowClear
                                onSearch={(value: string) => {
                                  setKeySTerritory(value);
                                }}
                                placeholder="Tất cẩ khu vực"
                              />
                            </Form.Item>

                            <Form.Item
                              name="warehouse"
                              label={"Kho"}
                              className="w-[468px] border-none"
                            >
                              <SelectCommon
                                showSearch
                                className="!bg-[#F4F6F8] options:bg-[#F4F6F8]"
                                options={listWarehouse}
                                allowClear
                                onSearch={(value: string) => {
                                  setKeySWarehouse(value);
                                }}
                                placeholder="Tất cả kho"
                              />
                            </Form.Item>
                          </Form>
                        </div>
                        <Row className="justify-between pt-6 pb-4">
                          <div></div>
                          <div>
                            <Button
                              className="mr-3"
                              onClick={(ev: any) => {
                                ev.preventDefault();
                                formFilter.resetFields();
                              }}
                            >
                              Đặt lại
                            </Button>
                            <Button
                              type="primary"
                              onClick={() => {
                                formFilter.submit();
                              }}
                            >
                              Áp dụng
                            </Button>
                          </div>
                        </Row>
                      </DropDownCustom>
                    )}
                  >
                    <Button
                      onClick={(e: any) => e.preventDefault()}
                      className="flex items-center text-nowrap !text-[13px] !leading-[21px] !font-normal  border-r-[0.1px] rounded-r-none h-8"
                      icon={<LuFilter style={{ fontSize: "20px" }} />}
                    >
                      Bộ lọc
                    </Button>
                  </Dropdown>
                  <Button className="border-l-[0.1px] rounded-l-none !h-8">
                    <LuFilterX style={{ fontSize: "20px" }} />
                  </Button>
                </div>
              </div>
            </Col>
          </Row>

          <div ref={containerRef1} className="pt-5">
            <TableCustom
              dataSource={dataSaleOrder?.data?.map(
                (dataSale: DataSaleOrder) => {
                  return {
                    ...dataSale,
                    key: dataSale.name,
                  };
                }
              )}
              expandable={{ expandedRowRender, defaultExpandedRowKeys: ["0"] }}
              bordered
              $border
              columns={columns}
              scroll={{
                x: true,
                y: containerHeight < 380 ? undefined : scrollYTable1,
              }}
              pagination={
                total && total > PAGE_SIZE
                  ? {
                      pageSize: PAGE_SIZE,
                      showSizeChanger: false,
                      total,
                      current: page,
                      onChange(page) {
                        setPage(page);
                      },
                    }
                  : false
              }
              summary={() => {
                return (
                  <Table.Summary.Row>
                    <Table.Summary.Cell
                      index={0}
                      className="!border-r-0"
                    ></Table.Summary.Cell>
                    <Table.Summary.Cell index={1}></Table.Summary.Cell>
                    <Table.Summary.Cell index={2}>Tổng</Table.Summary.Cell>
                    <Table.Summary.Cell index={3}></Table.Summary.Cell>
                    <Table.Summary.Cell index={4}></Table.Summary.Cell>
                    <Table.Summary.Cell index={5}></Table.Summary.Cell>
                    <Table.Summary.Cell index={6}></Table.Summary.Cell>
                    <Table.Summary.Cell index={7}></Table.Summary.Cell>
                    <Table.Summary.Cell index={8}>
                      <div className="text-right">
                        {Intl.NumberFormat().format(
                          dataSaleOrder?.sum?.sum_total
                        )}
                      </div>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={9}>
                      <div className="text-right">
                        {Intl.NumberFormat().format(
                          dataSaleOrder?.sum?.sum_vat
                        )}
                      </div>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={10}>
                      <div className="text-right">
                        {Intl.NumberFormat().format(
                          dataSaleOrder?.sum?.sum_discount_amount
                        )}
                      </div>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={11}>
                      <div className="text-right">
                        {Intl.NumberFormat().format(
                          dataSaleOrder?.sum?.sum_grand_total
                        )}
                      </div>
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                );
              }}
            />
          </div>
        </div>
      </ContentFrame>
    </>
  );
}
