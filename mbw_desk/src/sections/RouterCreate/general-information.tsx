import React, {
  memo,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { FormItemCustom } from "../../components/form-item/form-item";
import { Col, Input, Select, TreeSelect } from "antd";
import RowCustom from "./styled";
import { optionsTravel_date, statusOption } from "./data";
import { rsData, rsDataFrappe } from "../../types/response";
import { listSale } from "../../types/listSale";
import { AxiosService } from "../../services/server";
import { employee } from "../../types/employeeFilter";
import useDebounce from "../../hooks/useDebount";
import { treeArray } from "../../util";
import { SaleGroupContext } from "./view";
import SelectEmpl from "./components/selectEmpl";
import { FormInstance } from "antd/lib";

export default memo(function GeneralInformation({ form }: { form: FormInstance }) {

  const [listSales, setListSales] = useState<any[]>([]);
  const { teamSale, setTeamSale } = useContext(SaleGroupContext);
  
  useEffect(() => {
    (async () => {
      try {
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
        const TREE_SALES = treeArray({
          data: rsSales.result.map((team_sale: listSale) => ({
            title: team_sale.name,
            value: team_sale.name,
            ...team_sale,
          })),
          keyValue: "value",
          parentField: "parent_sales_person",
        });
        setListSales(TREE_SALES);
      } catch (error) {}
    })();
  }, []);

  return (
    <div className="p-4 pb-[58px]">
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
            <TreeSelect
              showSearch
              treeData={listSales}
              onChange={(value: string) => {
                setTeamSale(value);
                form.setFieldsValue({ employee: undefined });
              }}
            />
          </FormItemCustom>
        </Col>
        <Col span={12}>
          <FormItemCustom label="Nhân viên" name="employee" required>
            <SelectEmpl teamSale={teamSale} callback={(value:string) => form.setFieldsValue({ employee: value })} defaultValue={form.getFieldValue("employee")}/>
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
});
