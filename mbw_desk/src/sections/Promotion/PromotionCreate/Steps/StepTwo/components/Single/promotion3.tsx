/** @format */

import { handleDataProduct, renderColumnP3 } from "../../data";
import TableProm from "../TableProm";
import { RowData } from "../type";
import HeaderStep2 from "../header";

export function handleDataProductPushP3(products: RowData[]) {
  let newProducts: any[] = [];
  products.forEach((product: RowData) => {
    let formP3Product = {
      ...handleDataProduct(product),
      yeu_cau: product.so_luong,
      yeu_cau_min: product.qty_min || 0,
      khuyen_mai: product.khuyen_mai,
    };
    newProducts.push(formP3Product);
  });

  return newProducts;
}

export function Promotion3() {
  return (
    <>
      <HeaderStep2 title={"Mua sản phẩm - đạt số lượng - tặng tiền"} choosePd />
      <TableProm columns={renderColumnP3()} />
    </>
  );
}
