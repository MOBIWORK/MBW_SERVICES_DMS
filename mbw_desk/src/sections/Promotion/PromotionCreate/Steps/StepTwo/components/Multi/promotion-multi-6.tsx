/** @format */

import { renderColumnPM6 } from "../../data";
import HeaderStep2 from "../header";
import TableProm from "../TableProm";

export function PromotionMulti6() {
  return (
    <>
      <HeaderStep2
        title={"Mua nhiều sản phẩm - đạt số lượng - tặng tiền"}
        choosePd
      />
      <TableProm columns={renderColumnPM6()} />
    </>
  );
}
