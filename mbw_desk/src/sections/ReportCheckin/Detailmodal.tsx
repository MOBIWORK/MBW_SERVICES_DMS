import { TableCustom } from "@/components";
import { AxiosService } from "@/services/server";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

const columnsDetail: any = [
  {
    title: "Thời gian",
    dataIndex: "creation",
    key: "creation",
    render: (value: any) => {
      return (
        <>
          <div>{dayjs(value).format("HH:mm:ss")}</div>
          <div>{dayjs(value).format("DD/MM/YYYY")}</div>
        </>
      );
    },
  },
  {
    title: "Loại ghi chú",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Nội dung",
    dataIndex: "content",
    key: "content",
    render: (value: any) => <div className="whitespace-normal">{value}</div>,
  },
];

export default function Detailmodal(id: any) {
  const [dataDetail, setDataDetail] = useState<any>([]);
  const [total, setTotal] = useState<number>(0);
  const PAGE_SIZE = 20;
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    (async () => {
      const rsData = await AxiosService.get(
        "/api/method/mbw_dms.api.note.list_note",
        {
          params: {
            custom_checkin_id: id?.id,
            page_size: PAGE_SIZE,
            page_number: page,
          },
        }
      );
      let { result } = rsData;
      setTotal(result?.totals);
      setDataDetail(result);
    })();
  }, [id, page]);
  return (
    <>
      <TableCustom
        bordered
        $border
        dataSource={dataDetail?.data?.map((report: any) => ({
          key: report.name,
          ...report,
        }))}
        pagination={
          total && total > PAGE_SIZE
            ? {
                pageSize: PAGE_SIZE,
                showSizeChanger: false,
                total,
                current: page,
                onChange(page) {
                  setPage(page);
                },
              }
            : false
        }
        columns={columnsDetail}
      />
    </>
  );
}
