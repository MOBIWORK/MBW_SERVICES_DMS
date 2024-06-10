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
  TreeSelect,
  message,
} from "antd";
import type { TableColumnsType } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { AxiosService } from "@/services/server";
import useDebounce from "@/hooks/useDebount";
import { DatePickerProps } from "antd/lib";
import { translationUrl, treeArray } from "@/util";
import dayjs from "dayjs";
import { LuFilter, LuFilterX } from "react-icons/lu";
import { listSale } from "@/types/listSale";
import { rsData, rsDataFrappe } from "@/types/response";
import { employee } from "@/types/employeeFilter";
import { typecustomer } from "../ReportSales/data";
import { useForm } from "antd/es/form/Form";
import { useResize } from "@/hooks";

interface DataCheckinFirst {
  key: React.Key;
  name: string;
  stt?: number;
  department: string;
  employee_id: string;
  employee_name: string;
  customer_name: string;
  customer_code: string;
  customer_type: string;
  customer_group: string;
  contact_person: string;
  phone: string;
  tax_id: string;
  territory: string;
  address: string;
  date_checkin: string;
}

const startOfMonth: any = dayjs().startOf("month");
const endOfMonth: any = dayjs().endOf("month");
let start = Date.parse(startOfMonth["$d"]) / 1000;
let end = Date.parse(endOfMonth["$d"]) / 1000;

const columns: TableColumnsType<DataCheckinFirst> = [
  {
    title: "STT",
    dataIndex: "stt",
    key: "stt",
    render: (_, record: any, index: number) => (
      <div className="text-center">{index + 1}</div>
    ),
  },
  {
    title: "Phòng/nhóm",
    dataIndex: "department",
    key: "department",
    render: (_, record: any) => <div>{record.department}</div>,
  },
  {
    title: "Mã nhân viên",
    dataIndex: "employee_id",
    key: "employee_id",
    render: (_, record: any) => <div>{record.employee_id}</div>,
  },
  {
    title: "Tên nhân viên",
    dataIndex: "employee_name",
    key: "employee_name",
    render: (_, record: any) => <div>{record.employee_name}</div>,
  },
  {
    title: "Mã khách hàng",
    dataIndex: "customer_code",
    key: "customer_code",
    render: (_, record: any) => <div>{record.customer_code}</div>,
  },
  {
    title: "Tên khách hàng",
    dataIndex: "customer_name",
    key: "customer_name",
    render: (_, record: any) => <div>{record.customer_name}</div>,
  },
  {
    title: "Loại khách hàng",
    dataIndex: "customer_type",
    key: "customer_type",
    render: (_, record: any) => <div>{record.customer_type}</div>,
  },
  {
    title: "Nhóm khách hàng",
    dataIndex: "customer_group",
    key: "customer_group",
    render: (_, record: any) => <div>{record.customer_group}</div>,
  },
  {
    title: "Người liên hệ",
    dataIndex: "contact_person",
    key: "contact_person",
    render: (_, record: any) => <div>{record.contact_person}</div>,
  },
  {
    title: "SDT",
    dataIndex: "phone",
    key: "phone",
    render: (_, record: any) => <div>{record.phone}</div>,
  },
  {
    title: "Mã số thuế",
    dataIndex: "tax_id",
    key: "tax_id",
    render: (_, record: any) => <div>{record.tax_id}</div>,
  },
  {
    title: "Khu vực",
    dataIndex: "territory",
    key: "territory",
    render: (_, record: any) => <div>{record.territory}</div>,
  },
  {
    title: "Địa chỉ",
    dataIndex: "address",
    key: "address",
    render: (_, record: any) => (
      <div className="!w-[175px] truncate hover:whitespace-normal">
        {record.address}
      </div>
    ),
  },
  {
    title: "Ngày viếng thăm",
    dataIndex: "date_checkin",
    key: "date_checkin",
    render: (_, record: any) => (
      <div>
        {record.date_checkin
          ?.split("-")
          ?.reverse()
          ?.toString()
          ?.replaceAll(",", "-")}
      </div>
    ),
  },
];

export default function ReportCheckinFirst() {
  const [dataReport, setDataReport] = useState<DataCheckinFirst[]>([]);
  const [total, setTotal] = useState<number>(0);
  const PAGE_SIZE = 20;
  const [formFilter] = useForm();
  const [page, setPage] = useState<number>(1);
  const [listDepartment, setListDepartment] = useState<any[]>([]);
  const [department, setDepartment] = useState("");
  const [keySDepartment, setKeySDepartment] = useState("");
  let keySearchDepartment = useDebounce(keySDepartment, 500);
  const [employee, setEmployee] = useState("");
  const [listEmployees, setListEmployees] = useState<any[]>([]);
  const [keySEmployee, setKeySEmployee] = useState("");
  let keySearchEmployee = useDebounce(keySEmployee, 500);
  const [customer_group, setCustomerGroup] = useState("");
  const [listCustomerGroup, setListCustomerGroup] = useState<any[]>([]);
  const [keySCustomerGroup, setKeySCustomerGroup] = useState("");
  let keySearchCustomerGroup = useDebounce(keySCustomerGroup, 500);
  const [customer_type, setCustomerType] = useState("");
  const [territory, setTerritory] = useState("");
  const [listTerritory, setListTerritory] = useState<any[]>([]);
  const [keySTerritory, setKeySTerritory] = useState("");
  let keySearchTerritory = useDebounce(keySTerritory, 500);
  const [from_date, setFromDate] = useState<any>(start);
  const [to_date, setToDate] = useState<any>(end);
  const [listSales, setListSales] = useState<any[]>([]);
  const [sales_team, setTeamSale] = useState<string>();
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

  useEffect(() => {
    (async () => {
      const rsData = await AxiosService.get(
        "/api/method/mbw_dms.api.report.first_checkin_rp.first_checkin_report",
        {
          params: {
            page_size: PAGE_SIZE,
            page_number: page,
            department: department,
            employee: employee,
            customer_group: customer_group,
            customer_type: customer_type,
            territory: territory,
            from_date: from_date,
            to_date: to_date,
          },
        }
      );

      let { result } = rsData;

      console.log("dt", result);

      setDataReport(result);
      setTotal(result?.totals);
    })();
  }, [
    page,
    department,
    employee,
    customer_group,
    customer_type,
    territory,
    from_date,
    to_date,
  ]);

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
  };

  return (
    <>
      <ContentFrame
        header={
          <HeaderPage
            title="Báo cáo thống kê khách hàng viếng thăm lần đầu"
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
            <Col>
              <Row gutter={[8, 8]}>
                <Col className="mx-4 w-full" span={24}>
                  <Form
                    layout="vertical"
                    className="flex flex-wrap justify-start items-center "
                  >
                    <FormItemCustom
                      label={"Từ ngày"}
                      className="w-[175px] border-none mr-2"
                    >
                      <DatePicker
                        format={"DD-MM-YYYY"}
                        className="!bg-[#F4F6F8] !h-7 rounded-lg mt-[-2px]"
                        placeholder="Từ ngày"
                        onChange={onChange}
                        defaultValue={startOfMonth}
                      />
                    </FormItemCustom>

                    <FormItemCustom
                      label={"Đến ngày"}
                      className="w-[175px] border-none mr-2"
                    >
                      <DatePicker
                        format={"DD-MM-YYYY"}
                        className="!bg-[#F4F6F8] !h-7 rounded-lg mt-[-2px]"
                        onChange={onChange1}
                        placeholder="Đến ngày"
                        defaultValue={endOfMonth}
                      />
                    </FormItemCustom>

                    <FormItemCustom
                      label={"Nhóm bán hàng"}
                      className="border-none mr-2 w-[200px]"
                    >
                      <TreeSelect
                        placeholder="Tất cả nhóm bán hàng"
                        allowClear
                        treeData={listSales}
                        onChange={(value: string) => {
                          setTeamSale(value);
                        }}
                        dropdownStyle={{
                          maxHeight: 400,
                          overflow: "auto",
                          minWidth: 400,
                        }}
                      />
                    </FormItemCustom>

                    <FormItemCustom
                      label={"Nhân viên"}
                      className="border-none mr-2 w-[200px]"
                      name="employee"
                    >
                      <Select
                        filterOption={false}
                        notFoundContent={null}
                        allowClear
                        placeholder="Tất cả nhân viên"
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
                    </FormItemCustom>
                  </Form>
                </Col>
              </Row>
            </Col>
            <Col className="!ml-4">
              <div className="flex flex-wrap items-center">
                <div className="flex justify-center items-center mr-4">
                  <Dropdown
                    className="!h-9"
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
                            <FormItemCustom
                              name="customertype"
                              label={"Loại khách hàng"}
                              className="w-[468px] border-none pt-2"
                            >
                              <Select
                                className="!bg-[#F4F6F8] options:bg-[#F4F6F8]"
                                options={typecustomer}
                                allowClear
                                placeholder="Tất cả loại khách hàng"
                              />
                            </FormItemCustom>

                            <FormItemCustom
                              name="customergroup"
                              label={"Nhóm khách hàng"}
                              className="w-[468px] border-none pt-2"
                            >
                              <Select
                                className="!bg-[#F4F6F8] options:bg-[#F4F6F8]"
                                options={listCustomerGroup}
                                allowClear
                                placeholder="Tất cả nhóm khách hàng"
                              />
                            </FormItemCustom>

                            <FormItemCustom
                              name="territory"
                              label={"Khu vực"}
                              className="w-[468px] border-none pt-2"
                            >
                              <Select
                                className="!bg-[#F4F6F8] options:bg-[#F4F6F8]"
                                options={listTerritory}
                                allowClear
                                placeholder="Tất cẩ khu vực"
                              />
                            </FormItemCustom>
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
                      className="flex items-center text-nowrap !text-[13px] !leading-[21px] !font-normal  border-r-[0.1px] rounded-r-none h-9"
                      icon={<LuFilter style={{ fontSize: "20px" }} />}
                    >
                      Bộ lọc
                    </Button>
                  </Dropdown>
                  <Button className="border-l-[0.1px] rounded-l-none !h-9">
                    <LuFilterX style={{ fontSize: "20px" }} />
                  </Button>
                </div>
              </div>
            </Col>
          </Row>

          <div ref={containerRef1} className="pt-5">
            <TableCustom
              dataSource={dataReport?.data?.map(
                (dataCheckin: DataCheckinFirst) => {
                  return {
                    ...dataCheckin,
                    key: dataCheckin.name,
                  };
                }
              )}
              bordered
              scroll={{
                x: 'max-content',
                y: containerHeight < 400 ? undefined : scrollYTable1,
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
              columns={columns}
            />
          </div>
        </div>
      </ContentFrame>
    </>
  );
}
