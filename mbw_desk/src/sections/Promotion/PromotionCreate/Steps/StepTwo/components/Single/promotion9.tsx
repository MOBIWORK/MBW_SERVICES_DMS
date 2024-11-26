/** @format */

import React from "react";
import { renderColumnP9 } from "../../data";
import TableProm from "../TableProm";
import { PdContext } from "../..";
import HeaderStep2 from "../header";

export function Promotion9() {
  const {
    handleModal: { setModalC },
  } = React.useContext(PdContext);

  return (
    <>

      <HeaderStep2 title={"Tổng tiền hàng - tặng tiền"} />
      <TableProm columns={renderColumnP9()} />
    </>
  );
}

export default Promotion9;
