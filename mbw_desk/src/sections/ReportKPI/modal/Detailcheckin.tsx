import { TableCustom } from "@/components";
import { AxiosService } from "@/services/server";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";

export default function Detailcheckin({ employee, month, year }: any) {
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
      dataIndex: "kh_ma",
      key: "kh_ma",
    },
    {
      title: "Khách hàng",
      dataIndex: "kh_ten",
      key: "kh_ten",
      width: 200,
      render: (_:any, record: any) => (
        <div>
          <a
            className="text-[#212B36]"
            href={`/app/customer/${record.kh_ten}`}
            target="_blank"
          >
            {record.kh_ten}
          </a>
        </div>
      ),
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
      render: (value: any) => <div>{parseFloat((value / 60).toFixed(2))}</div>,
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
    return () => {
      setPage(1);
    };
  }, [employee]);

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
      setTotal(result?.totals);
      setDataDetail((prevData: any) => 
        page === 1 ? result.data : [...prevData, ...result.data]
      );
    })();
  }, [startOfMonthTimestamp, endOfMonthTimestamp, employee, page]);

  const groupedData = React.useMemo(() => {
    let lastKhMa: string | null = null;
    let lastCheckinDate: string | null = null;
    let currentIndex = 0;

    return dataDetail.map((item: any) => {
      const currentCheckinDate = new Date(item.checkin_giovao).toLocaleDateString('vi-VN');
      if (item.kh_ma !== lastKhMa || currentCheckinDate !== lastCheckinDate) {
        lastKhMa = item.kh_ma;
        lastCheckinDate = currentCheckinDate;
        currentIndex++;
        return { ...item, groupIndex: currentIndex };
      } else {
        return { ...item, groupIndex: null };
      }
    });
  }, [dataDetail]);

  console.log(groupedData);

  return (
    <>
      <TableCustom
        bordered
        $border
        // dataSource={dataDetail?.data?.map((report: any) => ({
        //   key: report.name,
        //   ...report,
        // }))}
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
