import { VerticalAlignBottomOutlined } from "@ant-design/icons";
import { FormItemCustom, HeaderPage, TableCustom } from "../../components";
import {
  DatePicker,
  Select,
  Table,
  TreeSelect,
} from "antd";
import { monthAll } from "./data";
import { DatePickerProps } from "antd/lib";
import { useEffect, useState } from "react";
import { AxiosService } from "../../services/server";
import { rsData, rsDataFrappe } from "../../types/response";
import { employee } from "../../types/employeeFilter";
import useDebounce from "../../hooks/useDebount";
import dayjs from "dayjs";
import { translationUrl, treeArray } from "../../util";
import { listSale } from "../../types/listSale";

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
      <div className="bg-white rounded-md py-7 border-[#DFE3E8] border-[0.2px] border-solid">
        <div className="flex justify-start items-center px-4">
          <FormItemCustom className="border-none mr-2">
            <Select
              className="!bg-[#F4F6F8] options:bg-[#F4F6F8] !h-8"
              defaultValue={month}
              options={monthAll}
              onChange={(value: string) => {
                setFmonth(value);
              }}
              showSearch
            />
          </FormItemCustom>
          <FormItemCustom className="border-none mr-2">
            <DatePicker
              className="!bg-[#F4F6F8] !h-8"
              onChange={onChange}
              placeholder="Tất cả "
              picker="year"
              defaultValue={dayjs().startOf("year")}
            />
          </FormItemCustom>
          <FormItemCustom className="border-none mr-2">
            <TreeSelect
              placeholder="Nhóm bán hàng"
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

          <FormItemCustom className="border-none mr-2" name="employee">
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
        </div>
        {/* {routersTable?.map(router => ({ key: router.name, ...router }))} */}
        <div className="pt-5">
          <TableCustom
            dataSource={dataReort?.data?.map((report: any) => ({
              key: report.name,
              ...report,
            }))}
            bordered
            scroll={{ x: true }}
            pagination={{
              defaultPageSize: PAGE_SIZE,
              total,
              showSizeChanger: false,
              onChange(page) {
                setPage(page);
              },
            }}
            summary={() => {
              return (
                <Table.Summary.Row>
                  <Table.Summary.Cell index={0}></Table.Summary.Cell>
                  <Table.Summary.Cell index={1}>Tổng</Table.Summary.Cell>
                  <Table.Summary.Cell index={2}></Table.Summary.Cell>
                  <Table.Summary.Cell index={3}></Table.Summary.Cell>
                  <Table.Summary.Cell index={4}>
                    {dataReort?.sum?.tong_kh_vt}
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={5}>
                    {dataReort?.sum?.tong_th_vt}
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={6}></Table.Summary.Cell>
                  <Table.Summary.Cell index={7}>
                    {dataReort?.sum?.tong_kh_vt_dn}
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={8}>
                    {dataReort?.sum?.tong_th_vt_dn}
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={9}></Table.Summary.Cell>
                  <Table.Summary.Cell index={10}>
                    {dataReort?.sum?.tong_kh_dat_hang}
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={11}>
                    {dataReort?.sum?.tong_th_dat_hang}
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={12}></Table.Summary.Cell>
                  <Table.Summary.Cell index={13}>
                    {dataReort?.sum?.tong_kh_kh_moi}
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={14}>
                    {dataReort?.sum?.tong_th_kh_moi}
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={15}></Table.Summary.Cell>
                  <Table.Summary.Cell index={16}>
                    {dataReort?.sum?.tong_kh_don_hang}
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={17}>
                    {dataReort?.sum?.tong_th_don_hang}
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={18}></Table.Summary.Cell>
                  <Table.Summary.Cell index={19}>
                    {Intl.NumberFormat().format(
                      dataReort?.sum?.tong_kh_doanh_so
                    )}
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={20}>
                    {Intl.NumberFormat().format(
                      dataReort?.sum?.tong_th_doanh_so
                    )}
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={21}></Table.Summary.Cell>
                  <Table.Summary.Cell index={22}>
                    {Intl.NumberFormat().format(
                      dataReort?.sum?.tong_kh_doanh_thu
                    )}
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={23}>
                    {Intl.NumberFormat().format(
                      dataReort?.sum?.tong_th_doanh_thu
                    )}
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={24}></Table.Summary.Cell>
                  <Table.Summary.Cell index={25}>
                    {dataReort?.sum?.tong_kh_san_lg}
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={26}>
                    {dataReort?.sum?.tong_th_san_lg}
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={27}></Table.Summary.Cell>
                  <Table.Summary.Cell index={28}>
                    {dataReort?.sum?.tong_kh_sku}
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={29}>
                    {dataReort?.sum?.tong_th_sku}
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={30}></Table.Summary.Cell>
                  <Table.Summary.Cell index={31}>
                    {dataReort?.sum?.tong_kh_so_gio_lam_viec}
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={32}>
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
              title="Phòng/nhóm"
              dataIndex="nhom_ban_hang"
              key="nhom_ban_hang"
              render={(_, record: any) => (
                <div className="!w-[180px]">{record.nhom_ban_hang}</div>
              )}
            />
            <ColumnGroup
              className="!whitespace-normal !min-w-[210px] !text-center"
              title="Số khách hàng viếng thăm"
            >
              <Column title="KH" width={70} dataIndex="kh_vt" key="kh_vt" />
              <Column title="TH" width={70} dataIndex="th_vt" key="th_vt" />
              <Column
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
                title="KH"
                width={70}
                dataIndex="kh_vt_dn"
                key="kh_vt_dn"
              />
              <Column
                title="TH"
                width={70}
                dataIndex="th_vt_dn"
                key="th_vt_dn"
              />
              <Column
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
                title="KH"
                width={70}
                dataIndex="kh_dat_hang"
                key="kh_dat_hang"
              />
              <Column
                title="TH"
                width={70}
                dataIndex="th_dat_hang"
                key="th_dat_hang"
              />
              <Column
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
                title="KH"
                width={70}
                dataIndex="kh_kh_moi"
                key="kh_kh_moi"
              />
              <Column
                title="TH"
                width={70}
                dataIndex="th_kh_moi"
                key="th_kh_moi"
              />
              <Column
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
                title="KH"
                width={70}
                dataIndex="kh_don_hang"
                key="kh_don_hang"
              />
              <Column
                title="TH"
                width={70}
                dataIndex="th_don_hang"
                key="th_don_hang"
              />
              <Column
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
                title="KH"
                dataIndex="kh_doanh_so"
                key="kh_doanh_so"
                render={(_: any, record: DataTypeKPI) => (
                  <>{Intl.NumberFormat().format(record.kh_doanh_so)}</>
                )}
              />
              <Column
                title="TH"
                width={70}
                dataIndex="th_doanh_so"
                key="th_doanh_so"
                render={(_: any, record: DataTypeKPI) => (
                  <>{Intl.NumberFormat().format(record.th_doanh_so)}</>
                )}
              />
              <Column
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
                title="KH"
                width={70}
                dataIndex="kh_doanh_thu"
                key="kh_doanh_thu"
                render={(_: any, record: DataTypeKPI) => (
                  <>{Intl.NumberFormat().format(record.kh_doanh_thu)}</>
                )}
              />
              <Column
                title="TH"
                width={70}
                dataIndex="th_doanh_thu"
                key="th_doanh_thu"
                render={(_: any, record: DataTypeKPI) => (
                  <>{Intl.NumberFormat().format(record.th_doanh_thu)}</>
                )}
              />
              <Column
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
                title="KH"
                width={70}
                dataIndex="kh_san_lg"
                key="kh_san_lg"
              />
              <Column
                title="TH"
                width={70}
                dataIndex="th_san_lg"
                key="th_san_lg"
              />
              <Column
                title="TL"
                width={70}
                dataIndex="tl_san_luong"
                key="tl_san_luong"
                render={(_: any, record: DataTypeKPI) => (
                  <>{record.tl_san_luong}%</>
                )}
              />
            </ColumnGroup>
            <ColumnGroup className="!whitespace-normal" title="SKU" width={210}>
              <Column title="KH" width={70} dataIndex="kh_sku" key="kh_sku" />
              <Column title="TH" width={70} dataIndex="th_sku" key="th_sku" />
              <Column
                title="TL"
                width={70}
                dataIndex="tl_sku"
                key="tl_sku"
                render={(_: any, record: DataTypeKPI) => <>{record.tl_sku}%</>}
              />
            </ColumnGroup>
            <ColumnGroup
              className="!whitespace-normal"
              title="Số giờ làm việc"
              width={210}
            >
              <Column
                title="KH"
                width={70}
                dataIndex="kh_so_gio_lam_viec"
                key="kh_so_gio_lam_viec"
              />
              <Column
                title="TH"
                width={70}
                dataIndex="th_so_gio_lam_viec"
                key="th_so_gio_lam_viec"
              />
              <Column
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
    </>
  );
}
