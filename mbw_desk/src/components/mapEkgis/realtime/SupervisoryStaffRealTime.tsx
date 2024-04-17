import { Row, Col, List, Button, Spin } from 'antd';
import "./SupervisoryStaffRealTime.css";
import {TableCustom,RealtimeMap,WrapperCard, WrapperCardTable, WrapperCardMap} from "@/components";
import { useEffect, useState } from 'react';
import { AxiosService } from '@/services/server';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';

export default function SupervisoryStaffRealTime() {
  const navigate = useNavigate();
  const [summaryOver, setSummaryOver] = useState<
    {
      luot_vt: number | 0,
      don_hang: number | 0,
      doanh_so: number | 0,
    }>({
      luot_vt: 0,
      don_hang: 0,
      doanh_so: 0,
    });
    const [summaryOnlineAndOffline, setSummaryOnlineAndOffline] = useState<
      {
        so_nv_online: number,
        so_nv_offline: number
      }
    >({
      so_nv_online: 0,
      so_nv_offline: 0
    });
    const [dataTopDistanceEmployee, setDataTopDistanceEmployee] = useState<any[]>([]);
    const [dataEmployee, setDataEmployee] = useState<any[]>([]);
    const [dataCheckingEmployee, setDataCheckingEmployee] = useState<any[]>([]);
    const [loadingPage, setLoadingPape] = useState<boolean>(true);

    const initDataSummaryOver = async () => {
      const rs = await AxiosService.get(`/api/method/mbw_dms.api.report.real_time_monitoring_report`);
      if(rs.message == "Thành công"){
        setSummaryOver(rs.result);
      }
    }
  //bảng: cột nhân viên
  const columnsCheckingEmployee = [
    {
      'dataIndex': "stt",
      'width': "50px"
    },{
      'title': "Nhân viên",
      'dataIndex': 'emp_name',
      'render': (text: any, record: any) => (
        <div className="flex items-center">
                <div className="flex items-center justify-center" style={{height: '48px', width: '48px', borderRadius: '12px'}}>
                  {record.pic_profile != null? (
                    <div style={{width: '48px', height: '48px', backgroundImage: `url("${record.pic_profile}")`, backgroundSize: 'Cover'}}></div>
                  ):(
                    <div style={{width: '48px', height: '48px', backgroundSize: 'Cover'}} className='icon_user_default'></div>
                  )}
                </div>
                <div className="mx-3" style={{cursor: 'pointer'}} onClick={() => handleShowHistoryEmployee(record)}>
                  <div style={{fontWeight: 500, fontSize: '14px', lineHeight: '21px'}}>{text}</div>
                  {record.emp_id != null && (
                    <div style={{marginTop: '5px', fontWeight: 400, fontSize: '12px', lineHeight: '21px'}}>ID: {record.emp_id}</div>
                  )}
                </div>
          </div>
      )
    },{
      'title': "Thời gian di chuyển",
      'dataIndex': "moving"
    },{
      'title': "Thời gian dừng",
      'dataIndex': "stopping"
    },{
      'title': "Thời gian viếng thăm",
      'dataIndex': "visiting"
    }
  ]

  const handleSummaryOnlienAndOffline = (res) => {
    setSummaryOnlineAndOffline({
      so_nv_online: res.online,
      so_nv_offline: res.offline
    });
  }

  // option hiển thị map
  const [options,setOptions] =  useState<{apiKey:string | null,projectId:string | null}>({
    apiKey: import.meta.env.VITE_API_KEY,
    projectId: ''
  })

  const formatUnitNumber = (num: number) => {
    return num.toLocaleString('en-US').replace(/,/g, '.');
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

  const handlerShowHistory = (evt) => {
    navigate(`/employee-monitor-detail/${evt["_id"]}`);
  }
  const handlerShowHistoryForAnyOne = () => {
    navigate("/employee-monitor-detail");  //654c8a12d65d3e52f2d286de
  }
  const handleShowHistoryEmployee = (employee) => {
    if(employee.objectId != null) navigate(`/employee-monitor-detail/${employee.objectId}`);
    else navigate(`/employee-monitor-detail`);
  }
  const renderDataMoveTopEmployee = (arrSummary, arrEmployee) => {
    for(let i = 0; i < arrEmployee.length; i++){
      for(let j = 0; j < arrSummary.length; j++){
        if(arrEmployee[i].object_id != null && arrEmployee[i].object_id == arrSummary[j].object["_id"]){
          arrEmployee[i].summary = arrEmployee[i].summary;
          break;
        }else{
          arrEmployee[i].summary = {};
        }
      }
    }
    let arrDataSort = arrEmployee.sort((a, b) => {
      if(a.summary != null && a.summary.move != null && b.summary != null && b.summary.move != null) return b.summary.move.distance - a.summary.move.distance;
    });
    let dataMoveTopEmployee = [];
    for(let i = 0; i < arrDataSort.length; i++){
      if(i == 5) break;
      dataMoveTopEmployee.push({
        'stt': i+1,
        'pic_profile': arrDataSort[i].avatar != null? arrDataSort[i].avatar : null,
        'emp_name': arrDataSort[i].employee_name,
        'emp_id': arrDataSort[i].name,
        'distance': arrDataSort[i].summary != null && arrDataSort[i].summary.move != null? formatDistance(arrDataSort[i].summary.move.distance) : formatDistance(0),
        'objectId': arrDataSort[i].object_id
      })
    }
    console.log(dataMoveTopEmployee);
    setDataTopDistanceEmployee(dataMoveTopEmployee);
  }
  const renderDataEmployee = async (arrEmployeeInput) => {
    let dateNow = new Date();
    let timeStamp = dateNow.getTime()/1000;
    let res = await AxiosService(`/api/method/mbw_dms.api.user.get_list_top_employee?from_date=${timeStamp}&to_date=${timeStamp}`);
    let arrEmployee = [];
    if(res.message == "Thành công"){
      arrEmployee = res.result;
    }
    for(let i = 0; i < arrEmployeeInput.length; i++){
      if(arrEmployee.length > 0){
        for(let j = 0; j < arrEmployee.length; j++){
          if(arrEmployeeInput[i].name == arrEmployee[j].employee){
            arrEmployeeInput[i].today_visit = arrEmployee[j].today_visit;
            arrEmployeeInput[i].must_visit = arrEmployee[j].must_visit;
            arrEmployeeInput[i].sales_order = arrEmployee[j].sales_order;
            break;
          }else{
            arrEmployeeInput[i].today_visit = 0;
            arrEmployeeInput[i].must_visit = 0;
            arrEmployeeInput[i].sales_order = 0;
          }
        }
      }else{
        arrEmployeeInput[i].today_visit = 0;
        arrEmployeeInput[i].must_visit = 0;
        arrEmployeeInput[i].sales_order = 0;
      }
    }
    console.log(arrEmployeeInput);
    let arrDataSort = arrEmployeeInput.sort((a, b) => {
      return b.sales_order - a.sales_order;
    });
    console.log(arrDataSort)
    let arrEmployeeOut = [];
    for(let i = 0; i < arrDataSort.length; i++){
      if(i == 5) break;
      let item = arrDataSort[i];
      arrEmployeeOut.push({
        's1tt': i+1,
        'pic_profile': item.avatar != null && item.avatar != ""? item.avatar : null,
        'emp_name': item.employee_name,
        'emp_id': item.name,
        'visiting': `${item.today_visit}/${item.must_visit}`,
        'boxing': item.sales_order,
        'objectId': item.object_id
      })
    }
    console.log(arrEmployeeOut);
    setDataEmployee(arrEmployeeOut);
  }
  const renderDataCheckingEmployee = (arrSummary, arrEmployee) => {
    for(let i = 0; i < arrEmployee.length; i++){
      for(let j = 0; j < arrSummary.length; j++){
        if(arrEmployee[i].object_id != null && arrEmployee[i].object_id == arrSummary[j].object["_id"]){
          arrEmployee[i].summary = arrEmployee[i].summary;
          break;
        }else{
          arrEmployee[i].summary = {};
        }
      }
    }
    let dataCheckingEmployee = [];
    for(let i = 0; i < arrEmployee.length; i++){
      dataCheckingEmployee.push({
        'stt': i+1,
        'pic_profile': arrEmployee[i].avatar != null? arrEmployee[i].avatar : null,
        'emp_name': arrEmployee[i].employee_name,
        'emp_id': arrEmployee[i].name,
        'moving': arrEmployee[i].summary != null && arrEmployee[i].summary.move != null? formatTime(arrEmployee[i].summary.move.totalTime) : formatTime(0),
        'stopping': arrEmployee[i].summary != null && arrEmployee[i].summary.stop != null? formatTime(arrEmployee[i].summary.stop.totalTime) : formatTime(0),
        'visiting': arrEmployee[i].summary != null && arrEmployee[i].summary.checkin != null? formatTime(arrEmployee[i].summary.checkin.totalTime) : formatTime(0),
        'objectId': arrEmployee[i].object_id
      })
    }
    setDataCheckingEmployee(dataCheckingEmployee);
  }

  useEffect(() => {
    (async() => {
      setLoadingPape(true);
      initDataSummaryOver();
      const rs = await AxiosService.get('/api/method/mbw_dms.api.user.get_projectID');
      setOptions(prev => ({
        ...prev,
        projectId: rs.result[ "Project ID"]
      }))
      let responseAllEmployee = await AxiosService("/api/method/mbw_dms.api.user.get_list_employees")
      let arrEmployee = [];
      if(responseAllEmployee.message == "Thành công"){
        arrEmployee = responseAllEmployee.result;
      }
      console.log(arrEmployee);
      let urlSummary = `https://api.ekgis.vn/v2/tracking/locationHistory/summary/lastest/${rs.result[ "Project ID"]}/null?api_key=${options.apiKey}`;
      let res = await axios.get(urlSummary);
      if(import.meta.env.VITE_BASE_URL){
        res = res.data;
      }
      console.log("Realtime ", import.meta.env.VITE_BASE_URL);
      if(res?.results.length > 0){
        let arrSummary = res?.results;
        renderDataMoveTopEmployee(arrSummary, JSON.parse(JSON.stringify(arrEmployee)));
        renderDataCheckingEmployee(arrSummary, JSON.parse(JSON.stringify(arrEmployee)));
      }
      renderDataEmployee(JSON.parse(JSON.stringify(arrEmployee)));
      setLoadingPape(false);
    })()
  },[])

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
      <Row className="flex flex-wrap justify-between items-center px-0 pt-5">
        <div className="flex justify-center items-center">
          <span className="text-2xl font-semibold leading-[21px]">Giám sát thời gian thực</span>
        </div>
        <div className="flex">
          <Button onClick={handlerShowHistoryForAnyOne}>Xem dữ liệu lịch sử</Button>
        </div>
      </Row>
      <Row style={{ marginTop: "20px" }} gutter={5}>
        <Col span={12} className="card-container">
          <div style={{display: 'block', width: '100%'}}>
            <Row gutter={10} style={{width: '100%'}}>
              <Col span={12} className="card-container">
                <WrapperCard>
                  <div className="wrap-card-container">
                    <div className="flex items-center">
                      <div className="flex items-center justify-center" style={{width:'56px', height: '56px', backgroundColor: '#22C55E1F', gap: '8px', borderRadius: '15px'}}>
                        <div style={{width: '44px', height: '44px', backgroundSize: 'Cover'}} className='icon_user_online'></div>
                      </div>
                      <div style={{marginLeft: '10px'}}>
                        <div className='title_card'>Số nhân viên online</div>
                        <div className='content_card'>{summaryOnlineAndOffline.so_nv_online}</div>
                      </div>
                    </div>
                  </div>
                </WrapperCard>
              </Col>
              <Col span={12} className="card-container">
                <WrapperCard>
                  <div className="wrap-card-container">
                  <div className="flex items-center">
                      <div className="flex items-center justify-center" style={{width:'56px', height: '56px', backgroundColor: '#FF56301F', gap: '8px', borderRadius: '15px',}}>
                        <div style={{width: '44px', height: '44px', backgroundSize: 'Cover'}} className='icon_user_offline'></div>
                      </div>
                      <div style={{marginLeft: '10px'}}>
                        <div className='title_card'>Số nhân viên offline</div>
                        <div className='content_card'>{summaryOnlineAndOffline.so_nv_offline}</div>
                      </div>
                    </div>
                  </div>
                </WrapperCard>
              </Col>
            </Row>
            <Row gutter={10} style={{width: '100%', marginTop: '13px'}}>
              <Col span={8} className="card-container">
                <WrapperCard>
                  <div className="wrap-card-container">
                    <div className="flex items-center">
                      <div className="flex items-center justify-center" style={{width:'56px', height: '56px', backgroundColor: '#00B8D91F', gap: '8px', borderRadius: '15px'}}>
                        <div style={{width: '44px', height: '44px', backgroundSize: 'Cover'}} className='icon_visiting'></div>
                      </div>
                      <div style={{marginLeft: '10px'}}>
                        <div className='title_card'>Tổng lượt viếng thăm</div>
                        <div className='content_card'>{summaryOver.luot_vt}</div>
                      </div>
                    </div>
                  </div>
                </WrapperCard>
              </Col>
              <Col span={8} className="card-container">
                <WrapperCard>
                  <div className="wrap-card-container">
                  <div className="flex items-center">
                      <div className="flex items-center justify-center" style={{width:'56px', height: '56px', backgroundColor: '#FFAB001F', gap: '8px', borderRadius: '15px'}}>
                        <div style={{width: '44px', height: '48px', backgroundSize: 'Cover'}} className='icon_boxing'></div>
                      </div>
                      <div style={{marginLeft: '10px'}}>
                        <div className='title_card'>Tổng đơn hàng</div>
                        <div className='content_card'>{summaryOver.don_hang}</div>
                      </div>
                    </div>
                  </div>
                </WrapperCard>
              </Col>
              <Col span={8} className="card-container">
                <WrapperCard>
                  <div className="wrap-card-container">
                    <div className="flex items-center">
                      <div className="flex items-center justify-center" style={{width:'56px', height: '56px', backgroundColor: '#1877F21F', gap: '8px', borderRadius: '15px'}}>
                        <div style={{width: '44px', height: '44px', backgroundSize: 'Cover'}} className='icon_money'></div>
                      </div>
                      <div style={{marginLeft: '10px'}}>
                        <div className='title_card'>Tổng doanh số</div>
                        <div className='content_card'>{formatUnitNumber(summaryOver.doanh_so)}</div>
                      </div>
                    </div>
                  </div>
                </WrapperCard>
              </Col>
            </Row>
            <Row gutter={10} style={{width: '100%', marginTop: '13px'}}>
              <Col span={12} className="card-container">
                <WrapperCard>
                  <div className="wrap-card-container">
                    <div style={{fontWeight: 500, fontSize: '14px',lineHeight: '28px'}}>Quãng đường di chuyển của nhân viên</div>
                    <div style={{height: 210, overflow: 'auto'}}>
                    <List
                      itemLayout="horizontal"
                      dataSource={dataTopDistanceEmployee}
                      renderItem={(item, index) => (
                        <List.Item>
                          <div className="flex items-center justify-between" style={{width: '100%'}}>
                            <div className="flex items-center">
                              <div className="flex items-center justify-center" style={{width: '24px', height: '24px'}}>
                                {index == 0 && (
                                  <div style={{width: '24px', height: '24px', backgroundSize: 'Cover'}} className='icon_first'></div>
                                )}
                                {index == 1 && (
                                  <div style={{width: '24px', height: '24px', backgroundSize: 'Cover'}} className='icon_second'></div>
                                )}
                                {index == 2 && (
                                  <div style={{width: '24px', height: '24px', backgroundSize: 'Cover'}} className='icon_third'></div>
                                )}
                              </div>
                              <div className="mx-3">{item.stt}</div>
                              <div className="flex items-center justify-center" style={{height: '42px', width: '42px', borderRadius: '12px'}}>
                                {item.pic_profile != null? (
                                  <div style={{width: '42px', height: '42px', backgroundImage: `url("${item.pic_profile}")`, backgroundSize: 'Cover'}}></div>
                                ): (
                                  <div style={{width: '42px', height: '42px', backgroundSize: 'Cover'}} className='icon_user_default'></div>
                                )}
                                
                              </div>
                              <div className="mx-3" style={{cursor: 'pointer'}} onClick={() => handleShowHistoryEmployee(item)}>
                                  <div style={{fontWeight: 500, fontSize: '14px', lineHeight: '21px'}}>{item.emp_name}</div>
                                  {item.emp_id != null && (
                                    <div style={{marginTop: '5px', fontWeight: 400, fontSize: '12px', lineHeight: '21px'}}>ID: {item.emp_id}</div>
                                  )}
                              </div>
                            </div>
                            <div style={{marginRight: '10px', fontWeight: 500, fontSize: '14px', lineHeight: '22px', color: '#1877F2'}}>
                              {item.distance}
                            </div>
                          </div>
                        </List.Item>
                      )}
                    />
                    </div>
                    
                  </div>
                </WrapperCard>
              </Col>
              <Col span={12} className="card-container">
                <WrapperCard>
                  <div className="wrap-card-container">
                    <div style={{fontWeight: 500, fontSize: '14px',lineHeight: '28px'}}>Danh sách nhân viên</div>
                    <div style={{height: 210, overflow: 'auto'}}>
                    <List
                      itemLayout="horizontal"
                      dataSource={dataEmployee}
                      renderItem={(item) => (
                        <List.Item>
                          <div className="flex items-center justify-between" style={{width: '100%'}}>
                            <div className="flex items-center" style={{width: '70%'}}>
                              <div className="flex items-center justify-center" style={{height: '48px', width: '48px', borderRadius: '12px'}}>
                                {item.pic_profile != null? (
                                  <div style={{width: '48px', height: '48px', backgroundImage: `url("${item.pic_profile}")`, backgroundSize: 'Cover'}}></div>
                                ):(
                                  <div style={{width: '48px', height: '48px', backgroundSize: 'Cover'}} className='icon_user_default'></div>
                                )}
                                
                              </div>
                              <div className="mx-3" style={{cursor: 'pointer'}} onClick={() => handleShowHistoryEmployee(item)}>
                                <div style={{fontWeight: 500, fontSize: '14px', lineHeight: '21px'}}>{item.emp_name}</div>
                                <div style={{marginTop: '5px', fontWeight: 400, fontSize: '12px', lineHeight: '21px'}}>ID: {item.emp_id}</div>
                              </div>
                            </div>
                            <div style={{width: '30%'}} className="flex">
                              <div className="items-center mx-3 flex" style={{flexDirection: 'column'}}>
                                <div style={{fontWeight: 400, fontSize: '14px', lineHeight: '22px'}}>
                                  {item.visiting}
                                </div>
                                <div className="flex items-center justify-center" style={{width: '20px', height: '20px'}}>
                                  <div style={{width: '14px', height: '17px', backgroundSize: 'Cover'}} className='icon_visiting'></div>
                                </div>
                              </div>
                              <div className="items-center mx-3 flex" style={{flexDirection: 'column'}}>
                                <div style={{fontWeight: 400, fontSize: '14px', lineHeight: '22px'}}>
                                  {item.boxing}
                                </div>
                                <div className="flex items-center justify-center" style={{width: '20px', height: '20px'}}>
                                  <div style={{width: '16px', height: '17px', backgroundSize: 'Cover'}} className='icon_boxing'></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </List.Item>
                      )}
                    />
                    </div>
                    
                  </div>
                </WrapperCard>
              </Col>
            </Row>
            <Row gutter={10} style={{width: '100%', marginTop: '13px'}}>
            <Col span={24} className="card-container">
                <WrapperCardTable>
                    <div style={{fontWeight: 500, fontSize: '14px',lineHeight: '28px', paddingLeft: '10px', paddingBottom: '10px', paddingTop: '10px'}}>Thống kê thời gian di chuyển, thời gian dừng, thời gian viếng thăm của nhân viên</div>
                    <TableCustom style={{height:'100%'}}  pagination={false} scroll={{ y: 350 }}
                      columns={columnsCheckingEmployee}
                      dataSource={dataCheckingEmployee}
                      
                    />
                </WrapperCardTable>
              </Col>
            </Row>
          </div>
        </Col>
        <Col span={12} className="card-container">
          <WrapperCardMap>
            <div style={{height: '100%'}}>
              {options.projectId && <RealtimeMap options={options} onClickPopup={handlerShowHistory} status={handleSummaryOnlienAndOffline}/>}
            </div>
          </WrapperCardMap>
        </Col>
      </Row>
    </>
  );
}