/** @format */

import TableProm from "../TableProm";
import { renderColumnP7 } from "../../data";
import HeaderStep2 from "../header";

export function Promotion7() {
  return (
    <>
      <HeaderStep2 title={"Tổng tiền hàng - chiết khấu đơn hàng (%)"}/>
      <TableProm bordered columns={renderColumnP7()} />
    </>
  );
}
