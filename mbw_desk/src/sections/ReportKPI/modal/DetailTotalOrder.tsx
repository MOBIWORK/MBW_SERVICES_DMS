import { TableCustom } from "@/components";
import { AxiosService } from "@/services/server";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

export default function DetailTotalOrder({ employee, month, year }: any) {
  const columnsDetail: any = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      width: 60,
      render: (_: any, __: any, index: number) => (
        <span>{calculateIndex(page, PAGE_SIZE, index)}</span> // Tính toán index cho từng dòng
      ),
    },
    {
      title: "Mã đơn hàng",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Khách hàng",
      dataIndex: "customer",
      key: "customer",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (value: any) => {
        if (value === "To Deliver and Bill") {
          return (
            <div className="whitespace-nowrap px-2 rounded-lg py-[8px] flex justify-center items-center text-[14px] leading-[21px] bg-[#FFAB0014] text-[#FFAB00]">
              • Chờ vận chuyển và chờ thanh toán
            </div>
          );
        } else if (value === "To Bill") {
          return (
            <div className="whitespace-nowrap px-2 rounded-lg py-[8px] flex justify-center items-center text-[14px] leading-[21px] bg-[#8E33FF14] text-[#8E33FF]">
              • Chờ thanh toán
            </div>
          );
        } else if (value === "To Deliver") {
          return (
            <div className="whitespace-nowrap px-2 rounded-lg py-[8px] flex justify-center items-center text-[14px] leading-[21px] bg-[#00B8D914] text-[#00B8D9]">
              • Chờ vận chuyển
            </div>
          );
        } else if (value === "Completed") {
          return (
            <div className="whitespace-nowrap px-2 rounded-lg py-[8px] flex justify-center items-center text-[14px] leading-[21px] bg-[#22C55E14] text-[#22C55E]">
              • Hoàn thành
            </div>
          );
        } else {
          return (
            <div className="whitespace-nowrap px-2 rounded-lg py-[8px] flex justify-center items-center text-[14px] leading-[21px] bg-[#FF563014] text-[#FF5630]">
              • Đã hủy
            </div>
          );
        }
      },
    },
    {
      title: "Ngày đặt",
      dataIndex: "collec_date",
      key: "collec_date",
      render: (value: any) => {
        return (
          <>
            <div>{dayjs.unix(value).format("DD/MM/YYYY")}</div>
          </>
        );
      },
    },
  ];
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
  const calculateIndex = (
    pageNumber: number,
    pageSize: number,
    index: number
  ) => {
    return (pageNumber - 1) * pageSize + index + 1;
  };

  useEffect(() => {
    (async () => {
      const rsData = await AxiosService.get(
        "/api/method/mbw_dms.api.report.kpi.kpi_total_so_detail",
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
          y: 500,
        }}
        columns={columnsDetail}
      />
    </>
  );
}
