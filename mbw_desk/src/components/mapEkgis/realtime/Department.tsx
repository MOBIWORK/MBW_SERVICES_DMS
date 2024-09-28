import { TreeSelectCommon } from "@/components/select/select";
import { AxiosService } from "@/services/server";
import { functionType } from "@/types/dashboard";
import { listSale } from "@/types/listSale";
import { rsData } from "@/types/response";
import { treeArray } from "@/util";
import { Select } from "antd";
import React, { memo, useLayoutEffect, useState } from "react";

interface Props {
  team_sale: string;
  setTeamSale: functionType;
}

function DepartmentSelect(props: Props) {
  const [listDepartment, setDepartment] = useState<any[]>([]);

  //thêm nhóm bán hàng
  useLayoutEffect(() => {
    (async () => {
      let rsSales: rsData<listSale[]> = await AxiosService.get(
        "/api/method/mbw_dms.api.router.get_team_sale"
      );
      setDepartment(
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
    <div>
      <span className="mr-2">Nhóm bán hàng</span>
      <TreeSelectCommon
       className="w-[200px]"
        showSearch
        placeholder="Nhóm bán hàng"
        allowClear
        treeData={listDepartment}
        value={props.team_sale}
        defaultValue={null}
        onChange={props.setTeamSale}
        dropdownStyle={{
          maxHeight: 400,
          overflow: "auto",
          minWidth: 200,
        }}

      />
    </div>
  );
}

export default memo(DepartmentSelect);
