/** @format */

import { renderColumnPM5 } from "../../data";
import HeaderStep2 from "../header";
import TableProm from "../TableProm";

export function PromotionMulti5() {
  return (
    <>
      <HeaderStep2
        title={"Mua nhiều sản phẩm - đạt số lượng - chiết khấu SP (%)"}
        choosePd
      />
      <TableProm columns={renderColumnPM5()} />
    </>
  );
}
