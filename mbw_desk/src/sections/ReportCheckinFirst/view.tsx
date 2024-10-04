/** @format */
import { ContentFrame, TableCustom } from "../../components";
import { Col, Row } from "antd";
import type { TableColumnsType } from "antd";
import { useEffect, useState } from "react";
import { AxiosService } from "@/services/server";
import { useResize } from "@/hooks";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { mediaQuery, PAGE_SIZE } from "@/constant";
import Filter_group from "@/components/filter-group/Filter_group";
import DropDownFilter from "@/components/filter-group/dropDownFilter";
import ReportHeader from "../ReportHeader/ReportHeader";
import { useSelector } from "react-redux";

const columns: TableColumnsType<DataCheckinFirst> = [
  {
    title: "STT",
    dataIndex: "stt",
    key: "stt",
    width: 60,
    render: (_, record: any, index: number) => (
      <div className="text-center">{index + 1}</div>
    ),
  },
  {
    title: "Nhóm bán hàng",
    dataIndex: "sales_team",
    key: "sales_team",
    render: (_, record: any) => <div>{record.sales_team}</div>,
  },
  {
    title: "Mã nhân viên",
    dataIndex: "employee_id",
    key: "employee_id",
    render: (_, record: any) => <div>{record.employee_id}</div>,
  },
  {
    title: "Tên nhân viên",
    dataIndex: "sales_person",
    key: "sales_person",
    render: (_, record: any) => <div>{record.sales_person}</div>,
  },
  {
    title: "Mã khách hàng",
    dataIndex: "customer_code",
    key: "customer_code",
    render: (_, record: any) => <div>{record.customer_code}</div>,
  },
  {
    title: "Tên khách hàng",
    dataIndex: "customer_name",
    key: "customer_name",
    render: (_, record: any) => <div>{record.customer_name}</div>,
  },
  {
    title: "Loại khách hàng",
    dataIndex: "customer_type",
    key: "customer_type",
    render: (_, record: any) => <div>{record.customer_type}</div>,
  },
  {
    title: "Nhóm khách hàng",
    dataIndex: "customer_group",
    key: "customer_group",
    render: (_, record: any) => <div>{record.customer_group}</div>,
  },
  {
    title: "Người liên hệ",
    dataIndex: "contact_person",
    key: "contact_person",
    render: (_, record: any) => (
      <div className="!w-[175px] truncate hover:whitespace-normal">
        {record.contact_person}
      </div>
    ),
  },
  {
    title: "SDT",
    dataIndex: "phone",
    key: "phone",
    render: (_, record: any) => <div>{record.phone}</div>,
  },
  {
    title: "Mã số thuế",
    dataIndex: "tax_id",
    key: "tax_id",
    render: (_, record: any) => <div>{record.tax_id}</div>,
  },
  {
    title: "Khu vực",
    dataIndex: "territory",
    key: "territory",
    render: (_, record: any) => <div>{record.territory}</div>,
  },
  {
    title: "Địa chỉ",
    dataIndex: "address",
    key: "address",
    render: (_, record: any) => (
      <div className="!w-[175px] truncate hover:whitespace-normal">
        {record.address}
      </div>
    ),
  },
  {
    title: "Ngày viếng thăm",
    dataIndex: "date_checkin",
    key: "date_checkin",
    render: (_, record: any) => (
      <div>
        {record.date_checkin
          ?.split("-")
          ?.reverse()
          ?.toString()
          ?.replaceAll(",", "-")}
      </div>
    ),
  },
];

export default function ReportCheckinFirst() {
  const [dataReport, setDataReport] = useState<DataCheckinFirst[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(1);

  const size = useResize();
  const matchMedia = useMediaQuery(`${mediaQuery}`);
  const [refresh, setRefresh] = useState<boolean>(false);

  const { startDate, endDate } = useSelector((state: any) => state.date);
  const { sales_team, employee, customer_type, customer_group, territory } =
    useSelector((state: any) => state.group);

  useEffect(() => {
    (async () => {
      const rsData = await AxiosService.get(
        "/api/method/mbw_dms.api.report.first_checkin_rp.first_checkin_report",
        {
          params: {
            page_size: PAGE_SIZE,
            page_number: page,
            sales_person: employee,
            customer_group: customer_group,
            customer_type: customer_type,
            territory: territory,
            from_date: startDate,
            to_date: endDate,
          },
        }
      );

      let { result } = rsData;

      setDataReport(result);
      setTotal(result?.totals);
    })();
  }, [
    page,
    employee,
    customer_group,
    customer_type,
    territory,
    startDate,
    endDate,
    refresh,
  ]);

  return (
    <>
      <ContentFrame
        header={
          <ReportHeader
            setRefresh={setRefresh}
            title={
              <div className="min-w-[230px] ">
                Báo cáo thống kê khách hàng viếng thăm lần đầu
              </div>
            }
            params={{
              report_type: "Report Customer Checkin",
              data_filter: {
                sales_person: employee,
                customer_group: customer_group,
                customer_type: customer_type,
                territory: territory,
                from_date: startDate,
                to_date: endDate,
              },
            }}
            file_name="Report Customer Checkin.xlsx"
          />
        }>
        <div className="bg-white rounded-2xl pt-4 pb-7 border-[#DFE3E8] border-[0.2px] border-solid">
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
              dataSource={dataReport?.data?.map(
                (dataCheckin: DataCheckinFirst) => {
                  return {
                    ...dataCheckin,
                    key: dataCheckin.name,
                  };
                }
              )}
              bordered
              scroll={{
                x: 3000,
                // y: containerHeight < 400 ? undefined : scrollYTable1,
                y: dataReport?.data?.length > 0 ? size?.h * 0.55 : undefined,
              }}
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
              columns={columns}
            />
          </div>
        </div>
      </ContentFrame>
    </>
  );
}
