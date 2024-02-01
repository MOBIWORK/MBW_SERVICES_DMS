// @mui

import { IoIosMenu } from "react-icons/io";
import { VscAdd } from "react-icons/vsc";
import { LuUploadCloud } from "react-icons/lu";
import { LiaDownloadSolid } from "react-icons/lia";
import { LuFilter, LuFilterX } from "react-icons/lu";
import { PiSortAscendingBold } from "react-icons/pi";
import { Table, Button, Input, Select, Row, Col, Space } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import { FormItemCustom } from "../../components/form-item";
import { HeaderPage, TableCustom } from "../../components";
import { rsDataFrappe } from "../../types/response";
import { employee } from "../../types/employeeFilter";
import { AxiosService } from "../../services/server";
import useDebounce from "../../hooks/useDebount";
import { useNavigate } from "react-router-dom";
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
    key:"channel_code"
  },
  {
    title: "Tên tuyến",
    dataIndex: "channel_name",
    key:"channel_name"
  },
  {
    title: "NVBH",
    dataIndex: "employee",
    key: "employee"
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    key:"status"
  },
  {
    title: "Ngày tạo",
    dataIndex: "modified",
    key: "modified"
  },
  {
    title: "Người tạo",
    dataIndex: "modified_by",
    key: "modified_by"
  },
  {
    title: "Ngày cập nhật",
    dataIndex: "modified",
    key: "modified"
  },
  {
    title: "Người cập nhật",
    dataIndex: "modified_by",
    key: "modified_by"
  },
];

const data: DataType[] = [
  {
    key: "1",
    codeRouter: "John",
    nameRouter: "Brown",
    nvbh: "unasd",
    status: "New York No. 1 Lake Park",
    created: "222",
    usercreated: "12313",
    updated: "123",
    userupdated: "123123",
  },
  {
    key: "2",
    codeRouter: "John",
    nameRouter: "Brown",
    nvbh: "unasd",
    status: "New York No. 1 Lake Park",
    created: "222",
    usercreated: "12313",
    updated: "123",
    userupdated: "123123",
  },
];

export default function RouterControl() {
  const navigate = useNavigate();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const [keyS, setKeyS] = useState("");
  const [keySRouter, setKeySRouter] = useState("");
  let keySearch = useDebounce(keyS, 300);
  let keySearchRouter = useDebounce(keySRouter, 500);
  const [listEmployees, setListEmployees] = useState<any[]>([]);
  const [listRouter, setListRouter] = useState<any[]>([]);
  const [router,setRouter] = useState<any[]>()
  const [employee,setEmployee] = useState<string>()
  const [status,setStatus] = useState<string>()
  const [page,setPage] = useState<number>(1)
  const PAGE_SIZE = 20
  const [routersTable,setRouterTable] = useState<any[]>([])
  const [total,setTotal] = useState<number>(0)



  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
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
            txt: keySearch ,
            doctype: "Employee",
            ignore_user_permissions: 0,
            reference_doctype: "Attendance",
            query: "erpnext.controllers.queries.employee_query",
          },
        }
      );
      let { results } = rsEmployee;

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
            txt: keySearchRouter ,
            doctype: "DMS Router",
            ignore_user_permissions: 0,
            reference_doctype: "Attendance",
            query: "mbw_dms.api.controller.queries.router_query",
          },
        }
      );
      let { results } = rsRouter;
        console.log(results);
        
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
    (async() => {
      
      const rsRouter = await AxiosService.get('/api/method/mbw_dms.api.router.get_list_router', {
        params: {
          page_size: PAGE_SIZE,
          page_number: page,
          status,
          router:router && router.reduce((prev,now)=> `${prev};${now}`),
          employee
        }
      })

      setRouterTable(rsRouter?.result?.data)
      setTotal(rsRouter?.result?.total)
      
    })()

  },[router,employee,status,page])
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
            action: () => navigate('/router-create')
          },
        ]}
      />

      <div className="bg-[#f9fafa]">
        <div className="mx-2 pt-5 pb-10">
          <div className="pt-5">
            <div className="h-auto bg-white py-7 px-4 rounded-lg">
              <Row className="justify-between w-full">
                <Col span={14}>
                  <Row gutter={8}>
                    <Col span={8}>
                      <FormItemCustom name="employee" required>
                        <Select
                          // labelInValue
                          mode="multiple"
                          filterOption={false}
                          onChange={(value)=> {
                            console.log('router',router);
                            
                            setRouter(value)
                            
                          }}
                          showSearch
                          // filterOption={false}
                          placeholder="Tuyến"
                          notFoundContent={null}
                          onSearch={(value: string) => setKeySRouter(value)}
                          options={listRouter}
                          optionRender={(option) => 
                            {                            
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
                          options={listEmployees}
                          onChange ={(value)=> {
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
                      <Button
                        className="flex items-center text-nowrap !text-[13px] !leading-[21px] !font-normal  border-r-[0.1px] rounded-r-none h-[32px]"
                        icon={<LuFilter style={{ fontSize: "20px" }} />}
                      >
                        Filter
                      </Button>
                      <Button className="border-l-[0.1px] rounded-l-none h-[32px]">
                        <LuFilterX style={{ fontSize: "20px" }} />
                      </Button>
                    </div>
                    <div className="flex justify-center items-center rounded-md">
                      <Button className="border-r-[0.1px] rounded-r-none">
                        <PiSortAscendingBold style={{ fontSize: "20px" }} />
                      </Button>
                      <Button className="border-l-[0.1px] rounded-l-none">
                        Last update on
                      </Button>
                    </div>
                  </div>
                </Col>
              </Row>

              <div className="pt-5">
                <div>
                  <TableCustom
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={routersTable?.map(router => ({key: router.channel_code,...router}))}
                    pagination={{
                      defaultPageSize:PAGE_SIZE,
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
