/** @format */
import { ContentFrame, TableCustom } from "../../components";
import { Col, Row, Table } from "antd";
import type { TableColumnsType } from "antd";
import { useEffect, useState } from "react";
import { AxiosService } from "../../services/server";
import dayjs from "dayjs";
import { useResize } from "@/hooks";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { mediaQuery, PAGE_SIZE } from "@/constant";
import Filter_group from "@/components/filter-group/Filter_group";
import DropDownFilter from "@/components/filter-group/dropDownFilter";
import SummaryDataReportSale from "./SummaryDataReportSaleOrder";
import ReportHeader from "../ReportHeader/ReportHeader";

import { useSelector } from "react-redux";

export default function ReportSales() {
  const columns: TableColumnsType<DataSaleOrder> = [
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
      title: "Đơn đặt",
      dataIndex: "name",
      key: "name",
      width: 100,
      render: (_, record: any) => (
        <a
          className="text-[#212B36]"
          href={`/app/sales-invoice/${record.name}`}
          target="_blank">
          {record.name}
        </a>
      ),
    },
    {
      title: "Khách hàng",
      dataIndex: "customer",
      key: "customer",
      width: 120,
      render: (_, record: any) => <div>{record.customer}</div>,
    },
    {
      title: "Khu vực",
      dataIndex: "territory",
      key: "territory",
      width: 120,
      render: (_, record: any) => <div>{record.territory}</div>,
    },
    {
      title: "Ngày tạo",
      dataIndex: "posting_date",
      key: "posting_date",
      width: 120,
      render: (_, record: any) => (
        <div>{dayjs(record.posting_date * 1000).format("DD/MM/YYYY")}</div>
      ),
    },
    {
      title: "Nhân viên",
      dataIndex: "sales_person",
      key: "sales_person",
      width: 120,
      render: (_, record: any) => <div>{record.sales_person}</div>,
    },
    {
      title: <div className="text-right">Thành tiền (VNĐ)</div>,
      dataIndex: "total",
      key: "total",
      width: 140,
      render: (_, record: any) => (
        <div className="!text-right">
          {Intl.NumberFormat().format(record.total)}
        </div>
      ),
    },
    {
      title: <div className="text-right">Tiền VAT (VNĐ)</div>,
      dataIndex: "tax_amount",
      key: "tax_amount",
      width: 140,
      render: (_, record: any) => (
        <div className="text-right">
          {Intl.NumberFormat().format(record.tax_amount)}
        </div>
      ),
    },
    {
      title: <div className="text-right">Chiết khấu (VNĐ)</div>,
      dataIndex: "discount_amount",
      key: "discount_amount",
      width: 160,
      render: (_, record: any) => (
        <div className="text-right">
          {Intl.NumberFormat().format(record.discount_amount)}
        </div>
      ),
    },
    {
      title: <div className="text-right">Tổng tiền (VNĐ)</div>,
      width: 160,
      dataIndex: "grand_total",
      key: "grand_total",
      render: (_, record: any) => (
        <div className="text-right">
          {Intl.NumberFormat().format(record.grand_total)}
        </div>
      ),
    },
  ];
  const [dataSaleOrder, setDataSaleOrder] = useState<DataSaleOrder[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(1);

  const size = useResize();
  const [refresh, setRefresh] = useState<boolean>(false);

  const matchMedia = useMediaQuery(`${mediaQuery}`);
  const calculateIndex = (
    pageNumber: number,
    pageSize: number,
    index: number
  ) => {
    return (pageNumber - 1) * pageSize + index + 1;
  };

  const expandedRowRender = (recordTable: any) => {
    const columns: TableColumnsType<DataItem> = [
      {
        title: <div className="text-center">STT</div>,
        dataIndex: "stt",
        key: "stt",
        render: (_, record: any, index) => (
          <div className="text-center">{index + 1}</div>
        ),
      },
      { title: "Mã sản phẩm", dataIndex: "item_code", key: "item_code" },
      { title: "Tên sản phẩm", dataIndex: "item_name", key: "item_name" },
      { title: "Nhóm sản phẩm", dataIndex: "item_group", key: "item_group" },
      { title: "Nhãn hàng", dataIndex: "brand", key: "brand" },
      { title: "Kho", dataIndex: "warehouse", key: "warehouse" },
      {
        title: <div className="text-right">Đơn giá</div>,
        dataIndex: "rate",
        key: "rate",
        render: (_, record: any) => (
          <div className="!text-right">
            {Intl.NumberFormat().format(record.rate)}
          </div>
        ),
      },
      { title: "Đơn vị tính", dataIndex: "uom", key: "uom" },
      {
        title: <div className="text-right">Số lượng</div>,
        dataIndex: "qty",
        key: "qty",
        render: (_, record: any) => (
          <div className="!text-right">{record.qty}</div>
        ),
      },
      {
        title: <div className="text-right">Chiết khấu (%)</div>,
        dataIndex: "discount_percentage",
        key: "discount_percentage",
        render: (_, record: any) => (
          <div className="!text-right">
            {Intl.NumberFormat().format(record.discount_percentage)}
          </div>
        ),
      },
      {
        title: <div className="text-right">Tiền chiết khấu (VNĐ)</div>,
        dataIndex: "discount_amount",
        key: "discount_amount",
        render: (_, record: any) => (
          <div className="!text-right">
            {Intl.NumberFormat().format(record.discount_amount)}
          </div>
        ),
      },
      {
        title: <div className="text-right">Tiền VAT (VNĐ)</div>,
        dataIndex: "money_vat",
        key: "money_vat",
        render: (_, record: any) => (
          <div className="!text-right">
            {Intl.NumberFormat().format(record.money_vat)}
          </div>
        ),
      },
      {
        title: <div className="text-right">Tổng tiền (VNĐ)</div>,
        dataIndex: "amount",
        key: "amount",
        render: (_, record: any) => (
          <div className="!text-right">
            {Intl.NumberFormat().format(record.amount)}
          </div>
        ),
      },
    ];
    return (
      <Table
        bordered
        columns={columns}
        dataSource={recordTable.items.map((item: DataItem) => {
          return {
            ...item,
            key: item.item_code,
          };
        })}
        pagination={false}
      />
    );
  };

  const { startDate, endDate } = useSelector((state: any) => state.date);
  const { employee, territory, company, customer, warehouse } = useSelector(
    (state: any) => state.group
  );

  useEffect(() => {
    (async () => {
      const rsData = await AxiosService.get(
        "/api/method/mbw_dms.api.report.so_report.si_report",
        {
          params: {
            page_size: PAGE_SIZE,
            page_number: page,
            company: company,
            territory: territory,
            customer: customer,
            from_date: startDate,
            to_date: endDate,
            warehouse: warehouse,
            sales_person: employee,
          },
        }
      );

      let { result } = rsData;

      setDataSaleOrder(result);
      setTotal(result?.totals);
    })();
  }, [
    page,
    company,
    territory,
    customer,
    startDate,
    endDate,
    warehouse,
    employee,
    refresh,
  ]);

  return (
    <>
      <ContentFrame
        header={
          <ReportHeader
            setRefresh={setRefresh}
            title="Báo cáo tổng hợp đặt hàng"
            params={{
              report_type: "Report Sell",
              data_filter: {
                company: company,
                territory: territory,
                customer: customer,
                from_date: startDate,
                to_date: endDate,
                warehouse: warehouse,
                sales_person: employee,
              },
            }}
            file_name="Report Sell.xlsx"
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
                <Row className="space-x-4">
                  <Filter_group
                    setPage={setPage}
                    inputMonth
                    inputYear
                    inputSaleGroup
                    inputEmployee
                  />
                </Row>
              </Col>
            )}
            <Col className="!ml-4 ">
              <DropDownFilter
                setPage={setPage}
                inputMonth
                inputYear
                inputSaleGroup
                inputEmployee
                inputCompany
                inputCustomer
                inputTerritory
                inputWarehouse
                matchMedia={!matchMedia}
              />
            </Col>
          </Row>

          <div className="pt-5">
            <TableCustom
              dataSource={dataSaleOrder?.data?.map(
                (dataSale: DataSaleOrder) => {
                  return {
                    ...dataSale,
                    key: dataSale.name,
                  };
                }
              )}
              expandable={{ expandedRowRender, defaultExpandedRowKeys: ["0"] }}
              bordered
              $border
              columns={columns}
              scroll={{
                x:
                  dataSaleOrder?.data?.length > 0 || size?.w < 1400
                    ? true
                    : undefined,
                // y: containerHeight < 300 ? undefined : scrollYTable1,
                y: dataSaleOrder?.data?.length > 0 ? size?.h * 0.55 : undefined,
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
              summary={() => {
                return (
                  <SummaryDataReportSale summaryData={dataSaleOrder?.sum} />
                );
              }}
            />
          </div>
        </div>
      </ContentFrame>
    </>
  );
}
