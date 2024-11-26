/** @format */

import { SelectCommon } from "@/components/select/select";
import { mediaQuery } from "@/constant";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Col } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setCustomerType } from "@/redux/slices/groups-slice";
import { useEffect, useState } from "react";
import useDebounce from "@/hooks/useDebount";
import { AxiosService } from "@/services/server";
import { RootState } from "@/redux/store";
interface customerType {
  value: String;
  description: String;
}
export const CustomerType = ({ className }: { className?: String }) => {
  const dispatch = useDispatch();
  const { customer_type } = useSelector((state: RootState) => state.group);
  const [typecustomers, setCustomersType] = useState();

  const matchMedia = useMediaQuery(`${mediaQuery}`);
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

      setCustomersType(
        results.map((customerType: customerType) => ({
          value: customerType?.value,
          description:
            customerType?.description != ""
              ? customerType?.description
              : customerType?.value,
        }))
      );
    })();
  }, [keysearch]);
  return (
    <Col
      className={`min-w-[130px] ${
        matchMedia ? "w-full" : "w-[20%]"
      } ${className}`}>
      <label className="text-xs font-normal leading-[21px] pl-1 ">
        Loại khách hàng
      </label>
      <SelectCommon
        className="!bg-[#F4F6F8] options:bg-[#F4F6F8]"
        options={typecustomers}
        allowClear
        showSearch
        placeholder="Tất cả loại khách hàng"
        onSearch={(value: string) => {
          setKeySearchCustomerType(value);
        }}
        onSelect={(value: any) => {
          dispatch(setCustomerType(value));
        }}
        onClear={() => dispatch(setCustomerType(undefined))}
      />
    </Col>
  );
};
