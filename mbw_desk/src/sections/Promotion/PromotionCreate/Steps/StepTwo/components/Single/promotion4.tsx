/** @format */

import { handleDataProduct, renderColumnP4 } from "../../data";
import TableProm from "../TableProm";
import { RowData } from "../type";
import HeaderStep2 from "../header";

export function handleDataProductPushP4(products: RowData[]) {
  let newProducts: any[] = [];
  products.forEach((product: RowData) => {
    let formP4Product = {
      ...handleDataProduct(product),
      yeu_cau: product.yeu_cau,
      khuyen_mai: product.khuyen_mai,
    };
    newProducts.push(formP4Product);
  });

  return newProducts;
}

export function Promotion4() {
  return (
    <>
      <HeaderStep2
        title={"Mua sản phẩm - đạt số tiền - chiết khấu SP (%)"}
        choosePd
      />
      <TableProm columns={renderColumnP4()} />
    </>
  );
}
