/** @format */

import { useEffect, useState } from "react";

import { rsData } from "../../types/response";
import { listSale } from "../../types/listSale";
import { treeArray } from "../../util";
import { rsDataFrappe } from "../../types/response";
import { employee } from "../../types/employeeFilter";
import { Row, Dropdown, Form, Button } from "antd";
import { DropDownCustom } from "..";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { mediaQuery } from "../../constant";
import { useForm } from "antd/es/form/Form";
import { SelectCommon, TreeSelectCommon } from "../select/select";
import { LuFilter } from "react-icons/lu";
import dayjs from "dayjs";
import { AxiosService } from "../../services/server";
import { typecustomer, psorder } from "../../sections/ReportSales/data";
import {
  FromDateFilter,
  MonthFilter,
  ToDateFilter,
  YearFilter,
} from "./filter-items";

import { useDispatch, useSelector } from "react-redux";
import {
  setCustomerType,
  setCustomerGroup,
  setTerritory,
  setEmployee,
  setSaleTeam,
  setCompany,
  setCustomer,
  setWarehouse,
  setHasSaleOrder,
  setBrand,
  setIndustry,
  setSupplier,
} from "@/redux/slices/groups-slice";

import { setEndDate, setStartDate } from "@/redux/slices/date-slice";
import { setMonth, setYear } from "@/redux/slices/month-slice";
import { supplier } from "@/types/supplier";

type brand = {
  value: string;
  description: string;
};

type industry = {
  value: string;
  description: string;
};
interface DropDownFilterProps {
  setPage?: (value: number) => void;
  matchMedia?: boolean;
  inputFromDate?: boolean;
  inputMonth?: boolean;
  inputToDate?: boolean;
  inputYear?: boolean;
  inputSaleGroup?: boolean;
  inputEmployee?: boolean;
  inputCompany?: boolean;
  inputCustomer?: boolean;
  inputTerritory?: boolean;
  inputWarehouse?: boolean;
  inputCustomerType?: boolean;
  inputCustomerGroup?: boolean;
  inputOrder?: boolean;
  inputSupplier?: boolean;
  inputIndustry?: boolean;
  inputBrand?: boolean;
}

const startOfMonth: any = dayjs().startOf("month");
const endOfMonth: any = dayjs().endOf("month");
let start = Date.parse(startOfMonth["$d"]) / 1000;
let end = Date.parse(endOfMonth["$d"]) / 1000;

const DropDownFilter = ({
  setPage,
  matchMedia,
  inputFromDate,
  inputMonth,
  inputToDate,
  inputYear,
  inputSaleGroup,
  inputEmployee,
  inputCompany,
  inputCustomer,
  inputTerritory,
  inputWarehouse,
  inputCustomerType,
  inputCustomerGroup,
  inputOrder,
  inputSupplier,
  inputIndustry,
  inputBrand,
}: DropDownFilterProps) => {
  const [listCustomer, setListCustomer] = useState<any[]>([]);
  const [listWarehouse, setListWarehouse] = useState<any[]>([]);
  const [listTerritory, setListTerritory] = useState<any[]>([]);
  const [listCustomerGroup, setListCustomerGroup] = useState<any[]>([]);
  const [listCompany, setListCompany] = useState<any[]>([]);
  const [listBrand, setListBrand] = useState<any[]>([]);
  const [listIndustry, setListIndustry] = useState<any[]>([]);
  const [listSales, setListSales] = useState<any[]>([]);
  const [listEmployees, setListEmployees] = useState<any[]>([]);
  const [listSupplier, setListsupplier] = useState<any[]>([]);

  const [keySearchSpiller, setKeySearchSpiller] = useState<String>("");
  const [keySeartEmployee, setKeySearchEmployee] = useState<string>("");
  const [keySearchCustomer, setKeySearchCustomer] = useState<string>("");
  const [keySearchTerritory, setKeySearchTerritory] = useState<string>("");
  const [keySearchCompany, setKeySearchCompany] = useState<string>("");
  const [keySearchWarehouse, setKeySearchWarehouse] = useState<string>("");
  const [keySearchBrand, setKeySearchBrand] = useState<String>("");
  const [keySearchIndustry, setKeySearchIndustry] = useState<String>("");

  const [keySearchCustomerGroup, setKeySearchCustomerGroup] =
    useState<string>("");

  const [formFilter] = useForm();

  const dispatch = useDispatch();
  const { sales_team } = useSelector((state: any) => state.group);

  // nganh hang
  useEffect(() => {
    (async () => {
      let industry: any = await AxiosService.get(
        "/api/method/frappe.desk.search.search_link",
        {
          params: {
            txt: keySearchIndustry,
            doctype: "SFA Industry",
            ignore_user_permissions: 0,
            query: "",
          },
        }
      );

      let { message: results } = industry;
      setListIndustry(
        results.map((industry: industry) => ({
          value: industry?.value,
          description: industry?.description,
        }))
      );
    })();
  }, [keySearchIndustry]);

  // Nhan hieu
  useEffect(() => {
    (async () => {
      let brand: any = await AxiosService.get(
        "/api/method/frappe.desk.search.search_link",
        {
          params: {
            txt: keySearchBrand,
            doctype: "Brand",
            ignore_user_permissions: 0,
            query: "",
          },
        }
      );

      let { message: results } = brand;
      setListBrand(
        results.map((brand: brand) => ({
          value: brand?.value,
          description: brand?.description,
        }))
      );
    })();
  }, [keySearchBrand]);

  // kahch hang
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

  //khu vuc
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

  //nhom khach hang
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

  // nhom ban hang
  useEffect(() => {
    (async () => {
      let rsSales: rsData<listSale[]> = await AxiosService.get(
        "/api/method/mbw_sfa.api.router.get_team_sale"
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

  // nhan vien
  useEffect(() => {
    (async () => {
      let rsEmployee: rsDataFrappe<employee[]> = await AxiosService.get(
        "/api/method/mbw_sfa.api.router.get_sale_person",
        {
          params: {
            team_sale: sales_team,
            key_search: keySeartEmployee,
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
  }, [sales_team, keySeartEmployee]);

  //cong ty
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

  // kho
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

  //nha cung cap
  useEffect(() => {
    (async () => {
      let supplier: any = await AxiosService.get(
        "/api/method/frappe.desk.search.search_link",
        {
          params: {
            txt: keySearchSpiller,
            doctype: "Supplier",
            ignore_user_permissions: 0,
            query: "",
          },
        }
      );

      let { message: results } = supplier;
      setListsupplier(
        results.map((supplier: supplier) => ({
          value: supplier?.value,
          label: supplier.description.split(",")[0].trim(),
        }))
      );
    })();
  }, [keySearchSpiller]);
  const handleSearchFilter = (val: any) => {
    if (val.customergroup) {
      dispatch(setCustomerGroup(val.customergroup));
    } else {
      dispatch(setCustomerGroup(""));
    }
    if (val.customertype) {
      dispatch(setCustomerType(val.customertype));
    } else {
      dispatch(setCustomerType(""));
    }
    if (val.territory) {
      dispatch(setTerritory(val.territory));
    } else {
      dispatch(setTerritory(""));
    }

    if (val.has_sales_order) {
      dispatch(setHasSaleOrder(val.has_sales_order));
    } else {
      dispatch(setHasSaleOrder(""));
    }

    if (val.filter_month) {
      dispatch(setStartDate(Date.parse(val.filter_month["$d"]) / 1000));
    } else {
      dispatch(setStartDate(start));
    }
    if (val.filter_year) {
      dispatch(setEndDate(Date.parse(val.filter_year["$d"]) / 1000));
    } else {
      dispatch(setEndDate(end));
    }
    if (val.company) {
      dispatch(setCompany(val.company));
    } else {
      dispatch(setCompany(""));
    }

    if (val.customer) {
      dispatch(setCustomer(val.customer));
    } else {
      dispatch(setCustomer(""));
    }

    if (val.warehouse) {
      dispatch(setWarehouse(val.warehouse));
    } else {
      dispatch(setWarehouse(""));
    }

    val.filter_group_sales
      ? dispatch(setSaleTeam(val.filter_group_sales))
      : dispatch(setSaleTeam(""));
    val.filter_employee
      ? dispatch(setEmployee(val.filter_employee))
      : dispatch(setEmployee(""));
    setPage && setPage(1);
  };

  return (
    <Dropdown
      className="!h-8"
      placement="bottomRight"
      trigger={["click"]}
      dropdownRender={() => (
        <DropDownCustom title={"Bộ lọc"}>
          <Form
            layout="vertical"
            form={formFilter}
            onFinish={handleSearchFilter}>
            {!matchMedia && (
              <>
                {inputFromDate && (
                  <Form.Item
                    className="w-[468px] border-none"
                    name="filter_month">
                    <FromDateFilter />
                  </Form.Item>
                )}
                {inputMonth && (
                  <Form.Item
                    className="w-[468px] border-none"
                    name="filter_month">
                    <MonthFilter setPage={setPage} />
                  </Form.Item>
                )}
                {inputToDate && (
                  <Form.Item
                    className="w-[468px] border-none"
                    name="filter_year">
                    <ToDateFilter />
                  </Form.Item>
                )}
                {inputYear && (
                  <Form.Item
                    className="w-[468px] border-none"
                    name="filter_year">
                    <YearFilter />
                  </Form.Item>
                )}

                {inputSaleGroup && (
                  <Form.Item
                    className="w-[468px] border-none"
                    name="filter_group_sales"
                    label={"Nhóm bán hàng"}>
                    <TreeSelectCommon
                      placeholder="Tất cả nhóm bán hàng"
                      allowClear
                      showSearch
                      treeData={listSales}
                      // onChange={(value: string) => {
                      //   setTeamSale && setTeamSale(value);
                      // }}
                      dropdownStyle={{
                        maxHeight: 400,
                        overflow: "auto",
                        minWidth: 350,
                      }}
                    />
                  </Form.Item>
                )}

                {inputEmployee && (
                  <Form.Item
                    className="w-[468px] border-none"
                    label={"Nhân viên"}
                    name="filter_employee">
                    <SelectCommon
                      filterOption={true}
                      allowClear
                      showSearch
                      placeholder="Tất cả nhân viên"
                      onSearch={(value: string) => {
                        setKeySearchEmployee(value);
                      }}
                      options={listEmployees}
                      // onSelect={(value: any) => {
                      //   setEmployee && setEmployee(value);
                      //   setPage(1);
                      // }}
                      onClear={() => {
                        setEmployee && setEmployee("");
                      }}
                    />
                  </Form.Item>
                )}
              </>
            )}

            {inputCompany && (
              <Form.Item
                name="company"
                label={"Công ty"}
                className="w-[468px] border-none">
                <SelectCommon
                  showSearch
                  className="!bg-[#F4F6F8] options:bg-[#F4F6F8]"
                  options={listCompany}
                  allowClear
                  onSearch={(value: string) => {
                    setKeySearchCompany(value);
                  }}
                  placeholder="Tất cả công ty"
                />
              </Form.Item>
            )}

            {inputCustomer && (
              <Form.Item
                name="customer"
                label={"Khách hàng"}
                className="w-[468px] border-none">
                <SelectCommon
                  showSearch
                  className="!bg-[#F4F6F8] options:bg-[#F4F6F8]"
                  options={listCustomer}
                  filterOption={false}
                  allowClear
                  onSearch={(value: string) => {
                    setKeySearchCustomer(value);
                  }}
                  placeholder="Tất cả khách hàng"
                />
              </Form.Item>
            )}

            {inputWarehouse && (
              <Form.Item
                name="warehouse"
                label={"Kho"}
                className="w-[468px] border-none">
                <SelectCommon
                  showSearch
                  className="!bg-[#F4F6F8] options:bg-[#F4F6F8]"
                  options={listWarehouse}
                  allowClear
                  onSearch={(value: string) => {
                    setKeySearchWarehouse(value);
                  }}
                  placeholder="Tất cả kho"
                />
              </Form.Item>
            )}

            {inputCustomerType && (
              <Form.Item
                name="customertype"
                label={"Loại khách hàng"}
                className="w-[468px] border-none">
                <SelectCommon
                  className="!bg-[#F4F6F8] options:bg-[#F4F6F8]"
                  options={typecustomer}
                  allowClear
                  showSearch
                  placeholder="Tất cả loại khách hàng"
                />
              </Form.Item>
            )}

            {inputCustomerGroup && (
              <Form.Item
                name="customergroup"
                label={"Nhóm khách hàng"}
                className="w-[468px] border-none">
                <SelectCommon
                  className="!bg-[#F4F6F8] options:bg-[#F4F6F8]"
                  options={listCustomerGroup}
                  allowClear
                  onSearch={(value: string) => {
                    setKeySearchCustomerGroup(value);
                  }}
                  showSearch
                  placeholder="Tất cả nhóm khách hàng"
                />
              </Form.Item>
            )}

            {inputOrder && (
              <Form.Item
                label={"Phát sinh đơn hàng"}
                name="hasorder"
                className="w-[468px] border-none">
                <SelectCommon
                  placeholder="Tất cả"
                  className="!bg-[#F4F6F8] options:bg-[#F4F6F8]"
                  options={psorder}
                  allowClear
                  showSearch
                />
              </Form.Item>
            )}

            {inputTerritory && (
              <Form.Item
                name="territory"
                label={"Khu vực"}
                className="w-[468px] border-none">
                <SelectCommon
                  showSearch
                  className="!bg-[#F4F6F8] options:bg-[#F4F6F8]"
                  options={listTerritory}
                  allowClear
                  onSearch={(value: string) => {
                    setKeySearchTerritory(value);
                  }}
                  placeholder="Tất cả khu vực"
                />
              </Form.Item>
            )}
            {inputBrand && (
              <Form.Item
                name="territory"
                label={"Nhãn hiệu"}
                className="w-[468px] border-none">
                <SelectCommon
                  filterOption={false}
                  allowClear
                  showSearch
                  placeholder="Tất cả nhãn hiệu"
                  onSearch={(value: string) => {
                    setKeySearchBrand(value);
                  }}
                  options={listBrand}
                  onSelect={(value: any) => {
                    dispatch(setBrand(value));
                    setPage && setPage(1);
                  }}
                  onClear={() => {
                    dispatch(setBrand(""));
                  }}
                />
              </Form.Item>
            )}

            {inputSupplier && (
              <Form.Item
                name="supplier"
                label={"Nhà cung cấp"}
                className="w-[468px] border-none">
                <SelectCommon
                  filterOption={false}
                  notFoundContent={null}
                  allowClear
                  showSearch
                  placeholder="Tất cả nhà cung cấp"
                  onSearch={(value: string) => {
                    setKeySearchSpiller(value);
                  }}
                  options={listSupplier}
                  onSelect={(value: any) => {
                    dispatch(setSupplier(value));
                    setPage && setPage(1);
                  }}
                  onClear={() => {
                    dispatch(setSupplier(""));
                  }}
                />
              </Form.Item>
            )}
            {inputIndustry && (
              <Form.Item
                name="industry"
                label={"Ngành hàng"}
                className="w-[468px] border-none">
                <SelectCommon
                  filterOption={false}
                  allowClear
                  showSearch
                  placeholder="Tất cả ngành hàng"
                  onSearch={(value: string) => {
                    setKeySearchIndustry(value);
                  }}
                  options={listIndustry}
                  onSelect={(value: any) => {
                    dispatch(setIndustry(value));
                    setPage && setPage(1);
                  }}
                  onClear={() => {
                    dispatch(setIndustry(""));
                  }}
                />
              </Form.Item>
            )}
          </Form>
          <Row className="justify-between pt-6 pb-4">
            <>
              <Button
                className="mr-3"
                onClick={(ev: any) => {
                  ev.preventDefault();
                  dispatch(setMonth(""));
                  dispatch(setYear(""));
                  dispatch(setSaleTeam(""));
                  dispatch(setEmployee(""));
                  formFilter.resetFields();
                }}>
                Đặt lại
              </Button>
              <Button
                type="primary"
                onClick={() => {
                  formFilter.submit();
                }}>
                Áp dụng
              </Button>
            </>
          </Row>
        </DropDownCustom>
      )}>
      <Button
        onClick={(e: any) => e.preventDefault()}
        className="flex items-center text-nowrap !text-[13px] !leading-[21px] !font-normal  border-r-[0.1px]  h-8 mt-4"
        icon={<LuFilter style={{ fontSize: "20px" }} />}>
        Bộ lọc
      </Button>
    </Dropdown>
  );
};

export default DropDownFilter;
