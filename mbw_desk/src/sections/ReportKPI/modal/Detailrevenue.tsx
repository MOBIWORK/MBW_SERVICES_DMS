import { TableCustom } from "@/components";
import { AxiosService } from "@/services/server";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

export default function Detailrevenue({ employee, month, year }: any) {
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
      render: (_:any, record: any) => (
        <div>
          <a
            className="text-[#212B36]"
            href={`/app/sales-invoice/${record.name}`}
            target="_blank"
          >
            {record.name}
          </a>
        </div>
      ),
    },
    {
      title: "Khách hàng",
      dataIndex: "customer",
      key: "customer",
      width: 200,
      render: (_:any, record: any) => (
        <div>
          <a
            className="text-[#212B36]"
            href={`/app/customer/${record.customer}`}
            target="_blank"
          >
            {record.customer}
          </a>
        </div>
      ),
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
    {
      title: "Tông tiền",
      dataIndex: "grand_total",
      key: "grand_total",
      render: (value: any) => (
        <div className="!text-right">{Intl.NumberFormat().format(value)}</div>
      ),
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
        "/api/method/mbw_dms.api.report.kpi.kpi_si_amount_detail",
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

  useEffect(() => {
    return () => {
      setPage(1);
    };
  }, [employee]);

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
