import { TableCustom } from "@/components";
import { AxiosService } from "@/services/server";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

export default function Detailchekinfirst({ employee, month, year }: any) {
  const columnsDetail: any = [
    {
      title: "STT",
      dataIndex: "groupIndex",
      key: "index",
      width: 60,
      render: (_: any, __: any, index: number) => (
        <span>{calculateIndex(page, PAGE_SIZE, index)}</span> // Tính toán index cho từng dòng
      ),
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
      render: (_: any, record: any) => (
        <div>
          <a
            className="text-[#212B36]"
            href={`/app/sales-invoice/${record.kh_ten}`}
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
        "/api/method/mbw_dms.api.report.kpi.kpi_only_visit_detail",
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

  const startIndex: number = (page - 1) * PAGE_SIZE + 1;

  // Tạo groupIndex cho các hàng
  let lastKhMa: string | null = null;
  // let groupIndex = startIndex - 1;
  let currentIndex = 0;

  // Map the data to add groupIndex
  const groupedData: any = dataDetail?.data?.map((item: any) => {
    // Nếu kh_ma thay đổi thì tăng groupIndex
    if (item.kh_ma !== lastKhMa) {
      lastKhMa = item.kh_ma;
      currentIndex++; // Tăng index khi gặp kh_ma mới
      const updatedItem = { ...item, groupIndex: currentIndex };
      return updatedItem;
    } else {
      // Nếu kh_ma trùng lặp, không tăng index
      return { ...item, groupIndex: null };
    }
  });

  return (
    <>
      <TableCustom
        bordered
        $border
        dataSource={dataDetail?.data?.map((report: any) => ({
          key: report.name,
          ...report,
        }))}
        // dataSource={groupedData}
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
        rowKey="name"
      />
    </>
  );
}
