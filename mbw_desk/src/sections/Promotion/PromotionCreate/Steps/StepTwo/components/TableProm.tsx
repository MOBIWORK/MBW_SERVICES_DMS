/** @format */

import { TableCustom } from "@/components";
import AddPd from "./AddPd";
import { PdContext } from "..";
import { useContext } from "react";

function TableProm({ columns, ...rest }: any) {
  const {
    handleDataPromotion: { data },
    handleAddRow: { showAdd },
  } = useContext(PdContext);

  return (
    <TableCustom
      columns={columns}
      dataSource={data}
      pagination={false}
      scroll={{
        x: "max-content",
        // y: containerHeight < 400 ? undefined : scrollYTable1,
        // y: dataReort?.data?.length > 0 ? size?.h * 0.55 : undefined,
      }}
      bordered
      rowKey="name"
      {...rest}
      summary={() => showAdd && <AddPd total={columns.length} />}
    />
  );
}

export default TableProm;
