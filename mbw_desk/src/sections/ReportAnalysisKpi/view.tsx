/** @format */

import { ContentFrame, TableCustom } from "../../components";

import { Row, Col } from "antd";
import { useEffect, useState } from "react";
import { AxiosService } from "../../services/server";
import { useResize } from "@/hooks";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { mediaQuery, PAGE_SIZE } from "@/constant";
import DropDownFilter from "@/components/filter-group/dropDownFilter";
import Filter_group from "@/components/filter-group/Filter_group";
import ReportHeader from "../ReportHeader/ReportHeader";
import { useSelector } from "react-redux";

const { Column, ColumnGroup } = TableCustom;

const ReportAnalysis_KPI = () => {
  const [page, setPage] = useState<number>(1);

  const [dataReort, setDataReport] = useState<any[]>([]);

  const [total, setTotal] = useState<number>(0);
  const size = useResize();

  const [refresh, setRefresh] = useState<boolean>(false);

  const matchMedia = useMediaQuery(`${mediaQuery}`);

  const { currentMonth, currentYear } = useSelector(
    (state: any) => state.month
  );
  const { sales_team, employee, customer_type, customer_group, territory } =
    useSelector((state: any) => state.group);

  useEffect(() => {
    (async () => {
      const rsData = await AxiosService.get(
        "/api/method/mbw_dms.api.report.kpi.analisis_kpi",
        {
          params: {
            page_size: PAGE_SIZE,
            page_number: page,
            month: currentMonth,
            year: currentYear,
            sales_team,
            employee,
            customer_group,
            customer_type,
            territory,
          },
        }
      );
      setDataReport(rsData?.result);
      setTotal(rsData?.result?.totals);
    })();
  }, [
    currentMonth,
    currentYear,
    sales_team,
    employee,
    page,
    refresh,
    customer_group,
    customer_type,
    territory,
  ]);

  return (
    <>
      <ContentFrame
        header={
          <ReportHeader
            setRefresh={setRefresh}
            title="Báo cáo tổng hợp phân tích KPI"
            params={{
              report_type: "Report Analysis KPI",
              data_filter: {
                month: currentMonth,
                year: currentYear,
                //còn đẩy lên sale team sale person
              },
            }}
            file_name="Report Analysis KPI.xlsx"
          />
        }>
        <div className="bg-white rounded-2xl pt-4 pb-7 border-[#DFE3E8] border-[0.2px] border-solid">
          <Row
            gutter={[16, 16]}
            className={`pr-4 items-center ${
              matchMedia ? "justify-end" : "justify-between"
            } `}>
            {!matchMedia && (
              <Col className="ml-4 w-[78%] ">
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
            <Col className="!ml-4">
              <DropDownFilter
                inputCustomerType
                inputCustomerGroup
                inputTerritory
                inputMonth
                inputYear
                inputSaleGroup
                inputEmployee
                setPage={setPage}
                matchMedia={!matchMedia}
              />
            </Col>
          </Row>
          <div className="mt-5 ">
            <TableCustom
              dataSource={dataReort?.data?.map((report: any) => ({
                key: report.nhom_ban_hang,
                ...report,
              }))}
              bordered
              scroll={{
                x: "max-content",
                // y: containerHeight < 400 ? undefined : scrollYTable1,
                y: dataReort?.data?.length > 0 ? size?.h * 0.55 : undefined,
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
              }>
              <Column
                title="STT"
                dataIndex="stt"
                key="stt"
                fixed="left"
                width={60}
                render={(_: any, record: any, index: number) => {
                  return record.ten_nv == undefined ? index + 1 : "";
                }}
              />

              <Column
                title={() => (
                  <p className="whitespace-pre-line text-clip text-center">
                    Nhóm bán hàng/ Nhân viên
                  </p>
                )}
                dataIndex="nhom_ban_hang"
                key="nhom_ban_hang"
                fixed="left"
                width={140}
                render={(_, record: any) => {
                  return <>{_ != null ? _ : record.ten_nv}</>;
                }}
              />

              <ColumnGroup title="Số lượt viếng thăm">
                <Column
                  className="!text-center"
                  title="KH"
                  width={70}
                  dataIndex="total_kh_vt"
                  key="total_kh_vt"
                  render={(_, record: any) => (
                    <>{_ != null ? _ : record.kh_vt}</>
                  )}
                />
                <Column
                  className="!text-center "
                  title="TH"
                  width={70}
                  dataIndex="total_th_vt"
                  key="total_th_vt"
                  render={(_, record: any) => {
                    return (
                      <>
                        {_ != null
                          ? _
                          : record.kpi_month.length == 0
                          ? 0
                          : record.kpi_month.th_vt}
                      </>
                    );
                  }}
                />
                <Column
                  className="!text-center"
                  title="TL"
                  width={70}
                  dataIndex="total_tl_vt"
                  key="total_tl_vt"
                  render={(_: any, record: any) => (
                    <>{_ != null ? _ : record.tl_vt}%</>
                  )}
                />
              </ColumnGroup>

              <ColumnGroup
                className="!whitespace-normal !min-w-[210px] !text-center"
                title="Số khách hàng viếng thăm duy nhất">
                <Column
                  className="!text-center"
                  title="KH"
                  width={70}
                  dataIndex="total_kh_vt_dn"
                  key="total_kh_vt_dn"
                  render={(_: any, record: any) => (
                    <>{_ != null ? _ : record.kh_vt_dn}</>
                  )}
                />
                <Column
                  className="!text-center "
                  title="TH"
                  width={70}
                  dataIndex="total_th_vt_dn"
                  key="total_th_vt_dn"
                  render={(_, record: any) => (
                    <>
                      {_ != null
                        ? _
                        : record.kpi_month.length == 0
                        ? 0
                        : record.kpi_month.th_vt_dn}
                    </>
                  )}
                />
                <Column
                  className="!text-center"
                  title="TL"
                  width={70}
                  dataIndex="total_tl_vt_dn"
                  key="total_tl_vt_dn"
                  render={(_: any, record: any) => (
                    <>{_ != null ? _ : record.tl_vt_dn}%</>
                  )}
                />
              </ColumnGroup>
              <ColumnGroup
                className="!whitespace-normal !min-w-[210px] !text-center"
                title="Số đơn hàng">
                <Column
                  className="!text-center"
                  title="KH"
                  width={70}
                  dataIndex="total_kh_don_hang"
                  key="total_kh_don_hang"
                  render={(_: any, record: any) => (
                    <>{_ != null ? _ : record.kh_don_hang}</>
                  )}
                />
                <Column
                  className="!text-center "
                  title="TH"
                  width={70}
                  dataIndex="total_th_don_hang"
                  key="total_th_don_hang"
                  render={(_, record: any) => (
                    <>
                      {_ != null
                        ? _
                        : record.kpi_month.length == 0
                        ? 0
                        : record.kpi_month.th_don_hang}
                    </>
                  )}
                />
                <Column
                  className="!text-center"
                  title="TL"
                  width={70}
                  dataIndex="total_tl_don_hang"
                  key="total_tl_don_hang"
                  render={(_: any, record: any) => (
                    <>{_ != null ? _ : record.tl_don_hang}%</>
                  )}
                />
              </ColumnGroup>
              <ColumnGroup
                className="!whitespace-normal"
                title="Doanh số (VNĐ)"
                width={210}>
                <Column
                  className="!text-center"
                  title="KH"
                  width={70}
                  dataIndex="total_kh_doanh_so"
                  key="total_kh_doanh_so"
                  render={(_: any, record: any) => (
                    <>
                      {_ != null
                        ? _.toLocaleString("en-US")
                        : record.kh_doanh_so.toLocaleString("en-US")}
                    </>
                  )}
                />
                <Column
                  className="!text-center"
                  title="TH"
                  width={70}
                  dataIndex="total_th_doanh_so"
                  key="total_th_doanh_so"
                  render={(_: any, record: any) => (
                    <>
                      {_ != null
                        ? _
                        : record.kpi_month.length == 0
                        ? 0
                        : record.kpi_month.th_doanh_so}
                    </>
                  )}
                />
                <Column
                  className="!text-center"
                  title="TL"
                  width={70}
                  dataIndex="total_tl_doanh_so"
                  key="total_tl_doanh_so"
                  render={(_: any, record: any) => (
                    <>{_ != null ? _ : record.tl_doanh_so}%</>
                  )}
                />
              </ColumnGroup>
              <ColumnGroup
                className="!whitespace-normal"
                title="Doanh thu (VNĐ)"
                width={210}>
                <Column
                  className="!text-center"
                  title="KH"
                  width={70}
                  dataIndex="total_kh_doanh_thu"
                  key="total_kh_doanh_thu"
                  render={(_: any, record: any) => (
                    <>
                      {_ != null
                        ? _.toLocaleString("en-US")
                        : record.kh_doanh_thu.toLocaleString("en-US")}
                    </>
                  )}
                />
                <Column
                  className="!text-center "
                  title="TH"
                  width={70}
                  dataIndex="total_th_doanh_thu"
                  key="total_th_doanh_thu"
                  render={(_: any, record: any) => (
                    <>
                      {_ != null
                        ? _
                        : record.kpi_month.length == 0
                        ? 0
                        : record.kpi_month.th_doanh_thu}
                    </>
                  )}
                />
                <Column
                  className="!text-center"
                  title="TL"
                  width={70}
                  dataIndex="total_tl_doanh_thu"
                  key="total_tl_doanh_thu"
                  render={(_: any, record: any) => (
                    <>{_ != null ? _ : record.tl_doanh_thu}%</>
                  )}
                />
              </ColumnGroup>
              <ColumnGroup
                className="!whitespace-normal"
                title="Sản lượng"
                width={210}>
                <Column
                  className="!text-center"
                  title="KH"
                  width={70}
                  dataIndex="total_kh_san_lg"
                  key="total_kh_san_lg"
                  render={(_: any, record: any) => (
                    <>
                      {_ != null
                        ? _.toLocaleString("en-US")
                        : record.kh_san_lg.toLocaleString("en-US")}
                    </>
                  )}
                />
                <Column
                  className="!text-center "
                  title="TH"
                  width={70}
                  dataIndex="total_th_san_lg"
                  key="total_th_san_lg"
                  render={(_, record: any) => (
                    <>
                      {_ != null
                        ? _
                        : record.kpi_month.length == 0
                        ? 0
                        : record.kpi_month.th_san_lg}
                    </>
                  )}
                />
                <Column
                  className="!text-center"
                  title="TL"
                  width={70}
                  dataIndex="total_tl_san_lg"
                  key="total_tl_san_lg"
                  render={(_: any, record: any) => (
                    <>{_ != null ? _ : record.tl_san_luong}%</>
                  )}
                />
              </ColumnGroup>
              <ColumnGroup
                className="!whitespace-normal"
                title="SKU"
                width={210}>
                <Column
                  className="!text-center"
                  title="KH"
                  width={70}
                  dataIndex="total_kh_sku"
                  key="total_kh_sku"
                  render={(_: any, record: any) => (
                    <>
                      {_ != null
                        ? _.toLocaleString("en-US")
                        : record.kh_sku.toLocaleString("en-US")}
                    </>
                  )}
                />
                <Column
                  className="!text-center "
                  title="TH"
                  width={70}
                  dataIndex="total_th_sku"
                  key="total_th_sku"
                  render={(_, record: any) => (
                    <>
                      {_ != null
                        ? _
                        : record.kpi_month.length == 0
                        ? 0
                        : record.kpi_month.th_sku}
                    </>
                  )}
                />
                <Column
                  className="!text-center"
                  title="TL"
                  width={70}
                  dataIndex="total_tl_sku"
                  key="total_tl_sku"
                  render={(_: any, record: any) => (
                    <>{_ != null ? _ : record.tl_sku}%</>
                  )}
                />
              </ColumnGroup>

              <Column
                title={() => (
                  <div className="whitespace-pre-line text-clip text-center">
                    Tỷ lệ đơn hàng thành công/số lần viếng thăm (%)
                  </div>
                )}
                dataIndex="total_tl_donhang_thanhcong"
                key="total_tl_donhang_thanhcong"
                width={120}
                className="!text-center"
                render={(_: any, record: any) => {
                  return (
                    <div className="!min-w-[100px] ">
                      {_ != null ? _ : record.tl_donhang_thanhcong}%
                    </div>
                  );
                }}
              />
              <Column
                title={() => (
                  <div className="whitespace-pre-line text-clip text-center">
                    Tỷ lệ SKU thành công so tổng SKU (%)
                  </div>
                )}
                className="!text-center !whitespace-normal"
                width={120}
                dataIndex="total_tl_sku_thanhcong"
                key="total_tl_sku_thanhcong"
                render={(_: any, record: any) => {
                  return <>{_ != null ? _ : record.tl_sku_thanhcong}%</>;
                }}
              />
              <Column
                title={() => (
                  <div className="whitespace-pre-line text-clip text-center">
                    Tổng khách hàng (MCP)
                  </div>
                )}
                width={100}
                className="!text-center !whitespace-normal"
                dataIndex="total_tong_khach_hang"
                key="total_tong_khach_hang"
                render={(_: any, record: any) => {
                  return (
                    <div className="!min-w-[100px] ">
                      {_ != null ? _ : record.tong_khach_hang}
                    </div>
                  );
                }}
              />

              <Column
                title={() => (
                  <p className="whitespace-pre-line text-clip text-center">
                    Số KH viếng thăm
                  </p>
                )}
                className="text-center"
                width={120}
                dataIndex="total_khach_hang_vt"
                key="total_khach_hang_vt"
                render={(_: any, record: any) => {
                  return <>{_ != null ? _ : record.khach_hang_vt}</>;
                }}
              />

              <ColumnGroup
                className="!whitespace-normal !min-w-[210px] !text-center"
                title="Số khách hàng đặt hàng">
                <Column
                  className="!text-center"
                  width={70}
                  title="KH"
                  dataIndex="total_kh_dat_hang"
                  key="total_kh_dat_hang"
                  render={(_: any, record: any) => {
                    return <>{_ != null ? _ : record.kh_dat_hang}</>;
                  }}
                />
                <Column
                  className="!text-center "
                  title="TH"
                  width={70}
                  dataIndex="total_th_dat_hang"
                  key="total_th_dat_hang"
                  render={(_, record: any) => (
                    <>
                      {_ != null
                        ? _
                        : record.kpi_month.length == 0
                        ? 0
                        : record.kpi_month.th_dat_hang}
                    </>
                  )}
                />
                <Column
                  className="!text-center"
                  title="TL"
                  width={70}
                  dataIndex="total_tl_dat_hang"
                  key="total_tl_dat_hang"
                  render={(_: any, record: any) => (
                    <>{_ != null ? _ : record.tl_dat_hang}%</>
                  )}
                />
              </ColumnGroup>
              <Column
                title={() => (
                  <div className="whitespace-pre-line text-clip text-center">
                    Bình quân SKU/KH
                  </div>
                )}
                dataIndex="total_sku_kh"
                key="total_sku_kh"
                render={(_: any, record: any) => {
                  return (
                    <p className="!min-w-[100px] text-center">
                      {_ != null ? _ : record.binh_quan_sku_kh}
                    </p>
                  );
                }}
              />
              <Column
                title={() => (
                  <p className="whitespace-pre-line text-clip text-center">
                    Bình quân SKU/đơn
                  </p>
                )}
                dataIndex="total_sku_dh"
                key="total_sku_dh"
                render={(_: any, record: any) => {
                  return (
                    <p className="!min-w-[100px] text-center">
                      {_ != null ? _ : record.binh_quan_sku_dh}
                    </p>
                  );
                }}
              />

              <ColumnGroup
                className="!whitespace-normal !min-w-[210px] !text-center"
                title="Số khách hàng thêm mới">
                <Column
                  className="!text-center"
                  title="KH"
                  width={70}
                  dataIndex="total_kh_kh_moi"
                  key="total_kh_kh_moi"
                  render={(_: any, record: any) => {
                    return <>{_ != null ? _ : record.kh_kh_moi}</>;
                  }}
                />
                <Column
                  className="!text-center "
                  title="TH"
                  width={70}
                  dataIndex="total_th_kh_moi"
                  key="total_th_kh_moi"
                  render={(_, record: any) => (
                    <>
                      {_ != null
                        ? _
                        : record.kpi_month.length == 0
                        ? 0
                        : record.kpi_month.th_kh_moi}
                    </>
                  )}
                />
                <Column
                  className="!text-center"
                  title="TL"
                  width={70}
                  dataIndex="total_th_kh_moi"
                  key="total_th_kh_moi"
                  render={(_: any, record: any) => (
                    <>{_ != null ? _ : record.tl_kh_moi}%</>
                  )}
                />
              </ColumnGroup>
            </TableCustom>
          </div>
        </div>
      </ContentFrame>
    </>
  );
};

export default ReportAnalysis_KPI;
