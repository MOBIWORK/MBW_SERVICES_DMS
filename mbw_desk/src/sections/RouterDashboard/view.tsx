
import { Col, Row } from "antd";
import { HeaderPage } from "../../components";
import { Doanhso, InfoCard, WrapperCard } from "./components/card";
import { ChartCustom } from "./components/chart";
import { ListCustom } from "./components/list";
import MapEkgis from "../../components/mapEkgis/map";
import { cardData, dataChart, dataChart2, itemsProduct } from "./data";



export default function RouterDashboard() {
 
  return (
    <>
    <HeaderPage title="Tổng quan"/>
     <Row gutter={20}>
      <Col>
        <Doanhso data={{}}/>
      </Col>
      <Col className="flex-1">
        <Row gutter={[20,10]}>
          {cardData.map((card,index) => <Col key={index} span={8}>
            <InfoCard  data={{title: card.title, value: card.value}}/>
          </Col>)}
        </Row>
      </Col>
     </Row>
     <Row gutter={20} className="my-5">
      <Col span={14} ><ChartCustom data={dataChart2}/></Col>
      <Col span={10} ><ListCustom data={itemsProduct}/></Col>
     </Row>

     <WrapperCard type="map">
        <div className="h-[600px]"><MapEkgis id="dashboard" /></div>
     </WrapperCard>
    </>
  );
}
