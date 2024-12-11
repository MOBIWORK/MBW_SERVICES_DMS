/** @format */

import React from "react";
import { handleDataProduct, handlePromotion, renderColumnP5 } from "../../data";
import { PdContext } from "../..";
import TableProm from "../TableProm";
import { RowData } from "../type";
import HeaderStep2 from "../header";

export function handleDataProductPushP5(products: RowData[]) {
  let newProducts: any[] = [];
  products.forEach((product: RowData) => {
    let formP5Product = {
      ...handleDataProduct(product),
      yeu_cau: product.yeu_cau,
      khuyen_mai: handlePromotion(product.khuyen_mai),
    };

    newProducts.push(formP5Product);
  });

  return newProducts;
}

export function Promotion5() {
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

  //hàm này xử lí nhiều sản phẩm
  //   const handleAddPromotion = (recordId: string) => {
  //     const updatedData = data.map((row) => {
  //       if (row.id === recordId) {
  //         return {
  //           ...row,
  //           promotions: [
  //             ...row.promotions,
  //             {
  //               id: `P${row.promotions.length + 1}`,
  //               name: "",
  //               quantity: 0,
  //               unit: "",
  //             },
  //           ],
  //         };
  //       }
  //       return row;
  //     });
  //     setData(updatedData);
  //   };

  return (
    <>
      <HeaderStep2
        title={" Mua sản phẩm - đạt số tiền - tặng sản phẩm"}
        choosePd
      />
      <TableProm
        columns={renderColumnP5()}
        expandable={{
          expandedRowKeys: expandedRows,
          onExpand: (_: any, record: any) => handleExpand(record),
        }}
      />
    </>
  );
}
