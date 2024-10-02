import { TableCustom } from "@/components";
import { AxiosService } from "@/services/server";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

export default function DetailCustomer({ employee, month, year }: any) {
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
      title: "Mã khách hàng",
      dataIndex: "customer_code",
      key: "customer_code",
    },
    {
      title: "Khách hàng",
      dataIndex: "customer_name",
      key: "customer_name",
    },
    {
      title: "Địa chỉ",
      dataIndex: "customer_primary_address",
      key: "customer_primary_address",
      render: (value: any) => {
        return <div className="truncate hover:whitespace-normal">{value}</div>;
      },
    },
    {
      title: "Số điện thoại",
      dataIndex: "mobile_no",
      key: "mobile_no",
    },
    {
      title: "Ngày thu thập",
      dataIndex: "collection_date",
      key: "collection_date",
      render: (value: any) => {
        return (
          <>
            <div>{dayjs.unix(value).format('DD/MM/YYYY')}</div>
          </>
        );
      },
    },
    {
      title: "Nguồn",
      dataIndex: "nguon",
      key: "nguon",
      render: (value: any) => (
        <div>{value ? value : "-"}</div>
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
        "/api/method/mbw_dms.api.report.kpi.kpi_new_cus_detail",
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
          key: report.customer_name,
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
