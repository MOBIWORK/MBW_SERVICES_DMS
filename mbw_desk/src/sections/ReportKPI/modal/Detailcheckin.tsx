import { TableCustom } from "@/components";
import { AxiosService } from "@/services/server";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

const columnsDetail: any = [
  {
    title: "STT",
    dataIndex: "stt",
    key: "stt",
    width:60,
    render: (_, record: any, index: number) => index + 1,
  },
  {
    title: "Mã khách hàng",
    dataIndex: "kh_ma",
    key: "kh_ma",
  },
  {
    title: "Khách hàng",
    dataIndex: "kh_ten",
    key: "kh_ten",
  },
  {
    title: "Địa chỉ",
    dataIndex: "kh_diachi",
    key: "kh_diachi",
    render: (value: any) => {
      return <div className="truncate hover:whitespace-normal">{value}</div>;
    },
  },
  {
    title: "Ngày viếng thăm",
    dataIndex: "checkin_giovao",
    key: "checkin_giovao",
    render: (value: any) => {
      return (
        <>
          <div>{dayjs(value).format("DD/MM/YYYY")}</div>
        </>
      );
    },
  },
  {
    title: "Thời gian checkin",
    dataIndex: "checkin_giovao",
    key: "checkin_giovao",
    render: (value: any) => {
      return (
        <>
          <div>{dayjs(value).format("HH:mm")}</div>
        </>
      );
    },
  },
  {
    title: "Khoảng cách",
    dataIndex: "checkin_khoangcach",
    key: "checkin_khoangcach",
    render: (value: any) => (
      <div>{parseFloat((value / 60).toFixed(2))}</div>
    ),
  },
];

export default function Detailcheckin({ employee, month, year }: any) {
  const [page, setPage] = useState<number>(1);
  const PAGE_SIZE = 20;
  const [total, setTotal] = useState<number>(0);
  const [dataDetail, setDataDetail] = useState<any>([]);
  const startOfMonth = dayjs(`${year}-${month}-01`).startOf("month");
  const endOfMonth = dayjs(`${year}-${month}-01`)
    .add(1, "month")
    .startOf("month")
    .subtract(1, "second");

  const startOfMonthTimestamp = startOfMonth.unix();
  const endOfMonthTimestamp = endOfMonth.unix();

  useEffect(() => {
    (async () => {
      const rsData = await AxiosService.get(
        "/api/method/mbw_dms.api.report.kpi.kpi_visit_detail",
        {
          params: {
            from_date: startOfMonthTimestamp,
            to_date: endOfMonthTimestamp,
            employee: employee,
            page_size: PAGE_SIZE,
            page_number: page,
          },
        }
      );
      let { result } = rsData;
      setDataDetail(result);
      setTotal(result?.totals);
    })();
  }, [startOfMonthTimestamp, endOfMonthTimestamp, employee, page]);

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
        scroll={{
          y: 300,
        }}
        columns={columnsDetail}
      />
    </>
  );
}
