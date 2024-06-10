import { VerticalAlignBottomOutlined } from "@ant-design/icons";
import {
  ContentFrame,
  FormItemCustom,
  HeaderPage,
  TableCustom,
} from "../../components";
import { DatePicker, Select, Table, TreeSelect, Form } from "antd";
import { monthAll } from "./data";
import { DatePickerProps } from "antd/lib";
import { useEffect, useRef, useState } from "react";
import { AxiosService } from "../../services/server";
import { rsData, rsDataFrappe } from "../../types/response";
import { employee } from "../../types/employeeFilter";
import useDebounce from "../../hooks/useDebount";
import dayjs from "dayjs";
import { translationUrl, treeArray } from "../../util";
import { listSale } from "../../types/listSale";
import { useResize } from "@/hooks";

const { Column, ColumnGroup } = TableCustom;

interface DataTypeKPI {
  key: React.Key;
  name: string;
  stt?: number;
  nhan_vien_ban_hang: string;
  ten_nv: string;
  nhom_ban_hang: string;
  kh_vt: number;
  th_vt: number;
  tl_vt: number;
  kh_vt_dn: number;
  th_vt_dn: number;
  tl_vt_dn: number;
  kh_dat_hang: number;
  th_dat_hang: number;
  tl_dat_hang: number;
  kh_kh_moi: number;
  th_kh_moi: number;
  tl_kh_moi: number;
  kh_don_hang: number;
  th_don_hang: number;
  tl_don_hang: number;
  kh_doanh_so: number;
  th_doanh_so: number;
  tl_doanh_so: number;
  kh_doanh_thu: number;
  th_doanh_thu: number;
  tl_doanh_thu: number;
  kh_san_lg: number;
  th_san_lg: number;
  tl_san_luong: number;
  kh_sku: number;
  th_sku: number;
  tl_sku: number;
  kh_so_gio_lam_viec: number;
  th_so_gio_lam_viec: number;
  tl_so_gio_lam_viec: number;
  total?: number;
}

const currentMonth = dayjs().month() + 1; // Lấy tháng hiện tại (đánh số từ 0)
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
  const [fyear, setFYear] = useState("");
  const [total, setTotal] = useState<number>(0);
  const containerRef1 = useRef(null);
  const size = useResize();
  const [containerHeight, setContainerHeight] = useState<any>(0);
  const [scrollYTable1, setScrollYTable1] = useState<number>(size?.h * 0.52);

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

  const onChange: DatePickerProps["onChange"] = (date) => {
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
    if (fyear === undefined || fyear === "") {
      setFYear(year);
    }
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
  }, [fmonth, fyear, sales_team, employee, page]);

  return (
    <>
      <ContentFrame
        header={
          <HeaderPage
            title="Báo cáo KPI"
            buttons={[
              {
                label: "Xuất dữ liệu",
                type: "primary",
                icon: <VerticalAlignBottomOutlined className="text-xl" />,
                size: "20px",
                className: "flex items-center",
                action: () => {
                  translationUrl("/app/data-export/Data%20Export");
                },
              },
            ]}
          />
        }
      >
        <div className="bg-white rounded-2xl pt-4 pb-7 border-[#DFE3E8] border-[0.2px] border-solid">
          <Form
            layout="vertical"
            className="flex justify-start items-center px-4"
          >
            <FormItemCustom
              label={"Tháng"}
              className="border-none mr-2 w-[200px]"
            >
              <Select
                className="!bg-[#F4F6F8] options:bg-[#F4F6F8] !h-7 rounded-lg mt-[-2px]"
                defaultValue={month}
                options={monthAll}
                onChange={(value: string) => {
                  setFmonth(value);
                }}
                showSearch
              />
            </FormItemCustom>
            <FormItemCustom
              label={"Năm"}
              className="border-none mr-2 w-[200px]"
            >
              <DatePicker
                className="!bg-[#F4F6F8] !h-7 rounded-lg mt-[-2px]"
                onChange={onChange}
                placeholder="Tất cả "
                picker="year"
                defaultValue={dayjs().startOf("year")}
              />
            </FormItemCustom>
            <FormItemCustom
              label={"Nhóm bán hàng"}
              className="border-none mr-2 w-[200px]"
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
              className="border-none mr-2 w-[200px]"
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
          </Form>
          {/* {routersTable?.map(router => ({ key: router.name, ...router }))} */}
          <div ref={containerRef1} className="pt-5">
            <TableCustom
              dataSource={dataReort?.data?.map((report: any) => ({
                key: report.name,
                ...report,
              }))}
              bordered
              scroll={{
                x: 'max-content',
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
                    <Table.Summary.Cell
                      index={5}
                      className="text-center underline text-[#1877F2]"
                    >
                      {dataReort?.sum?.tong_th_vt}
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={6}></Table.Summary.Cell>
                    <Table.Summary.Cell index={7} className="text-center">
                      {dataReort?.sum?.tong_kh_vt_dn}
                    </Table.Summary.Cell>
                    <Table.Summary.Cell
                      index={8}
                      className="text-center underline text-[#1877F2]"
                    >
                      {dataReort?.sum?.tong_th_vt_dn}
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={9}></Table.Summary.Cell>
                    <Table.Summary.Cell index={10} className="text-center">
                      {dataReort?.sum?.tong_kh_dat_hang}
                    </Table.Summary.Cell>
                    <Table.Summary.Cell
                      index={11}
                      className="text-center underline text-[#1877F2]"
                    >
                      {dataReort?.sum?.tong_th_dat_hang}
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={12}></Table.Summary.Cell>
                    <Table.Summary.Cell index={13} className="text-center">
                      {dataReort?.sum?.tong_kh_kh_moi}
                    </Table.Summary.Cell>
                    <Table.Summary.Cell
                      index={14}
                      className="text-center underline text-[#1877F2]"
                    >
                      {dataReort?.sum?.tong_th_kh_moi}
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={15}></Table.Summary.Cell>
                    <Table.Summary.Cell index={16} className="text-center">
                      {dataReort?.sum?.tong_kh_don_hang}
                    </Table.Summary.Cell>
                    <Table.Summary.Cell
                      index={17}
                      className="text-center underline text-[#1877F2]"
                    >
                      {dataReort?.sum?.tong_th_don_hang}
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={18}></Table.Summary.Cell>
                    <Table.Summary.Cell index={19} className="text-center">
                      {Intl.NumberFormat().format(
                        dataReort?.sum?.tong_kh_doanh_so
                      )}
                    </Table.Summary.Cell>
                    <Table.Summary.Cell
                      index={20}
                      className="text-center underline text-[#1877F2]"
                    >
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
                    <Table.Summary.Cell
                      index={23}
                      className="text-center underline text-[#1877F2]"
                    >
                      {Intl.NumberFormat().format(
                        dataReort?.sum?.tong_th_doanh_thu
                      )}
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={24}></Table.Summary.Cell>
                    <Table.Summary.Cell index={25} className="text-center">
                      {dataReort?.sum?.tong_kh_san_lg}
                    </Table.Summary.Cell>
                    <Table.Summary.Cell
                      index={26}
                      className="text-center underline text-[#1877F2]"
                    >
                      {dataReort?.sum?.tong_th_san_lg}
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={27}></Table.Summary.Cell>
                    <Table.Summary.Cell index={28} className="text-center">
                      {dataReort?.sum?.tong_kh_sku}
                    </Table.Summary.Cell>
                    <Table.Summary.Cell
                      index={29}
                      className="text-center underline text-[#1877F2]"
                    >
                      {dataReort?.sum?.tong_th_sku}
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={30}></Table.Summary.Cell>
                    <Table.Summary.Cell index={31} className="text-center">
                      {dataReort?.sum?.tong_kh_so_gio_lam_viec}
                    </Table.Summary.Cell>
                    <Table.Summary.Cell
                      index={32}
                      className="text-center underline text-[#1877F2]"
                    >
                      {dataReort?.sum?.tong_th_so_gio_lam_viec}
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
                />
                <Column
                  className="!text-center"
                  title="TL"
                  width={70}
                  dataIndex="tl_vt"
                  key="tl_vt"
                  render={(_: any, record: DataTypeKPI) => <>{record.tl_vt}%</>}
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
                />
                <Column
                  className="!text-center"
                  title="TL"
                  width={70}
                  dataIndex="tl_vt_dn"
                  key="tl_vt_dn"
                  render={(_: any, record: DataTypeKPI) => (
                    <>{record.tl_vt_dn}%</>
                  )}
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
                />
                <Column
                  className="!text-center"
                  title="TL"
                  width={70}
                  dataIndex="tl_dat_hang"
                  key="tl_dat_hang"
                  render={(_: any, record: DataTypeKPI) => (
                    <>{record.tl_dat_hang}%</>
                  )}
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
                />
                <Column
                  className="!text-center"
                  title="TL"
                  width={70}
                  dataIndex="tl_kh_moi"
                  key="tl_kh_moi"
                  render={(_: any, record: DataTypeKPI) => (
                    <>{record.tl_kh_moi}%</>
                  )}
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
                />
                <Column
                  className="!text-center"
                  title="TL"
                  width={70}
                  dataIndex="tl_don_hang"
                  key="tl_don_hang"
                  render={(_: any, record: DataTypeKPI) => (
                    <>{record.tl_don_hang}%</>
                  )}
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
                  render={(_: any, record: DataTypeKPI) => (
                    <>{Intl.NumberFormat().format(record.kh_doanh_so)}</>
                  )}
                />
                <Column
                  className="!text-center underline text-[#1877F2]"
                  title="TH"
                  width={70}
                  dataIndex="th_doanh_so"
                  key="th_doanh_so"
                  render={(_: any, record: DataTypeKPI) => (
                    <>{Intl.NumberFormat().format(record.th_doanh_so)}</>
                  )}
                />
                <Column
                  className="!text-center"
                  title="TL"
                  width={70}
                  dataIndex="tl_don_hang"
                  key="tl_don_hang"
                  render={(_: any, record: DataTypeKPI) => (
                    <>{record.tl_don_hang}%</>
                  )}
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
                  render={(_: any, record: DataTypeKPI) => (
                    <>{Intl.NumberFormat().format(record.kh_doanh_thu)}</>
                  )}
                />
                <Column
                  className="!text-center underline text-[#1877F2]"
                  title="TH"
                  width={70}
                  dataIndex="th_doanh_thu"
                  key="th_doanh_thu"
                  render={(_: any, record: DataTypeKPI) => (
                    <>{Intl.NumberFormat().format(record.th_doanh_thu)}</>
                  )}
                />
                <Column
                  className="!text-center"
                  title="TL"
                  width={70}
                  dataIndex="tl_doanh_thu"
                  key="tl_doanh_thu"
                  render={(_: any, record: DataTypeKPI) => (
                    <>{record.tl_doanh_thu}%</>
                  )}
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
                />
                <Column
                  className="!text-center"
                  title="TL"
                  width={70}
                  dataIndex="tl_san_luong"
                  key="tl_san_luong"
                  render={(_: any, record: DataTypeKPI) => (
                    <>{record.tl_san_luong}%</>
                  )}
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
                />
                <Column
                  className="!text-center"
                  title="TL"
                  width={70}
                  dataIndex="tl_sku"
                  key="tl_sku"
                  render={(_: any, record: DataTypeKPI) => (
                    <>{record.tl_sku}%</>
                  )}
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
                />
                <Column
                  className="!text-center"
                  title="TL"
                  width={70}
                  dataIndex="tl_so_gio_lam_viec"
                  key="tl_so_gio_lam_viec"
                  render={(_: any, record: DataTypeKPI) => (
                    <>{record.tl_so_gio_lam_viec}%</>
                  )}
                />
              </ColumnGroup>
            </TableCustom>
          </div>
        </div>
      </ContentFrame>
    </>
  );
}
