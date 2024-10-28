/** @format */

import { useEffect, useState } from "react";
import { Col } from "antd";
import { SelectCommon } from "../../select/select";
import { AxiosService } from "../../../services/server";

import { useDispatch } from "react-redux";
import { setSupplier } from "@/redux/slices/groups-slice";

interface SupplierFilterProps {
  setPage: (value: number) => void;
  setSupplier?: (value: string) => void;
  matchMedia?: boolean;
}

interface supplier {
  value: string;
  description: string;
}

export const SupplierFilter = ({ setPage }: SupplierFilterProps) => {
  const [listSupplier, setListsupplier] = useState<any[]>([]);

  const [keySearchSpiller, setKeySearchSpiller] = useState<String>("");
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      let supplier: any = await AxiosService.get(
        "/api/method/frappe.desk.search.search_link",
        {
          params: {
            txt: keySearchSpiller,
            doctype: "Supplier",
            ignore_user_permissions: 0,
            query: "",
          },
        }
      );

      let { message: results } = supplier;
      setListsupplier(
        results.map((supplier: supplier) => ({
          value: supplier?.value,
          label: supplier.description.split(",")[0].trim(),
        }))
      );
    })();
  }, [keySearchSpiller]);
  return (
    <Col className={`min-w-[130px] w-[20%]`}>
      <label className="text-xs font-normal leading-[21px] pl-1 ">
        Nhà Cung cấp
      </label>
      <SelectCommon
        filterOption={false}
        allowClear
        showSearch
        placeholder="Tất cả nhà cung cấp"
        onSearch={(value: string) => {
          setKeySearchSpiller && setKeySearchSpiller(value);
        }}
        options={listSupplier}
        onSelect={(value: any) => {
          dispatch(setSupplier(value));
          setPage(1);
        }}
        onClear={() => {
          dispatch(setSupplier(""));
        }}
      />
    </Col>
  );
};
