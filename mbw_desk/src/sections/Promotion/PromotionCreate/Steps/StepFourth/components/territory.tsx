/** @format */
/** @format */

import { SelectCommon } from "@/components/select/select";
import { mediaQuery } from "@/constant";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Col, Select } from "antd";

import { useDispatch, useSelector } from "react-redux";
import { setPromotionTerritory } from "@/redux/slices/promotion-slice";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { AxiosService } from "@/services/server";
import useDebounce from "@/hooks/useDebount";
import { Space } from "antd/lib";
import { sortedData } from "@/util";

interface TerritoryType {
  value: String;
  description: String;
}

export const TerritoryPromotion = ({
  className,
  disable,
}: {
  className?: String;
  disable?: boolean;
}) => {
  //nhom khach hang
  const dispatch = useDispatch();
  const matchMedia = useMediaQuery(`${mediaQuery}`);
  const [listTerrioty, setListTerrioty] = useState([]);
  const [keySearchCustomerType, setKeySearchTerritory] = useState<String>("");
  let keySearchTerritory = useDebounce(keySearchCustomerType);

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
      const sortResults = sortedData(results);
      setListTerrioty(
        sortResults.map((dtTerritory: any) => ({
          value: dtTerritory.value,
          label: dtTerritory.value,
        }))
      );
    })();
  }, [keySearchTerritory]);

  const {
    promotionData: { territory },
  } = useSelector((state: RootState) => state.promotion);

  useEffect(() => {
    const checkAll = territory?.some((item: any) => {
      return item.value === "All Territories";
    });

    if (checkAll && territory && territory.length > 1) {
      dispatch(setPromotionTerritory(["All Territories"]));
    }
    if (
      !checkAll &&
      territory &&
      territory.length === listTerrioty.length - 1
    ) {
      dispatch(setPromotionTerritory(["All Territories"]));
    }
  }, [territory]);

  return (
    <Col
      className={`min-w-[130px] ${
        matchMedia ? "w-full" : "w-[20%]"
      } ${className}`}>
      <label className="text-xs font-normal leading-[21px] pl-1 ">
        Khu vực
      </label>
      <Select
        disabled={disable}
        className="!bg-[#F4F6F8] options:bg-[#F4F6F8] w-[100%]"
        defaultValue={"All Territories"}
        options={listTerrioty}
        value={territory && territory.length === 0 ? undefined : territory}
        allowClear
        mode="multiple"
        onSearch={(value: string) => {
          setKeySearchTerritory(value);
        }}
        showSearch
        placeholder="Chọn loại khu vực"
        onChange={(value: any) => {
          dispatch(setPromotionTerritory(value));
        }}
        onClear={() => dispatch(setPromotionTerritory([]))}
        onBlur={() => setKeySearchTerritory("")}
      />
    </Col>
  );
};
