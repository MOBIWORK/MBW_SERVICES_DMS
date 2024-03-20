import { VerticalAlignBottomOutlined } from "@ant-design/icons";
import {
  DropDownCustom,
  FormItemCustom,
  HeaderPage,
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
} from "antd";
import type { DatePickerProps, TableColumnsType } from "antd";
import { LuFilter, LuFilterX } from "react-icons/lu";
import { useEffect, useState } from "react";
import { AxiosService } from "../../services/server";
import dayjs from "dayjs";
import { useForm } from "antd/es/form/Form";
import useDebounce from "../../hooks/useDebount";

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
    title: "STT",
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
  const onChange: DatePickerProps["onChange"] = (dateString: any) => {
    console.log(dateString);
  };
  const PAGE_SIZE = 20;
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [keyItem, setKeyItem] = useState("");
  const [unit, setUnit] = useState("");
  const [listUnit, setListUnit] = useState<any[]>([]);
  const [keySUnit, setKeySUnit] = useState("");
  let keySItem = useDebounce(keyItem, 500);
  let keySearchUnit = useDebounce(keySUnit, 500);
  const expandedRowRender = (recordTable: any) => {
    const columns: TableColumnsType<ExpandedDataType> = [
      {
        title: "STT",
        dataIndex: "stt",
        key: "stt",
        render: (_, record: any, index) => index + 1,
      },
      { title: "Mã sản phẩm", dataIndex: "item_code", key: "item_code" },
      { title: "Tên sản phẩm", dataIndex: "item_name", key: "item_name" },
      {
        title: "Hạn sử dụng",
        dataIndex: "exp_time",
        key: "exp_time",
        render: (_, record: any) => (
          <p>{dayjs(record.exp_time * 1000).format("DD/MM/YYYY")}</p>
        ),
      },
      { title: "Đơn vị tính", dataIndex: "item_unit", key: "item_unit" },
      { title: "Tồn", dataIndex: "quantity", key: "quantity" },
      {
        title: "Giá sản phẩm",
        dataIndex: "item_price",
        key: "item_price",
        render: (_, record: any) => (
          <p>{Intl.NumberFormat().format(record.item_price)}</p>
        ),
      },
      {
        title: "Tổng giá trị",
        dataIndex: "total",
        key: "total",
        render: (_, record: any) => (
          <p>
            {Intl.NumberFormat().format(record.quantity * record.item_price)}
          </p>
        ),
      },
      {
        title: "Ngày cập nhật",
        dataIndex: "update_at",
        key: "update_at",
        render: (_, record: any) => (
          <p>{dayjs(record.update_at * 1000).format("DD/MM/YYYY")}</p>
        ),
      },
      {
        title: "Người cập nhật",
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
      <Table
        columns={columns}
        dataSource={recordTable.items.map((item: ExpandedDataType) => {
          return {
            ...item,
            key: item.item_code,
          };
        })}
        pagination={false}
      />
    );
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
            unit_product: unit
          },
        }
      );
      console.log("ddd", rsReport);

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
    unit
  ]);

  return (
    <>
      <HeaderPage
        title="Báo cáo tồn kho khách hàng"
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
      <div className="bg-white rounded-xl pt-4 border-[#DFE3E8] border-[0.2px] border-solid">
        <Row className="justify-between items-center w-full">
          <Col span={14}>
            <Row gutter={8}>
              <Col className="mx-4 w-full" span={24}>
                <div className="flex justify-start items-center ">
                  <FormItemCustom
                    className="!w-[200px] border-none mr-2"
                    label={"Sản phẩm"}
                  ></FormItemCustom>
                  <FormItemCustom
                    className="w-[200px] border-none mr-2"
                    label={"Đơn vị tính"}
                  ></FormItemCustom>
                </div>
              </Col>
              <Col className="mx-4 w-full" span={24}>
                <div className="flex justify-start items-center">
                  <FormItemCustom className="!w-[200px] border-none mr-2">
                    <Select
                      filterOption={false}
                      showSearch
                      notFoundContent={null}
                      onSearch={(value: string) => setKeyItem(value)}
                      options={item}
                      onSelect={(value) => {
                        setItemCode(value);
                      }}
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
                  </FormItemCustom>

                  <FormItemCustom className="!w-[200px] border-none mr-2">
                    <Select
                      className="!bg-[#F4F6F8] options:bg-[#F4F6F8]"
                      options={listUnit}
                      onSelect={(value) => {
                        setUnit(value);
                      }}
                      onSearch={(value: string) => {
                        setKeySUnit(value);
                      }}
                      onClear={() => setUnit("")}
                      filterOption={false}
                      allowClear
                      showSearch
                    />
                  </FormItemCustom>
                </div>
              </Col>
            </Row>
          </Col>
          <Col className="mr-5">
            <div className="flex flex-wrap items-center">
              <div className="flex justify-center items-center mr-4">
                <Dropdown
                  placement="bottomRight"
                  // trigger={["click"]}
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
                                  onChange={onChange}
                                />
                              </FormItemCustom>
                            </Col>
                            <Col span={12}>
                              <span className="font-normal text-sm leading-5 text-[#637381]">
                                Kết thúc
                              </span>
                              <FormItemCustom className="pt-2" name="expire_to">
                                <DatePicker
                                  format={"DD-MM-YYYY"}
                                  className="!bg-[#F4F6F8]"
                                  onChange={onChange}
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
                                  onChange={onChange}
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
                                  onChange={onChange}
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
                                  suffix="VND"
                                />
                              </FormItemCustom>
                            </Col>
                            <Col span={12}>
                              <span className="font-normal text-sm leading-5 text-[#637381]">
                                Đến
                              </span>
                              <FormItemCustom className="pt-2" name="total_to">
                                <InputNumber
                                  controls={false}
                                  className="!bg-[#F5F7FA] w-full"
                                  placeholder="0"
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
                    className="flex items-center text-nowrap !text-[13px] !leading-[21px] !font-normal  border-r-[0.1px] rounded-r-none h-9"
                    icon={<LuFilter style={{ fontSize: "20px" }} />}
                  >
                    Bộ lọc
                  </Button>
                </Dropdown>
                <Button className="border-l-[0.1px] rounded-l-none h-9">
                  <LuFilterX style={{ fontSize: "20px" }} />
                </Button>
              </div>
            </div>
          </Col>
        </Row>

        <div className="p-4">
          <TableCustom
            columns={columns}
            expandable={{ expandedRowRender, defaultExpandedRowKeys: ["0"] }}
            dataSource={dataCustomer?.data?.map((dataCus: DataCustomer) => {
              return {
                ...dataCus,
                key: dataCus.name,
              };
            })}
            pagination={{
              defaultPageSize: PAGE_SIZE,
              total,
              onChange(page) {
                setPage(page);
              },
            }}
          />
        </div>
      </div>
    </>
  );
}
