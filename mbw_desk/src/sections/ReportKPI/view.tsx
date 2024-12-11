/** @format */
import { ContentFrame, TableCustom } from "../../components";

import Filter_group from "../../components/filter-group/Filter_group";
import { Row, Col } from "antd";
import { useEffect, useState } from "react";
import { AxiosService } from "../../services/server";
import { useResize } from "@/hooks";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { mediaQuery, PAGE_SIZE } from "@/constant";
import DropDownFilter from "@/components/filter-group/dropDownFilter";
import ModalManager from "./modal/ModalManager";
import SummaryFooter from "./SummaryFooter";
import ReportHeader from "../ReportHeader/ReportHeader";
import { useSelector } from "react-redux";

const { Column, ColumnGroup } = TableCustom;

export default function ReportKPI() {
  const [page, setPage] = useState<number>(1);
  const [dataReort, setDataReport] = useState<any[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [refresh, setRefresh] = useState<boolean>(false);
  const calculateIndex = (
    pageNumber: number,
    pageSize: number,
    index: number
  ) => {
    return (pageNumber - 1) * pageSize + index + 1;
  };

  const { currentMonth, currentYear } = useSelector(
    (state: any) => state.month
  );
  const { sales_team, employee, customer_type, customer_group, territory } =
    useSelector((state: any) => state.group);

  const size = useResize();
  const matchMedia = useMediaQuery(`${mediaQuery}`);

  const [modal, setModal] = useState<ShowModalProps>({
    open: false,
    id: null,
  });

  const [modalCheckF, setModalCheckF] = useState<ShowModalProps>({
    open: false,
    id: null,
  });

  const [modalOder, setModalOrder] = useState<ShowModalProps>({
    open: false,
    id: null,
  });

  const [modalCustomer, setModalCustomer] = useState<ShowModalProps>({
    open: false,
    id: null,
  });

  const [modalTotal, setModalTotal] = useState<ShowModalProps>({
    open: false,
    id: null,
  });

  const [modalSale, setModalSale] = useState<ShowModalProps>({
    open: false,
    id: null,
  });

  const [modalReven, setModalReven] = useState<ShowModalProps>({
    open: false,
    id: null,
  });

  const [modalQty, setModalQty] = useState<ShowModalProps>({
    open: false,
    id: null,
  });

  const [modalSku, setModalSku] = useState<ShowModalProps>({
    open: false,
    id: null,
  });

  const [modalWork, setModalWork] = useState<ShowModalProps>({
    open: false,
    id: null,
  });

  useEffect(() => {
    (async () => {
      const rsData = await AxiosService.get(
        "/api/method/mbw_dms.api.report.kpi.kpi_report",
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
            title="Báo cáo KPI"
            params={{
              report_type: "Report KPI",
              data_filter: {
                month: currentMonth,
                year: currentYear,
                //còn đẩy lên sale team sale person
              },
            }}
            file_name="Report KPI.xlsx"
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
            <Col className="!ml-4">
              <DropDownFilter
                setPage={setPage}
                inputCustomerType
                inputCustomerGroup
                inputTerritory
                inputMonth
                inputYear
                inputSaleGroup
                inputEmployee
                matchMedia={!matchMedia}
              />
            </Col>
          </Row>

          {/* {routersTable?.map(router => ({ key: router.name, ...router }))} */}
          <div className="pt-5">
            <TableCustom
              dataSource={dataReort?.data?.map((report: any) => ({
                key: report.name,
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
              }
              summary={() => {
                return <SummaryFooter summaryData={dataReort?.sum} />;
              }}>
              <Column
                title="STT"
                dataIndex="stt"
                key="stt"
                fixed="left"
                className="!text-center"
                width={60}
                render={(_: any, __: any, index: number) => (
                  <span>{calculateIndex(page, PAGE_SIZE, index)}</span>
                )}
              />
              <Column
                title="Mã Nhân viên"
                dataIndex="nhan_vien_ban_hang"
                key="nhan_vien_ban_hang"
                fixed="left"
                render={(_: any, record: any) => (
                  <>
                    <div className="!min-w-[130px]">
                      {record.nhan_vien_ban_hang}
                    </div>
                  </>
                )}
              />
              <Column
                title="Nhân viên"
                dataIndex="ten_nv"
                key="ten_nv"
                fixed="left"
                render={(_: any, record: any) => (
                  <>
                    <div className="!min-w-[200px]">{record.ten_nv}</div>
                  </>
                )}
              />
              <Column
                title="Nhóm bán hàng"
                dataIndex="nhom_ban_hang"
                key="nhom_ban_hang"
                render={(_, record: any) => (
                  <div className="min-w-[120px]">{record.nhom_ban_hang}</div>
                )}
              />
              <ColumnGroup
                className="!whitespace-normal !min-w-[210px] !text-center"
                title="Số lượt viếng thăm">
                <Column
                  className="!text-center"
                  title="KH"
                  width={70}
                  dataIndex="kh_vt"
                  key="kh_vt"
                />
                <Column
                  className="!text-center underline text-[#1877F2]"
                  title="TH"
                  width={70}
                  dataIndex="th_vt"
                  key="th_vt"
                  render={(_, record: any) => (
                    <div
                      onClick={() => {
                        setModal({
                          open: true,
                          id: {
                            employee: record?.nhan_vien_ban_hang,
                            name_employee: record?.ten_nv,
                          },
                        });
                      }}>
                      {record?.kpi_month.length == 0
                        ? 0
                        : record?.kpi_month?.th_vt}
                    </div>
                  )}
                />
                <Column
                  className="!text-center"
                  title="TL"
                  width={70}
                  dataIndex="tl_vt"
                  key="tl_vt"
                  render={(_: any, record: any) => <>{record.tl_vt}%</>}
                />
              </ColumnGroup>
              <ColumnGroup
                className="!whitespace-normal !min-w-[210px] !text-center"
                title="Số khách hàng viếng thăm">
                <Column
                  className="!text-center"
                  title="KH"
                  width={70}
                  dataIndex="kh_vt_dn"
                  key="kh_vt_dn"
                />
                <Column
                  className="!text-center underline text-[#1877F2]"
                  title="TH"
                  width={70}
                  dataIndex="th_vt_dn"
                  key="th_vt_dn"
                  render={(_, record: any) => (
                    <div
                      onClick={() => {
                        setModalCheckF({
                          open: true,
                          id: {
                            employee: record?.nhan_vien_ban_hang,
                            name_employee: record?.ten_nv,
                          },
                        });
                      }}>
                      {record?.kpi_month.length == 0
                        ? 0
                        : record?.kpi_month?.th_vt_dn}
                    </div>
                  )}
                />
                <Column
                  className="!text-center"
                  title="TL"
                  width={70}
                  dataIndex="tl_vt_dn"
                  key="tl_vt_dn"
                  render={(_: any, record: any) => <>{record.tl_vt_dn}%</>}
                />
              </ColumnGroup>
              <ColumnGroup
                className="!whitespace-normal !min-w-[210px] !text-center"
                title="Số khách hàng đặt hàng">
                <Column
                  className="!text-center"
                  title="KH"
                  width={70}
                  dataIndex="kh_dat_hang"
                  key="kh_dat_hang"
                />
                <Column
                  className="!text-center underline text-[#1877F2]"
                  title="TH"
                  width={70}
                  dataIndex="th_dat_hang"
                  key="th_dat_hang"
                  render={(_, record: any) => (
                    <div
                      onClick={() => {
                        setModalOrder({
                          open: true,
                          id: {
                            employee: record?.nhan_vien_ban_hang,
                            name_employee: record?.ten_nv,
                          },
                        });
                      }}>
                      {record?.kpi_month.length == 0
                        ? 0
                        : record?.kpi_month?.th_dat_hang}
                    </div>
                  )}
                />
                <Column
                  className="!text-center"
                  title="TL"
                  width={70}
                  dataIndex="tl_dat_hang"
                  key="tl_dat_hang"
                  render={(_: any, record: any) => <>{record.tl_dat_hang}%</>}
                />
              </ColumnGroup>
              <ColumnGroup
                className="!whitespace-normal !min-w-[210px] !text-center"
                title="Số khách hàng thêm mới">
                <Column
                  className="!text-center"
                  title="KH"
                  width={70}
                  dataIndex="kh_kh_moi"
                  key="kh_kh_moi"
                />
                <Column
                  className="!text-center underline text-[#1877F2]"
                  title="TH"
                  width={70}
                  dataIndex="th_kh_moi"
                  key="th_kh_moi"
                  render={(_, record: any) => (
                    <div
                      onClick={() => {
                        setModalCustomer({
                          open: true,
                          id: {
                            employee: record?.nhan_vien_ban_hang,
                            name_employee: record?.ten_nv,
                          },
                        });
                      }}>
                      {record?.kpi_month.length == 0
                        ? 0
                        : record?.kpi_month?.th_kh_moi}
                    </div>
                  )}
                />
                <Column
                  className="!text-center"
                  title="TL"
                  width={70}
                  dataIndex="tl_kh_moi"
                  key="tl_kh_moi"
                  render={(_: any, record: any) => <>{record.tl_kh_moi}%</>}
                />
              </ColumnGroup>
              <ColumnGroup
                className="!whitespace-normal"
                title="Số đơn hàng"
                width={210}>
                <Column
                  className="!text-center"
                  title="KH"
                  width={70}
                  dataIndex="kh_don_hang"
                  key="kh_don_hang"
                />
                <Column
                  className="!text-center underline text-[#1877F2]"
                  title="TH"
                  width={70}
                  dataIndex="th_don_hang"
                  key="th_don_hang"
                  render={(_, record: any) => (
                    <div
                      onClick={() => {
                        setModalTotal({
                          open: true,
                          id: {
                            employee: record?.nhan_vien_ban_hang,
                            name_employee: record?.ten_nv,
                          },
                        });
                      }}>
                      {record?.kpi_month.length == 0
                        ? 0
                        : record?.kpi_month?.th_don_hang}
                    </div>
                  )}
                />
                <Column
                  className="!text-center"
                  title="TL"
                  width={70}
                  dataIndex="tl_don_hang"
                  key="tl_don_hang"
                  render={(_: any, record: any) => <>{record.tl_don_hang}%</>}
                />
              </ColumnGroup>
              <ColumnGroup
                className="!whitespace-normal"
                title="Doanh số (VNĐ)"
                width={210}>
                <Column
                  className="!text-center"
                  title="KH"
                  dataIndex="kh_doanh_so"
                  key="kh_doanh_so"
                  render={(_: any, record: any) => (
                    <>{Intl.NumberFormat().format(record.kh_doanh_so)}</>
                  )}
                />
                <Column
                  className="!text-center underline text-[#1877F2]"
                  title="TH"
                  width={70}
                  dataIndex="th_doanh_so"
                  key="th_doanh_so"
                  render={(_: any, record: any) => (
                    <div
                      onClick={() => {
                        setModalSale({
                          open: true,
                          id: {
                            employee: record?.nhan_vien_ban_hang,
                            name_employee: record?.ten_nv,
                          },
                        });
                      }}>
                      {record?.kpi_month.length == 0
                        ? 0
                        : Intl.NumberFormat().format(
                            record?.kpi_month?.th_doanh_so
                          )}
                    </div>
                  )}
                />
                <Column
                  className="!text-center"
                  title="TL"
                  width={70}
                  dataIndex="tl_don_hang"
                  key="tl_don_hang"
                  render={(_: any, record: any) => <>{record.tl_don_hang}%</>}
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
                  dataIndex="kh_doanh_thu"
                  key="kh_doanh_thu"
                  render={(_: any, record: any) => (
                    <>{Intl.NumberFormat().format(record.kh_doanh_thu)}</>
                  )}
                />
                <Column
                  className="!text-center underline text-[#1877F2]"
                  title="TH"
                  width={70}
                  dataIndex="th_doanh_thu"
                  key="th_doanh_thu"
                  render={(_: any, record: any) => (
                    <div
                      onClick={() => {
                        setModalReven({
                          open: true,
                          id: {
                            employee: record?.nhan_vien_ban_hang,
                            name_employee: record?.ten_nv,
                          },
                        });
                      }}>
                      {record?.kpi_month.length == 0
                        ? 0
                        : Intl.NumberFormat().format(
                            record?.kpi_month?.th_doanh_thu
                          )}
                    </div>
                  )}
                />
                <Column
                  className="!text-center"
                  title="TL"
                  width={70}
                  dataIndex="tl_doanh_thu"
                  key="tl_doanh_thu"
                  render={(_: any, record: any) => <>{record.tl_doanh_thu}%</>}
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
                  dataIndex="kh_san_lg"
                  key="kh_san_lg"
                />
                <Column
                  className="!text-center underline text-[#1877F2]"
                  title="TH"
                  width={70}
                  dataIndex="th_san_lg"
                  key="th_san_lg"
                  render={(_, record: any) => (
                    <div
                      onClick={() => {
                        setModalQty({
                          open: true,
                          id: {
                            employee: record?.nhan_vien_ban_hang,
                            name_employee: record?.ten_nv,
                          },
                        });
                      }}>
                      {record?.kpi_month.length == 0
                        ? 0
                        : record?.kpi_month?.th_san_lg}
                    </div>
                  )}
                />
                <Column
                  className="!text-center"
                  title="TL"
                  width={70}
                  dataIndex="tl_san_luong"
                  key="tl_san_luong"
                  render={(_: any, record: any) => <>{record.tl_san_luong}%</>}
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
                  dataIndex="kh_sku"
                  key="kh_sku"
                />
                <Column
                  className="!text-center underline text-[#1877F2]"
                  title="TH"
                  width={70}
                  dataIndex="th_sku"
                  key="th_sku"
                  render={(_, record: any) => (
                    <div
                      onClick={() => {
                        setModalSku({
                          open: true,
                          id: {
                            employee: record?.nhan_vien_ban_hang,
                            name_employee: record?.ten_nv,
                          },
                        });
                      }}>
                      {record?.kpi_month.length == 0
                        ? 0
                        : record?.kpi_month?.th_sku}
                    </div>
                  )}
                />
                <Column
                  className="!text-center"
                  title="TL"
                  width={70}
                  dataIndex="tl_sku"
                  key="tl_sku"
                  render={(_: any, record: any) => <>{record.tl_sku}%</>}
                />
              </ColumnGroup>
              <ColumnGroup
                className="!whitespace-normal"
                title="Số giờ làm việc"
                width={210}>
                <Column
                  className="!text-center"
                  title="KH"
                  width={70}
                  dataIndex="kh_so_gio_lam_viec"
                  key="kh_so_gio_lam_viec"
                />
                <Column
                  className="!text-center underline text-[#1877F2]"
                  title="TH"
                  width={70}
                  dataIndex="th_so_gio_lam_viec"
                  key="th_so_gio_lam_viec"
                  render={(_, record: any) => (
                    <div
                      onClick={() => {
                        setModalWork({
                          open: true,
                          id: {
                            employee: record?.nhan_vien_ban_hang,
                            name_employee: record?.ten_nv,
                          },
                        });
                      }}>
                      {record?.kpi_month?.th_so_gio_lam_viec
                        ? (record?.kpi_month?.th_so_gio_lam_viec).toFixed(2)
                        : 0}
                    </div>
                  )}
                />
                <Column
                  className="!text-center"
                  title="TL"
                  width={70}
                  dataIndex="tl_so_gio_lam_viec"
                  key="tl_so_gio_lam_viec"
                  render={(_: any, record: any) => (
                    <>{record.tl_so_gio_lam_viec}%</>
                  )}
                />
              </ColumnGroup>
            </TableCustom>
          </div>
          <ModalManager
            type="modal"
            title="Số khách hàng viếng thăm"
            modal={modal}
            month={currentMonth}
            year={currentYear}
            setModal={setModal}
          />

          <ModalManager
            type="modalCheckF"
            title="Số khách hàng viếng thăm duy nhất"
            modal={modalCheckF}
            month={currentMonth}
            year={currentYear}
            setModal={setModalCheckF}
          />

          <ModalManager
            type="modalOder"
            title="Số khách hàng đặt hàng"
            modal={modalOder}
            month={currentMonth}
            year={currentYear}
            setModal={setModalOrder}
          />

          <ModalManager
            type="modalCustomer"
            title="Số khách hàng thêm mới"
            modal={modalCustomer}
            month={currentMonth}
            year={currentYear}
            setModal={setModalCustomer}
          />
          <ModalManager
            type="modalTotal"
            title="Số đơn hàng"
            modal={modalTotal}
            month={currentMonth}
            year={currentYear}
            setModal={setModalTotal}
          />

          <ModalManager
            type="modalSale"
            title="Doanh số"
            modal={modalSale}
            month={currentMonth}
            year={currentYear}
            setModal={setModalSale}
          />

          <ModalManager
            type="modalReven"
            title="Doanh thu"
            modal={modalReven}
            month={currentMonth}
            year={currentYear}
            setModal={setModalReven}
          />

          <ModalManager
            type="modalQty"
            title="Sản lượng"
            modal={modalQty}
            month={currentMonth}
            year={currentYear}
            setModal={setModalQty}
          />

          <ModalManager
            type="modalSku"
            title="SKU"
            modal={modalSku}
            month={currentMonth}
            year={currentYear}
            setModal={setModalSku}
          />

          <ModalManager
            type="modalWork"
            title="Số giờ làm việc"
            modal={modalWork}
            month={currentMonth}
            year={currentYear}
            setModal={setModalWork}
          />
        </div>
      </ContentFrame>
    </>
  );
}
