// @mui

import { IoIosMenu } from "react-icons/io";
import { VscAdd } from "react-icons/vsc";
import { LuUploadCloud } from "react-icons/lu";
import { LiaDownloadSolid } from "react-icons/lia";
import { LuFilter, LuFilterX } from "react-icons/lu";
import { PiSortAscendingBold, PiSortDescendingBold } from "react-icons/pi";
import { Table, Button, Input, Select, Row, Col, Space, Dropdown } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import { FormItemCustom } from "../../components/form-item";
import { DropDownCustom, HeaderPage, TableCustom, TagCustom } from "../../components";
import { rsDataFrappe } from "../../types/response";
import { employee } from "../../types/employeeFilter";
import { AxiosService } from "../../services/server";
import useDebounce from "../../hooks/useDebount";
import { Link, useNavigate } from "react-router-dom";
import { TagCustomStatus } from "../../components/tag/tag";
import dayjs from "dayjs";
import Filter from "./components/filter";
import { orderFields } from "./data";
import { useForm } from "antd/lib/form/Form";
import { MdKeyboardArrowDown } from "react-icons/md";
// ----------------------------------------------------------------------
interface DataType {
  key: React.Key;
  codeRouter: string;
  nameRouter: string;
  nvbh: string;
  status: string;
  created: string;
  usercreated: string;
  updated: string;
  userupdated: string;
}

const columns = [
  {
    title: "Mã tuyến",
    dataIndex: "channel_code",
    key: "channel_code"
  },
  {
    title: "Tên tuyến",
    dataIndex: "channel_name",
    key: "channel_name"
  },
  {
    title: "NVBH",
    dataIndex: "employee",
    key: "employee"
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    key: "status",
    render: (value: string) => value == "Active" ? <TagCustomStatus > Hoạt động</TagCustomStatus > : <TagCustomStatus type="Warning" > Khóa</TagCustomStatus >
  },
  {
    title: "Ngày tạo",
    dataIndex: "modified",
    key: "modified",
    render: (value) => dayjs(value * 1000).format("DD/MM/YYYY")

  },
  {
    title: "Người tạo",
    dataIndex: "modified_by",
    key: "modified_by"
  },
  {
    title: "Ngày cập nhật",
    dataIndex: "modified",
    key: "modified",
    render: (value) => dayjs(value * 1000).format("DD/MM/YYYY")
  },
  {
    title: "Người cập nhật",
    dataIndex: "modified_by",
    key: "modified_by"
  },
];



export default function RouterControl() {
  const navigate = useNavigate();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [form] = useForm()
  const [keyS, setKeyS] = useState("");
  const [keySRouter, setKeySRouter] = useState("");
  let keySearch = useDebounce(keyS, 300);
  let keySearchRouter = useDebounce(keySRouter, 500);
  const [listEmployees, setListEmployees] = useState<any[]>([]);
  const [listRouter, setListRouter] = useState<any[]>([]);
  const [router, setRouter] = useState<any[]>()
  const [employee, setEmployee] = useState<string>()
  const [status, setStatus] = useState<string>()
  const [page, setPage] = useState<number>(1)
  const PAGE_SIZE = 20
  const [routersTable, setRouterTable] = useState<any[]>([])
  const [total, setTotal] = useState<number>(0)
  const [filter, setFilter] = useState({})
  const [orderBy, setOrder] = useState<"desc" | "asc">("desc")
  const [orderField, setOrderField] = useState<any>({
    "label": "Thời gian cập nhật",
    "value": "modified"
},)
  const [action, setAction] = useState({})



  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    // console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const onChange = (value: string) => {
    setStatus(value)
  };

  const onSearch = (value: string) => {
    console.log("search:", value);
  };

  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  useEffect(() => {
    (async () => {
      let rsEmployee: rsDataFrappe<employee[]> = await AxiosService.get(
        "/api/method/frappe.desk.search.search_link",
        {
          params: {
            txt: keySearch,
            doctype: "Employee",
            ignore_user_permissions: 0,
            reference_doctype: "Attendance",
            query: "erpnext.controllers.queries.employee_query",
          },
        }
      );
      let { message: results } = rsEmployee;

      setListEmployees(
        results.map((employee_filter: employee) => ({
          value: employee_filter.value,
          label: employee_filter.description,
        }))
      );
    })();
  }, [keySearch]);

  useEffect(() => {
    (async () => {
      let rsRouter: rsDataFrappe<employee[]> = await AxiosService.get(
        "/api/method/frappe.desk.search.search_link",
        {
          params: {
            txt: keySearchRouter,
            doctype: "DMS Router",
            ignore_user_permissions: 0,
            reference_doctype: "Attendance",
            query: "mbw_dms.api.controller.queries.router_query",
          },
        }
      );
      let { message: results } = rsRouter;

      setListRouter(
        results.map((router: employee) => ({
          value: router.value,
          label: router.description.split(',')[0],
          desc: router.description.split(',')[1]
        }))
      );
    })();
  }, [keySearchRouter]);


  useEffect(() => {
    (async () => {

      const rsRouter = await AxiosService.get('/api/method/mbw_dms.api.router.get_list_router', {
        params: {
          page_size: PAGE_SIZE,
          page_number: page,
          status,
          router: router && router.reduce((prev, now) => `${prev};${now}`),
          employee,
          ...filter
        }
      })

      setRouterTable(rsRouter?.result?.data)
      setTotal(rsRouter?.result?.total)

    })()

  }, [router, employee, status, page, filter])


  return (
    <>
      <HeaderPage
        title="Quản lý tuyến"
        buttons={[
          {
            label: "Xuất excel",
            icon: <LiaDownloadSolid className="text-xl" />,
            size: "20px",
            className: "flex items-center mr-2",
          },
          {
            label: "Nhập excel",
            icon: <LuUploadCloud className="text-xl" />,
            size: "20px",
            className: "flex items-center mr-2",
          },
          {
            label: "Thêm mới",
            type: "primary",
            icon: <VscAdd className="text-xl" />,
            size: "20px",
            className: "flex items-center",
            action: () => navigate('/dms-router/create-dms-router')
          },
        ]}
        customButton={
          <>
            <Dropdown
              trigger={["click"]}
              placement="bottomRight"
              dropdownRender={(menu) => (
                <DropDownCustom >
                  <div className="-m-2">
                    <div className="py-2 px-4 cursor-pointer hover:bg-[#f5f5f5] w-[168px]">Khóa tuyến</div>
                    <div className="py-2 px-4 cursor-pointer hover:bg-[#f5f5f5] w-[168px]">Mở tuyến </div>
                    <div className="py-2 px-4 cursor-pointer hover:bg-[#f5f5f5] w-[168px]">Xóa Tuyến</div>
                  </div>
                </DropDownCustom>
              )}>
                <Button type="primary" className="ml-2 flex items-center"> Hành động <span className="text-base"><MdKeyboardArrowDown/></span> </Button>
            </Dropdown>
          </>
        }
      />

      <div className="bg-[#f9fafa]">
        <div className="mx-2 pt-5 pb-10">
          <div className="pt-5">
            <div className="h-auto bg-white py-7 px-4 rounded-lg">
              {/* header  */}
              <Row className="justify-between w-full">
                <Col span={14}>
                  <Row gutter={8}>
                    <Col span={8}>
                      <FormItemCustom name="employee" required>
                        <Select
                          // labelInValue
                          mode="multiple"
                          filterOption={false}
                          onChange={(value) => {
                            console.log('router', router);

                            setRouter(value)

                          }}
                          showSearch
                          // filterOption={false}
                          placeholder="Tuyến"
                          notFoundContent={null}
                          onSearch={(value: string) => setKeySRouter(value)}
                          options={listRouter}
                          optionRender={(option) => {
                            return <div className="text-sm">
                              <p role="img" aria-label={option.data.label} className="my-1">
                                {option.data.label}
                              </p>
                              <span className="text-xs !font-semibold">{option.data.desc}</span>
                            </div>
                          }
                          }
                        />
                      </FormItemCustom>
                    </Col>
                    <Col span={8}>
                      <FormItemCustom name="employee" required>
                        <Select
                          placeholder="Nhân viên bán hàng"
                          showSearch
                          // filterOption={false}
                          notFoundContent={null}
                          onSearch={(value: string) => setKeyS(value)}
                          options={[{ label: "Tất cả nhân viên", value: "" }, ...listEmployees]}
                          onChange={(value) => {
                            setEmployee(value)

                          }}
                        />
                      </FormItemCustom>
                    </Col>
                    <Col span={8}>
                      <FormItemCustom className="w-[150px] border-none">
                        <Select
                          className="!bg-[#F4F6F8] options:bg-[#F4F6F8]"
                          optionFilterProp="children"
                          onChange={onChange}
                          onSearch={onSearch}
                          filterOption={filterOption}
                          defaultValue=""
                          options={[
                            {
                              value: "",
                              label: "Trạng thái",
                            },
                            {
                              value: "Active",
                              label: "Hoạt động",
                            },
                            {
                              value: "Lock",
                              label: "Khóa",
                            },
                          ]}
                        />
                      </FormItemCustom>
                    </Col>
                  </Row>
                </Col>
                <Col>
                  <div className="flex flex-wrap items-center">
                    <div className="flex justify-center items-center mr-4">
                      <Dropdown
                        trigger={["click"]}
                        placement="bottomRight"
                        dropdownRender={(menu) => (
                          <DropDownCustom title="Bộ lọc">
                            <Filter action={setFilter} form={form} />
                          </DropDownCustom>
                        )}
                      >
                        <Button
                          className="flex items-center text-nowrap !text-[13px] !leading-[21px] !font-normal  border-r-[0.1px] rounded-r-none h-[32px]"
                          icon={<LuFilter style={{ fontSize: "20px" }} />}
                        >
                          Bộ lọc
                        </Button>
                      </Dropdown>
                      <Button className="border-l-[0.1px] rounded-l-none h-[32px]" onClick={() => form.resetFields()}>
                        <LuFilterX style={{ fontSize: "20px" }} />
                      </Button>
                    </div>
                    <div className="flex justify-center items-center rounded-md">
                      <Button className="border-r-[0.1px] rounded-r-none" onClick={() => setOrder(prev => prev == "asc" ? "desc" : "asc")}>
                        {orderBy == "asc" ? <PiSortAscendingBold style={{ fontSize: "20px" }} /> : <PiSortDescendingBold style={{ fontSize: "20px" }} />}
                      </Button>
                      <Dropdown
                        trigger={["click"]}
                        placement="bottomRight"
                        dropdownRender={(menu) => (
                          <DropDownCustom>
                            <div className="-m-4">

                              {
                                orderFields.map((fiel, index) => <p className="p-2 block mb-0 cursor-pointer hover:bg-[#f5f5f5]" key={index} onClick={setOrderField.bind(null, fiel)}>
                                  {fiel.label}
                                </p>)
                              }
                            </div>
                          </DropDownCustom>
                        )}>
                        <Button className="border-l-[0.1px] rounded-l-none">
                          {orderField.label}
                        </Button>
                      </Dropdown>
                    </div>
                  </div>
                </Col>
              </Row>
              {/* hien thi table  */}
              <div className="pt-5">
                <div>
                  <TableCustom
                    rowSelection={rowSelection}
                    columns={columns.map(column => {
                      if (column.dataIndex == 'channel_code')
                        return ({ ...column, render: (text, record, index) => <Link className="!text-slate-900" to={`/dms-router/${record?.name}`}>{text}</Link> })
                      else return column
                    })}
                    dataSource={routersTable?.map(router => ({ key: router.channel_code, ...router }))}
                    pagination={{
                      defaultPageSize: PAGE_SIZE,
                      total,
                      onChange(page, pageSize) {
                        setPage(page)
                      },
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
