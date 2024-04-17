import { Row, Col, DatePicker, Form, Timeline, Spin } from "antd";
import { useEffect, useState } from 'react'
import "./SupervisoryStaff.css"
import { WrapperCard, WrapperCardMap,HistoryMap } from "@/components";
import { ItemStartTimeLineDot, ItemStartTimeLineContent } from "./ItemStartTimeLine";
import { ItemEndTimeLineDot, ItemEndTimeLineContent } from "./ItemEndTimeLine";
import { ItemCheckInTimeLineDot, ItemCheckInTimeLineContent } from "./ItemCheckInTimeLine";
import { ItemMovingTimeLineDot, ItemMovingTimeLineContent } from "./ItemMovingTimeLine";
import { ItemStopTimeLineDot, ItemStopTimeLineContent } from "./ItemStopTimeLine";
import { LoadingOutlined } from '@ant-design/icons';


export default function SupervisoryStaff({options}) {

  const [timeLineHistory, setTimeLineHistory] = useState<any[]>([]);
  const [summaryData, setSummaryData] = useState<
    {
      summary: any | null,
      details: Array<any> | null
    }>({
      summary: null,
      details: []
    });
  const [loadingPage, setLoadingPage] = useState<boolean>(true);

  useEffect(()=>{
    setLoadingPage(true);
  }, [options])

  useEffect(() => {
    let arrTimeLineHistory = [];
    if(summaryData.details != null){
      for(let i = 0; i < summaryData.details.length; i++){
        let item = summaryData.details[i];
        if(item.type == "start"){
          arrTimeLineHistory.push({
            'dot': <ItemStartTimeLineDot></ItemStartTimeLineDot>,
            'children': <ItemStartTimeLineContent data={{ 'time_start': formatTimeUTC(item.timestamp), 'address': item.address }}></ItemStartTimeLineContent>
          });
        }else if(item.type == "checkin"){
          arrTimeLineHistory.push({
            'dot': <ItemCheckInTimeLineDot></ItemCheckInTimeLineDot>,
            'children': <ItemCheckInTimeLineContent data={{ 'time_checking': `${formatTimeUTC(item.startTime)} - ${formatTimeUTC(item.endTime)}`, 'retail_name': item.storeName, 'address': item.address, 'total_time':`${formatTotalTime(item.startTime, item.endTime)}` }}></ItemCheckInTimeLineContent>
          });
        }else if(item.type == "move"){
          arrTimeLineHistory.push({
            dot: <ItemMovingTimeLineDot></ItemMovingTimeLineDot>,
            children: <ItemMovingTimeLineContent data={{ 'time_moving': `${formatTimeUTC(item.startTime)} - ${formatTimeUTC(item.endTime)}`, 'total_distance': `${formatDistance(item.distance)}`, 'total_time':`${formatTotalTime(item.startTime, item.endTime)}` }}></ItemMovingTimeLineContent>
          });
        }else if(item.type == "stop"){
          arrTimeLineHistory.push({
            'dot': <ItemStopTimeLineDot></ItemStopTimeLineDot>,
            'children': <ItemStopTimeLineContent data={{ 'time_stop': `${formatTimeUTC(item.startTime)} - ${formatTimeUTC(item.endTime)}`, 'address': item.address, 'total_time':`${formatTotalTime(item.startTime, item.endTime)}` }}></ItemStopTimeLineContent>
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
  }, [summaryData])

  const onLoadData = (evt) => {
    if(evt != null) setSummaryData(evt);
    else{
      setSummaryData({summary: null, details: []});
    }
    setLoadingPage(false);
  }

  const formatTotalTime = (startTimeStr: string, endTimeStr: string) => {
    const startTime = new Date(startTimeStr);
    const endTime = new Date(endTimeStr);
    const timeDiffMilliseconds = endTime - startTime;
    if(timeDiffMilliseconds < 60000) return `${Math.round(timeDiffMilliseconds/1000)} giây`;
    else if(timeDiffMilliseconds >= 60000 && timeDiffMilliseconds < 60000*60) return `${Math.round(timeDiffMilliseconds/(60000))} phút`;
    else{
      const hoursDiff = Math.floor(timeDiffMilliseconds / (1000 * 60 * 60));
      const minutesDiff = Math.floor((timeDiffMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
      return `${hoursDiff} giờ ${minutesDiff} phút`;
    }
  }

  const formatDistance = (distance: number)=> {
    if(distance < 1000) return `${Math.round(distance)} m`;
    return `${Math.round(distance/1000)} km`;
  }
  const formatTime = (time: number) => {
    if(time < 60) return `${Math.round(time)} giây`;
    else if(time >= 60 && time < 3600) return `${Math.round(time/60)} phút`;
    return `${Math.round(time/3600)} giờ`;
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
      {loadingPage && (
        <div style={{
          position: 'fixed',
          width: '100%',
          height: '85%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 9999,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Spin indicator={<LoadingOutlined style={{ fontSize: 30, color: '#fff' }} spin />} />
        </div>
      )}
      <Row gutter={20}>
        <Col span={4} className="card-container">
          <WrapperCard>
            <div className="wrap-card-container">
              <div className="flex items-center">
                <div className="flex items-center justify-center" style={{ width: '64px', height: '64px', backgroundColor: '#8E33FF1F', gap: '8px', borderRadius: '15px' }}>
                  <div style={{ width: '44px', height: '44px', backgroundSize: 'Cover' }} className="icon_distance"></div>
                </div>
                <div style={{ marginLeft: '10px' }}>
                  <div style={{ opacity: '70%', color: '#212B36', fontSize: '14px', fontWeight: 500 }}>Quãng đường di chuyển</div>
                  {summaryData.summary != null ? (
                    <div style={{ fontWeight: 600, fontSize: '22px', color: '#212B36', marginTop: '8px' }}>{summaryData.summary && formatDistance(summaryData.summary.move.distance)}</div>
                  ):(
                    <div style={{ fontWeight: 600, fontSize: '22px', color: '#212B36', marginTop: '8px' }}>0 m</div>
                  )}
                  
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
                  <div style={{ width: '44px', height: '44px', backgroundSize: 'Cover' }} className="icon_clock"></div>
                </div>
                <div style={{ marginLeft: '10px' }}>
                  <div style={{ opacity: '70%', color: '#212B36', fontSize: '14px', fontWeight: 500 }}>Thời gian di chuyển</div>
                  {summaryData.summary != null ? (
                    <div style={{ fontWeight: 600, fontSize: '22px', color: '#212B36', marginTop: '8px' }}>{summaryData.summary && formatTime(summaryData.summary.move.totalTime)}</div>
                  ):(
                    <div style={{ fontWeight: 600, fontSize: '22px', color: '#212B36', marginTop: '8px' }}>0 giây</div>
                  )}
                  
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
                  <div style={{ width: '44px', height: '30px', backgroundSize: 'contain' }} className="icon_speeding"></div>
                </div>
                <div style={{ marginLeft: '10px' }}>
                  <div style={{ opacity: '70%', color: '#212B36', fontSize: '14px', fontWeight: 500 }}>Tốc độ trung bình</div>
                  {summaryData.summary != null ? (
                    <div style={{ fontWeight: 600, fontSize: '22px', color: '#212B36', marginTop: '8px' }}>{summaryData.summary && formatUnitSpeed(summaryData.summary.move.avgSpeed)} km/h</div>
                  ):(
                    <div style={{ fontWeight: 600, fontSize: '22px', color: '#212B36', marginTop: '8px' }}>0 km/h</div>
                  )}
                </div>
              </div>
            </div>
          </WrapperCard>
        </Col>
        <Col span={6} className="card-container">
          <WrapperCard>
          <div className="flex ">
                <div className="flex items-center justify-center" style={{ width: '64px', height: '64px', backgroundColor: '#1877F21F', gap: '8px', borderRadius: '15px' }}>
                  <div style={{ width: '44px', height: '44px', backgroundSize: 'Cover' }} className="icon_parking"></div>
                </div>
                <div style={{ marginLeft: '10px', width: '100%' }} className="flex items-center">
                  <div style={{marginRight: '40px'}}>
                    <div style={{ opacity: '70%', color: '#212B36', fontSize: '14px', fontWeight: 500 }}>
                      Số lần dừng
                    </div>
                    <div style={{ fontWeight: 600, fontSize: '22px', color: '#212B36', marginTop: '8px' }}>
                      {summaryData.summary && summaryData.summary.stop.count ? (summaryData.summary.stop.count):(0)}
                    </div>
                  </div>
                  <div style={{ border: '1px solid #D9D9D9', height: '100%' }}></div>
                  <div style={{ marginLeft: '25px' }}>
                    <div style={{ opacity: '70%', color: '#212B36', fontSize: '14px', fontWeight: 500 }}>
                      Thời gian dừng
                    </div>
                    <div style={{ fontWeight: 600, fontSize: '22px', color: '#212B36', marginTop: '8px' }}>
                      {summaryData.summary && formatTime(summaryData.summary.stop.totalTime)? (formatTime(summaryData.summary.stop.totalTime)):(<span>0 giây</span>)}
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
                  <div style={{ width: '44px', height: '44px', backgroundSize: 'Cover' }} className="icon_checking"></div>
                </div>
                <div style={{ marginLeft: '10px', width: '100%' }} className="flex items-center ">
                  <div style={{marginRight: '13px'}}>
                    <div style={{ opacity: '70%', color: '#212B36', fontSize: '14px', fontWeight: 500 }}>
                    Số lần viếng thăm
                    </div>
                    <div style={{ fontWeight: 600, fontSize: '22px', color: '#212B36', marginTop: '8px' }}>
                      {summaryData.summary && summaryData.summary.checkin.count? (summaryData.summary.checkin.count):(0)}
                    </div>
                  </div>
                  <div style={{ border: '1px solid #D9D9D9', height: '100%' }}></div>
                  <div style={{ marginLeft: '25px' }}>
                    <div style={{ opacity: '70%', color: '#212B36', fontSize: '14px', fontWeight: 500 }}>
                    Thời gian viếng thăm
                    </div>
                    <div style={{ fontWeight: 600, fontSize: '22px', color: '#212B36', marginTop: '8px' }}>
                    {summaryData.summary && formatTime(summaryData.summary.checkin.totalTime)?(formatTime(summaryData.summary.checkin.totalTime)): (<span>0 giây</span>)}
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
                  {timeLineHistory.length > 0? (
                    <Timeline
                    mode="left"
                    items={timeLineHistory}
                  />
                  ):(
                    <div>Chưa có lộ trình</div>
                  )}
                </div>
              </Col>
              <Col span={18} style={{ height: '615px' }}>
                <HistoryMap options={options} onLoad={onLoadData}/>
              </Col>
            </Row>
          </WrapperCardMap>
        </Row>

      </div>
    </>
  );
}