/** @format */

import { handleDataProduct, renderColumnP6 } from "../../data";
import TableProm from "../TableProm";
import { RowData } from "../type";
import HeaderStep2 from "../header";

export function handleDataProductPushP6(products: RowData[]) {
  let newProducts: any[] = [];
  products.forEach((product: RowData) => {
    let formP6Product = {
      ...handleDataProduct(product),
      yeu_cau: product.yeu_cau,
      khuyen_mai: product.khuyen_mai,
    };
    newProducts.push(formP6Product);
  });
  return newProducts;
}

export function Promotion6() {
  return (
    <>
      <HeaderStep2 title={"Mua sản phẩm - đạt số tiền - tặng tiền"} choosePd />
      <TableProm bordered columns={renderColumnP6()} />
    </>
  );
}
