/** @format */

import { MinusCircleOutlined } from "@ant-design/icons";
import { TableColumnsType } from "antd";
import { MenuProps } from "antd/lib";

export const renderColumn = <T,>(...rest: any): TableColumnsType<T> => {
  return [
    {
      title: "Mã khách hàng",
      dataIndex: "customer_code",
      key: "customer_code",
      width: 80,
    },
    {
      title: "Khách hàng",
      dataIndex: "customer_name",
      key: "customer_name",
      width: 80,
    },
    {
      title: "Loại khách hàng",
      dataIndex: "sfa_customer_type",
      key: "sfa_customer_type",
      width: 80,
    },
    {
      title: "Nhóm khách hàng",
      dataIndex: "customer_group",
      key: "customer_group",
      width: 80,
    },
    {
      title: "Điện thoại",
      dataIndex: "phone_number",
      key: "phone_number",
      width: 80,
    },

    {
      title: "Địa chỉ",
      dataIndex: "display_address",
      key: "display_address",
      width: 250,
    },
    {
      title: "Xóa",
      dataIndex: "customer_code",
      key: "customer_code",
      width: 80,
      render: (_: any, record: T) => {
        return (
          <>
            <MinusCircleOutlined
              onClick={rest[0].handleDeleteCustomer.bind(
                null,
                record?.customer_code as any
              )}
            />
          </>
        );
      },
    },
  ];
};

export const renderMenu = (...rest: any): MenuProps["items"] => [
  {
    label: (
      <span
        onClick={() => {
          rest[0].handleDeleteMultiCustomer(rest[0].choose);
        }}>
        Xóa ({rest[0].total}) khách hàng đã chọn
      </span>
    ),
    key: 1,
  },
  {
    label: (
      <span
        className="text-[#FF5630]"
        onClick={() => {
          rest[0].handleDeleteAllCustomer();
        }}>
        Xóa tất cả khách hàng
      </span>
    ),
    key: 2,
  },
];

export const columnChooseCs = [
  {
    title: "Mã khách hàng",
    dataIndex: "customer_code",
    key: "customercode",
    width: 180,
  },
  {
    title: "Tên khách hàng",
    dataIndex: "customer_name",
    key: "customername",
    width: 180,
  },
  {
    title: "Số điện thoại",
    dataIndex: "phone_number",
    key: "phone_number",
    width: 180,
  },
  {
    title: "Địa chỉ",
    dataIndex: "display_address",
    key: "display_address",
    render: (_: any) => {
      return (
        <div className="max-w-[300px] overflow-hidden truncate hover:text-wrap">
          {_}
        </div>
      );
    },
  },
];

export const columnTableSearch = [
  {
    title: "Mã khách hàng",
    dataIndex: "customer_code",
    key: "customercode",
  },
  {
    title: "Tên khách hàng",
    dataIndex: "customer_name",
    key: "customername",
  },
];
