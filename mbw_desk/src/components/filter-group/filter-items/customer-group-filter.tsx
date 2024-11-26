/** @format */

import { SelectCommon } from "@/components/select/select";
import { mediaQuery } from "@/constant";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { AxiosService } from "@/services/server";
import { Col } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCustomerGroup } from "@/redux/slices/groups-slice";
export const CustomerGroup = ({ className }: { className?: String }) => {
  //nhom khach hang
  const [listCustomerGroup, setListCustomerGroup] = useState<any[]>([]);
  const [keySearchCustomerGroup, setKeySearchCustomerGroup] =
    useState<string>("");
  const matchMedia = useMediaQuery(`${mediaQuery}`);

  const dispatch = useDispatch();
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

      setListCustomerGroup(
        results.map((dtCustomerGroup: any) => ({
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
      } ${className}`}
    >
      <label className={`text-xs font-normal leading-[21px] pl-1 `}>
        Nhóm khách hàng
      </label>
      <SelectCommon
        className="!bg-[#F4F6F8] options:bg-[#F4F6F8]"
        options={listCustomerGroup}
        allowClear
        onSearch={(value: string) => {
          setKeySearchCustomerGroup(value);
        }}
        onClear={() => dispatch(setCustomerGroup(undefined))}
        showSearch
        placeholder="Tất cả nhóm khách hàng"
        onSelect={(value: any) => {
          dispatch(setCustomerGroup(value));
        }}
      />
    </Col>
  );
};
