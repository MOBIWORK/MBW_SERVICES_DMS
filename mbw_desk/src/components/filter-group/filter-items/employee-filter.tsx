/** @format */

import { useEffect, useState } from "react";
import { Col } from "antd";
import { SelectCommon } from "../../select/select";
import { rsDataFrappe } from "../../../types/response";
import { employee } from "../../../types/employeeFilter";
import { AxiosService } from "../../../services/server";
import { useDispatch, useSelector } from "react-redux";
import { setEmployee } from "@/redux/slices/groups-slice";

interface EmployeeFilterProps {
  setPage: (value: number) => void;
  matchMedia?: boolean;
}

export const EmployeeFilter = ({
  setPage,
  matchMedia,
}: EmployeeFilterProps) => {
  const [listEmployees, setListEmployees] = useState<any[]>([]);
  const [keySeartEmployee, setKeySearchEmployee] = useState<string>("");

  const dispatch = useDispatch();
  const { sales_team } = useSelector((state: any) => state.group);

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
  }, [keySeartEmployee, sales_team]);
  return (
    <Col className={`min-w-[130px] ${matchMedia ? "w-full" : "w-[20%]"}`}>
      <label className="text-xs font-normal leading-[21px] pl-1 ">
        Nhân viên
      </label>
      <SelectCommon
        filterOption={true}
        // notFoundContent={null}
        allowClear
        showSearch
        placeholder="Tất cả nhân viên"
        onSearch={(value: string) => {
          setKeySearchEmployee(value);
        }}
        options={listEmployees}
        onSelect={(value: any) => {
          dispatch(setEmployee(value));
          setPage(1);
        }}
        onClear={() => {
          dispatch(setEmployee(""));
        }}
      />
    </Col>
  );
};
