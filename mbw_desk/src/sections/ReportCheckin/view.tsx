/** @format */
import { ContentFrame, TableCustom } from "../../components";
import { Col, Row, Table } from "antd";
import { TableColumnsType } from "antd/lib";
import { useEffect, useState } from "react";
import { AxiosService } from "../../services/server";
import dayjs from "dayjs";
import { TrueCheck } from "@/icons/true-check";
import { FalseCheck } from "@/icons/false-check";
import { useResize } from "@/hooks";
import { ModalDetail } from "./components/ModalCheckin";
import Detailmodal from "./Detailmodal";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { mediaQuery, PAGE_SIZE } from "@/constant";
import Filter_group from "@/components/filter-group/Filter_group";
import DropDownFilter from "@/components/filter-group/dropDownFilter";
import ReportHeader from "../ReportHeader/ReportHeader";

import { useSelector } from "react-redux";

export default function ReportCheckin() {
  const columnsCheckin: any = [
    {
      title: (
        <div className="relative">
          <span className="absolute -top-[11px] -left-8">STT</span>
        </div>
      ),
      dataIndex: "stt",
      key: "stt",
      width: 60,
      render: (_: any, __: any, index: number) => (
        <span>{calculateIndex(page, PAGE_SIZE, index)}</span> // Tính toán index cho từng dòng
      ),
    },
    {
      title: <div className="!min-w-[100px]">Mã Nhân viên</div>,
      dataIndex: "employee_code",
      key: "employee_code",
    },
    {
      title: "Tên nhân viên",
      dataIndex: "employee_name",
      key: "employee_name",
    },
    {
      title: "Nhóm bán hàng",
      dataIndex: "sale_group",
      key: "sale_group",
      width: 200,
    },
    {
      title: "Ngày",
      dataIndex: "create_time",
      key: "create_time",
      render: (value: any) => (
        <div>{dayjs.unix(value).format("DD/MM/YYYY")}</div>
      ),
    },
    {
      title: "Thứ",
      dataIndex: "create_time",
      key: "create_time",
      render: (value: any) => <div>{dayjs.unix(value).format("dddd")}</div>,
    },
    {
      title: "Giờ làm",
      className: "!text-center",
      dataIndex: "total_work",
      key: "total_work",
      render: (value: any) => (
        <div className="!text-center">
          {parseFloat((value / 60).toFixed(2))}
        </div>
      ),
    },
    {
      title: "Giờ viếng thăm",
      dataIndex: "total_time",
      className: "!text-center",
      width: 130,
      key: "total_time",
      render: (value: any) => (
        <div className="!text-center">
          {parseFloat((value / 60).toFixed(2))}
        </div>
      ),
    },
    {
      title: "Số km tự động (km)",
      dataIndex: "kmauto",
      className: "!text-center",
      key: "kmauto",
      width: 130,
      render: (value: any) => (
        <div className="!text-center">
          {value ? value : <div className="min-w-[50px]">-</div>}
        </div>
      ),
    },
    {
      title: "Số km di chuyển (km)",
      className: "!text-center",
      dataIndex: "kmmove",
      key: "kmmove",
      width: 160,
      render: (value: any) => (
        <div className="!text-center">
          {value ? value : <div className="min-w-[50px]">-</div>}
        </div>
      ),
    },
    {
      title: "Vận tốc (km/h)",
      dataIndex: "speed",
      className: "!text-center",
      key: "kmmove",
      width: 130,
      render: (value: any) => (
        <div className="!text-center">
          {value ? value : <div className="min-w-[50px]">-</div>}
        </div>
      ),
    },
  ];
  const [dataCheckin, setDataCheckin] = useState<any>([]);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [refresh, setRefresh] = useState<boolean>(false);

  const size = useResize();
  const matchMedia = useMediaQuery(`${mediaQuery}`);

  const { startDate, endDate } = useSelector((state: any) => state.date);
  const { sales_team, employee, customer_type, customer_group, territory } =
    useSelector((state: any) => state.group);
  const calculateIndex = (
    pageNumber: number,
    pageSize: number,
    index: number
  ) => {
    return (pageNumber - 1) * pageSize + index + 1;
  };
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

  const expandedRowRender = (recordTable: any) => {
    const columns: TableColumnsType<any> = [
      {
        title: "Khách hàng",
        dataIndex: "customer",
        key: "customer",
        render: (_, record) => (
          <>
            <>{record.customer_name}</>
            <div className="text-[#637381]">{record.customer_code}</div>
          </>
        ),
      },
      {
        title: "Địa chỉ",
        dataIndex: "customer_address",
        key: "customer_address",
        width: 200,
        render: (_, record) => (
          <div className="truncate hover:whitespace-normal">
            {record.customer_address}
          </div>
        ),
      },
      {
        title: "Loại hình khách hàng",
        dataIndex: "customer_type",
        key: "customer_type",
        width: 200,
        render: (_, record) => <>{record.customer_type}</>,
      },
      {
        title: "Nhóm khách",
        dataIndex: "customer_group",
        key: "customer_group",
        render: (_, record) => <>{record.customer_group}</>,
      },
      {
        title: "Số điện thoại",
        dataIndex: "customer_sdt",
        key: "customer_sdt",
        render: (_, record) => <>{record.customer_sdt}</>,
      },
      {
        title: "Liên hệ",
        dataIndex: "customer_contact",
        key: "customer_contact",
        render: (_, record) => <>{record.customer_contact}</>,
      },
      {
        title: "Checkin",
        dataIndex: "checkin",
        className: "!text-center",
        key: "checkin",
        render: (_, record) => (
          <div className="!text-center">{record.checkin}</div>
        ),
      },
      {
        title: "Checkout",
        dataIndex: "checkout",
        className: "!text-center",
        key: "checkout",
        render: (_, record) => (
          <div className="!text-center">{record.checkout}</div>
        ),
      },
      {
        title: "Số giờ viếng thăm",
        dataIndex: "time_check",
        key: "time_check",
        render: (value: any) => (
          <div className="!text-center">
            {parseFloat((value / 60).toFixed(3))}
          </div>
        ),
      },
      {
        title: "Địa chỉ checkin",
        dataIndex: "checkin_address",
        key: "checkin_address",
        render: (_, record) => (
          <div className="truncate hover:whitespace-normal">
            {record.checkin_address}
          </div>
        ),
      },
      {
        title: "Khoảng cách",
        dataIndex: "distance",
        className: "!text-center",
        key: "distance",
        render: (_, record) => (
          <div className="!text-center">
            {parseFloat(record.distance).toFixed(2)}
          </div>
        ),
      },
      {
        title: "Thiết bị",
        dataIndex: "device",
        key: "device",
        className: "!text-center",
        render: (value: any) => (
          <div className="!text-center">{value ? value : "-"}</div>
        ),
      },
      {
        title: "Số ảnh chụp",
        dataIndex: "total_image",
        className: "!text-center",
        key: "total_image",
        render: (_, record) => (
          <div className="!text-center">{record.total_image}</div>
        ),
      },
      {
        title: "Đúng tuyến",
        dataIndex: "is_router",
        className: "!text-center",
        key: "is_router",
        render: (value: any) => (
          <div className="!text-center">
            {value === "1" ? <TrueCheck /> : <FalseCheck />}
          </div>
        ),
      },
      {
        title: "Đơn hàng",
        dataIndex: "is_order",
        className: "!text-center",
        key: "is_order",
        render: (value: any) => (
          <div className="!text-center">
            {value === "1" ? <TrueCheck /> : <FalseCheck />}
          </div>
        ),
      },
      {
        title: "Ghi tồn",
        dataIndex: "is_check_inventory",
        className: "!text-center",
        key: "is_check_inventory",
        render: (value: any) => (
          <div className="!text-center">
            {value === "1" ? <TrueCheck /> : <FalseCheck />}
          </div>
        ),
      },
      {
        title: "Ghi chú",
        dataIndex: "checkin_id",
        key: "checkin_id",
        render: (value: any) => (
          <div className="!text-left">
            {value ? (
              <div
                onClick={() => {
                  // console.log(value);
                  setModal({
                    open: true,
                    id: value,
                  });
                }}
                className="text-[#1877F2] text-sm font-medium- !text-left cursor-pointer underline">
                Xem ghi chú
              </div>
            ) : (
              "-"
            )}
          </div>
        ),
      },
    ];
    return (
      <Table
        bordered
        dataSource={recordTable?.customers?.map((item: any) => {
          let id = Math.random();
          return {
            ...item,
            key: id,
          };
        })}
        scroll={{ x: 2700, y: 280 }}
        columns={columns}
        pagination={false}
      />
    );
  };

  useEffect(() => {
    (async () => {
      const rsData = await AxiosService.get(
        "/api/method/mbw_dms.api.report.checkin_report.checkin_report_info",
        {
          params: {
            page_size: PAGE_SIZE,
            page_number: page,
            from_date:startDate,
            to_date:endDate,
            employee,
            sales_team,
            territory,
            customer_group,
            customer_type,
          },
        }
      );

      let { result } = rsData;

      setDataCheckin(result);
      setTotal(result?.totals);
    })();
  }, [
    page,
    startDate,
    endDate,
    refresh,
    sales_team,
    employee,
    customer_group,
    customer_type,
  ]);

  return (
    <>
      <ContentFrame
        header={
          <ReportHeader
          setRefresh={setRefresh}
          title="Báo cáo viếng thăm"
          params={{
            report_type: "Report Checkin",
            data_filter: {
              startDate,
              endDate,
              employee,
              sales_team,
              territory,
              customer_group,
              customer_type,
            },
          }}
          file_name="checkin-report.xlsx"
          />
        }>
        <div className="bg-white rounded-2xl pt-4 pb-7  border-[#DFE3E8] border-[0.2px] border-solid">
          <Row
            gutter={[16, 16]}
            className={`flex ${
              matchMedia ? "justify-end" : "justify-between"
            } items-center w-full`}>
            {!matchMedia && (
              <Col className="ml-4 w-[78%]">
                <Row gutter={[8, 8]} className="space-x-4">
                  <Filter_group
                    setPage={setPage}
                    inputFromDate
                    inputToDate
                    inputSaleGroup
                    inputEmployee
                  />
                </Row>
              </Col>
            )}
            <Col className="!ml-4">
              <DropDownFilter
                inputCustomerType
                inputCustomerGroup
                inputTerritory
                inputFromDate
                inputToDate
                inputSaleGroup
                inputEmployee
                setPage={setPage}
                matchMedia={!matchMedia}
              />
            </Col>
          </Row>
          <div className="pt-5">
            <TableCustom
              bordered
              $border
              dataSource={dataCheckin?.data?.map((report: any) => ({
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
                x:
                  dataCheckin?.data?.length > 0 || size?.w < 1567
                    ? true
                    : undefined,
                // y: containerHeight < 300 ? undefined : scrollYTable1,
                y: dataCheckin?.data?.length > 0 ? size?.h * 0.55 : undefined,
              }}
              columns={columnsCheckin}
              expandable={{ expandedRowRender, defaultExpandedRowKeys: ["0"] }}
            />
          </div>
        </div>
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
      </ContentFrame>
    </>
  );
}
