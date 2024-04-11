import { Row, Col, DatePicker, Form, Timeline } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { useEffect, useState } from 'react'
import "./SupervisoryStaff.css"
import { WrapperCard, WrapperCardMap,HistoryMap } from "@/components";
import { ItemStartTimeLineDot, ItemStartTimeLineContent } from "./ItemStartTimeLine";
import { ItemEndTimeLineDot, ItemEndTimeLineContent } from "./ItemEndTimeLine";
import { ItemCheckInTimeLineDot, ItemCheckInTimeLineContent } from "./ItemCheckInTimeLine";
import { ItemMovingTimeLineDot, ItemMovingTimeLineContent } from "./ItemMovingTimeLine";
import { ItemStopTimeLineDot, ItemStopTimeLineContent } from "./ItemStopTimeLine";


export default function SupervisoryStaff({options}) {

  const [timeLineHistory, setTimeLineHistory] = useState<any[]>([]);

  useEffect(() => {
    console.log(options);
    let arrTimeLineHistory = [];
    if(options.details != null){
      for(let i = 0; i < options.details.length; i++){
        let item = options.details[i];
        if(item.type == "start"){
          arrTimeLineHistory.push({
            'dot': <ItemStartTimeLineDot></ItemStartTimeLineDot>,
            'children': <ItemStartTimeLineContent data={{ 'time_start': formatTimeUTC(item.timestamp), 'address': item.address }}></ItemStartTimeLineContent>
          });
        }else if(item.type == "checkin"){
          arrTimeLineHistory.push({
            'dot': <ItemCheckInTimeLineDot></ItemCheckInTimeLineDot>,
            'children': <ItemCheckInTimeLineContent data={{ 'time_checking': `${formatTimeUTC(item.startTime)} - ${formatTimeUTC(item.endTime)}`, 'retail_name': item.storeName, 'address': item.address }}></ItemCheckInTimeLineContent>
          });
        }else if(item.type == "move"){
          arrTimeLineHistory.push({
            dot: <ItemMovingTimeLineDot></ItemMovingTimeLineDot>,
            children: <ItemMovingTimeLineContent data={{ 'time_moving': `${formatTimeUTC(item.startTime)} - ${formatTimeUTC(item.endTime)}`, 'total_distance': `${formatUnitDistance(item.distance)} km` }}></ItemMovingTimeLineContent>
          });
        }else if(item.type == "stop"){
          arrTimeLineHistory.push({
            'dot': <ItemStopTimeLineDot></ItemStopTimeLineDot>,
            'children': <ItemStopTimeLineContent data={{ 'time_stop': `${formatTimeUTC(item.startTime)} - ${formatTimeUTC(item.endTime)}`, 'address': item.address }}></ItemStopTimeLineContent>
          });
        }else if(item.type == "end"){
          arrTimeLineHistory.push({
            dot: <ItemEndTimeLineDot></ItemEndTimeLineDot>,
                        children: <ItemEndTimeLineContent data={{ 'time_end': `${formatTimeUTC(item.timestamp)}`, 'address': item.address }}></ItemEndTimeLineContent>
          });
        }
      }
    }
    setTimeLineHistory(arrTimeLineHistory);
  }, [options])

  const formatUnitDistance = (distance: number)=> {
    return Math.round(distance/1000);
  }
  const formatUnitTime = (time: number) => {
    return Math.round(time/60);
  }
  const formatUnitSpeed = (speed: number) => {
    return Math.round(speed * 3.6);
  }
  const formatTimeUTC = (timeString: string) => {
    var originalDate = new Date(timeString);
    originalDate.setUTCHours(originalDate.getUTCHours() + 7);
    return `${originalDate.getUTCHours()}:${originalDate.getUTCMinutes()}`;
  }

  return (
    <>
      {/* <Row className="flex flex-wrap justify-between items-center px-0">
        <div className="flex justify-center items-center">
          <p className="mr-2 cursor-pointer">
            <LeftOutlined />
          </p>
          <span className="text-2xl font-semibold leading-[21px]">Nhân viên Chu Quỳnh Anh - NV1234</span>
        </div>
        <div className="flex mb-2">
          <Form.Item className="border-none" style={{ padding: '20px 0', margin: '0' }}>
            <DatePicker />
          </Form.Item>
        </div>
      </Row> */}
      <Row gutter={20}>
        <Col span={4} className="card-container">
          <WrapperCard>
            <div className="wrap-card-container">
              <div className="flex items-center">
                <div className="flex items-center justify-center" style={{ width: '64px', height: '64px', backgroundColor: '#8E33FF1F', gap: '8px', borderRadius: '15px' }}>
                  <div style={{ width: '44px', height: '44px', backgroundImage: 'url("/distance.png")', backgroundSize: 'Cover' }}></div>
                </div>
                <div style={{ marginLeft: '10px' }}>
                  <div style={{ opacity: '70%', color: '#212B36', fontSize: '14px', fontWeight: 500 }}>Quãng đường di chuyển</div>
                  <div style={{ fontWeight: 600, fontSize: '22px', color: '#212B36', marginTop: '8px' }}>{options.summary && formatUnitDistance(options.summary.move.distance)} km</div>
                </div>
              </div>
            </div>
          </WrapperCard>
        </Col>
        <Col span={4} className="card-container">
          <WrapperCard>
            <div className="wrap-card-container">
              <div className="flex items-center">
                <div className="flex items-center justify-center" style={{ width: '64px', height: '64px', backgroundColor: '#00B8D91F', gap: '8px', borderRadius: '15px' }}>
                  <div style={{ width: '44px', height: '44px', backgroundImage: 'url("/clock.png")', backgroundSize: 'Cover' }}></div>
                </div>
                <div style={{ marginLeft: '10px' }}>
                  <div style={{ opacity: '70%', color: '#212B36', fontSize: '14px', fontWeight: 500 }}>Thời gian di chuyển</div>
                  <div style={{ fontWeight: 600, fontSize: '22px', color: '#212B36', marginTop: '8px' }}>{options.summary && formatUnitTime(options.summary.move.totalTime)} phút</div>
                </div>
              </div>
            </div>
          </WrapperCard>
        </Col>
        <Col span={4} className="card-container">
          <WrapperCard>
            <div className="wrap-card-container">
              <div className="flex items-center">
                <div className="flex items-center justify-center" style={{ width: '64px', height: '64px', backgroundColor: '#FFAB001F', gap: '8px', borderRadius: '15px' }}>
                  <div style={{ width: '44px', height: '44px', backgroundImage: 'url("/speeding.png")', backgroundSize: 'Cover' }}></div>
                </div>
                <div style={{ marginLeft: '10px' }}>
                  <div style={{ opacity: '70%', color: '#212B36', fontSize: '14px', fontWeight: 500 }}>Tốc độ trung bình</div>
                  <div style={{ fontWeight: 600, fontSize: '22px', color: '#212B36', marginTop: '8px' }}>{options.summary && formatUnitSpeed(options.summary.move.avgSpeed)} km/h</div>
                </div>
              </div>
            </div>
          </WrapperCard>
        </Col>
        <Col span={6} className="card-container">
          <WrapperCard>
          <div className="flex ">
                <div className="flex items-center justify-center" style={{ width: '64px', height: '64px', backgroundColor: '#1877F21F', gap: '8px', borderRadius: '15px' }}>
                  <div style={{ width: '44px', height: '44px', backgroundImage: 'url("/parking.png")', backgroundSize: 'Cover' }}></div>
                </div>
                <div style={{ marginLeft: '10px', width: '100%' }} className="flex items-center">
                  <div style={{marginRight: '40px'}}>
                    <div style={{ opacity: '70%', color: '#212B36', fontSize: '14px', fontWeight: 500 }}>
                      Số lần dừng
                    </div>
                    <div style={{ fontWeight: 600, fontSize: '22px', color: '#212B36', marginTop: '8px' }}>
                      {options.summary && options.summary.stop.count}
                    </div>
                  </div>
                  <div style={{ border: '1px solid #D9D9D9', height: '100%' }}></div>
                  <div style={{ marginLeft: '25px' }}>
                    <div style={{ opacity: '70%', color: '#212B36', fontSize: '14px', fontWeight: 500 }}>
                      Thời gian dừng
                    </div>
                    <div style={{ fontWeight: 600, fontSize: '22px', color: '#212B36', marginTop: '8px' }}>
                      {options.summary && formatUnitTime(options.summary.stop.totalTime)} phút
                    </div>
                  </div>
                </div>
              </div>
          </WrapperCard>
        </Col>
        <Col span={6} className="card-container">
          <WrapperCard>
          <div className="flex ">
                <div className="flex items-center justify-center" style={{ width: '64px', height: '64px', backgroundColor: '#FF56301F', gap: '8px', borderRadius: '15px' }}>
                  <div style={{ width: '44px', height: '44px', backgroundImage: 'url("/checking.png")', backgroundSize: 'Cover' }}></div>
                </div>
                <div style={{ marginLeft: '10px', width: '100%' }} className="flex items-center ">
                  <div style={{marginRight: '13px'}}>
                    <div style={{ opacity: '70%', color: '#212B36', fontSize: '14px', fontWeight: 500 }}>
                    Số lần viếng thăm
                    </div>
                    <div style={{ fontWeight: 600, fontSize: '22px', color: '#212B36', marginTop: '8px' }}>
                      {options.summary && options.summary.checkin.count}
                    </div>
                  </div>
                  <div style={{ border: '1px solid #D9D9D9', height: '100%' }}></div>
                  <div style={{ marginLeft: '25px' }}>
                    <div style={{ opacity: '70%', color: '#212B36', fontSize: '14px', fontWeight: 500 }}>
                    Thời gian viếng thăm
                    </div>
                    <div style={{ fontWeight: 600, fontSize: '22px', color: '#212B36', marginTop: '8px' }}>
                    {options.summary && formatUnitTime(options.summary.checkin.totalTime)} phút
                    </div>
                  </div>
                </div>
              </div>
          </WrapperCard>
        </Col>
      </Row>
      <div style={{ marginTop: '20px' }}>
        <Row gutter={20} style={{marginLeft: '0px', marginRight: '0px'}}>
          <WrapperCardMap>
            <Row>
              <Col span={6} style={{ paddingTop: '1rem', paddingLeft: '1rem' }}>
                <div style={{ fontWeight: 500, fontSize: '16px', color: '#000000', height: '45px' }}>Quãng đường di chuyển</div>
                <div style={{ padding: '8px 16px 8px 16px', maxHeight: '530px', overflowY: 'auto' }}>
                  <Timeline
                    mode="left"
                    items={timeLineHistory}
                  />
                </div>
              </Col>
              <Col span={18} style={{ height: '615px' }}>
                <HistoryMap options={options} />
              </Col>
            </Row>
          </WrapperCardMap>
        </Row>

      </div>
    </>
  );
}