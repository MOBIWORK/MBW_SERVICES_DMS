/** @format */

import { useEffect, useState } from "react";
import { Col } from "antd";
import { SelectCommon } from "../../select/select";
import { AxiosService } from "../../../services/server";
import { useDispatch } from "react-redux";
import { setIndustry } from "@/redux/slices/groups-slice";

type industry = {
  value: string;
  description: string;
};
interface IndustryFilterProps {
  setPage: (value: number) => void;
  matchMedia?: boolean;
}

export const IndustryFilter = ({ setPage }: IndustryFilterProps) => {
  const [listIndustry, setListIndustry] = useState<any[]>([]);
  const [keySearchIndustry, setKeySearchIndustry] = useState<String>("");

  const dispatch = useDispatch();
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
  return (
    <Col className={`min-w-[130px] w-[20%]`}>
      <label className="text-xs font-normal leading-[21px] pl-1 ">
        Ngành hàng
      </label>
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
          setPage(1);
        }}
        onClear={() => {
          dispatch(setIndustry(""));
        }}
      />
    </Col>
  );
};
