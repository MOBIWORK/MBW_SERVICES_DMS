/** @format */

import { ContentFrame, TableCustom } from "@/components";
import { useEffect, useState } from "react";
import ReportHeader from "../ReportHeader/ReportHeader";
import { Col, Row } from "antd";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { mediaQueryReportDayByDay, PAGE_SIZE } from "@/constant";
import Filter_group from "@/components/filter-group/Filter_group";
import DropDownFilter from "@/components/filter-group/dropDownFilter";
import { useSelector } from "react-redux";
import { AxiosService } from "@/services/server";
import { useResize } from "@/hooks";
import Column from "antd/es/table/Column";
import ColumnGroup from "antd/es/table/ColumnGroup";
import { getDaysAndWeekdays } from "@/util";

const ReportProductionDayByDay = () => {
  const [total, setTotal] = useState<number>(0);
  const [totalSunday, setTotalSunday] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [refresh, setRefresh] = useState<boolean>(false);

  const [production, setDataProduction] = useState<{ data: any[] }>({
    data: [],
  });

  const matchMedia = useMediaQuery(`${mediaQueryReportDayByDay}`);
  const size = useResize();

  const { startDate, endDate } = useSelector((state: any) => state.date);
  const { sales_team, brand, industry, supplier } = useSelector(
    (state: any) => state.group
  );
  const [clDate, setClDate] = useState<{ date: number; dayOfWeek: string }[]>(
    getDaysAndWeekdays(startDate, endDate)
  );
  useEffect(() => {
    setClDate(getDaysAndWeekdays(startDate, endDate));
    (() => {
      let totalSunday = 0;
      clDate.forEach((item) => {
        if (item.dayOfWeek === "Chủ nhật") {
          totalSunday++;
        }
      });
      setTotalSunday(totalSunday);
    })();
  }, [startDate, endDate]);

  useEffect(() => {
    (async () => {
      const rsData = await AxiosService.get(
        "/api/method/mbw_sfa.api.report.prod_dbd.report_prod_dbd",
        {
          params: {
            page_size: PAGE_SIZE,
            page_number: page,
            sales_team,
            industry,
            brand,
            supplier,
            from_date: startDate,
            to_date: endDate,
          },
        }
      );

      let { result } = rsData;
      const updatedClDate = getDaysAndWeekdays(startDate, endDate);
      setDataProduction({
        ...result,
        data: result.data.map((dt: any) => {
          updatedClDate.forEach((at: any) => {
            let dateW = dt.total_qty_by_day[at.date] || 0;
            dt[at.date] = { dateW, ...at };
          });
          delete dt.total_qty_by_day;

          dt.children.map((item: any) => {
            updatedClDate.forEach((at: any) => {
              let dateW = item.total_qty_by_day[at.date] || 0;
              item[at.date] = { dateW, ...at };
            });
          });
          return dt;
        }),
      });
      setTotal(result?.totals);
    })();
  }, [
    page,
    refresh,
    sales_team,
    industry,
    brand,
    supplier,
    startDate,
    endDate,
  ]);
  return (
    <>
      <ContentFrame
        header={
          <ReportHeader
            setRefresh={setRefresh}
            title="Báo cáo theo dõi sản lượng trong ngày từng thị trường "
            params={{}}
            file_name="Report Sell.xlsx"
          />
        }>
        <div className="bg-white rounded-2xl pt-4 pb-7  border-[#DFE3E8] border-[0.2px] border-solid">
          <Row
            gutter={[16, 16]}
            className={`flex ${
              matchMedia ? "justify-start" : "justify-between"
            } items-center w-full`}>
            {!matchMedia ? (
              <Col className="!ml-4">
                <DropDownFilter
                  inputSupplier
                  inputIndustry
                  inputBrand
                  inputFromDate
                  inputToDate
                  inputSaleGroup
                  setPage={setPage}
                  matchMedia={matchMedia}
                />
              </Col>
            ) : (
              <Col className="ml-4 w-[78%]">
                <div className="flex ">
                  <Filter_group
                    setPage={setPage}
                    inputFromDate
                    inputToDate
                    inputSaleGroup
                    inputSupplier
                    inputIndustry
                    inpitBrand
                  />
                </div>
              </Col>
            )}
          </Row>
        </div>
        <div className="pt-5">
          <TableCustom
            dataSource={production?.data?.map((dataSale: any) => {
              return {
                ...dataSale,
                key: dataSale.group_name,
              };
            })}
            bordered
            $border
            scroll={{
              x: true,
              // y: containerHeight < 300 ? undefined : scrollYTable1,
              y: production?.data?.length > 0 ? size?.h * 0.55 : undefined,
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
                return record.group_name !== undefined ? index + 1 : "";
              }}
            />
            <Column
              title={() => (
                <p className="min-w-[120px]">Thị trường /nhân viên</p>
              )}
              className="min-w-[180px]"
              dataIndex="group_name"
              key="group_name"
              fixed="left"
              render={(_: any, record: any) => {
                return _ != undefined ? _ : record.sales_person;
              }}
            />
            {clDate.length > 0 &&
              clDate.map((date: any) => {
                return (
                  <ColumnGroup
                    key={date.date}
                    title={date.date}
                    className="!w-full !text-center !p-2 ">
                    <Column
                      className="!text-center !whitespace-nowrap !min-w-[100px] !p-2 "
                      title={date.dayOfWeek}
                      dataIndex={date.date}
                      key={date.dayOfWeek}
                      render={(value: any, record: any) => {
                        if (value?.dayOfWeek === "Chủ nhật") {
                          return (
                            <div className=" !h-14 !text-center flex justify-center items-center">
                              OFF
                            </div>
                          );
                        }
                        if (value?.dateW) {
                          return (
                            <div className=" !h-14 !text-center flex justify-center items-center">
                              {value?.dateW}
                            </div>
                          );
                        } else if (record?.dateW) {
                          return (
                            <div className=" !h-14 !text-center flex justify-center items-center">
                              {record?.dateW}
                            </div>
                          );
                        } else {
                          return (
                            <div className=" !h-14 !text-center flex justify-center items-center text-gray-400/80">
                              -
                            </div>
                          );
                        }
                      }}
                    />
                  </ColumnGroup>
                );
              })}
            <Column
              title="Tổng cộng"
              className="min-w-[100px]  text-center !bg-[#FFF8EB]"
              dataIndex="total_qty_by_month_all"
              key="total_qty_by_month_all"
              fixed="right"
              render={(_: any, record: any) => {
                return <>{_ != null ? _ : record.total_qty_by_month}</>;
              }}
            />
            <Column
              title={() => (
                <p className="whitespace-pre-line text-clip text-center">
                  Bình quân/ngày
                </p>
              )}
              className="min-w-[110px]  text-center text-wrap !bg-[#FFF8EB]"
              dataIndex="total_qty_by_month_all"
              key="total_qty_by_month_all"
              fixed="right"
              render={(_: any, record: any) => {
                //Tổng công/Số ngày làm việc (trừ đi chủ nhật)
                //totalSunday == togn so ngay chu nhat trong thang(co the la 4 hoac 5)
                //clDate.length == tong so ngay trong thang
                const totalDayWork = clDate.length - totalSunday;
                return (
                  <>
                    {_ != null
                      ? (_ / totalDayWork).toFixed(2)
                      : (record.total_qty_by_month / totalDayWork).toFixed(2)}
                  </>
                );
              }}
            />
            <Column
              title={() => (
                <p className="whitespace-pre-line text-clip text-center">
                  Chỉ tiêu tháng
                </p>
              )}
              className="min-w-[90px] text-center !bg-[#FFF8EB]"
              dataIndex="total_kpi_month"
              key="total_kpi_month"
              fixed="right"
              render={(_: any, record: any) => {
                return <>{_ != null ? _ : record.kpi_san_luong}</>;
              }}
            />
            <Column
              title={() => (
                <p className="whitespace-pre-line text-clip text-center">
                  Còn lại trong tháng
                </p>
              )}
              className="min-w-[100px] text-center !bg-[#FFF8EB]"
              dataIndex="total_rest_all"
              key="total_rest_all"
              fixed="right"
              render={(_: any, record: any) => {
                return <>{_ != null ? _ : record.the_rest}</>;
              }}
            />
          </TableCustom>
        </div>
      </ContentFrame>
    </>
  );
};

export default ReportProductionDayByDay;
