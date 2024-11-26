/** @format */
import { TagCustomStatus } from "@/components";
import { TableColumnsType } from "antd";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

export const renderColumn = <T,>(page: number): TableColumnsType<T> => {
  return [
    // {
    //   title: "STT",
    //   dataIndex: "stt",
    //   key: "stt",

    //   width: 35,
    //   render: (_: any, __: any, index: number) => (
    //     <div className="text-center">
    //       {calculateIndex(page, PAGE_SIZE, index)}
    //     </div> // Tính toán index cho từng dòng
    //   ),
    // },
    {
      title: <div className="text-start">Trạng thái</div>,
      dataIndex: "status",
      width: 100,
      key: "status",
      render: (_: any, record: any) => {
        if (record.status === "Hoạt động") {
          return <TagCustomStatus children="Hoạt động" type="Success" />;
        } else if (record.status === "Khóa") {
          return <TagCustomStatus children="Khóa" type="Khóa" />;
        } else if (record.status === "Chạy thử") {
          return <TagCustomStatus children="Chạy thử" type="Chạy thử" />;
        } else {
          return <TagCustomStatus children="Chờ duyệt" type="Chờ duyệt" />;
        }
      },
    },
    {
      title: <div className="text-start min-w-[100px]">Mã chương trình</div>,
      dataIndex: "code",
      key: "code",
      width: 150,
      render: (_: any, record: any) => (
        <Link
          to={`/promotion/${record.name}`}
          className="underline-offset-2 underline">
          <div className=" w-[150px] truncate hover:whitespace-normal">{_}</div>
        </Link>
      ),
    },
    {
      title: <div className="text-start">Tên chương trình</div>,
      dataIndex: "name_promotion",
      width: 120,
      key: "name_promotion",
      render: (_: any, record: any) => {
        return <div className="min-w-[220px] text-wrap">{_}</div>;
      },
    },
    {
      title: <div className="text-start">Hình thức khuyến mại</div>,
      dataIndex: "ptype_name",
      width: 120,
      key: "ptype_name",
      render: (_: any, record: any) => {
        return (
          <div className="min-w-[220px] text-wrap">{record.ptype_name}</div>
        );
      },
    },
    {
      title: <div className="text-start">Nhóm khách hàng</div>,
      dataIndex: "customer_group",
      width: 180,
      key: "customer_group",
      render: (_: any, record: any) => {
        return (
          <div className="truncate hover:whitespace-normal min-w-[180px] max-w-[170px]">
            {record?.customer_group.length > 0
              ? record?.customer_group.join(", ")
              : "Tất cả nhóm khách hàng"}
          </div>
        );
      },
    },
    {
      title: <div className="text-start">Loại khách hàng</div>,
      dataIndex: "customer_type",
      width: 150,
      key: "customer_type",
      render: (_: any, record: any) => {
        return (
          <div className="truncate hover:whitespace-normal  min-w-[180px] max-w-[170px]">
            {record?.customer_type.length > 0
              ? record?.customer_type.join(", ")
              : "Tất cả loại khách hàng"}
          </div>
        );
      },
    },
    {
      title: <div className="text-start">Từ ngày</div>,
      dataIndex: "start_date",
      width: 80,
      key: "start_date",
      render: (_: any, record: any) => {
        return record?.start_date
          ? dayjs(record?.start_date * 1000).format("DD/MM/YYYY")
          : "";
      },
    },
    {
      title: <div className="text-start">Đến ngày</div>,
      dataIndex: "end_date",
      width: 80,
      key: "end_date",
      render: (_: any, record: any) => {
        return record?.end_date
          ? dayjs(record?.end_date * 1000).format("DD/MM/YYYY")
          : "";
      },
    },
  ];
};
