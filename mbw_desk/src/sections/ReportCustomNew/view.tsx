/** @format */

import { ContentFrame, TableCustom } from "../../components";
import { Col, Row } from "antd";
import type { TableColumnsType } from "antd";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { AxiosService } from "../../services/server";
import { useResize } from "@/hooks";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { mediaQuery, PAGE_SIZE } from "@/constant";
import Filter_group from "@/components/filter-group/Filter_group";
import DropDownFilter from "@/components/filter-group/dropDownFilter";
import SummaryDataReportNewCustomer from "./SummaryDataReportNewCustomer";
import ReportHeader from "../ReportHeader/ReportHeader";
import { useSelector } from "react-redux";

const columns: TableColumnsType<DataTypeCustomNew> = [
  {
    title: "STT",
    dataIndex: "stt",
    key: "stt",
    className: "!text-center",
    width: 60,
    render: (_, record: any, index: number) => (
      <div className="text-center">{index + 1}</div>
    ),
  },
  {
    title: "Mã nhân viên",
    dataIndex: "sales_person_id",
    key: "sales_person_id",
  },
  {
    title: "Tên nhân viên",
    dataIndex: "sales_person",
    key: "sales_person",
    width: 200,
  },
  {
    title: "Nhóm bán hàng",
    dataIndex: "sales_team",
    key: "sales_team",
    width: 200,
    render: (_, record: any) => (
      <div className="whitespace-normal">{record.sales_team}</div>
    ),
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
    width: 170,
    render: (_, record: any) => (
      <div className="truncate hover:whitespace-normal">
        {record.customer_group}
      </div>
    ),
  },
  {
    title: "Người liên hệ",
    dataIndex: "contact",
    key: "contact",
    render: (_, record: any) => <div>{record.contact}</div>,
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
    title: "Khu vưc",
    dataIndex: "territory",
    key: "territory",
    render: (_, record: any) => <div>{record.territory}</div>,
  },
  {
    title: "Địa chỉ",
    dataIndex: "address",
    key: "address",
    render: (_, record: any) => (
      <div className="truncate hover:whitespace-normal">{record.address}</div>
    ),
  },
  {
    title: "Ngày thu thập",
    dataIndex: "creation",
    key: "creation",
    render: (_, record: any) => (
      <div>{dayjs(record.creation * 1000).format("DD/MM/YYYY")}</div>
    ),
  },
  {
    title: "Nguồn",
    dataIndex: "f1",
    key: "f1",
    className: "!text-center",
    render: (value: any) => (
      <div className="!text-center">{value ? value : "-"}</div>
    ),
  },
  {
    title: <div className="!text-right">Số lần VT</div>,
    dataIndex: "totals_checkin",
    key: "totals_checkin",
    render: (_, record: any) => (
      <div className="!text-right">{record.totals_checkin}</div>
    ),
  },
  {
    title: "VT đầu",
    dataIndex: "first_checkin",
    key: "first_checkin",
    render: (value) => {
      return value ? <p>{dayjs(value * 1000).format("DD/MM/YYYY")}</p> : <></>;
    },
  },
  {
    title: "VT cuối",
    dataIndex: "last_checkin",
    key: "last_checkin",
    render: (value) => {
      return value ? <p>{dayjs(value * 1000).format("DD/MM/YYYY")}</p> : <></>;
    },
  },
  {
    title: <div className="!text-right">Số đơn hàng</div>,
    dataIndex: "totals_so",
    key: "totals_so",
    render: (_, record: any) => (
      <div className="!text-right">{record.totals_so}</div>
    ),
  },
  {
    title: "Đơn hàng cuối",
    dataIndex: "last_sale_order",
    key: "last_sale_order",
    render: (value) => {
      return value ? <p>{dayjs(value * 1000).format("DD/MM/YYYY")}</p> : <></>;
    },
  },
];

export default function ReportCustomNew() {
  const [dataCustomNew, setDataCustomNew] = useState<DataTypeCustomNew[]>([]);
  const [total, setTotal] = useState<number>(0);

  const [page, setPage] = useState<number>(1);

  const size = useResize();
  const [refresh, setRefresh] = useState<boolean>(false);

  const matchMedia = useMediaQuery(`${mediaQuery}`);

  const { startDate, endDate } = useSelector((state: any) => state.date);
  const {
    sales_team,
    employee,
    customer_type,
    customer_group,
    territory,
    has_sales_order,
  } = useSelector((state: any) => state.group);

  useEffect(() => {
    (async () => {
      const rsData = await AxiosService.get(
        "/api/method/mbw_dms.api.report.customer_report.customer_report",
        {
          params: {
            page_size: PAGE_SIZE,
            page_number: page,
            customer_type: customer_type,
            customer_group: customer_group,
            territory: territory,
            sales_person: employee,
            sales_team: sales_team,
            has_sales_order: has_sales_order,
            from_date: startDate,
            to_date: endDate,
          },
        }
      );

      let { result } = rsData;

      setDataCustomNew({
        ...result,
        data: result.data?.map((dataSale: any) => {
          return {
            ...dataSale,
            key: dataSale.cus_id,
          };
        }),
      });
      setTotal(result?.totals_cus);
    })();
  }, [
    page,
    customer_type,
    customer_group,
    territory,
    employee,
    has_sales_order,
    refresh,
    startDate,
    endDate,
    sales_team,
  ]);

  return (
    <>
      <ContentFrame
        header={
          <ReportHeader
            setRefresh={setRefresh}
            title="Báo cáo khách hàng mới"
            params={{
              report_type: "Report Customer",
              data_filter: {
                customer_type,
                customer_group,
                territory,
                sales_person: employee,
                sales_team,
                has_sales_order,
                startDate,
                endDate,
              },
            }}
            file_name="Report Customer.xlsx"
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
                inputOrder
                setPage={setPage}
                matchMedia={!matchMedia}
              />
            </Col>
          </Row>

          <div className="pt-5">
            <TableCustom
              dataSource={dataCustomNew?.data}
              bordered
              columns={columns}
              scroll={{
                x: 3000,
                // y: 400,
                y: dataCustomNew?.data?.length > 0 ? size?.h * 0.55 : undefined,
              }}
              pagination={
                total && total > PAGE_SIZE
                  ? {
                      pageSize: PAGE_SIZE,
                      showSizeChanger: false,
                      total,
                      current: dataCustomNew?.page_number,
                      onChange(p) {
                        setPage(p);
                      },
                    }
                  : false
              }
              summary={() => {
                return (
                  <SummaryDataReportNewCustomer
                    summaryData={dataCustomNew?.sum}
                  />
                );
              }}
            />
          </div>
        </div>
      </ContentFrame>
    </>
  );
}
