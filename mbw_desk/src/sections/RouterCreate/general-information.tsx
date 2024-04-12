import React, { memo, useEffect, useState } from "react";
import { FormItemCustom } from "../../components/form-item/form-item";
import { Col, DatePicker, Input, Select, TreeSelect } from "antd";
import RowCustom from "./styled";
import { optionsTravel_date, statusOption } from "./data";
import { rsData, rsDataFrappe } from "../../types/response";
import { listSale } from "../../types/listSale";
import { AxiosService } from "../../services/server";
import { employee } from "../../types/employeeFilter";
import useDebounce from "../../hooks/useDebount"
import { treeArray } from "../../util";

let timeout: ReturnType<typeof setTimeout> | null;
let currentValue: string;

const fetch = (value: string, callback: Function) => {
  console.log(value);
  
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
  currentValue = value;

  const fake = () => {
    //call api tại đây 
    callback(value)
  };
  if (value) {
    timeout = setTimeout(fake, 300);
  } else {
    callback("");
  }
};
export default memo(function GeneralInformation({form}:{form :any}) {
  console.log(form);
  
  // const { getFieldDecorator, setFieldsValue } = form;
  const [keySearch, setKeySearch] = useState("");
  let seachbykey = useDebounce(keySearch)
  const [listSales, setListSales] = useState<any[]>([]);
  const [listEmployees, setListEmployees] = useState<any[]>([]);
  const [teamSale,setTeamSale] = useState<string>()
  const [saleEmp,setSaleEmp] = useState<string>()
  useEffect(() => {
    (async () => {
      try {
        let rsSales: rsData<listSale[]> = await AxiosService.get(
          "/api/method/mbw_dms.api.router.get_team_sale"
        );
        console.log("tree",treeArray({data: rsSales.result.map((team_sale:listSale) => ({
          title: team_sale.name,
          value: team_sale.name,
          ...team_sale
        })),keyValue: "value", parentField: "parent_sales_person"}));
        
        // setListSales(rsSales.result.map((team_sale:listSale) => ({
        //   label: team_sale.name,
        //   value: team_sale.name
        // })))
        setListSales(treeArray({data: rsSales.result.map((team_sale:listSale) => ({
          title: team_sale.name,
          value: team_sale.name,
          ...team_sale
        })),keyValue: "value", parentField: "parent_sales_person"}))
        
      } catch (error) {
        
      }
    })();
  }, []);
  useEffect(() => {
    (async() => {
      try {
        let rsEmployee: rsDataFrappe<employee[]> = await AxiosService.get("/api/method/mbw_dms.api.router.get_sale_person",{
        params: {
          team_sale:teamSale,
          key_search: seachbykey
        }
        }
          );
     let {message:results} = rsEmployee  
      setListEmployees(results.map((employee_filter:employee) => ({
        value: employee_filter.employee_code,
        label: employee_filter.employee_name || employee_filter.employee_code
      })))
        
      } catch (error) {
        
      }
    })()
  },[teamSale,seachbykey])
  return (
    <div className="p-4 pt-[43px] pb-[58px]">
      <RowCustom>
        <Col span={12}>
          <FormItemCustom label="Mã tuyến" name="channel_code" required>
            <Input />
          </FormItemCustom>
        </Col>
        <Col span={12}>
          <FormItemCustom label="Tên tuyến" name="channel_name" required>
            <Input />
          </FormItemCustom>
        </Col>
      </RowCustom>
      <RowCustom>
        <Col span={12}>
          <FormItemCustom label="Team sale" name="team_sale" required>
            <TreeSelect showSearch treeData={listSales}  onChange={(value:string) => {
              setTeamSale(value)
              form.setFieldsValue({"employee":undefined})
            }}/>
          </FormItemCustom>
        </Col>
        <Col span={12}>
          <FormItemCustom label="Nhân viên" name="employee" required>
            <Select 
            showSearch
            onSearch={setKeySearch}
            options={listEmployees}
            allowClear
            />
          </FormItemCustom>
        </Col>
      </RowCustom>
      <RowCustom>
        <Col span={12}>
          <FormItemCustom label="Ngày đi tuyến" name="travel_date" required>
            <Select options={optionsTravel_date} />
          </FormItemCustom>
        </Col>
        <Col span={12}>
          <FormItemCustom label="Trạng thái" name="status">
            <Select options={statusOption} defaultValue={"Active"} />
          </FormItemCustom>
        </Col>
      </RowCustom>
    </div>
  );
})
