/** @format */

import React from "react";
import { handleDataProduct, handleUnit, renderColumnP1 } from "../../data";
import TableProm from "../TableProm";
import { RowData, Unit } from "../type";
import HeaderStep2 from "../header";

// export function handleDataProductPushP1(products: RowData[]) {
//   let newProducts: any[] = [];
//   products.forEach((product: RowData) => {
//     let formP1Product = {
//       san_pham_mua: [handleDataProduct(product)],
//       khuyen_mai: product.khuyen_mai,
//       yeu_cau: {
//         qualityMin: product.qty_min || 0,
//         qualityMax: product.so_luong,
//       },
//     };
//     newProducts.push(formP1Product);
//   });

//   return newProducts;
// }
export function handleDataProductPushP1(products: RowData[]) {
  let newProducts: any[] = [];
  products.forEach((product: RowData) => {
    const objectData = {
      khuyen_mai: product.khuyen_mai,
      ma_san_pham: product.item_code,
      ten_san_pham: product.item_name,
      yeu_cau: product.so_luong,
      yeu_cau_min: product.qty_min || 0,
      _id: product.name,
      don_vi_tinh: product.unit.find((unt: any) => unt.uom == product.stock_uom)
        ? handleUnit(
            product.unit.find(
              (unt: any) => unt.uom == product.stock_uom
            ) as Unit
          )
        : {},
      don_vi_tinh_other: product?.unit.map((unt: any) => handleUnit(unt)),
    };
    newProducts.push(objectData);
  });
  return newProducts;
}
export const Promotion1 = () => {
  return (
    <>
      <div>
        <HeaderStep2
          title={"Mua sản phẩm - đạt số lượng - chiết khấu sp %"}
          choosePd
        />

        <TableProm columns={renderColumnP1()} />
      </div>
    </>
  );
};
