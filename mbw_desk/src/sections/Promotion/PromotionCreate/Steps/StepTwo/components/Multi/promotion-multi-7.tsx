/** @format */

import { renderColumnPM7 } from "../../data";
import HeaderStep2 from "../header";
import TableProm from "../TableProm";

export function PromotionMulti7() {
  return (
    <>
      <HeaderStep2 title={"Tổng tiền hàng - tặng một hoặc nhiều sản phẩm"} />
      <TableProm columns={renderColumnPM7()} />
    </>
  );
}
