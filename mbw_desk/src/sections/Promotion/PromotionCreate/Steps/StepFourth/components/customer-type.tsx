/** @format */

import { mediaQuery } from "@/constant";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Col, Select } from "antd";

import { useDispatch, useSelector } from "react-redux";
import { setPromotionCustomerType } from "@/redux/slices/promotion-slice";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { AxiosService } from "@/services/server";
import useDebounce from "@/hooks/useDebount";
import { sortedData } from "@/util";

interface customerType {
  value: String;
  description: String;
}

export const CustomerTypePromotion = ({
  className,
  disable,
}: {
  className?: String;
  disable?: boolean;
}) => {
  //nhom khach hang
  const dispatch = useDispatch();
  const matchMedia = useMediaQuery(`${mediaQuery}`);
  const [listCustomerType, setListCustomerType] = useState([]);
  const [keySearchCustomerType, setKeySearchCustomerType] =
    useState<String>("");
  let keysearch = useDebounce(keySearchCustomerType);
  useEffect(() => {
    (async () => {
      let customerType: any = await AxiosService.get(
        "/api/method/frappe.desk.search.search_link",
        {
          params: {
            txt: keysearch,
            doctype: "SFA Customer Type",
            ignore_user_permissions: 0,
            query: "",
          },
        }
      );

      let { message: results } = customerType;
      results.push({
        value: "All Customer Type",
        description: "All Customer Type",
      });
      const sortedResults = sortedData(results);
      setListCustomerType(
        sortedResults.map((customerType: customerType) => ({
          value: customerType?.value,
          description: customerType?.description,
        }))
      );
    })();
  }, [keysearch]);

  const {
    promotionData: { customer_type },
  } = useSelector((state: RootState) => state.promotion);

  useEffect(() => {
    const checkAll = customer_type?.some((item: any) => {
      return item.value === "All Customer Type";
    });

    if (checkAll && customer_type && customer_type.length > 1) {
      dispatch(setPromotionCustomerType(["All Customer Type"]));
    }
    if (
      !checkAll &&
      customer_type &&
      customer_type.length === listCustomerType.length - 1
    ) {
      dispatch(setPromotionCustomerType(["All Customer Type"]));
    }
  }, [customer_type]);
  return (
    <Col
      className={`min-w-[130px] ${
        matchMedia ? "w-full" : "w-[20%]"
      } ${className}`}>
      <label className="text-xs font-normal leading-[21px] pl-1 ">
        Loại khách hàng
      </label>
      <Select
        disabled={disable}
        mode="multiple"
        className="!bg-[#F4F6F8] options:bg-[#F4F6F8] w-full"
        options={listCustomerType}
        value={
          customer_type && customer_type.length === 0
            ? undefined
            : customer_type
        }
        defaultValue={"All Customer Type"}
        allowClear
        onSearch={(value: string) => {
          setKeySearchCustomerType(value);
        }}
        showSearch
        placeholder="Tất cả loại khách hàng"
        onChange={(value: any) => {
          dispatch(setPromotionCustomerType(value));
        }}
        onClear={() => dispatch(setPromotionCustomerType([]))}
        onBlur={() => setKeySearchCustomerType("")}
      />
    </Col>
  );
};
