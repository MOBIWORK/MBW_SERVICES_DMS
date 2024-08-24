import { SyncOutlined, VerticalAlignBottomOutlined } from "@ant-design/icons";
import { ContentFrame, HeaderPage, TableCustom } from "../../components";
import { DatePicker, Table, Row, Col } from "antd";
import { monthAll } from "./data";
import { DatePickerProps } from "antd/lib";
import { useEffect, useRef, useState } from "react";
import { AxiosService } from "../../services/server";
import { rsData, rsDataFrappe } from "../../types/response";
import { employee } from "../../types/employeeFilter";
import useDebounce from "../../hooks/useDebount";
import dayjs from "dayjs";
import { handleDowload, treeArray } from "../../util";
import { listSale } from "../../types/listSale";
import { useResize } from "@/hooks";
import { SelectCommon, TreeSelectCommon } from "@/components/select/select";
import { ModalDetail } from "../ReportCheckin/components/ModalCheckin";
import Detailcheckin from "./modal/Detailcheckin";
import Detailchekinfirst from "./modal/Detailchekinfirst";
import DetailOrder from "./modal/DetailOrder";
import DetailCustomer from "./modal/DetailCustomer";
import DetailTotalOrder from "./modal/DetailTotalOrder";
import { saveAs } from "file-saver";
import DetailWork from "./modal/DetailWork";
import DetailSku from "./modal/DetailSku";
import DetailQty from "./modal/DetailQty";
import Detailrevenue from "./modal/Detailrevenue";
import Detailsales from "./modal/Detailsales";
const { Column, ColumnGroup } = TableCustom;

const currentMonth = dayjs().month() + 1;
const month = currentMonth.toString();
const year = dayjs().format("YYYY");

export default function ReportKPI() {
  const [listEmployees, setListEmployees] = useState<any[]>([]);
  const [listSales, setListSales] = useState<any[]>([]);
  const [sales_team, setTeamSale] = useState<string>();
  const [keySearch4, setKeySearch4] = useState("");
  const [employee, setEmployee] = useState<string>();
  let seachbykey = useDebounce(keySearch4);
  const [page, setPage] = useState<number>(1);
  const PAGE_SIZE = 20;
  const [dataReort, setDataReport] = useState<any[]>([]);
  const [fmonth, setFmonth] = useState(month);
  const [fyear, setFYear] = useState(year);
  const [total, setTotal] = useState<number>(0);
  const containerRef1 = useRef(null);
  const size = useResize();
  const [containerHeight, setContainerHeight] = useState<any>(0);
  const [scrollYTable1, setScrollYTable1] = useState<number>(size?.h * 0.52);
  const [refresh, setRefresh] = useState<boolean>(false);

  const [modal, setModal] = useState<{
    open: boolean;
    id: any;
  }>({
    open: false,
    id: null,
  });

  const [modalCheckF, setModalCheckF] = useState<{
    open: boolean;
    id: any;
  }>({
    open: false,
    id: null,
  });

  const [modalOder, setModalOrder] = useState<{
    open: boolean;
    id: any;
  }>({
    open: false,
    id: null,
  });

  const [modalCustomer, setModalCustomer] = useState<{
    open: boolean;
    id: any;
  }>({
    open: false,
    id: null,
  });

  const [modalTotal, setModalTotal] = useState<{
    open: boolean;
    id: any;
  }>({
    open: false,
    id: null,
  });

  const [modalSale, setModalSale] = useState<{
    open: boolean;
    id: any;
  }>({
    open: false,
    id: null,
  });

  const [modalReven, setModalReven] = useState<{
    open: boolean;
    id: any;
  }>({
    open: false,
    id: null,
  });

  const [modalQty, setModalQty] = useState<{
    open: boolean;
    id: any;
  }>({
    open: false,
    id: null,
  });

  const [modalSku, setModalSku] = useState<{
    open: boolean;
    id: any;
  }>({
    open: false,
    id: null,
  });

  const [modalWork, setModalWork] = useState<{
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

  const closeModalCheckF = () => {
    setModalCheckF({
      open: false,
      id: null,
    });
  };

  const closeModalOder = () => {
    setModalOrder({
      open: false,
      id: null,
    });
  };

  const closeModalCustomer = () => {
    setModalCustomer({
      open: false,
      id: null,
    });
  };

  const closeModalTotal = () => {
    setModalTotal({
      open: false,
      id: null,
    });
  };

  const closeModalSale = () => {
    setModalSale({
      open: false,
      id: null,
    });
  };

  const closeModalReven = () => {
    setModalReven({
      open: false,
      id: null,
    });
  };

  const closeModalWork = () => {
    setModalWork({
      open: false,
      id: null,
    });
  };

  const closeModalQty = () => {
    setModalQty({
      open: false,
      id: null,
    });
  };

  const closeModalSku = () => {
    setModalSku({
      open: false,
      id: null,
    });
  };

  useEffect(() => {
    setScrollYTable1(size.h * 0.52);
  }, [size]);

  useEffect(() => {
    const containerElement = containerRef1.current;
    if (containerElement) {
      const resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
          setContainerHeight(entry.contentRect.height);
        }
      });
      resizeObserver.observe(containerElement);
      return () => resizeObserver.disconnect();
    }
  }, [containerRef1]);

  const onChange: DatePickerProps["onChange"] = (date: any) => {
    setFYear(date?.["$y"].toString());
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
      const rsData = await AxiosService.get(
        "/api/method/mbw_dms.api.report.kpi.kpi_report",
        {
          params: {
            page_size: PAGE_SIZE,
            page_number: page,
            month: fmonth,
            year: fyear,
            sales_team,
            employee,
          },
        }
      );
      setDataReport(rsData?.result);
      setTotal(rsData?.result?.totals);
    })();
  }, [fmonth, fyear, sales_team, employee, page, refresh]);

  return (
    <>
      <ContentFrame
        header={
          <HeaderPage
            title="Báo cáo KPI"
            buttons={[
              {
                icon: <SyncOutlined className="text-xl" />,
                size: "18px",
                className: "flex mr-2 ",
                action: () => {
                  setRefresh((prev) => !prev);
                },
              },
              {
                label: "Xuất dữ liệu",
                type: "primary",
                icon: <VerticalAlignBottomOutlined className="text-xl" />,
                size: "18px",
                className: "flex items-center",
                action: handleDowload.bind(null, {
                  url: "/api/method/mbw_dms.api.exports.export_excel.export_excel",
                  params: {
                    report_type: "Report KPI",
                    data_filter: {
                      month: fmonth,
                      year: fyear,
                      //còn đẩy lên sale team sale person
                    },
                  },
                  file_name: "Report KPI.xlsx"
                }),
              },
            ]}
          />
        }
      >
        <div className="bg-white rounded-2xl pt-4 pb-7 border-[#DFE3E8] border-[0.2px] border-solid">
          <Row className="px-4 flex-auto" gutter={[8, 8]}>
            <Col span={4}>
              <SelectCommon
                className="!bg-[#F4F6F8]"
                defaultValue={month}
                options={monthAll}
                onChange={(value: string) => {
                  setFmonth(value);
                  setPage(1);
                }}
              />
            </Col>
            <Col span={4}>
              <DatePicker
                className="!bg-[#F4F6F8] w-full rounded-lg h-7"
                onChange={onChange}
                placeholder="Chọn năm"
                picker="year"
                allowClear={false}
                defaultValue={dayjs().startOf("year")}
              />
            </Col>
            <Col span={4}>
              <TreeSelectCommon
                placeholder="Tất cả nhóm bán hàng"
                allowClear
                showSearch
                treeData={listSales}
                onChange={(value: string) => {
                  setTeamSale(value);
                  setPage(1);
                }}
                dropdownStyle={{
                  maxHeight: 400,
                  overflow: "auto",
                  minWidth: 350,
                }}
              />
            </Col>
            <Col span={4}>
              <SelectCommon
                filterOption={false}
                notFoundContent={null}
                allowClear
                showSearch
                placeholder="Tất cả nhân viên"
                onSearch={(value: string) => {
                  setKeySearch4(value);
                }}
                options={listEmployees}
                onSelect={(value: any) => {
                  setEmployee(value);
                  setPage(1);
                }}
                onClear={() => {
                  setEmployee("");
                }}
              />
            </Col>
          </Row>

          {/* {routersTable?.map(router => ({ key: router.name, ...router }))} */}
          <div ref={containerRef1} className="pt-5">
            <TableCustom
              dataSource={dataReort?.data?.map((report: any) => ({
                key: report.name,
                ...report,
              }))}
              bordered
              scroll={{
                x: "max-content",
                y: containerHeight < 400 ? undefined : scrollYTable1,
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
                  <Table.Summary.Row>
                    <Table.Summary.Cell index={0}></Table.Summary.Cell>
                    <Table.Summary.Cell index={1}>Tổng</Table.Summary.Cell>
                    <Table.Summary.Cell index={2}></Table.Summary.Cell>
                    <Table.Summary.Cell index={3}></Table.Summary.Cell>
                    <Table.Summary.Cell index={4} className="text-center">
                      {dataReort?.sum?.tong_kh_vt}
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={5} className="text-center">
                      {dataReort?.sum?.tong_th_vt}
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={6}></Table.Summary.Cell>
                    <Table.Summary.Cell index={7} className="text-center">
                      {dataReort?.sum?.tong_kh_vt_dn}
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={8} className="text-center">
                      {dataReort?.sum?.tong_th_vt_dn}
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={9}></Table.Summary.Cell>
                    <Table.Summary.Cell index={10} className="text-center">
                      {dataReort?.sum?.tong_kh_dat_hang}
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={11} className="text-center">
                      {dataReort?.sum?.tong_th_dat_hang}
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={12}></Table.Summary.Cell>
                    <Table.Summary.Cell index={13} className="text-center">
                      {dataReort?.sum?.tong_kh_kh_moi}
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={14} className="text-center">
                      {dataReort?.sum?.tong_th_kh_moi}
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={15}></Table.Summary.Cell>
                    <Table.Summary.Cell index={16} className="text-center">
                      {dataReort?.sum?.tong_kh_don_hang}
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={17} className="text-center">
                      {dataReort?.sum?.tong_th_don_hang}
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={18}></Table.Summary.Cell>
                    <Table.Summary.Cell index={19} className="text-center">
                      {Intl.NumberFormat().format(
                        dataReort?.sum?.tong_kh_doanh_so
                      )}
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={20} className="text-center">
                      {Intl.NumberFormat().format(
                        dataReort?.sum?.tong_th_doanh_so
                      )}
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={21}></Table.Summary.Cell>
                    <Table.Summary.Cell index={22} className="text-center">
                      {Intl.NumberFormat().format(
                        dataReort?.sum?.tong_kh_doanh_thu
                      )}
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={23} className="text-center">
                      {Intl.NumberFormat().format(
                        dataReort?.sum?.tong_th_doanh_thu
                      )}
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={24}></Table.Summary.Cell>
                    <Table.Summary.Cell index={25} className="text-center">
                      {dataReort?.sum?.tong_kh_san_lg}
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={26} className="text-center">
                      {dataReort?.sum?.tong_th_san_lg}
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={27}></Table.Summary.Cell>
                    <Table.Summary.Cell index={28} className="text-center">
                      {dataReort?.sum?.tong_kh_sku}
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={29} className="text-center">
                      {dataReort?.sum?.tong_th_sku}
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={30}></Table.Summary.Cell>
                    <Table.Summary.Cell index={31} className="text-center">
                      {dataReort?.sum?.tong_kh_so_gio_lam_viec}
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={32} className="text-center">
                      {Number(dataReort?.sum?.tong_th_so_gio_lam_viec).toFixed(
                        2
                      )}
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={33}></Table.Summary.Cell>
                  </Table.Summary.Row>
                );
              }}
            >
              <Column
                title="STT"
                dataIndex="stt"
                key="stt"
                fixed="left"
                className="!text-center"
                width={60}
                render={(_: any, record: any, index: number) => index + 1}
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
                render={(_, record: any) => <div>{record.nhom_ban_hang}</div>}
              />
              <ColumnGroup
                className="!whitespace-normal !min-w-[210px] !text-center"
                title="Số khách hàng viếng thăm"
              >
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
                      }}
                    >
                      {record?.kpi_month[0] ? record?.kpi_month[0]?.th_vt : 0}
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
                title="Số khách hàng viếng thăm duy nhất"
              >
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
                      }}
                    >
                      {record?.kpi_month[0]
                        ? record?.kpi_month[0]?.th_vt_dn
                        : 0}
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
                title="Số khách hàng đặt hàng"
              >
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
                      }}
                    >
                      {record?.kpi_month[0]
                        ? record?.kpi_month[0]?.th_dat_hang
                        : 0}
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
                title="Số khách hàng thêm mới"
              >
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
                      }}
                    >
                      {record?.kpi_month[0]
                        ? record?.kpi_month[0]?.th_kh_moi
                        : 0}
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
                width={210}
              >
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
                      }}
                    >
                      {record?.kpi_month[0]
                        ? record?.kpi_month[0]?.th_don_hang
                        : 0}
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
                width={210}
              >
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
                      }}
                    >
                      {record?.kpi_month[0]
                        ? Intl.NumberFormat().format(
                            record?.kpi_month[0]?.th_doanh_so
                          )
                        : 0}
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
                width={210}
              >
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
                      }}
                    >
                      {record?.kpi_month[0]
                        ? Intl.NumberFormat().format(
                            record?.kpi_month[0]?.th_doanh_thu
                          )
                        : 0}
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
                width={210}
              >
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
                      }}
                    >
                      {record?.kpi_month[0]
                        ? record?.kpi_month[0]?.th_san_lg
                        : 0}
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
                width={210}
              >
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
                      }}
                    >
                      {record?.kpi_month[0] ? record?.kpi_month[0]?.th_sku : 0}
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
                width={210}
              >
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
                      }}
                    >
                      {record?.kpi_month[0]
                        ? (record?.kpi_month[0]?.th_so_gio_lam_viec).toFixed(2)
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
          <ModalDetail
            title={
              <div className="font-semibold text-2xl leading-[22px] text-[#222222] px-4 pt-4">
                Số khách hàng viếng thăm - {modal.id?.name_employee}
              </div>
            }
            open={modal.open}
            onCancel={closeModal}
            footer={false}
            width={1120}
          >
            <Detailcheckin
              employee={modal.id?.employee}
              month={fmonth}
              year={fyear}
            />
          </ModalDetail>

          <ModalDetail
            title={
              <div className="font-semibold text-2xl leading-[22px] text-[#222222] px-4 pt-4">
                Số khách hàng viếng thăm duy nhất -{" "}
                {modalCheckF.id?.name_employee}
              </div>
            }
            open={modalCheckF.open}
            onCancel={closeModalCheckF}
            footer={false}
            width={1120}
          >
            <Detailchekinfirst
              employee={modalCheckF.id?.employee}
              month={fmonth}
              year={fyear}
            />
          </ModalDetail>

          <ModalDetail
            title={
              <div className="font-semibold text-2xl leading-[22px] text-[#222222] px-4 pt-4">
                Số khách hàng đặt hàng - {modalOder.id?.name_employee}
              </div>
            }
            open={modalOder.open}
            onCancel={closeModalOder}
            footer={false}
            width={1120}
          >
            <DetailOrder
              employee={modalOder.id?.employee}
              month={fmonth}
              year={fyear}
            />
          </ModalDetail>

          <ModalDetail
            title={
              <div className="font-semibold text-2xl leading-[22px] text-[#222222] px-4 pt-4">
                Số khách hàng thêm mới - {modalCustomer.id?.name_employee}
              </div>
            }
            open={modalCustomer.open}
            onCancel={closeModalCustomer}
            footer={false}
            width={1120}
          >
            <DetailCustomer
              employee={modalCustomer.id?.employee}
              month={fmonth}
              year={fyear}
            />
          </ModalDetail>

          <ModalDetail
            title={
              <div className="font-semibold text-2xl leading-[22px] text-[#222222] px-4 pt-4">
                Số đơn hàng - {modalTotal.id?.name_employee}
              </div>
            }
            open={modalTotal.open}
            onCancel={closeModalTotal}
            footer={false}
            width={1120}
          >
            <DetailTotalOrder
              employee={modalTotal.id?.employee}
              month={fmonth}
              year={fyear}
            />
          </ModalDetail>

          <ModalDetail
            title={
              <div className="font-semibold text-2xl leading-[22px] text-[#222222] px-4 pt-4">
                Doanh số - {modalSale.id?.name_employee}
              </div>
            }
            open={modalSale.open}
            onCancel={closeModalSale}
            footer={false}
            width={1120}
          >
            <Detailsales
              employee={modalSale.id?.employee}
              month={fmonth}
              year={fyear}
            />
          </ModalDetail>

          <ModalDetail
            title={
              <div className="font-semibold text-2xl leading-[22px] text-[#222222] px-4 pt-4">
                Doanh thu - {modalReven.id?.name_employee}
              </div>
            }
            open={modalReven.open}
            onCancel={closeModalReven}
            footer={false}
            width={1120}
          >
            <Detailrevenue
              employee={modalReven.id?.employee}
              month={fmonth}
              year={fyear}
            />
          </ModalDetail>

          <ModalDetail
            title={
              <div className="font-semibold text-2xl leading-[22px] text-[#222222] px-4 pt-4">
                Sản lượng - {modalQty.id?.name_employee}
              </div>
            }
            open={modalQty.open}
            onCancel={closeModalQty}
            footer={false}
            width={1120}
          >
            <DetailQty
              employee={modalQty.id?.employee}
              month={fmonth}
              year={fyear}
            />
          </ModalDetail>

          <ModalDetail
            title={
              <div className="font-semibold text-2xl leading-[22px] text-[#222222] px-4 pt-4">
                SKU - {modalSku.id?.name_employee}
              </div>
            }
            open={modalSku.open}
            onCancel={closeModalSku}
            footer={false}
            width={1120}
          >
            <DetailSku
              employee={modalSku.id?.employee}
              month={fmonth}
              year={fyear}
            />
          </ModalDetail>

          <ModalDetail
            title={
              <div className="font-semibold text-2xl leading-[22px] text-[#222222] px-4 pt-4">
                Số giờ làm việc - {modalWork.id?.name_employee}
              </div>
            }
            open={modalWork.open}
            onCancel={closeModalWork}
            footer={false}
            width={1120}
          >
            <DetailWork
              employee={modalWork.id?.employee}
              month={fmonth}
              year={fyear}
            />
          </ModalDetail>
        </div>
      </ContentFrame>
    </>
  );
}
