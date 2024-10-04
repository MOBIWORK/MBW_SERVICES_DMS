import { TableCustom } from "@/components";
import { AxiosService } from "@/services/server";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";

export default function DetailOrder({ employee, month, year }: any) {
  const columnsDetail: any = [
    {
      title: "STT",
      dataIndex: "groupIndex",
      key: "index",
      width: 60,
      render: (_: any, __: any) => {
        return _;
      },
    },
    {
      title: "Mã khách hàng",
      dataIndex: "customer_code",
      key: "customer_code",
    },
    {
      title: "Khách hàng",
      dataIndex: "customer",
      key: "customer",
    },
    {
      title: "Địa chỉ",
      dataIndex: "customer_address",
      key: "customer_address",
      render: (value: any) => {
        return <div className="truncate hover:whitespace-normal">{value}</div>;
      },
    },
    {
      title: "Mã đơn hàng",
      dataIndex: "so_name",
      key: "so_name",
    },
    {
      title: "Ngày đặt",
      dataIndex: "trans_date",
      key: "trans_date",
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

  useEffect(() => {
    (async () => {
      const rsData = await AxiosService.get(
        "/api/method/mbw_dms.api.report.kpi.kpi_cus_so_detail",
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
      setTotal(result?.totals);
      setDataDetail((prevData: any) => 
        page === 1 ? result.data : [...prevData, ...result.data]
      );
    })();
  }, [startOfMonthTimestamp, endOfMonthTimestamp, employee, page]);

  const groupedData = React.useMemo(() => {
    let lastKhMa: string | null = null;
    let currentIndex = 0;

    return dataDetail.map((item: any) => {
      if (item.kh_ma !== lastKhMa) {
        lastKhMa = item.kh_ma;
        currentIndex++;
        return { ...item, groupIndex: currentIndex };
      } else {
        return { ...item, groupIndex: null };
      }
    });
  }, [dataDetail]);

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
        dataSource={groupedData}
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
