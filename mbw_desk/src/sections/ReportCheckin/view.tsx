import { VerticalAlignBottomOutlined } from "@ant-design/icons";
import { FormItemCustom, HeaderPage, TableCustom } from "../../components";
import { Col, DatePicker, Row, Select, Table, TreeSelect } from "antd";
import { DatePickerProps, TableColumnsType } from "antd/lib";
import { useEffect, useState } from "react";
import useDebounce from "../../hooks/useDebount";
import { rsData, rsDataFrappe } from "../../types/response";
import { AxiosService } from "../../services/server";
import { employee } from "../../types/employeeFilter";
import { area, customergroup, typecustomer } from "../ReportSales/data";
import { treeArray } from "@/util";
import { listSale } from "@/types/listSale";

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

// const data: DataCheckin[] = [
//   {
//     key: "KDA",
//     name: "7382jsd",
//     employee_code: "HHH-1",
//     employee_name: "Thiên Khuyển",
//     saleperson: "KV MB",
//     days: "20/1/2024",
//     date: "Thứ 4",
//     startwork: "08:00",
//     checkin: "12:30",
//     kmauto: 5,
//     kmmove: 15,
//     speed: 56,
//   },
//   {
//     key: "HUDS",
//     name: "7382jsd",
//     employee_code: "HHH-1",
//     employee_name: "Tần Sương",
//     saleperson: "KV MN",
//     days: "20/2/2024",
//     date: "Thứ 3",
//     startwork: "08:00",
//     checkin: "12:30",
//     kmauto: 19,
//     kmmove: 20,
//     speed: 23,
//   },
// ];

export default function ReportCheckin() {
  const [listEmployees, setListEmployees] = useState<any[]>([]);
  const [listSales, setListSales] = useState<any[]>([]);
  const [sales_team, setTeamSale] = useState<string>();
  const [keySearch4, setKeySearch4] = useState("");
  const [employee, setEmployee] = useState<string>();
  let seachbykey = useDebounce(keySearch4);
  const [keyS3, setKeyS3] = useState("");
  const [customer_type, setCustomerType] = useState("");
  const [listCustomerGroup, setListCustomerGroup] = useState<any[]>([]);
  const [customer_group, setCustomerGroup] = useState("");
  const [keySCustomerGroup, setKeySCustomerGroup] = useState("");
  let keySearchCustomerGroup = useDebounce(keySCustomerGroup, 500);
  const [territory, setTerritory] = useState("");
  const [listTerritory, setListTerritory] = useState<any[]>([]);
  const [keySTerritory, setKeySTerritory] = useState("");
  let keySearchTerritory = useDebounce(keySTerritory, 500);

  let keySearch3 = useDebounce(keyS3, 300);

  const onChange: DatePickerProps["onChange"] = (dateString) => {
    console.log(dateString);
  };

  useEffect(() => {
    (async () => {
      let rsSales: rsData<listSale[]> = await AxiosService.get(
        "/api/method/mbw_dms.api.router.get_team_sale"
      );

      setListSales(
        treeArray({
          data: rsSales.result.map((team_sale: listSale) => ({
            title: team_sale.name,
            value: team_sale.name,
            ...team_sale,
          })),
          keyValue: "value",
          parentField: "parent_sales_person",
        })
      );
    })();
  }, []);
  useEffect(() => {
    (async () => {
      let rsEmployee: rsDataFrappe<employee[]> = await AxiosService.get(
        "/api/method/mbw_dms.api.router.get_sale_person",
        {
          params: {
            team_sale: sales_team,
            key_search: seachbykey,
          },
        }
      );
      let { message: results } = rsEmployee;
      setListEmployees(
        results.map((employee_filter: employee) => ({
          value: employee_filter.employee_code,
          label: employee_filter.employee_name || employee_filter.employee_code,
        }))
      );
    })();
  }, [sales_team, seachbykey]);

  useEffect(() => {
    (async () => {
      let rsCustomerGroup: any = await AxiosService.get(
        "/api/method/frappe.desk.search.search_link",
        {
          params: {
            txt: keySearchCustomerGroup,
            doctype: "Customer Group",
            ignore_user_permissions: 0,
            query: "",
          },
        }
      );

      let { message: results } = rsCustomerGroup;

      setListCustomerGroup(
        results.map((dtCustomerGroup: any) => ({
          value: dtCustomerGroup.value.trim(),
          label: dtCustomerGroup.value.trim(),
        }))
      );
    })();
  }, [keySearchCustomerGroup]);

  useEffect(() => {
    (async () => {
      let rsTerritory: any = await AxiosService.get(
        "/api/method/frappe.desk.search.search_link",
        {
          params: {
            txt: keySearchTerritory,
            doctype: "Territory",
            ignore_user_permissions: 0,
            query: "",
          },
        }
      );

      let { message: results } = rsTerritory;

      setListTerritory(
        results.map((dtTerritory: any) => ({
          value: dtTerritory.value,
          label: dtTerritory.value,
        }))
      );
    })();
  }, [keySearchTerritory]);

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
    // const dataEx = [
    //   {
    //     customer: "Khách hàng 1",
    //     customer_code:"KH1",
    //     address: "Hà Nội",
    //     typecustomer: "Loại khách hàng",
    //     groupcustomer: "Nhóm khác hàng",
    //     phonenumber: "012312393",
    //     contact: "88 Tây Hồ",
    //     checkin: "07:00",
    //     checkout: "07:15",
    //     timecheckin: "15 phút",
    //     addresscheckin: "Hòang Thành Thăng Long",
    //     distance: "0.2",
    //   },
    //   {
    //     customer: "Khách hàng 2",
    //     customer_code:"KH2",
    //     address: "Hà Nội",
    //     typecustomer: "Loại khách hàng",
    //     groupcustomer: "Nhóm khác hàng",
    //     phonenumber: "0928167294",
    //     contact: "892 Lạc Long Quân",
    //     checkin: "07:00",
    //     checkout: "07:15",
    //     timecheckin: "15 phút",
    //     addresscheckin: "Phong Nha Kẻ Bàng",
    //     distance: "0.2",
    //   }
    // ];
    return (
      <Table
        columns={columns}
        pagination={false}
        // dataSource={dataEx}
      />
    );
  };

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
      <div className="bg-white rounded-md py-7  border-[#DFE3E8] border-[0.2px] border-solid">
        <div className="flex flex-wrap justify-start px-4 items-center">
          <Row gutter={[8, 8]}>
            
              <FormItemCustom
                label={"Từ ngày"}
                className="border-none mr-2 w-[175px]"
              >
                <DatePicker
                  format={"DD-MM-YYYY"}
                  className="!bg-[#F4F6F8]"
                  placeholder="Từ ngày"
                  onChange={onChange}
                />
              </FormItemCustom>
              <FormItemCustom
                label={"Đến ngày"}
                className="border-none mr-2 w-[175px]"
              >
                <DatePicker
                  format={"DD-MM-YYYY"}
                  className="!bg-[#F4F6F8]"
                  placeholder="Đến ngày"
                  onChange={onChange}
                />
              </FormItemCustom>
              <FormItemCustom
                label={"Nhóm bán hàng"}
                className="border-none mr-2 w-[175px]"
              >
                <TreeSelect
                  placeholder="Tất cả nhóm bán hàng"
                  allowClear
                  treeData={listSales}
                  onChange={(value: string) => {
                    setTeamSale(value);
                  }}
                  dropdownStyle={{
                    maxHeight: 400,
                    overflow: "auto",
                    minWidth: 400,
                  }}
                />
              </FormItemCustom>
              <FormItemCustom
                label={"Nhân viên"}
                className="border-none mr-2 w-[175px]"
                name="employee"
              >
                <Select
                  filterOption={false}
                  notFoundContent={null}
                  allowClear
                  placeholder="Tất cả nhân viên"
                  onSearch={(value: string) => {
                    setKeySearch4(value);
                  }}
                  options={listEmployees}
                  onSelect={(value) => {
                    setEmployee(value);
                  }}
                  onClear={() => {
                    setEmployee("");
                  }}
                />
              </FormItemCustom>
              <FormItemCustom
                label={"Loại khách hàng"}
                className="border-none mr-2 w-[175px]"
              >
                <Select
                  options={typecustomer}
                  placeholder="Tất cả loại khách hàng"
                  filterOption={false}
                  allowClear
                  onSelect={(value) => {
                    setCustomerType(value);
                  }}
                  onClear={() => setCustomerType("")}
                />
              </FormItemCustom>
              <FormItemCustom
                label={"Nhóm khác hàng"}
                className="border-none mr-2 w-[175px]"
              >
                <Select
                  className="!bg-[#F4F6F8] options:bg-[#F4F6F8]"
                  options={listCustomerGroup}
                  onSelect={(value) => {
                    setCustomerGroup(value);
                  }}
                  onSearch={(value: string) => {
                    setKeySCustomerGroup(value);
                  }}
                  onClear={() => setCustomerGroup("")}
                  filterOption={false}
                  allowClear
                  placeholder="Tất cả nhóm khách hàng"
                />
              </FormItemCustom>
              <FormItemCustom
                label={"Khu vực"}
                className="border-none mr-2 w-[175px]"
              >
                <Select
                  className="!bg-[#F4F6F8] options:bg-[#F4F6F8]"
                  options={listTerritory}
                  onSelect={(value) => {
                    setTerritory(value);
                  }}
                  onSearch={(value: string) => {
                    setKeySTerritory(value);
                  }}
                  onClear={() => setTerritory("")}
                  filterOption={false}
                  allowClear
                  placeholder="Tất cả khu vực"
                />
              </FormItemCustom>
          </Row>
        </div>
        <div className="pt-10">
          <TableCustom
            bordered
            scroll={{ x: true }}
            columns={columnsCheckin}
            expandable={{ expandedRowRender, defaultExpandedRowKeys: ["0"] }}
            // dataSource={data}
          />
        </div>
      </div>
    </>
  );
}
