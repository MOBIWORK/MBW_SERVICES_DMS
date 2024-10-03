/** @format */

import { TableCustom } from "@/components";
import { ModalDetail } from "@/sections/ReportCheckin/components/ModalCheckin";
import Detailmodal from "@/sections/ReportCheckin/Detailmodal";
import { AxiosService } from "@/services/server";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

export default function Detailcheckin({
  employee,
  timeCheckin,
  checkin_note_id,
}: any) {
  const columnsDetail: any = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      width: 60,
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
      title: <div className="text-center">Ghi chú</div>,
      dataIndex: "",
      key: "",
      render: (value: any) => (
        <div
          className="text-blue-600 underline underline-offset-4 text-center"
          onClick={() => {
            setModal({
              open: true,
              id: checkin_note_id,
            });
          }}>
          Xem chi tiết
        </div>
      ),
    },
  ];

  const [page, setPage] = useState<number>(1);
  const PAGE_SIZE = 20;
  const [total, setTotal] = useState<number>(0);
  const [dataDetail, setDataDetail] = useState<any>([]);

  const [modal, setModal] = useState<{
    open: boolean;
    id: any;
  }>({
    open: false,
    id: null,
  });

  const closeModal = () => {
    setModal({
      open: false,
      id: null,
    });
  };
  useEffect(() => {
    (async () => {
      const rsData = await AxiosService.get(
        "/api/method/mbw_sfa.api.report.kpi.kpi_visit_detail",
        {
          params: {
            time_checkin: timeCheckin,
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
  }, [timeCheckin, employee, page]);

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

      <ModalDetail
        title={
          <div className="font-bold text-lg leading-7 text-[#212B36] p-4">
            Ghi chú
          </div>
        }
        open={modal.open}
        onCancel={closeModal}
        footer={false}
        width={800}>
        <Detailmodal id={modal.id} />
      </ModalDetail>
    </>
  );
}
