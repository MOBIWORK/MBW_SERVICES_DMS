import { TagCustomStatus } from "@/components";
import dayjs from "dayjs";

export const orderFields = [
    {
        "label": "Thời gian cập nhật",
        "value": "modified"
    },
    {
        "label": "Id",
        "value": "name"
    },
]

export const columns = [
 
    {
      title: "Mã tuyến",
      dataIndex: "channel_code",
      key: "channel_code"
    },
    {
      title: "Tên tuyến",
      dataIndex: "channel_name",
      key: "channel_name"
    },
    {
      title: "NVBH",
      dataIndex: "employee_name",
      key: "employee_name",
      render: (value, record) => `${record?.employee}-${record?.employee_name}`
    },
    {
      title: "Khách hàng",
      dataIndex: "count_customer",
      key: "count_customer"
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (value: string) => value == "Active" ? <TagCustomStatus > Hoạt động</TagCustomStatus > : <TagCustomStatus type="Warning" > Khóa</TagCustomStatus >
    },
    
    {
      title: "Ngày tạo",
      dataIndex: "creation",
      key: "creation",
      render: (value: number) => dayjs(value * 1000).format("DD/MM/YYYY")
  
    },
    {
      title: "Người tạo",
      dataIndex: "owner",
      key: "owner"
    },
    {
      title: "Ngày cập nhật",
      dataIndex: "modified",
      key: "modified",
      render: (value: number) => dayjs(value * 1000).format("DD/MM/YYYY")
    },
    {
      title: "Người cập nhật",
      dataIndex: "modified_by",
      key: "modified_by"
    }, 
  ];