/** @format */

import React from "react";
import { PdContext } from "../..";
import TableProm from "../TableProm";
import { handlePromotion, renderColumnP8 } from "../../data";
import { RowData } from "../type";
import HeaderStep2 from "../header";

export function handleDataProductPushP8(products: RowData[]) {
  let newProducts: any[] = [];
  products.forEach((product: RowData) => {
    let formP8Product = {
      yeu_cau: product.yeu_cau,
      khuyen_mai: handlePromotion(product.khuyen_mai),
    };
    newProducts.push(formP8Product);
  });

  return newProducts;
}

export function Promotion8() {
  const {
    handleExpanded: { expandedRows, setExpandedRows },
  } = React.useContext(PdContext);

  const handleExpand = (row: string) => {
    setExpandedRows((prev: any) =>
      prev.includes(row)
        ? prev.filter((rowId: any) => rowId !== row)
        : [...prev, row]
    );
  };

  return (
    <>
      <HeaderStep2 title={"Tổng tiền hàng - tặng sản phẩm"} />
      <TableProm
        columns={renderColumnP8()}
        expandable={{
          expandedRowKeys: expandedRows,
          onExpand: (_: any, record: any) => handleExpand(record),
        }}
      />
    </>
  );
}
