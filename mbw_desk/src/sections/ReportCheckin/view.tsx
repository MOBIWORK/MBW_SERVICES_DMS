import { VerticalAlignBottomOutlined } from "@ant-design/icons";
import { FormItemCustom, HeaderPage, TableCustom } from "../../components";
import { DatePicker, Select, Table } from "antd";
import { DatePickerProps, TableColumnsType } from "antd/lib";
import { useEffect, useState } from "react";
import useDebounce from "../../hooks/useDebount";
import { rsDataFrappe } from "../../types/response";
import { AxiosService } from "../../services/server";
import { employee } from "../../types/employeeFilter";
import { area, customergroup, typecustomer } from "../ReportSales/data";

interface DataCheckin {
  key: React.Key;
  name: string;
  stt?: number;
  employee_code: string;
  employee_name: string;
  saleperson: string;
  days: string;
  date: string;
  startwork: string;
  checkin: string;
  kmauto: number;
  kmmove: number;
  speed: number;
  note?: string;
}

interface ExpandedDataType {
  key: React.Key;
  customer: string;
  customer_code: string;
  address: string;
  typecustomer: string;
  groupcustomer: string;
  phonenumber: string;
  contact: string;
  checkin: string;
  checkout: string;
  timecheckin: string;
  addresscheckin: string;
  distance: string;
}

const columnsCheckin: TableColumnsType<DataCheckin> = [
  {
    title: "STT",
    dataIndex: "stt",
    key: "stt",
    render: (_, record: any, index: number) => index + 1,
  },
  {
    title: "Mã nhân viên",
    dataIndex: "employee_code",
    key: "employee_code",
    render: (_, record: any) => (
      <div className="!w-[160px]">{record.employee_code}</div>
    ),
  },
  {
    title: "Tên nhân viên",
    dataIndex: "employee_name",
    key: "employee_name",
    render: (_, record: any) => (
      <div className="!w-[160px]">{record.employee_name}</div>
    ),
  },
  {
    title: "Nhóm bán hàng",
    dataIndex: "saleperson",
    key: "saleperson",
    render: (_, record: any) => (
      <div className="!w-[160px]">{record.saleperson}</div>
    ),
  },
  {
    title: "Ngày",
    dataIndex: "days",
    key: "days",
    render: (_, record: any) => <div className="!w-[160px]">{record.days}</div>,
  },
  {
    title: "Thứ",
    dataIndex: "date",
    key: "date",
    render: (_, record: any) => <div className="!w-[160px]">{record.date}</div>,
  },
  {
    title: "Giờ làm",
    dataIndex: "startwork",
    key: "startwork",
    render: (_, record: any) => (
      <div className="!w-[160px]">{record.startwork}</div>
    ),
  },
  {
    title: "Giờ viếng thăm",
    dataIndex: "checkin",
    key: "checkin",
    render: (_, record: any) => (
      <div className="!w-[160px]">{record.checkin}</div>
    ),
  },
  {
    title: "Số km tự động (km)",
    dataIndex: "kmauto",
    key: "kmauto",
    render: (_, record: any) => (
      <div className="!w-[160px]">{record.kmauto}</div>
    ),
  },
  {
    title: "Số km di chuyển (km)",
    dataIndex: "kmmove",
    key: "kmmove",
    render: (_, record: any) => (
      <div className="!w-[160px]">{record.kmmove}</div>
    ),
  },
  {
    title: "Vận tốc (km/h)",
    dataIndex: "speed",
    key: "kmmove",
    render: (_, record: any) => (
      <div className="!w-[160px]">{record.kmmove}</div>
    ),
  },
  {
    title: "Ghi chú",
    key: "note",
    render: () => (
      <div className="!w-[160px]">
        <a>Xem ghi chú</a>
      </div>
    ),
  },
];

const data: DataCheckin[] = [
  {
    key: "KDA",
    name: "7382jsd",
    employee_code: "HHH-1",
    employee_name: "Thiên Khuyển",
    saleperson: "KV MB",
    days: "20/1/2024",
    date: "Thứ 4",
    startwork: "08:00",
    checkin: "12:30",
    kmauto: 5,
    kmmove: 15,
    speed: 56,
  },
  {
    key: "HUDS",
    name: "7382jsd",
    employee_code: "HHH-1",
    employee_name: "Tần Sương",
    saleperson: "KV MN",
    days: "20/2/2024",
    date: "Thứ 3",
    startwork: "08:00",
    checkin: "12:30",
    kmauto: 19,
    kmmove: 20,
    speed: 23,
  },
];

export default function ReportCheckin() {
  const [listEmployees, setListEmployees] = useState<any[]>([]);
  const [listSales, setListSales] = useState<any[]>([]);
  const [team_sale, setTeamSale] = useState<string>();
  const [keySearch4, setKeySearch4] = useState("");
  const [employee, setEmployee] = useState<string>();
  let seachbykey = useDebounce(keySearch4);
  const [keyS3, setKeyS3] = useState("");

  let keySearch3 = useDebounce(keyS3, 300);

  const onChange: DatePickerProps["onChange"] = (dateString) => {
    console.log(dateString);
  };

  const expandedRowRender = (record: any) => {
    const columns: TableColumnsType<ExpandedDataType> = [
      {
        title: "Khách hàng",
        dataIndex: "customer",
        key: "customer",
        render: (_, record, index) => (
          <div className="!w-[200]">
            <div>{record.customer}</div>
            <div className="text-[#637381]">{record.customer_code}</div>
          </div>
        ),
      },
      {
        title: "Địa chỉ",
        dataIndex: "address",
        key: "address",
        render: (_, record, index) => (
          <div className="!w-[160]">
            <div>{record.address}</div>
          </div>
        ),
      },
      {
        title: "Loại khách",
        dataIndex: "typecustomer",
        key: "typecustomer",
        render: (_, record, index) => (
          <div className="!w-[160]">
            <div>{record.typecustomer}</div>
          </div>
        ),
      },
      {
        title: "Nhóm khách",
        dataIndex: "groupcustomer",
        key: "groupcustomer",
        render: (_, record, index) => (
          <div className="!w-[160]">
            <div>{record.groupcustomer}</div>
          </div>
        ),
      },
      {
        title: "Số điện thoại",
        dataIndex: "phonenumber",
        key: "phonenumber",
        render: (_, record, index) => (
          <div className="!w-[160]">
            <div>{record.phonenumber}</div>
          </div>
        ),
      },
      {
        title: "Liên hệ",
        dataIndex: "contact",
        key: "contact",
        render: (_, record, index) => (
          <div className="!w-[160]">
            <div>{record.contact}</div>
          </div>
        ),
      },
      {
        title: "Checkin",
        dataIndex: "checkin",
        key: "checkin",
        render: (_, record, index) => (
          <div className="!w-[160]">
            <div>{record.checkin}</div>
          </div>
        ),
      },
      {
        title: "Checkout",
        dataIndex: "checkout",
        key: "checkout",
        render: (_, record, index) => (
          <div className="!w-[160]">
            <div>{record.checkout}</div>
          </div>
        ),
      },
      {
        title: "Số giờ viếng thăm",
        dataIndex: "timecheckin",
        key: "timecheckin",
        render: (_, record, index) => (
          <div className="!w-[160]">
            <div>{record.timecheckin}</div>
          </div>
        ),
      },
      {
        title: "Địa chỉ checkin",
        dataIndex: "addresscheckin",
        key: "addresscheckin",
        render: (_, record, index) => (
          <div className="!w-[160]">
            <div>{record.addresscheckin}</div>
          </div>
        ),
      },
      {
        title: "Khoảng cách checkin(km)",
        dataIndex: "distance",
        key: "distance",
        render: (_, record, index) => (
          <div className="!w-[160]">
            <div>{record.distance}</div>
          </div>
        ),
      },
    ];
    const dataEx = [
      {
        customer: "Khách hàng 1",
        customer_code:"KH1",
        address: "Hà Nội",
        typecustomer: "Loại khách hàng",
        groupcustomer: "Nhóm khác hàng",
        phonenumber: "012312393",
        contact: "88 Tây Hồ",
        checkin: "07:00",
        checkout: "07:15",
        timecheckin: "15 phút",
        addresscheckin: "Hòang Thành Thăng Long",
        distance: "0.2",
      },
      {
        customer: "Khách hàng 2",
        customer_code:"KH2",
        address: "Hà Nội",
        typecustomer: "Loại khách hàng",
        groupcustomer: "Nhóm khác hàng",
        phonenumber: "0928167294",
        contact: "892 Lạc Long Quân",
        checkin: "07:00",
        checkout: "07:15",
        timecheckin: "15 phút",
        addresscheckin: "Phong Nha Kẻ Bàng",
        distance: "0.2",
      }
    ];
    return <Table columns={columns} dataSource={dataEx} pagination={false} />;
  };

  useEffect(() => {
    (async () => {
      let rsEmployee: rsDataFrappe<employee[]> = await AxiosService.get(
        "/api/method/mbw_dms.api.router.get_sale_person",
        {
          params: {
            team_sale: team_sale,
            key_search: seachbykey,
          },
        }
      );
      console.log("rsemp", rsEmployee);
      let { message: results } = rsEmployee;
      setListEmployees(
        results.map((employee_filter: employee) => ({
          value: employee_filter.employee_code,
          label: employee_filter.employee_name || employee_filter.employee_code,
        }))
      );
    })();
  }, [team_sale, seachbykey]);
  return (
    <>
      <HeaderPage
        title="Báo cáo viếng thăm"
        buttons={[
          {
            label: "Xuất dữ liệu",
            type: "primary",
            icon: <VerticalAlignBottomOutlined className="text-xl" />,
            size: "20px",
            className: "flex items-center",
          },
        ]}
      />
      <div className="bg-white rounded-md py-7 px-4 border-[#DFE3E8] border-[0.2px] border-solid">
        <div className="flex justify-start items-center">
          <FormItemCustom className="w-[200px] border-none mr-2">
            <DatePicker
              format={"DD-MM-YYYY"}
              className="!bg-[#F4F6F8]"
              placeholder="Từ ngày"
              onChange={onChange}
            />
          </FormItemCustom>
          <FormItemCustom className="w-[200px] border-none mr-2">
            <DatePicker
              format={"DD-MM-YYYY"}
              className="!bg-[#F4F6F8]"
              placeholder="Đến ngày"
              onChange={onChange}
            />
          </FormItemCustom>
          <FormItemCustom className="w-[200px] border-none mr-2">
            <Select
              className="!bg-[#F4F6F8] options:bg-[#F4F6F8]"
              defaultValue={""}
              options={[
                { label: "Tất cả nhóm bán hàng", value: "" },
                ...listSales,
              ]}
              showSearch
              notFoundContent={null}
              onSearch={(value: string) => setKeyS3(value)}
              onChange={(value) => {
                setTeamSale(value);
              }}
            />
          </FormItemCustom>

          <FormItemCustom className="w-[200px] border-none mr-2">
            <Select
              className="!bg-[#F4F6F8] options:bg-[#F4F6F8]"
              options={[
                { label: "Tất cả nhân viên", value: "" },
                ...listEmployees,
              ]}
              showSearch
              defaultValue={""}
              notFoundContent={null}
              onSearch={setKeySearch4}
              onChange={(value) => {
                setEmployee(value);
              }}
              allowClear
            />
          </FormItemCustom>
          <FormItemCustom className="w-[200px] border-none mr-2">
            <Select
              className="!bg-[#F4F6F8] options:bg-[#F4F6F8]"
              defaultValue={""}
              options={[
                { label: "Loại khách hàng", value: "" },
                ...typecustomer,
              ]}
              showSearch
            />
          </FormItemCustom>
        </div>
        <div className="flex justify-start items-center h-8 pt-9">
          <FormItemCustom className="w-[200px] border-none mr-2">
            <Select
              className="!bg-[#F4F6F8] options:bg-[#F4F6F8]"
              defaultValue={""}
              options={[
                { label: "Nhóm khách hàng", value: "" },
                ...customergroup,
              ]}
              showSearch
            />
          </FormItemCustom>
          <FormItemCustom className="w-[200px] border-none mr-2">
            <Select
              className="!bg-[#F4F6F8] options:bg-[#F4F6F8]"
              defaultValue={""}
              options={[{ label: "Khu vực", value: "" }, ...area]}
              showSearch
            />
          </FormItemCustom>
        </div>
        <div className="pt-10">
          <TableCustom
            bordered
            scroll={{ x: true }}
            columns={columnsCheckin}
            expandable={{ expandedRowRender, defaultExpandedRowKeys: ["0"] }}
            dataSource={data}
          />
        </div>
      </div>
    </>
  );
}
