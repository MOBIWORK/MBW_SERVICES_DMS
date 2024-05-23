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
  Input,
  Row,
  Select,
  Table,
  TreeSelect,
} from "antd";
import type { TableColumnsType } from "antd";
import { psorder, typecustomer } from "../ReportSales/data";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { AxiosService } from "../../services/server";
import useDebounce from "../../hooks/useDebount";
import { translationUrl, treeArray } from "@/util";
import { DatePickerProps } from "antd/lib";
import { employee } from "@/types/employeeFilter";
import { rsData, rsDataFrappe } from "@/types/response";
import { listSale } from "@/types/listSale";
import { LuFilter, LuFilterX } from "react-icons/lu";
import { useForm } from "antd/es/form/Form";

interface DataTypeCustomNew {
  key: React.Key;
  name: string;
  stt?: number;
  department: string;
  employee_id: string;
  employee_name: string;
  customer_code: string;
  customer_name: string;
  customer_type: string; //loại khách hàng
  customer_group: string; //nhóm khách hàng
  contact: string;
  phone: string;
  tax_id: string;
  territory: string;
  address: string;
  creation: string;
  totals_checkin: number; //số lần vt
  first_checkin: string;
  last_checkin: string;
  totals_so: number;
  last_sale_order: string; // đơn hàng cuối
}

const startOfMonth: any = dayjs().startOf("month");
const endOfMonth: any = dayjs().endOf("month");
let start = Date.parse(startOfMonth["$d"]) / 1000;
let end = Date.parse(endOfMonth["$d"]) / 1000;

const columns: TableColumnsType<DataTypeCustomNew> = [
  {
    title: "STT",
    dataIndex: "stt",
    key: "stt",
    render: (_, record: any, index: number) => (
      <div className="text-center">{index + 1}</div>
    ),
  },
  {
    title: "Phòng ban",
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
    dataIndex: "contact",
    key: "contact",
    render: (_, record: any) => <div>{record.contact}</div>,
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
    title: "Khu vưc",
    dataIndex: "territory",
    key: "territory",
    render: (_, record: any) => <div>{record.territory}</div>,
  },
  {
    title: "Địa chỉ",
    dataIndex: "address",
    key: "address",
    render: (_, record: any) => <div>{record.contribution}</div>,
  },
  {
    title: "Ngày thu thập",
    dataIndex: "creation",
    key: "creation",
    render: (_, record: any) => (
      <div>{dayjs(record.creation * 1000).format("DD/MM/YYYY")}</div>
    ),
  },
  {
    title: "Nguồn",
    dataIndex: "f1",
    key: "f1",
  },
  {
    title: <div className="!text-right">Số lần VT</div>,
    dataIndex: "totals_checkin",
    key: "totals_checkin",
    render: (_, record: any) => (
      <div className="!text-right">{record.totals_checkin}</div>
    ),
  },
  {
    title: "VT đầu",
    dataIndex: "first_checkin",
    key: "first_checkin",
    render: (_, record: any) => <div>{record.first_checkin}</div>,
  },
  {
    title: "VT cuối",
    dataIndex: "last_checkin",
    key: "last_checkin",
    render: (_, record: any) => <div>{record.last_checkin}</div>,
  },
  {
    title: <div className="!text-right">Số đơn hàng</div>,
    dataIndex: "totals_so",
    key: "totals_so",
    render: (_, record: any) => (
      <div className="!text-right">{record.totals_so}</div>
    ),
  },
  {
    title: "Đơn hàng cuối",
    dataIndex: "last_sale_order",
    key: "last_sale_order",
    render: (value) => {
      return value ? <p>{dayjs(value * 1000).format("DD/MM/YYYY")}</p> : <></>;
    },
  },
];

export default function ReportCustomNew() {
  const [dataCustomNew, setDataCustomNew] = useState<DataTypeCustomNew[]>([]);
  const [total, setTotal] = useState<number>(0);
  const PAGE_SIZE = 20;
  const [page, setPage] = useState<number>(1);
  const [formFilter] = useForm();
  const [employee, setEmployee] = useState("");
  const [listEmployees, setListEmployees] = useState<any[]>([]);
  const [listDepartment, setListDepartment] = useState<any[]>([]);
  const [department, setDepartment] = useState("");
  const [keySDepartment, setKeySDepartment] = useState("");
  const [customer_type, setCustomerType] = useState("");
  let keySearchDepartment = useDebounce(keySDepartment, 500);
  const [customer_group, setCustomerGroup] = useState("");
  const [listCustomerGroup, setListCustomerGroup] = useState<any[]>([]);
  const [keySCustomerGroup, setKeySCustomerGroup] = useState("");
  let keySearchCustomerGroup = useDebounce(keySCustomerGroup, 500);
  const [territory, setTerritory] = useState("");
  const [listTerritory, setListTerritory] = useState<any[]>([]);
  const [keySTerritory, setKeySTerritory] = useState("");
  let keySearchTerritory = useDebounce(keySTerritory, 500);
  const [has_sales_order, setHasSaleOrder] = useState<boolean>();
  const [listSales, setListSales] = useState<any[]>([]);
  const [sales_team, setTeamSale] = useState<string>();
  const [keySearch4, setKeySearch4] = useState("");
  let seachbykey = useDebounce(keySearch4);

  const onChange: DatePickerProps["onChange"] = (dateString: any) => {
    console.log(dateString);
  };

  const onChange1: DatePickerProps["onChange"] = (dateString: any) => {
    console.log(dateString);
  };

  const handleSearchFilter = (val: any) => {
    if(val.customergroup){
      setCustomerGroup(val.customergroup)
    }else {
      setCustomerGroup("")
    }
    if(val.customertype){
      setCustomerType(val.customertype)
    }else {
      setCustomerType("")
    }
    if(val.territory){
      setTerritory(val.territory)
    }else {
      setTerritory(val.territory)
    }
    if(val.hasorder){
      setHasSaleOrder(val.hasorder)
    }else {
      setHasSaleOrder(undefined)
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
          value: employee_filter.employee_name,
          label: employee_filter.employee_name || employee_filter.employee_code,
        }))
      );
    })();
  }, [sales_team, seachbykey]);

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
        "/api/method/mbw_dms.api.report.customer_report.customer_report",
        {
          params: {
            page_size: PAGE_SIZE,
            page_number: page,
            customer_type: customer_type,
            customer_group: customer_group,
            territory: territory,
            employee: employee,
            has_sales_order: has_sales_order,
            department: department,
          },
        }
      );

      let { result } = rsData;
      console.log("result", result);
      setDataCustomNew(result);
      setTotal(result?.totals_cus);
    })();
  }, [
    page,
    customer_type,
    customer_group,
    territory,
    employee,
    has_sales_order,
    department,
  ]);
  return (
    <>
      <ContentFrame
        header={
          <HeaderPage
            title="Báo cáo khách hàng mới"
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
                              label={"Phát sinh đơn hàng"}
                              name="hasorder"
                              className="w-[468px] border-none pt-2"
                            >
                              <Select
                                className="!bg-[#F4F6F8] options:bg-[#F4F6F8]"
                                options={psorder}
                                allowClear
                                showSearch
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

          <div className="pt-5">
            <TableCustom
              dataSource={dataCustomNew?.data?.map(
                (dataSale: DataTypeCustomNew) => {
                  return {
                    ...dataSale,
                    key: dataSale.name,
                  };
                }
              )}
              bordered
              columns={columns}
              pagination={{
                defaultPageSize: PAGE_SIZE,
                total,
                showSizeChanger: false,
                onChange(page) {
                  setPage(page);
                },
              }}
              scroll={{ x: true }}
              summary={() => {
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
                    <Table.Summary.Cell index={8}></Table.Summary.Cell>
                    <Table.Summary.Cell index={9}></Table.Summary.Cell>
                    <Table.Summary.Cell index={10}></Table.Summary.Cell>
                    <Table.Summary.Cell index={11}></Table.Summary.Cell>
                    <Table.Summary.Cell index={12}></Table.Summary.Cell>
                    <Table.Summary.Cell index={13}></Table.Summary.Cell>
                    <Table.Summary.Cell index={14}></Table.Summary.Cell>
                    <Table.Summary.Cell index={15}>
                      <div className="text-right">
                        {dataCustomNew?.sum?.sum_checkin}
                      </div>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={16}></Table.Summary.Cell>
                    <Table.Summary.Cell index={17}></Table.Summary.Cell>
                    <Table.Summary.Cell index={18}>
                      <div className="text-right">
                        {dataCustomNew?.sum?.sum_so}
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
