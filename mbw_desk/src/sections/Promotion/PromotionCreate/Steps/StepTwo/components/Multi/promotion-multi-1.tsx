/** @format */

import { usePromotionProductTransform } from "@/hooks/usePromotionTransform";
import { renderColumnPM1 } from "../../data";
import TableProm from "../TableProm";
import HeaderStep2 from "../header";
import { RowData } from "../type";

export const PromotionMulti1 = () => {
  return (
    <div>
      <HeaderStep2
        title={
          "Mua nhiều sản phẩm - đạt số tiền - tặng một hoặc nhiều sản phẩm"
        }
        choosePd
      />

      <TableProm columns={renderColumnPM1()} />
    </div>
  );
};
