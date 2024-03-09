import { VerticalAlignBottomOutlined } from "@ant-design/icons";
import { FormItemCustom, HeaderPage } from "../../components";
import { DatePicker, Select } from "antd";
import { DatePickerProps } from "antd/lib";
import { useEffect, useState } from "react";
import useDebounce from "../../hooks/useDebount";
import { rsDataFrappe } from "../../types/response";
import { AxiosService } from "../../services/server";
import { employee } from "../../types/employeeFilter";

export default function ReportCheckin() {
    const [listEmployees, setListEmployees] = useState<any[]>([]);
    const [listSales, setListSales] = useState<any[]>([]);
    const [team_sale, setTeamSale] = useState<string>();
    const [keySearch4, setKeySearch4] = useState("");
    const [employee, setEmployee] = useState<string>();
    let seachbykey = useDebounce(keySearch4);
    const [keyS3, setKeyS3] = useState("");
  
    let keySearch3 = useDebounce(keyS3, 300);
  
    const onChange: DatePickerProps["onChange"] = (dateString) => {
      console.log(dateString);
    };
  
    useEffect(() => {
      (async () => {
        let rsEmployee: rsDataFrappe<employee[]> = await AxiosService.get(
          "/api/method/mbw_dms.api.router.get_sale_person",
          {
            params: {
              team_sale: team_sale,
              key_search: seachbykey,
            },
          }
        );
        console.log("rsemp", rsEmployee);
        let { message: results } = rsEmployee;
        setListEmployees(
          results.map((employee_filter: employee) => ({
            value: employee_filter.employee_code,
            label: employee_filter.employee_name || employee_filter.employee_code,
          }))
        );
      })();
    }, [team_sale, seachbykey]);
  return (
    <>
      <HeaderPage
        title="Báo cáo viếng thăm"
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
      <div className="bg-white rounded-md py-7 px-4 border-[#DFE3E8] border-[0.2px] border-solid">
        <div className="flex justify-start items-center">
          <FormItemCustom className="w-[200px] border-none mr-2">
            <DatePicker
              format={"DD-MM-YYYY"}
              className="!bg-[#F4F6F8]"
              placeholder="Từ ngày"
              onChange={onChange}
            />
          </FormItemCustom>
          <FormItemCustom className="w-[200px] border-none mr-2">
            <DatePicker
              format={"DD-MM-YYYY"}
              className="!bg-[#F4F6F8]"
              placeholder="Đến ngày"
              onChange={onChange}
            />
          </FormItemCustom>
          <FormItemCustom className="w-[200px] border-none mr-2">
            <Select
              className="!bg-[#F4F6F8] options:bg-[#F4F6F8]"
              defaultValue={""}
              options={[
                { label: "Tất cả nhóm bán hàng", value: "" },
                ...listSales,
              ]}
              showSearch
              notFoundContent={null}
              onSearch={(value: string) => setKeyS3(value)}
              onChange={(value) => {
                setTeamSale(value);
              }}
            />
          </FormItemCustom>

          <FormItemCustom className="w-[200px] border-none mr-2">
            <Select
              className="!bg-[#F4F6F8] options:bg-[#F4F6F8]"
              options={[
                { label: "Tất cả nhân viên", value: "" },
                ...listEmployees,
              ]}
              showSearch
              defaultValue={""}
              notFoundContent={null}
              onSearch={setKeySearch4}
              onChange={(value) => {
                setEmployee(value);
              }}
              allowClear
            />
          </FormItemCustom>
        </div>
      </div>
    </>
  );
}
