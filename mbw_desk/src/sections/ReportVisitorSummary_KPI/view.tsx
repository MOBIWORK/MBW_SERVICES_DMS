/** @format */

import { ContentFrame, TableCustom } from "../../components";
import { Col, Row } from "antd";
import { useEffect, useRef, useState } from "react";
import { AxiosService } from "../../services/server";
import dayjs from "dayjs";

import { useResize } from "@/hooks";
import Detailcheckin from "./modal/Detailcheckin";
import { ModalDetail } from "../ReportCheckin/components/ModalCheckin";
import DropDownFilter from "@/components/filter-group/dropDownFilter";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { mediaQuery, PAGE_SIZE } from "@/constant";
import Filter_group from "@/components/filter-group/Filter_group";
import ReportHeader from "../ReportHeader/ReportHeader";
import { useSelector } from "react-redux";
import { returnTimeDays } from "@/util";

export default function ReportVisitorSummary_KPI() {
  const [refresh, setRefresh] = useState<boolean>(false);

  const [total, setTotal] = useState<number>(0);
  const [dataCheckin, setDataCheckin] = useState<any>([]);
  const [page, setPage] = useState<number>(1);

  const matchMedia = useMediaQuery(`${mediaQuery}`);

  const { startDate, endDate } = useSelector((state: any) => state.date);
  const { sales_team, employee, customer_type, customer_group, territory } =
    useSelector((state: any) => state.group);

  const { curentMonth, currentYear } = useSelector((state: any) => state.month);
  const [modal, setModal] = useState<{
    open: boolean;
    id: any;
  }>({
    open: false,
    id: null,
  });

  const containerRef1 = useRef(null);
  const size = useResize();

  const closeModal = () => {
    setModal({
      open: false,
      id: null,
    });
  };

  const columnsCheckin: any = [
    {
      title: <div className="">STT</div>,
      dataIndex: "stt",
      key: "stt",
      render: (_: any, record: any, index: number) => index + 1,
    },
    {
      title: <div >Nhóm bán hàng</div>,
      dataIndex: "nhom_ban_hang",
      width: 100,
      key: "nhom_ban_hang",
      render: (_: any, record: any, index: number) => <div className="min-w-[100px]">{_}</div>,

    },
    {
      title: <div >Mã nhân viên</div>,
      dataIndex: "employee_code",
      key: "employee_code",
      width: 100,
      render: (_: any, record: any, index: number) => <div className="min-w-[140px]">{_}</div>,

    },
    {
      title: <div >Tên nhân viên</div>,
      dataIndex: "employee_name",
      width: 100,
      key: "employee_name",
    },
    {
      //Ngày: Là ngày nhân viên đã checkin
      title: <div className="text-center min-w-[80px]">Ngày</div>,
      dataIndex: "create_time",
      width: 100,
      key: "create_time",
      render: (value: any) => {
        return (
          <div>
            {value ? (
              dayjs.unix(value).format("DD/MM/YYYY")
            ) : (
              <div className="min-w-[40px] text-center">-</div>
            )}
          </div>
        );
      },
    },
    {
      //Checkin đầu ngày: Là thời gian lần checkin đầu tiên trong ngày
      title: <div className="text-center">Checkin đầu ngày</div>,
      dataIndex: "checkin_daungay",
      key: "checkin_daungay",
      width: 100,
      render: (value: any) => (
        <div className="min-w-[120px] text-center">
          {value ? (
            dayjs(value).format("HH:mm")
          ) : (
            <div>-</div>
          )}
        </div>
      ),
    },
    {
      //Checkout cuối ngày: Là thời gian checkout cuối cùng trong ngày
      title: <div className="text-center">Checkin cuối ngày</div>,
      dataIndex: "checkin_cuoingay",
      key: "checkin_cuoingay",
      width: 100,
      render: (value: any) => (
        <div className="min-w-[120px] text-center">
          {value ? (
            dayjs(value).format("HH:mm")
          ) : (
            <div >-</div>
          )}
        </div>
      ),
    },
    {
      //Khách hàng VT: Là tổng số KH mà nhân viên đó đã đi checkin trong ngày
      title: <div className="text-center">Khách hàng VT</div>,
      dataIndex: "customers",
      key: "customers",
      width: 100,
      render: (value: any) => (
        <div className="!text-center min-w-[120px] ">{value ? value.length : 0}</div>
      ),
    },
    {
      //Khách hàng VT sáng: Tổng số KH đã được checkin vào buổi sáng (Có link sang bảng con chi tiết)
      title: <div className="text-center">Khách hàng VT sáng</div>,
      dataIndex: "checkin_sang",
      key: "checkin_sang",
      width: 100,
      render: (value: number, record: any) => {
        return (
          <div
            className="!text-center underline underline-offset-4 text-blue-600 min-w-[130px] "
            onClick={() => {
              setModal({
                open: true,
                id: {
                  checkin_note_id: record?.checkin_note_id,
                  time: "sáng",
                  timeCheckin: record?.create_time,
                  employee: record?.employee_code,
                  name_employee: record?.employee_name,
                  ...returnTimeDays({timestamp: record.create_time})
                },
              });
            }}>
            {value ? value : <div className="min-w-[40px]">0</div>}
          </div>
        );
      },
    },
    {
      //Khách hàng VT chiều: Tổng số KH đã được checkin vào buổi chiều (có link sang bảng con chi tiết)
      title: <div className="text-center">Khách hàng VT chiều</div>,
      dataIndex: "checkin_chieu",
      key: "checkin_chieu",
      width: 100,
      render: (value: any, record: any) => (
        <div
          className="!text-center underline underline-offset-4 text-blue-600 min-w-[130px]"
          onClick={() => {
            setModal({
              open: true,
              id: {
                time: "chiều",
                checkin_note_id: record?.checkin_note_id,
                timeCheckin: record?.create_time,
                employee: record?.employee_code,
                name_employee: record?.employee_name,
                ...returnTimeDays({timestamp: record.create_time})
              },
            });
          }}>
          {value ? (
            value
          ) : (
            <div className="min-w-[40px] underline-none ">0</div>
          )}
        </div>
      ),
    },
    {
      //Số km VT: Tổng số Km đi được trong ngày (tham khảo báo cáo VT)
      title: <div className="text-center">Số km VT</div>,
      dataIndex: "total_distance",
      key: "total_distance",
      width: 100,
      render: (value: any) => (
        <div className="!text-center min-w-[100px]">
          {value ? value.toFixed(2) : <div className="min-w-[40px]">-</div>}
        </div>
      ),
    },
    {
      //Số đơn hàng: Tổng số đơn hàng được đặt thành công trong ngày (Cả đơn trên web và mobile, không tính đơn chưa duyệt)
      title: <div className="text-center">Số đơn hàng</div>,
      dataIndex: "total_donhang",
      key: "total_donhang",
      width: 100,
      render: (value: any) => (
        <div className="!text-center min-w-[100px]">
          {value ? value : <div className="min-w-[40px]">-</div>}
        </div>
      ),
    },
    {
      //Ảnh chụp: Số ảnh chụp khi đi VT trong ngày
      title: <div className="text-center">Ảnh chụp</div>,
      dataIndex: "total_anhchup",
      key: "total_anhchup",
      width: 100,
      render: (value: any, record: any) => {
        return (
          <div className="!text-center min-w-[100px]">
            {record && record?.customers ? (
              record?.customers[0]?.total_image
            ) : (
              <div className="min-w-[40px]">-</div>
            )}
          </div>
        );
      },
    },
    {
      //Doanh số: Tổng số tiền từ các đơn hàng được tính trong cột Số đơn hàng
      title: <div className="text-center">Doanh số</div>,
      dataIndex: "total_doanhso",
      key: "total_doanhso",
      width: 100,
      render: (value: any) => (
        <div className="!text-center min-w-[100px]">
          {value ? Intl.NumberFormat().format(value) : <div className="min-w-[40px]">-</div>}
        </div>
      ),
      
    },
    {
      //Doanh thu: Tổng số tiền tính từ các hóa đơn bán hàng (Sales invoid)
      title: <div className="text-center">Doanh thu</div>,
      dataIndex: "total_doanhthu",
      key: "total_doanhthu",
      width: 100,
      render: (value: any) => (
        <div className="!text-center min-w-[100px]">
          {value ? Intl.NumberFormat().format(value) : <div className="min-w-[40px]">-</div>}
        </div>
      ),
    },
  ];

  useEffect(() => {
    (async () => {
      const rsData = await AxiosService.get(
        "/api/method/mbw_dms.api.report.visitor_kpi.report_visitor_kpi",
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
            title="Báo cáo tổng hợp Viếng thăm - KPI"
            params={{
              params: {
                report_type: "Report Visitor_KPI",
                data_filter: { month: curentMonth, year: currentYear },
              },
            }}
            file_name="ReportVisitor_KPI.xlsx"
          />
        }>
        <div className="bg-white rounded-2xl pt-4 pb-7  border-[#DFE3E8] border-[0.2px] border-solid">
          <Row
            gutter={[16, 16]}
            className={`flex ${
              matchMedia ? "justify-end" : "justify-between"
            } items-center w-full`}>
          {!matchMedia ? (
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
          ) : (
            <Col className="!ml-4">
              <DropDownFilter
                 inputFromDate
                 inputToDate
                 inputSaleGroup
                 inputEmployee
                setPage={setPage}
                matchMedia={!matchMedia}
              />
            </Col>)}
        
          </Row>
          <div ref={containerRef1} className="pt-5">
            <TableCustom
              bordered
              $border
              dataSource={dataCheckin?.data?.map((report: any) => ({
                key: report.create_time.toString(),
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
                x: true,
                // y: containerHeight < 300 ? undefined : scrollYTable1,
                y: dataCheckin?.data?.length > 0 ? size?.h * 0.55 : undefined,
              }}
              columns={columnsCheckin}
              //   expandable={{ expandedRowRender, defaultExpandedRowKeys: ["0"] }}
            />
          </div>
          <ModalDetail
            title={
              <div className="font-semibold text-2xl leading-[22px] text-[#222222] px-4 pt-4">
                Khách hàng viếng thăm {modal.id?.time}
              </div>
            }
            open={modal.open}
            onCancel={closeModal}
            footer={false}
            width={1120}>
            <Detailcheckin
              checkin_note_id={modal.id?.checkin_note_id}
              employee={modal.id?.employee}
              timeCheckin={modal.id?.timeCheckin}
              from_date={modal.id?.from_date}
              to_date={modal.id?.to_date}
              time_slot={modal.id?.time}
            />
          </ModalDetail>
        </div>
      </ContentFrame>
    </>
  );
}
