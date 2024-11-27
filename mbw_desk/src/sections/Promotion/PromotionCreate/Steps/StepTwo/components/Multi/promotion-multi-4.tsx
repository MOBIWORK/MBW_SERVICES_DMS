/** @format */

import { renderColumnPM4 } from "../../data";
import HeaderStep2 from "../header";
import TableProm from "../TableProm";

export function PromotionMulti4() {
  return (
    <>
      <HeaderStep2
        title={
          "Mua nhiều sản phẩm - đạt số lượng - tặng một hoặc nhiều sản phẩm"
        }
        choosePd
      />
      <TableProm columns={renderColumnPM4()} />
    </>
  );
}
