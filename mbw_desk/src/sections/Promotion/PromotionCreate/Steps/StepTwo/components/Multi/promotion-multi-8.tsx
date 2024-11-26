/** @format */

import { renderColumnPM8 } from "../../data";
import HeaderStep2 from "../header";
import TableProm from "../TableProm";

export function PromotionMulti8() {
  return (
    <>
      <HeaderStep2
        title={
          "Tổng tiền hàng - chiết khấu đơn hàng (%)(Loại mua nhiều sản phẩm)"
        }
      />
      <TableProm columns={renderColumnPM8()} />
    </>
  );
}
