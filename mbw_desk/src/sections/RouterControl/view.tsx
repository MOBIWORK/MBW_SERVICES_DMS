// @mui

import { VscAdd } from "react-icons/vsc";
import { LuUploadCloud } from "react-icons/lu";
import { LiaDownloadSolid } from "react-icons/lia";
import { LuFilter, LuFilterX } from "react-icons/lu";
import { Button, Select, Row, Col, Dropdown, Modal, TreeSelect } from "antd";
import React, {
  memo,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { FormItemCustom } from "../../components/form-item";
import {
  ContentFrame,
  DropDownCustom,
  HeaderPage,
  TableCustom,
} from "../../components";
import { rsData, rsDataFrappe } from "../../types/response";
import { employee } from "../../types/employeeFilter";
import { AxiosService } from "../../services/server";
import useDebounce from "../../hooks/useDebount";
import { useNavigate } from "react-router-dom";
import Filter from "./components/filter";
import { columns } from "./data";
import { useForm } from "antd/lib/form/Form";
import { MdKeyboardArrowDown } from "react-icons/md";
import { router } from "../../types/router";
import { GlobalContext } from "@/App";
import { translationUrl, treeArray } from "@/util";
import { listSale } from "@/types/listSale";
import { SyncOutlined } from "@ant-design/icons";
import { useResize } from "@/hooks";
import SearchEmployee from "./components/searchEmployee";
import { SelectCommon, TreeSelectCommon } from "@/components/select/select";
// ----------------------------------------------------------------------

function RouterControl() {
  const navigate = useNavigate();
  const tableRef = useRef(null);
  const headerPageRef = useRef(null);
  const headerContentRef = useRef(null);
  const PAGE_SIZE = 20;
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const { errorMsg, successMsg } = useContext(GlobalContext);
  const [form] = useForm();
  const [keyS, setKeyS] = useState<string | false>("");
  const [isdeletedField, setDelete] = useState<boolean>(false);
  const [keySRouter, setKeySRouter] = useState("");
  let keySearch = useDebounce(keyS, 500);
  let keySearchRouter = useDebounce(keySRouter, 500);
  const [listEmployees, setListEmployees] = useState<any[]>([]);
  const [listRouter, setListRouter] = useState<any[]>([]);
  const [router, setRouter] = useState<any[]>();
  const [employee, setEmployee] = useState<string>();
  const [status, setStatus] = useState<string>();
  const [page, setPage] = useState<number>(1);
  const [routersTable, setRouterTable] = useState<any[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [filter, setFilter] = useState({});
  const [listSales, setListSales] = useState<any[]>([]);
  const [orderBy, setOrder] = useState<"desc" | "asc">("desc");
  const [team_sale, setTeamSale] = useState<string>();
  const [rfRouter, setRfRouter] = useState<boolean>(false);
  const [orderField, setOrderField] = useState<any>({
    label: "Thời gian cập nhật",
    value: "modified",
  });

  const size = useResize();
  
  const [scrollYTable, setScrollYTable] = useState<number>(size?.h * 0.68);
  const [refresh, setRefresh] = useState<boolean>(false);

  const [keySearch4, setKeySearch4] = useState("");
  let seachbykey = useDebounce(keySearch4);
  const [action, setAction] = useState<{
    isOpen: boolean;
    data: any;
    action: string | false;
  }>({
    isOpen: false,
    data: null,
    action: false,
  });

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    // console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const onChange = (value: string) => {
    setStatus(value);
    setPage(1)
  };

  const onSearch = (value: string) => {
    console.log("search:", value);
  };

  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  useEffect(() => {
    console.log(keySearch);

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
        results.map((employee_filter: any) => ({
          value: employee_filter.value,
          label: employee_filter.description,
        }))
      );
    })();
  }, [keySearch, isdeletedField]);

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
            query: "mbw_dms.api.router.router_query",
          },
        }
      );
      let { message: results } = rsRouter;

      setListRouter(
        results.map((router: any) => ({
          value: router.value,
          label: router.description.split(",")[0],
          desc: router.description.split(",")[1],
        }))
      );
    })();
  }, [keySearchRouter]);

  useLayoutEffect(() => {
    (async () => {
      const rsRouter = await AxiosService.get(
        "/api/method/mbw_dms.api.router.get_list_router",
        {
          params: {
            page_size: PAGE_SIZE,
            page_number: page,
            status,
            router:
              router && router.length > 0
                ? router.reduce((prev, now) => `${prev};${now}`)
                : "",
            employee,
            ...filter,
            order_by: orderField.value,
            sort: orderBy,
          },
        }
      );

      setRouterTable(rsRouter?.result?.data);
      setTotal(rsRouter?.result?.total);
    })();
  }, [
    router,
    employee,
    status,
    page,
    filter,
    orderBy,
    orderField,
    rfRouter,
    refresh,
  ]);
  const handleUpdate = useCallback(
    async (type: string, value: string) => {
      try {
        let rsUpdate: rsData<router[]> = await AxiosService.patch(
          "/api/method/mbw_dms.api.router.update_routers",
          {
            name: selectedRowKeys,
            [type]: value,
          }
        );
        successMsg("Cập nhật router thành công");
        setRouterTable((prev) => {
          let arrNameUpdate = rsUpdate.result.map((rt) => rt.name);
          const routerNotUpdate = prev.filter(
            (router) => !arrNameUpdate.includes(router.name)
          );

          return [...rsUpdate.result, ...routerNotUpdate].filter(
            (vl) => !vl.is_deleted
          );
        });
        setAction({
          isOpen: false,
          action: false,
          data: null,
        });
      } catch (err) {
        errorMsg("Cập nhật router thất bại");
      }
    },
    [selectedRowKeys]
  );

  //thêm nhóm bán hàng
  useEffect(() => {
    (async () => {
      let rsSales: rsData<listSale[]> = await AxiosService.get(
        "/api/method/mbw_dms.api.router.get_team_sale"
      );
      console.log(
        "tree",
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
    let heightHeader = 0
    if(headerPageRef.current) {
      heightHeader =  headerPageRef.current?.offsetHeight
    }
    let heighTableHeader = 0
    if(headerContentRef.current) {
      heighTableHeader =  headerContentRef.current?.offsetHeight
    }

    console.log({
      screen: size.h,
      header: heightHeader,
      headerT: heighTableHeader
    });
    
    setScrollYTable((size.h - heighTableHeader - heightHeader - 40 -32 -80));
  }, [size]);

  return (
    <>
      <ContentFrame
        header={
          <HeaderPage
            ref={headerPageRef}
            title="Quản lý tuyến"
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
                // label: "Xuất excel",
                icon: <LiaDownloadSolid className="text-xl" />,
                size: "20px",
                className: "flex items-center mr-2",
                action: () => {
                  translationUrl("/app/data-export/Data%20Export");
                },
              },
              {
                // label: "Nhập excel",
                icon: <LuUploadCloud className="text-xl" />,
                size: "20px",
                className: "flex items-center mr-2",
                action: () => {
                  translationUrl(`/app/data-import/new-data-import`);
                },
              },
              {
                label: "Thêm mới",
                type: "primary",
                icon: <VscAdd className="text-xl" />,
                size: "20px",
                className: "flex items-center",
                action: () => navigate("/dms-router/create-dms-router"),
              },
            ]}
            customButton={
              <>
                <Dropdown
                  trigger={["click"]}
                  placement="bottomRight"
                  dropdownRender={(menu) => (
                    <DropDownCustom>
                      <div className="-m-2">
                        <div
                          className="py-2 px-4 cursor-pointer hover:bg-[#f5f5f5] w-[168px]"
                          onClick={setAction.bind(null, {
                            isOpen: true,
                            action: "Khoá",
                            data: {
                              type: "status",
                              value: "Lock",
                            },
                          })}
                        >
                          Khóa tuyến
                        </div>
                        <div
                          className="py-2 px-4 cursor-pointer hover:bg-[#f5f5f5] w-[168px]"
                          onClick={setAction.bind(null, {
                            isOpen: true,
                            action: "Khoá",
                            data: {
                              type: "status",
                              value: "Active",
                            },
                          })}
                        >
                          Mở tuyến{" "}
                        </div>
                        <div
                          className="py-2 px-4 cursor-pointer hover:bg-[#f5f5f5] w-[168px]"
                          onClick={setAction.bind(null, {
                            isOpen: true,
                            action: "Khoá",
                            data: {
                              type: "is_deleted",
                              value: "set",
                            },
                          })}
                        >
                          Xóa Tuyến
                        </div>
                      </div>
                    </DropDownCustom>
                  )}
                >
                  <Button type="primary" className="ml-2 flex items-center">
                    {" "}
                    Hành động{" "}
                    <span className="text-base">
                      <MdKeyboardArrowDown />
                    </span>{" "}
                  </Button>
                </Dropdown>
              </>
            }
          />
        }
      >
        <div className="flex flex-col bg-white rounded-lg border border-solid border-[#DFE3E8]">
            {/* header  */}
            <Row className="justify-between w-full  px-4 pt-7 pb-5" ref={headerContentRef}>
              <Col span={14} className="hidden lg:block">
                <Row gutter={8}>
                  {/* bộ lọc tuyến  */}
                  <Col span={6}>
                      <SelectCommon
                        className="!w-full"
                        // labelInValue
                        mode="multiple"
                        filterOption={false}
                        onChange={(value) => {
                          setRouter(value);
                          setPage(1)
                        }}
                        onDeselect={(value) => {
                          setRouter((prev) =>
                            prev?.filter((vl) => vl !== value)
                          );
                        }}
                        showSearch
                        placeholder="Tuyến"
                        notFoundContent={null}
                        onSearch={(value: string) => setKeySRouter(value)}
                        options={listRouter}
                        allowClear
                        optionRender={(option) => {
                          return (
                            <div className="text-sm">
                              <p
                                role="img"
                                aria-label={option.data.label}
                                className="my-1"
                              >
                                {option.data.label}
                              </p>
                              <span className="text-xs !font-semibold">
                                {option.data.desc}
                              </span>
                            </div>
                          );
                        }}
                      />
                  </Col>
                  {/* lọc nhân viên mới */}
                  <Col span={6} >
                    
                      <TreeSelectCommon
                        showSearch
                        placeholder="Nhóm bán hàng"
                        allowClear
                        treeData={listSales}
                        value={team_sale}
                        onChange={ (newValue: string,...rest):void => {
                          console.log(newValue);
                          setTeamSale(newValue);
                          setPage(1)
                        }}
                        dropdownStyle={{
                          maxHeight: 400,
                          overflow: "auto",
                          minWidth: 400,
                        }}
                      />
                      {/* <FormItemCustom className="w-full border-none mr-2">
                    </FormItemCustom> */}
                  </Col>

                  <Col span={6} >
                    <SearchEmployee setEmployee={(value) =>{
                      setEmployee(value)
                      setPage(1)
                    }} employee={employee} isdeletedField={isdeletedField} team_sale={team_sale}/>
                  </Col>
                  {/* lọc trạng thái */}
                  <Col span={6}>
                      <SelectCommon
                        placeholder="Trạng thái"
                        onChange={onChange}
                        onSearch={onSearch}
                        value={status}
                        filterOption={filterOption}
                        onClear={() => setStatus(undefined)}
                        options={[
                          {
                            value: "Active",
                            label: "Hoạt động",
                          },
                          {
                            value: "Lock",
                            label: "Khóa",
                          },
                        ]}
                        allowClear
                      />
                    <FormItemCustom className="w-[150px] border-none">
                    </FormItemCustom>
                  </Col>
                </Row>
              </Col>
              <Col className="">
                <div className="flex flex-wrap items-center">
                  <div className="flex justify-center items-center mr-4">
                    <Dropdown
                      trigger={["click"]}
                      placement="bottomRight"
                      dropdownRender={(menu) => (
                        <DropDownCustom title="Bộ lọc">
                          <Filter action={(value: any) =>{
                            setFilter(value);
                            setPage(1);
                          }} form={form} />
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
                    <Button
                      className="border-l-[0.1px] rounded-l-none h-[32px]"
                      onClick={() => form.resetFields()}
                    >
                      <LuFilterX style={{ fontSize: "20px" }} />
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>
            {/* hien thi table  */}
            <div className=" flex-1">
              <div className="w-full max-h-full box-border">
                <TableCustom
                  ref={tableRef}
                  rowSelection={rowSelection}
                  onRow={(record, rowIndex) => {
                    return {
                      onClick: (event) => {
                        console.log(record);
                        navigate(`/dms-router/${record?.name}`);
                      },
                    };
                  }}
                  columns={columns}
                  dataSource={routersTable?.map((router) => ({
                    key: router.name,
                    ...router,
                  }))}
                  pagination={
                    total && total > PAGE_SIZE
                      ? {
                          pageSize: PAGE_SIZE,
                          total,
                          current: page,
                          onChange(page, pageSize) {
                            setPage(page);
                          },
                          showSizeChanger:false
                        }
                      : false
                  }
                  
                  scroll={{
                    x: "max-content",
                    y:scrollYTable
                  }}
                />
              </div>
            </div>
          </div>
      </ContentFrame>

      <Modal
        open={action.isOpen}
        onCancel={setAction.bind(null, {
          isOpen: false,
          data: null,
          action: false,
        })}
        cancelText="Huỷ"
        okText="Đồng ý"
        onOk={handleUpdate.bind(null, action.data?.type, action.data?.value)}
        title={`${action.action} tuyến`}
      >
        <span>
          {action.action} {selectedRowKeys.length} đã chọn ?
        </span>
      </Modal>
    </>
  );
}

export default memo(RouterControl);
