/** @format */

import React, { memo, useEffect } from "react";
import { Input, Button, AutoComplete } from "antd";

import {
  DownSquareFilled,
  MinusCircleFilled,
  SearchOutlined,
} from "@ant-design/icons";

import { TableCustom } from "@/components";
import useDebounce from "@/hooks/useDebount";
import { rsData } from "@/types/response";
import { AxiosService } from "@/services/server";
import { RowData } from "./type";
import { PdContext } from "..";
import {
  addPromotionProduct,
  setPromotionProductMultiBuy,
} from "@/redux/slices/promotion-slice";

export function renderOption(values: any[]) {
  return values.map((value: any) => ({
    label: (
      <div className="">
        <p className="text-[#212B36] truncate">{value.item_name}</p>
        <p className="text-[#637381] text-sm">{value.item_code}</p>
      </div>
    ),
    value: value.item_code,
  }));
}

export function handleAddproduct(product: RowData) {
  return { ...product, so_luong: product.so_luong || 0, khuyen_mai: [] };
}

export const handleAddProductMulti = (products: any) => {
  const arr_product: {
    name: String;
    so_luong: Number;
    unit: String[];
    stock_uom: String;
    item_code: String;
    item_name: String;
    item_group: String;
    description: String;
  }[] = [];
  products.map((item: any) => {
    const objProduct = {
      name: item.name,
      so_luong: item.so_luong,
      unit: item.unit,
      stock_uom: item.stock_uom,
      item_code: item.item_code,
      item_name: item.item_name,
      item_group: item.item_group,
      description: item.description,
    };
    arr_product.push(objProduct);
  });

  return {
    san_pham_mua: arr_product,
  };
};

function AddPd({ total = 0 }: any) {
  const {
    handleDataPromotion: { data, setData },
    handleAddRow: { setShowAdd },
    typePromotion,
  } = React.useContext(PdContext);
  const [ks, setKs] = React.useState<string>("");
  const keyS = useDebounce(ks, 300);
  const [options, setOption] = React.useState<any[]>([]);
  useEffect(() => {
    (async () => {
      let rsItems: rsData<{ data: any[] }> = await AxiosService.get(
        "/api/method/mbw_dms.api.selling.product.list_product",
        {
          params: {
            key_search: keyS,
            doctype: "Item",
          },
        }
      );
      setOption(rsItems.result.data);
    })();
  }, [keyS]);

  return (
    <>
      <TableCustom.Summary.Row>
        <TableCustom.Summary.Cell index={0}>
          <Button
            type="link"
            icon={<DownSquareFilled size={20} className="" />}
            onClick={() => {
              // handleExpand(record)
            }}
          />
          {(data.length + 1).toString().padStart(2, "0")}
        </TableCustom.Summary.Cell>
        <TableCustom.Summary.Cell index={1} colSpan={total > 2 ? total - 2 : 0}>
          <AutoComplete
            popupMatchSelectWidth={300}
            allowClear
            options={renderOption(options)}
            onSelect={(value) => {
              const dataOption = options.find(
                (pb: any) => pb.item_code == value
              );
              const prodBuyAdd = {
                name: dataOption.name,
                so_luong: dataOption.so_luong,
                unit: dataOption.unit,
                stock_uom: dataOption.stock_uom,
                item_code: dataOption.item_code,
                item_name: dataOption.item_name,
                item_group: dataOption.item_group,
                description: dataOption.description,
              };
              if (typePromotion == true) {
                setData(
                  setPromotionProductMultiBuy({
                    san_pham_mua: [prodBuyAdd],
                  })
                );
              } else {
                setData(
                  addPromotionProduct([
                    handleAddproduct(
                      options.find((pd) => pd.item_code == value)
                    ),
                  ])
                );
              }

              // setData((prev:any) => [...prev,handleAddproduct(options.find(pd => pd.item_code == value))])
              setShowAdd(false);
            }}>
            <Input
              className="h-[35px] w-[180px] bg-[#F4F6F8]"
              placeholder="Nhập mã, tên sp"
              prefix={<SearchOutlined size={32} />}
              onChange={(e: any) => setKs(e.target.value)}
              onBlur={() => {
                setKs("");
              }}
            />
          </AutoComplete>
        </TableCustom.Summary.Cell>
        <TableCustom.Summary.Cell index={3}>
          <Button
            className="border-0 !w-full"
            icon={<MinusCircleFilled />}
            danger
            type="link"
            onClick={() => {
              // handleDelete(record.id)
              setShowAdd(false);
            }}></Button>
        </TableCustom.Summary.Cell>
      </TableCustom.Summary.Row>
    </>
  );
}

export default memo(AddPd);
