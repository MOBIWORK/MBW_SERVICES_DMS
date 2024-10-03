import { SyncOutlined, VerticalAlignBottomOutlined } from "@ant-design/icons";
import {
  ContentFrame,
  DropDownCustom,
  HeaderPage,
  SelectCommon,
  TableCustom,
} from "../../components";
import {
  Button,
  Col,
  DatePicker,
  Dropdown,
  Form,
  message,
  Modal,
  Row,
  Table,
} from "antd";
import { DatePickerProps, TableColumnsType } from "antd/lib";
import { useEffect, useRef, useState } from "react";
import useDebounce from "../../hooks/useDebount";
import { rsData, rsDataFrappe } from "../../types/response";
import { AxiosService } from "../../services/server";
import { employee } from "../../types/employeeFilter";
import { handleDowload, treeArray } from "@/util";
import { listSale } from "@/types/listSale";
import dayjs from "dayjs";
import { TreeSelectCommon } from "@/components/select/select";
import { TrueCheck } from "@/icons/true-check";
import { FalseCheck } from "@/icons/false-check";
import { typecustomer } from "../ReportSales/data";
import { useForm } from "antd/es/form/Form";
import { LuFilter, LuFilterX } from "react-icons/lu";
import { useResize } from "@/hooks";
import { ModalDetail } from "./components/ModalCheckin";
import Detailmodal from "./Detailmodal";

const startOfMonth: any = dayjs().startOf("month");
const endOfMonth: any = dayjs().endOf("month");
let start = Date.parse(startOfMonth["$d"]) / 1000;
let end = Date.parse(endOfMonth["$d"]) / 1000;

export default function ReportCheckin() {
  const columnsCheckin: any = [
    {
      title: (
        <div className="relative">
          <span className="absolute -top-[11px] -left-8">STT</span>
        </div>
      ),
      dataIndex: "stt",
      key: "stt",
      width: 60,
      render: (_: any, __: any, index: number) => (
        <span>{calculateIndex(page, PAGE_SIZE, index)}</span> // Tính toán index cho từng dòng
      ),
    },
    {
      title: "Mã nhân viên",
      dataIndex: "employee_code",
      key: "employee_code",
    },
    {
      title: "Tên nhân viên",
      dataIndex: "employee_name",
      key: "employee_name",
    },
    {
      title: "Nhóm bán hàng",
      dataIndex: "sale_group",
      key: "sale_group",
      width: 200,
    },
    {
      title: "Ngày",
      dataIndex: "create_time",
      key: "create_time",
      render: (value: any) => <div>{dayjs.unix(value).format("DD/MM/YYYY")}</div>,
    },
    {
      title: "Thứ",
      dataIndex: "create_time",
      key: "create_time",
      render: (value: any) => <div>{dayjs.unix(value).format("dddd")}</div>,
    },
    {
      title: "Giờ làm",
      className: "!text-center",
      dataIndex: "total_work",
      key: "total_work",
      render: (value: any) => (
        <div className="!text-center">{parseFloat((value / 60).toFixed(2))}</div>
      ),
    },
    {
      title: "Giờ viếng thăm",
      dataIndex: "total_time",
      className: "!text-center",
      key: "total_time",
      render: (value: any) => (
        <div className="!text-center">{parseFloat((value / 60).toFixed(2))}</div>
      ),
    },
    {
      title: "Số km tự động (km)",
      dataIndex: "kmauto",
      className: "!text-center",
      key: "kmauto",
      render: (value: any) => (
        <div className="!text-center">
          {value ? value : <div className="min-w-[50px]">-</div>}
        </div>
      ),
    },
    {
      title: "Số km di chuyển (km)",
      className: "!text-center",
      dataIndex: "kmmove",
      key: "kmmove",
      render: (value: any) => (
        <div className="!text-center">
          {value ? value : <div className="min-w-[50px]">-</div>}
        </div>
      ),
    },
    {
      title: "Vận tốc (km/h)",
      dataIndex: "speed",
      className: "!text-center",
      key: "kmmove",
      render: (value: any) => (
        <div className="!text-center">
          {value ? value : <div className="min-w-[50px]">-</div>}
        </div>
      ),
    },
  ];
  const [dataCheckin, setDataCheckin] = useState<any>([]);
  const [total, setTotal] = useState<number>(0);
  const PAGE_SIZE = 20;
  const [page, setPage] = useState<number>(1);
  const [listEmployees, setListEmployees] = useState<any[]>([]);
  const [listSales, setListSales] = useState<any[]>([]);
  const [sales_team, setTeamSale] = useState<string>();
  const [formFilter] = useForm();
  const [keySearch4, setKeySearch4] = useState("");
  const [employee, setEmployee] = useState<string>();
  const [from_date, setFromDate] = useState<any>(start);
  const [to_date, setToDate] = useState<any>(end);
  let seachbykey = useDebounce(keySearch4);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [customer_type, setCustomerType] = useState("");
  const [listCustomerGroup, setListCustomerGroup] = useState<any[]>([]);
  const [customer_group, setCustomerGroup] = useState("");
  const [keySCustomerGroup, setKeySCustomerGroup] = useState("");
  let keySearchCustomerGroup = useDebounce(keySCustomerGroup, 500);
  const [territory, setTerritory] = useState("");
  const [listTerritory, setListTerritory] = useState<any[]>([]);
  const [keySTerritory, setKeySTerritory] = useState("");
  let keySearchTerritory = useDebounce(keySTerritory, 500);
  const containerRef1 = useRef(null);
  const size = useResize();
  const [containerHeight, setContainerHeight] = useState<any>(0);
  const [scrollYTable1, setScrollYTable1] = useState<number>(size?.h * 0.52);
  const calculateIndex = (
    pageNumber: number,
    pageSize: number,
    index: number
  ) => {
    return (pageNumber - 1) * pageSize + index + 1;
  };

  const [modal, setModal] = useState<{
    open: boolean;
    id: any;
  }>({
    open: false,
    id: null,
  });

  const closeModal = () => {
    setModal({
      open: false,
      id: null,
    });
  };

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

  const onChange: DatePickerProps["onChange"] = (dateString: any) => {
    if (dateString === null || dateString === undefined) {
      setFromDate("");
    } else if (
      to_date &&
      dateString &&
      dateString.isAfter(dayjs.unix(to_date), "day")
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
      from_date &&
      dateString &&
      dateString.isBefore(dayjs.unix(from_date), "day")
    ) {
      message.error("Đến ngày phải lớn hơn hoặc bằng Từ ngày");
    } else {
      let tDate = Date.parse(dateString["$d"]) / 1000;
      setToDate(tDate);
    }
  };

  const disabledStartDate = (current: any) => {
    return to_date
      ? current && current.isAfter(dayjs.unix(to_date), "day")
      : false;
  };

  const disabledEndDate = (current: any) => {
    return from_date
      ? current && current.isBefore(dayjs.unix(from_date), "day")
      : false;
  };

  const handleSearchFilter = (val: any) => {
    if (val.customergroup) {
      setCustomerGroup(val.customergroup);
    } else {
      setCustomerGroup("");
    }
    if (val.customertype) {
      setCustomerType(val.customertype);
    } else {
      setCustomerType("");
    }
    if (val.territory) {
      setTerritory(val.territory);
    } else {
      setTerritory("");
    }
    setPage(1);
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

  const expandedRowRender = (recordTable: any) => {
    const columns: TableColumnsType<any> = [
      {
        title: "Khách hàng",
        dataIndex: "customer",
        key: "customer",
        render: (_, record) => (
          <div>
            <div>{record.customer_name}</div>
            <div className="text-[#637381]">{record.customer_code}</div>
          </div>
        ),
      },
      {
        title: "Địa chỉ",
        dataIndex: "customer_address",
        key: "customer_address",
        width: 200,
        render: (_, record) => (
          <div className="truncate">{record.customer_address}</div>
        ),
      },
      {
        title: "Loại hình khách hàng",
        dataIndex: "customer_type",
        key: "customer_type",
        width: 200,
        render: (_, record) => <div>{record.customer_type}</div>,
      },
      {
        title: "Nhóm khách",
        dataIndex: "customer_group",
        key: "customer_group",
        render: (_, record) => <div>{record.customer_group}</div>,
      },
      {
        title: "Số điện thoại",
        dataIndex: "customer_sdt",
        key: "customer_sdt",
        render: (_, record) => <div>{record.customer_sdt}</div>,
      },
      {
        title: "Liên hệ",
        dataIndex: "customer_contact",
        key: "customer_contact",
        render: (_, record) => <div>{record.customer_contact}</div>,
      },
      {
        title: "Checkin",
        dataIndex: "checkin",
        className: "!text-center",
        key: "checkin",
        render: (_, record) => (
          <div className="!text-center">{record.checkin}</div>
        ),
      },
      {
        title: "Checkout",
        dataIndex: "checkout",
        className: "!text-center",
        key: "checkout",
        render: (_, record) => (
          <div className="!text-center">{record.checkout}</div>
        ),
      },
      {
        title: "Số giờ viếng thăm",
        dataIndex: "time_check",
        key: "time_check",
        render: (value: any) => (
          <div className="!text-center">
            {parseFloat((value / 60).toFixed(2))}
          </div>
        ),
      },
      {
        title: "Địa chỉ checkin",
        dataIndex: "checkin_address",
        key: "checkin_address",
        render: (_, record) => <div>{record.checkin_address}</div>,
      },
      {
        title: "Khoảng cách",
        dataIndex: "distance",
        className: "!text-center",
        key: "distance",
        render: (_, record) => (
          <div className="!text-center">
            {parseFloat(record.distance).toFixed(2)}
          </div>
        ),
      },
      {
        title: "Thiết bị",
        dataIndex: "device",
        key: "device",
        className: "!text-center",
        render: (value: any) => (
          <div className="!text-center">{value ? value : "-"}</div>
        ),
      },
      {
        title: "Số ảnh chụp",
        dataIndex: "total_image",
        className: "!text-center",
        key: "total_image",
        render: (_, record) => (
          <div className="!text-center">{record.total_image}</div>
        ),
      },
      {
        title: "Đúng tuyến",
        dataIndex: "is_router",
        className: "!text-center",
        key: "is_router",
        render: (value: any) => (
          <div className="!text-center">
            {value === "1" ? <TrueCheck /> : <FalseCheck />}
          </div>
        ),
      },
      {
        title: "Đơn hàng",
        dataIndex: "is_order",
        className: "!text-center",
        key: "is_order",
        render: (value: any) => (
          <div className="!text-center">
            {value === "1" ? <TrueCheck /> : <FalseCheck />}
          </div>
        ),
      },
      {
        title: "Ghi tồn",
        dataIndex: "is_check_inventory",
        className: "!text-center",
        key: "is_check_inventory",
        render: (value: any) => (
          <div className="!text-center">
            {value === "1" ? <TrueCheck /> : <FalseCheck />}
          </div>
        ),
      },
      {
        title: "Ghi chú",
        dataIndex: "checkin_id",
        key: "checkin_id",
        render: (value: any) => (
          <div className="!text-left">
            {value ? (
              <div
                onClick={() => {
                  // console.log(value);
                  setModal({
                    open: true,
                    id: value,
                  });
                }}
                className="text-[#1877F2] text-sm font-medium- !text-left cursor-pointer underline"
              >
                Xem ghi chú
              </div>
            ) : (
              "-"
            )}
          </div>
        ),
      },
    ];
    return (
      <Table
        bordered
        dataSource={recordTable?.customers?.map((item: any) => {
          let id = Math.random();
          return {
            ...item,
            key: id,
          };
        })}
        scroll={{ x: 2700, y: 280 }}
        columns={columns}
        pagination={false}
      />
    );
  };

  useEffect(() => {
    (async () => {
      const rsData = await AxiosService.get(
        "/api/method/mbw_dms.api.report.checkin_report.checkin_report_info",
        {
          params: {
            page_size: PAGE_SIZE,
            page_number: page,
            from_date,
            to_date,
            employee,
            sales_team,
            territory,
            customer_group,
            customer_type,
          },
        }
      );

      let { result } = rsData;

      setDataCheckin(result);
      setTotal(result?.totals);
    })();
  }, [
    page,
    from_date,
    to_date,
    refresh,
    sales_team,
    employee,
    customer_group,
    customer_type,
  ]);

  return (
    <>
      <ContentFrame
        header={
          <HeaderPage
            title="Báo cáo viếng thăm"
            buttons={[
              {
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
                action: handleDowload.bind(null, {
                  url: "/api/method/mbw_dms.api.exports.export_excel.export_excel",
                  params: {
                    report_type: "Report Checkin",
                    data_filter: {
                      from_date,
                      to_date,
                      employee,
                      sales_team,
                      territory,
                      customer_group,
                      customer_type,
                    },
                  },
                  file_name: "checkin-report.xlsx"
                }),
              },
            ]}
          />
        }
      >
        <div className="bg-white rounded-2xl pt-4 pb-7  border-[#DFE3E8] border-[0.2px] border-solid">
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
                    disabledDate={disabledStartDate}
                  />
                </Col>
                <Col span={5}>
                  <DatePicker
                    format={"DD-MM-YYYY"}
                    className="!bg-[#F4F6F8] w-full rounded-lg h-7"
                    onChange={onChange1}
                    placeholder="Đến ngày"
                    defaultValue={endOfMonth}
                    disabledDate={disabledEndDate}
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
                      setPage(1);
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
                              name="customertype"
                              label={"Loại hình khách hàng"}
                              className="w-[468px] border-none"
                            >
                              <SelectCommon
                                className="!bg-[#F4F6F8] options:bg-[#F4F6F8]"
                                options={typecustomer}
                                allowClear
                                showSearch
                                placeholder="Tất cả loại hình khách hàng"
                              />
                            </Form.Item>

                            <Form.Item
                              name="customergroup"
                              label={"Nhóm khách hàng"}
                              className="w-[468px] border-none"
                            >
                              <SelectCommon
                                className="!bg-[#F4F6F8] options:bg-[#F4F6F8]"
                                options={listCustomerGroup}
                                allowClear
                                onSearch={(value: string) => {
                                  setKeySCustomerGroup(value);
                                }}
                                showSearch
                                placeholder="Tất cả nhóm khách hàng"
                              />
                            </Form.Item>

                            <Form.Item
                              name="territory"
                              label={"Khu vực"}
                              className="w-[468px] border-none"
                            >
                              <SelectCommon
                                className="!bg-[#F4F6F8] options:bg-[#F4F6F8]"
                                options={listTerritory}
                                allowClear
                                onSearch={(value: string) => {
                                  setKeySTerritory(value);
                                }}
                                showSearch
                                placeholder="Tất cẩ khu vực"
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
              bordered
              $border
              dataSource={dataCheckin?.data?.map((report: any) => ({
                key: report.name,
                ...report,
              }))}
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
              scroll={{
                x: true,
                y: containerHeight < 300 ? undefined : scrollYTable1,
              }}
              columns={columnsCheckin}
              expandable={{ expandedRowRender, defaultExpandedRowKeys: ["0"] }}
            />
          </div>
        </div>
        <ModalDetail
          title={
            <div className="font-bold text-lg leading-7 text-[#212B36] p-4">
              Ghi chú
            </div>
          }
          open={modal.open}
          onCancel={closeModal}
          footer={false}
          width={800}
        >
          <Detailmodal id={modal.id} />
        </ModalDetail>
      </ContentFrame>
    </>
  );
}
