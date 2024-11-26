/** @format */

import { SelectCommon } from "@/components/select/select";
import { mediaQuery } from "@/constant";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { AxiosService } from "@/services/server";
import { Col, Select } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setPromotionCustomerGroup } from "@/redux/slices/promotion-slice";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { sortedData } from "@/util";

export const CustomerGroupPromotion = ({
  className,
  disable,
}: {
  className?: String;
  disable?: boolean;
}) => {
  //nhom khach hang
  const [listCustomerGroup, setListCustomerGroup] = useState<any[]>([]);
  const [keySearchCustomerGroup, setKeySearchCustomerGroup] =
    useState<string>("");
  const matchMedia = useMediaQuery(`${mediaQuery}`);

  const dispatch = useDispatch();

  const {
    promotionData: { customer_group },
  } = useSelector((state: RootState) => state.promotion);

  useEffect(() => {
    const checkAll = customer_group?.some((item: any) => {
      return item.value === "All Customer Groups";
    });

    if (checkAll && customer_group && customer_group.length > 1) {
      dispatch(setPromotionCustomerGroup(["All Customer Groups"]));
    }
    if (
      !checkAll &&
      customer_group &&
      customer_group.length === listCustomerGroup.length - 1
    ) {
      dispatch(setPromotionCustomerGroup(["All Customer Groups"]));
    }
  }, [customer_group]);

  useEffect(() => {
    (async () => {
      let rsCustomerGroup: any = await AxiosService.get(
        "/api/method/frappe.desk.search.search_link",
        {
          params: {
            txt: keySearchCustomerGroup,
            doctype: "Customer Group",
            ignore_user_permissions: 0,
            query: "",
          },
        }
      );

      let { message: results } = rsCustomerGroup;

      const sortResults = sortedData(results);
      setListCustomerGroup(
        sortResults.map((dtCustomerGroup: any) => ({
          value: dtCustomerGroup.value.trim(),
          label: dtCustomerGroup.value.trim(),
        }))
      );
    })();
  }, [keySearchCustomerGroup]);
  return (
    <Col
      className={`min-w-[130px] ${
        matchMedia ? "w-full" : "w-[20%]"
      } ${className}`}>
      <label className={`text-xs font-normal leading-[21px] pl-1 `}>
        Nhóm khách hàng
      </label>
      <Select
        disabled={disable}
        mode="multiple"
        className="!bg-[#F4F6F8] options:bg-[#F4F6F8] w-full"
        options={listCustomerGroup}
        allowClear
        onSearch={(value: string) => {
          setKeySearchCustomerGroup(value);
        }}
        defaultValue={"All Customer Groups"}
        value={
          customer_group && customer_group.length === 0
            ? undefined
            : customer_group
        }
        onClear={() => dispatch(setPromotionCustomerGroup([]))}
        showSearch
        placeholder="Chọn nhóm khách hàng"
        onChange={(value: any) => {
          dispatch(setPromotionCustomerGroup(value));
        }}
        onBlur={() => setKeySearchCustomerGroup("")}
      />
    </Col>
  );
};
