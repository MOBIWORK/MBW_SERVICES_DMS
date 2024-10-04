/** @format */
import { useEffect, useState } from "react";

import { Col } from "antd";
import { rsData } from "../../../types/response";
import { listSale } from "../../../types/listSale";
import { AxiosService } from "../../../services/server";
import { treeArray } from "../../../util";
import { TreeSelectCommon } from "@/components/select/select";
import { useDispatch } from "react-redux";
import { setSaleTeam } from "@/redux/slices/groups-slice";

export const SaleGroupFilter = () => {
  const dispatch = useDispatch();
  const [listSales, setListSales] = useState<any[]>([]);

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
  return (
    <Col className={`min-w-[130px]  w-[20%]`}>
      <label className="text-xs font-normal leading-[21px] pl-1 ">
        Nhóm bán hàng
      </label>
      <TreeSelectCommon
        placeholder="Tất cả nhóm bán hàng"
        allowClear
        showSearch
        treeData={listSales}
        onChange={(value: string) => {
          dispatch(setSaleTeam(value));
        }}
        dropdownStyle={{
          maxHeight: 400,
          overflow: "auto",
          minWidth: 350,
        }}
      />
    </Col>
  );
};
