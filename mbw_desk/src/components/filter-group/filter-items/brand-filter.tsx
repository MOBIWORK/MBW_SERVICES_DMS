/** @format */

import { useEffect, useState } from "react";
import { Col } from "antd";
import { SelectCommon } from "../../select/select";
import { AxiosService } from "../../../services/server";
import { useDispatch } from "react-redux";
import { setBrand } from "@/redux/slices/groups-slice";
interface BrandFilterProps {
  setPage: (value: number) => void;
  matchMedia?: boolean;
}

type brand = {
  value: string;
  description: string;
};
export const BrandFilter = ({ setPage, matchMedia }: BrandFilterProps) => {
  const [listBrand, setListBrand] = useState<any[]>([]);

  const [keySearchBrand, setKeySearchBrand] = useState<String>("");

  const dispatch = useDispatch();
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
  return (
    <Col className={`min-w-[130px] ${matchMedia ? "w-full" : "w-[20%]"}`}>
      <label className="text-xs font-normal leading-[21px] pl-1 ">
        Nhãn hiệu
      </label>
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
          setPage(1);
        }}
        onClear={() => {
          dispatch(setBrand(""));
        }}
      />
    </Col>
  );
};
