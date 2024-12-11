/** @format */

import { renderColumnPM2 } from "../../data";
import TableProm from "../TableProm";
import HeaderStep2 from "../header";

export const PromotionMulti2 = () => {
  return (
    <div>
      <HeaderStep2
        title={"Mua nhiều sản phẩm - đạt số tiền - chiết khấu SP (%)"}
        choosePd
      />

      <TableProm columns={renderColumnPM2()} />
    </div>
  );
};
