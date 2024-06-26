
import { Col, Row } from "antd";
import { HeaderPage } from "../../components";
import { Doanhso, InfoCard } from "./components/card";
import { ChartCustom } from "./components/chart";
import { ListCustom } from "./components/list";
import {  useLayoutEffect, useState } from "react";
import { AxiosService } from "../../services/server";
import { rsData } from "../../types/response";
import { ResultType } from "../../types/dashboard";



export default function RouterDashboard() {
  const [report, setReport] = useState<ResultType | null>(null)
  useLayoutEffect(() => {
    (async()=> {
      try{
        let rsReport:rsData<ResultType> = await AxiosService.get('/api/method/mbw_dms.api.report.synthesis_report')
        setReport(rsReport.result)
      }catch(err) {
        console.log("err",err);        
      }
    })()
  }, [])
  
  return (
    <>
      <HeaderPage title="Tổng quan" />
      <Row gutter={20}>
        <Col span={8}>
          <Doanhso data={{
            doanh_so :report?.doanh_so,
            phan_tram: report?.tang_vs_hqua
          }} />
        </Col>
        <Col className="flex-1">
          <Row gutter={[20, 10]}>
            <Col span={8}>
              <InfoCard data={{
                 title: "Lượt viếng thăm",
                 value: report?.luot_vt
              }}/>
            </Col>
            <Col span={8}>
              <InfoCard data={{
                 title: "Đơn hàng",
                 value: report?.don_hang
              }}/>
            </Col>
            <Col span={8}>
              <InfoCard data={{
                 title: "Sản phẩm",
                 value: report?.so_san_pham
              }}/>
            </Col>
            <Col span={8}>
              <InfoCard data={{
                 title: "Tỷ lệ chuyển đổi",
                 value: report?.ti_le_chuyen_doi
              }}/>
            </Col>
            <Col span={8}>
              <InfoCard data={{
                  title: "Nhân viên online",
                 value: report?.so_nv_online
              }}/>
            </Col>
            <Col span={8}>
              <InfoCard data={{
                 title: "Tổng số người mua",
                 value: report?.so_nguoi_mua
              }}/>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row gutter={20} className="my-5">
        <Col span={14} ><ChartCustom data={report && report?.bieu_do_doanh_so.length > 0  ? report?.bieu_do_doanh_so.sort(d=> -d.thoi_gian) : []} /></Col>
        <Col span={10} ><ListCustom data={report?.ds_sp_doanh_so_cao} /></Col>
      </Row>

    </>
  );
}
