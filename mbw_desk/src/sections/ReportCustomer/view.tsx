import { SyncOutlined, VerticalAlignBottomOutlined } from "@ant-design/icons";
import {
  ContentFrame,
  DropDownCustom,
  FormItemCustom,
  HeaderPage,
  SelectCommon,
  TableCustom,
} from "../../components";
import {
  Row,
  Col,
  Button,
  Dropdown,
  Form,
  DatePicker,
  Table,
  InputNumber,
  Select,
  TreeSelect,
  Input,
  message,
} from "antd";
import type { DatePickerProps, TableColumnsType } from "antd";
import { LuFilter, LuFilterX } from "react-icons/lu";
import { useEffect, useRef, useState } from "react";
import { AxiosService } from "../../services/server";
import dayjs from "dayjs";
import { useForm } from "antd/es/form/Form";
import useDebounce from "../../hooks/useDebount";
import { translationUrl, treeArray } from "@/util";
import { rsData, rsDataFrappe } from "@/types/response";
import { listSale } from "@/types/listSale";
import { employee } from "@/types/employeeFilter";
import { useResize } from "@/hooks";
import { TreeSelectCommon } from "@/components/select/select";

interface DataCustomer {
  key: React.Key;
  stt?: string;
  customer_code: string;
  customer_name: string;
  customer_type: string;
  customer_address: string;
  name: string;
}

interface ExpandedDataType {
  key: React.Key;
  stt: string;
  item_code: string;
  item_name: string;
  exp_time: string;
  item_unit: string;
  quantity: string;
  total: string;
  update_at: string;
  update_byname: string;
  item_price: string;
  update_bycode: string;
}

const columns: TableColumnsType<DataCustomer> = [
  {
    title: (
      <div className="relative">
        <span className="absolute -top-[11px] -left-8">STT</span>
      </div>
    ),
    dataIndex: "stt",
    key: "stt",
    render: (_, record, index) => index + 1,
  },
  {
    title: "Mã khách hàng",
    dataIndex: "customer_code",
    key: "customer_code",
  },
  {
    title: "Tên khách hàng",
    dataIndex: "customer_name",
    key: "customer_name",
  },
  {
    title: "Loại khách hàng",
    dataIndex: "customer_type",
    key: "customer_type",
    width: 175,
  },
  {
    title: "Địa chỉ",
    dataIndex: "customer_address",
    key: "customer_address",
  },
];

export default function ReportCustomer() {
  const [dataCustomer, setDataCustomer] = useState<DataCustomer[]>([]);
  const [formFilter] = useForm();
  const [expire_from, setExpireFrom] = useState<number>();
  const [expire_to, setExpireTo] = useState<number>();
  const [update_at_from, setUpdateFrom] = useState<number>();
  const [update_at_to, setUpdateTo] = useState<number>();
  const [qty_inven_from, setInvenFrom] = useState<number>();
  const [qty_inven_to, setInvenTo] = useState<number>();
  const [total_from, setTotalFrom] = useState<number>();
  const [total_to, setTotalTo] = useState<number>();
  const [item, setItem] = useState<any[]>([]);
  const [item_code, setItemCode] = useState("");
  const PAGE_SIZE = 20;
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [keyItem, setKeyItem] = useState("");
  const [unit, setUnit] = useState("");
  const [listUnit, setListUnit] = useState<any[]>([]);
  const [keySUnit, setKeySUnit] = useState("");
  let keySItem = useDebounce(keyItem, 500);
  let keySearchUnit = useDebounce(keySUnit, 500);
  const [listEmployees, setListEmployees] = useState<any[]>([]);
  const [listSales, setListSales] = useState<any[]>([]);
  const [sales_team, setTeamSale] = useState<string>();
  const [keySearch4, setKeySearch4] = useState("");
  const [employee, setEmployee] = useState<string>();
  let seachbykey = useDebounce(keySearch4);
  const [customer, setCustomer] = useState("");
  const [listCustomer, setListCustomer] = useState<any[]>([]);
  const [keySCustomer, setKeySCustomer] = useState("");
  let keySearchCustomer = useDebounce(keySCustomer, 500);
  const containerRef1 = useRef(null);
  const size = useResize();
  const [containerHeight, setContainerHeight] = useState<any>(0);
  const [scrollYTable1, setScrollYTable1] = useState<number>(size?.h * 0.52);
  const [startDate, setStartDate] = useState<any>(null);
  const [endDate, setEndDate] = useState<any>(null);
  const [refresh, setRefresh] = useState<boolean>(false);

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
    const columns: TableColumnsType<ExpandedDataType> = [
      {
        title: <div className="text-center">STT</div>,
        dataIndex: "stt",
        key: "stt",
        width: 60,
        render: (_, record: any, index) => (
          <div className="text-center">{index + 1}</div>
        ),
      },
      {
        title: "Mã sản phẩm",
        dataIndex: "item_code",
        key: "item_code",
        className: "truncate",
      },
      {
        title: "Tên sản phẩm",
        dataIndex: "item_name",
        key: "item_name",
        width: 250,
        className: "truncate",
      },
      {
        title: "Hạn sử dụng",
        dataIndex: "exp_time",
        key: "exp_time",
        render: (value, record: any) => {
          return value ? (
            <p>{dayjs(value * 1000).format("DD/MM/YYYY")}</p>
          ) : (
            <></>
          );
        },
      },
      { title: "Đơn vị tính", dataIndex: "item_unit", key: "item_unit" },
      {
        title: <div className="text-right">Tồn</div>,
        dataIndex: "quantity",
        key: "quantity",
        render: (_, record: any) => (
          <div className="!text-right">{record.quantity}</div>
        ),
      },
      {
        title: <div className="text-right">Giá sản phẩm</div>,
        dataIndex: "item_price",
        key: "item_price",
        render: (_, record: any) => (
          <p className="text-right">
            {Intl.NumberFormat().format(record.item_price)}
          </p>
        ),
      },
      {
        title: <div className="text-right">Tổng giá trị</div>,
        dataIndex: "total",
        key: "total",
        render: (_, record: any) => (
          <p className="text-right">
            {Intl.NumberFormat().format(record.quantity * record.item_price)}
          </p>
        ),
      },
      {
        title: "Ngày cập nhật",
        dataIndex: "update_at",
        key: "update_at",
        render: (value, record: any) => {
          return value ? (
            <p>{dayjs(value * 1000).format("DD/MM/YYYY")}</p>
          ) : (
            <></>
          );
        },
      },
      {
        title: "Người kiểm tồn",
        dataIndex: "update_byname",
        key: "update_byname",
        render: (_, record: any) => (
          <>
            <div>{record.update_byname}</div>
            <div className="font-normal text-sm leading-[21px] text-[#637381]">
              {record.update_bycode}
            </div>
          </>
        ),
      },
    ];
    return (
      <div>
        <Table
          bordered
          columns={columns}
          dataSource={recordTable.items.map((item: ExpandedDataType) => {
            return {
              ...item,
              key: item.item_code,
            };
          })}
          scroll={{ y: 280 }}
          pagination={false}
        />
      </div>
    );
  };

  const onChange1: DatePickerProps["onChange"] = (date) => {
    if (endDate && date && date.isAfter(endDate)) {
      message.error("Từ ngày phải nhỏ hơn hoặc bằng Đến ngày");
    } else {
      setStartDate(date);
    }
  };

  const onChange2: DatePickerProps["onChange"] = (date) => {
    if (startDate && date && date.isBefore(startDate)) {
      message.error("Đến ngày phải lớn hơn hoặc bằng Từ ngày");
    } else {
      setEndDate(date);
    }
  };

  const disabledStartDate = (current: any) => {
    return endDate ? current && current.isAfter(endDate, "day") : false;
  };

  const disabledEndDate = (current: any) => {
    return startDate ? current && current.isBefore(startDate, "day") : false;
  };

  const disabledStartDate1 = (current: any) => {
    return endDate ? current && current.isAfter(endDate, "day") : false;
  };

  const disabledEndDate1 = (current: any) => {
    return startDate ? current && current.isBefore(startDate, "day") : false;
  };

  const handleSearchFilter = (val: any) => {
    if (val.expire_from) {
      let exDateFrom = Date.parse(val.expire_from["$d"]) / 1000;
      setExpireFrom(exDateFrom);
    } else {
      setExpireFrom(undefined);
    }
    if (val.expire_to) {
      let exDateTo = Date.parse(val.expire_to["$d"]) / 1000;
      setExpireTo(exDateTo);
    } else {
      setExpireTo(undefined);
    }
    if (val.qty_inven_from) {
      setInvenFrom(val.qty_inven_from);
    } else {
      setInvenFrom(undefined);
    }
    if (val.qty_inven_to) {
      setInvenTo(val.qty_inven_to);
    } else {
      setInvenTo(undefined);
    }
    if (val.total_from) {
      setTotalFrom(val.total_from);
    } else {
      setTotalFrom(undefined);
    }
    if (val.total_to) {
      setTotalTo(val.total_to);
    } else {
      setTotalTo(undefined);
    }
    if (val.update_at_from) {
      let upDateFrom = Date.parse(val.update_at_from["$d"]) / 1000;
      setUpdateFrom(upDateFrom);
    } else {
      setUpdateFrom(undefined);
    }
    if (val.update_at_to) {
      let upDateTo = Date.parse(val.update_at_to["$d"]) / 1000;
      setUpdateTo(upDateTo);
    } else {
      setUpdateTo(undefined);
    }
  };

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
      let rsItem: any = await AxiosService.get(
        "/api/method/frappe.desk.search.search_link",
        {
          params: {
            txt: keySItem,
            doctype: "Item",
            ignore_user_permissions: 0,
            query: "",
          },
        }
      );

      let { message: results } = rsItem;

      setItem(
        results.map((item: any) => ({
          value: item.value,
          label: item.description.split(",")[0].trim(),
          des: item.value,
        }))
      );
    })();
  }, [keySItem]);

  useEffect(() => {
    (async () => {
      let rsUOM: any = await AxiosService.get(
        "/api/method/frappe.desk.search.search_link",
        {
          params: {
            txt: keySearchUnit,
            doctype: "UOM",
            ignore_user_permissions: 0,
            query: "",
          },
        }
      );

      let { message: results } = rsUOM;

      setListUnit(
        results.map((uom: any) => ({
          value: uom.value,
          label: uom.value,
        }))
      );
    })();
  }, [keySearchUnit]);

  useEffect(() => {
    (async () => {
      const rsReport = await AxiosService.get(
        "/api/method/mbw_dms.api.report.inventory.get_customer_inventory",
        {
          params: {
            expire_from,
            expire_to,
            update_at_from,
            update_at_to,
            qty_inven_from,
            qty_inven_to,
            total_from,
            total_to,
            item_code,
            page_size: PAGE_SIZE,
            page_number: page,
            unit_product: unit,
            employee: employee,
            customer: customer,
          },
        }
      );
      setDataCustomer(rsReport.result);
      setTotal(rsReport?.result?.total);
    })();
    //
  }, [
    expire_from,
    expire_to,
    qty_inven_from,
    qty_inven_to,
    total_from,
    total_to,
    item_code,
    update_at_from,
    update_at_to,
    page,
    unit,
    employee,
    customer,
    refresh
  ]);

  return (
    <>
      <ContentFrame
        header={
          <HeaderPage
            title="Báo cáo tồn kho khách hàng"
            buttons={[
              {
                // label: "Xuất excel",
                icon: <SyncOutlined className="text-xl" />,
                size: "18px",
                className: "flex mr-2 ",
                action: () => {
                  setRefresh((prev) => !prev);
                },
              },
              {
                label: "Xuất dữ liệu",
                type: "primary",
                icon: <VerticalAlignBottomOutlined className="text-xl" />,
                size: "18px",
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
                <Col span={6}>
                  <SelectCommon
                    optionFilterProp="children"
                    filterOption={false}
                    className="custom-select"
                    showSearch
                    onSearch={(value: string) => setKeyItem(value)}
                    onSelect={(value: any) => {
                      setItemCode(value);
                    }}
                    placeholder={<>Tất cả sản phẩm</>}
                    notFoundContent={null}
                    options={item}
                    allowClear
                    onClear={() => setItemCode("")}
                    optionRender={(option) => {
                      return (
                        <>
                          <div className="text-sm">
                            <p
                              role="img"
                              aria-label={option.data.label}
                              className="my-1"
                            >
                              {option.data.label}
                            </p>
                            <span className="text-xs !font-semibold">
                              {option.data.des}
                            </span>
                          </div>
                        </>
                      );
                    }}
                  />
                </Col>

                <Col span={6}>
                  <SelectCommon
                    placeholder="Tất cả đơn vị tính"
                    options={listUnit}
                    showSearch
                    onSelect={(value: any) => {
                      setUnit(value);
                    }}
                    onSearch={(value: string) => {
                      setKeySUnit(value);
                    }}
                    onClear={() => setUnit("")}
                    filterOption={false}
                    allowClear
                  />
                </Col>

                <Col span={6}>
                  <TreeSelectCommon
                    placeholder="Tất cả nhóm bán hàng"
                    allowClear
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

                <Col span={6}>
                  <SelectCommon
                    filterOption={false}
                    notFoundContent={null}
                    allowClear
                    showSearch
                    placeholder="Tất cả người kiểm tồn"
                    onSearch={(value: string) => {
                      setKeySearch4(value);
                    }}
                    options={listEmployees}
                    onSelect={(value) => {
                      setEmployee(value);
                    }}
                    onClear={() => {
                      setEmployee("");
                    }}
                  />
                </Col>

                <Col span={6}>
                  <SelectCommon
                    className="!bg-[#F4F6F8] options:bg-[#F4F6F8]"
                    options={listCustomer}
                    onSelect={(value: any) => {
                      setCustomer(value);
                    }}
                    onSearch={(value: string) => {
                      setKeySCustomer(value);
                    }}
                    showSearch
                    onClear={() => setCustomer("")}
                    filterOption={false}
                    allowClear
                    placeholder="Tất cả khách hàng"
                  />
                </Col>
              </Row>
            </Col>
            <Col className="!ml-4">
              <div className="flex flex-wrap items-center">
                <div className="flex justify-center items-center mr-4">
                  <Dropdown
                    className="!h-8"
                    trigger={["click"]}
                    placement="bottomRight"
                    dropdownRender={() => (
                      <DropDownCustom title={"Bộ lọc"}>
                        <div className="pt-6">
                          <Form form={formFilter} onFinish={handleSearchFilter}>
                            <div className="font-semibold text-sm leading-5 text-[#212B36]">
                              Hạn sử dụng
                            </div>
                            <Row className="pt-1" gutter={16}>
                              <Col span={12}>
                                <span className="font-normal text-sm leading-5 text-[#637381]">
                                  Ngày bắt đầu
                                </span>
                                <FormItemCustom
                                  className="pt-2"
                                  name="expire_from"
                                >
                                  <DatePicker
                                    format={"DD-MM-YYYY"}
                                    className="!bg-[#F4F6F8]"
                                    onChange={onChange1}
                                    disabledDate={disabledStartDate}
                                  />
                                </FormItemCustom>
                              </Col>
                              <Col span={12}>
                                <span className="font-normal text-sm leading-5 text-[#637381]">
                                  Kết thúc
                                </span>
                                <FormItemCustom
                                  className="pt-2"
                                  name="expire_to"
                                >
                                  <DatePicker
                                    format={"DD-MM-YYYY"}
                                    className="!bg-[#F4F6F8]"
                                    onChange={onChange2}
                                    disabledDate={disabledEndDate}
                                  />
                                </FormItemCustom>
                              </Col>
                            </Row>

                            <div className="pt-5 font-semibold text-sm leading-5 text-[#212B36]">
                              Ngày cập nhật
                            </div>
                            <Row className="pt-1" gutter={16}>
                              <Col span={12}>
                                <span className="font-normal text-sm leading-5 text-[#637381]">
                                  Ngày bắt đầu
                                </span>
                                <FormItemCustom
                                  name="update_at_from"
                                  className="pt-2"
                                >
                                  <DatePicker
                                    format={"DD-MM-YYYY"}
                                    className="!bg-[#F4F6F8]"
                                    onChange={onChange1}
                                    disabledDate={disabledStartDate1}
                                  />
                                </FormItemCustom>
                              </Col>
                              <Col span={12}>
                                <span className="font-normal text-sm leading-5 text-[#637381]">
                                  Kết thúc
                                </span>
                                <FormItemCustom
                                  name="update_at_to"
                                  className="pt-2"
                                >
                                  <DatePicker
                                    format={"DD-MM-YYYY"}
                                    className="!bg-[#F4F6F8]"
                                    onChange={onChange2}
                                    disabledDate={disabledEndDate1}
                                  />
                                </FormItemCustom>
                              </Col>
                            </Row>

                            <div className="pt-5 font-semibold text-sm leading-5 text-[#212B36]">
                              Số lượng tồn kho
                            </div>
                            <Row className="pt-1" gutter={16}>
                              <Col span={12}>
                                <span className="font-normal text-sm leading-5 text-[#637381]">
                                  Từ
                                </span>
                                <FormItemCustom
                                  className="pt-2"
                                  name="qty_inven_from"
                                >
                                  <InputNumber
                                    controls={false}
                                    className="w-full"
                                    placeholder="0"
                                  />
                                </FormItemCustom>
                              </Col>
                              <Col span={12}>
                                <span className="font-normal text-sm leading-5 text-[#637381]">
                                  Đến
                                </span>
                                <FormItemCustom
                                  className="pt-2"
                                  name="qty_inven_to"
                                >
                                  <InputNumber
                                    controls={false}
                                    className="w-full"
                                    placeholder="0"
                                  />
                                </FormItemCustom>
                              </Col>
                            </Row>

                            <div className="pt-5 font-semibold text-sm leading-5 text-[#212B36]">
                              Tổng giá trị
                            </div>
                            <Row className="pt-1" gutter={16}>
                              <Col span={12}>
                                <span className="font-normal text-sm leading-5 text-[#637381]">
                                  Từ
                                </span>
                                <FormItemCustom
                                  className="pt-2"
                                  name="total_from"
                                >
                                  <InputNumber
                                    controls={false}
                                    className="!bg-[#F5F7FA] w-full"
                                    placeholder="0"
                                    formatter={value => value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    suffix="VND"
                                  />
                                </FormItemCustom>
                              </Col>
                              <Col span={12}>
                                <span className="font-normal text-sm leading-5 text-[#637381]">
                                  Đến
                                </span>
                                <FormItemCustom
                                  className="pt-2"
                                  name="total_to"
                                >
                                  <InputNumber
                                    controls={false}
                                    className="!bg-[#F5F7FA] w-full"
                                    placeholder="0"
                                    formatter={value => value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    suffix="VND"
                                  />
                                </FormItemCustom>
                              </Col>
                            </Row>
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
                          </Form>
                        </div>
                      </DropDownCustom>
                    )}
                  >
                    <Button
                      onClick={(e: any) => e.preventDefault()}
                      className="flex items-center text-nowrap !text-[13px] !leading-[21px] !font-normal  border-r-[0.1px] rounded-r-none !h-8"
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
              columns={columns}
              scroll={{
                x: true,
                y: containerHeight < 300 ? undefined : scrollYTable1,
              }}
              bordered
              $border
              expandable={{ expandedRowRender, defaultExpandedRowKeys: ["0"] }}
              dataSource={dataCustomer?.data?.map((dataCus: DataCustomer) => {
                return {
                  ...dataCus,
                  key: dataCus.name,
                };
              })}
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
              rowHoverable={false}
            />
          </div>
          <div className=""></div>
        </div>
      </ContentFrame>
    </>
  );
}
