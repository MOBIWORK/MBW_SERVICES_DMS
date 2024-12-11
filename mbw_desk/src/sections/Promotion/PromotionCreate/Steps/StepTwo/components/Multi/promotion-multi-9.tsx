/** @format */

import { renderColumnPM9 } from "../../data";
import TableProm from "../TableProm";
import HeaderStep2 from "../header";

export function PromotionMulti9() {
  return (
    <>
      <HeaderStep2
        title={"Tổng tiền hàng - tặng tiền(Loại mua nhiều sản phẩm)"}
      />
      <TableProm columns={renderColumnPM9()} />
    </>
  );
}
