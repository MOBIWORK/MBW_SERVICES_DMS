import { Row, Col, List } from 'antd';
import "./SupervisoryStaffRealTime.css";
import {TableCustom,RealtimeMap,WrapperCard, WrapperCardTable, WrapperCardMap} from "@/components";
import { useEffect, useState } from 'react';
import { AxiosService } from '@/services/server';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export default function SupervisoryStaffRealTime() {
  const navigate = useNavigate();
  const [summaryOver, setSummaryOver] = useState<
    {
      so_nv_online: number | 0,
      so_nv_offline: number | 0,
      luot_vt: number | 0,
      don_hang: number | 0,
      doanh_so: number | 0,
    }>({
      so_nv_online: 0,
      so_nv_offline: 0,
      luot_vt: 0,
      don_hang: 0,
      doanh_so: 0,
    });
    const [dataTopDistanceEmployee, setDataTopDistanceEmployee] = useState<any[]>([]);
    const [dataEmployee, setDataEmployee] = useState<any[]>([]);
    const [dataCheckingEmployee, setDataCheckingEmployee] = useState<any[]>([]);

    useEffect(()=>{
      initDataSummaryOver();
    })
  
    const initDataSummaryOver = async () => {
      const rs = await AxiosService.get(`/api/method/mbw_dms.api.report.real_time_monitoring_report`);
      if(rs.message == "Thành công"){
        setSummaryOver(rs.result);
      }
    }

  // data nhân viên
  const dataEmployees = [
    {
      'stt': 1,
      'pic_profile': "/user_demo/user_1.png",
      'emp_name': "Khánh Hoàn",
      'emp_id': "1234-4455",
      'visiting': "10/10",
      'boxing': 2
    },{
      'stt': 2,
      'pic_profile': "/user_demo/user_2.png",
      'emp_name': "Tường Vân",
      'emp_id': "1234-4455",
      'visiting': "8/10",
      'boxing': 1
    },{
      'stt': 3,
      'pic_profile': "/user_demo/user_3.png",
      'emp_name': "Nghiêm Ngọc Trâm",
      'emp_id': "1234-4455",
      'visiting': "2/10",
      'boxing': 0
    },{
      'stt': 4,
      'pic_profile': "/user_demo/user_4.png",
      'emp_name': "Đinh Thùy Linh",
      'emp_id': "1234-4455",
      'visiting': "7/14",
      'boxing': 3
    },{
      'stt': 5,
      'pic_profile': "/user_demo/user_5.png",
      'emp_name': "Hà Nguyễn",
      'emp_id': "1234-4455",
      'visiting': "8/16",
      'boxing': 6
    }
  ]
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
                  <div style={{width: '48px', height: '48px', backgroundImage: `url("${record.pic_profile}")`, backgroundSize: 'Cover'}}></div>
                </div>
                <div className="mx-3">
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
    navigate(`/employee-monitor-detail/${evt}`);

  }
  const renderDataMoveTopEmployee = (arrSummary) => {
    let arrDataSort = arrSummary.sort((a, b) => b.summary.move.distance - a.summary.move.distance);
    let dataMoveTopEmployee = [];
    for(let i = 0; i < arrDataSort.length; i++){
      if(i == 5) break;
      dataMoveTopEmployee.push({
        'stt': i+1,
        'pic_profile': "/public/user_default.png",
        'emp_name': arrDataSort[i].object.name,
        'emp_id': arrDataSort[i].object.empl_id,
        'distance': formatDistance(arrDataSort[i].summary.move.distance)
      })
    }
    setDataTopDistanceEmployee(dataMoveTopEmployee);
  }
  const renderDataEmployee = async () => {
    let dateNow = new Date();
    let timeStamp = dateNow.getTime()/1000;
    let res = await AxiosService(`/api/method/mbw_dms.api.user.get_list_top_employee?from_date=${timeStamp}&to_date=${timeStamp}`);
    let arrEmployee = [];
    if(res.message == "Thành công"){
      for(let i = 0; i < res.result.length; i++){
        let item = res.result[i];
        arrEmployee.push({
          's1tt': i+1,
          'pic_profile': item.employee_avatar != null && item.employee_avatar != ""? item.employee_avatar : "/public/user_default.png",
          'emp_name': item.employee_name,
          'emp_id': "1234-4455",
          'visiting': "10/10",
          'boxing': 2
        })
      }
    }
    
    console.log(res);
  }
  const renderDataCheckingEmployee = (arrSummary) => {
    let dataCheckingEmployee = [];
    for(let i = 0; i < arrSummary.length; i++){
      dataCheckingEmployee.push({
        'stt': i+1,
        'pic_profile': "/public/user_default.png",
        'emp_name': arrSummary[i].object.name,
        'emp_id': arrSummary[i].object.empl_id,
        'moving': formatTime(arrSummary[i].summary.move.totalTime),
        'stopping': formatTime(arrSummary[i].summary.stop.totalTime),
        'visiting': formatTime(arrSummary[i].summary.checkin.totalTime)
      })
    }
    setDataCheckingEmployee(dataCheckingEmployee);
  }

  useEffect(() => {
    (async() => {
      const rs = await AxiosService.get('/api/method/mbw_dms.api.user.get_projectID');
      console.log(rs);
      setOptions(prev => ({
        ...prev,
        projectId: rs.result[ "Project ID"]
      }))
      let urlSummary = `https://api.ekgis.vn/v2/tracking/locationHistory/summary/lastest/${rs.result[ "Project ID"]}/null?api_key=${options.apiKey}`;
      let res = await axios.get(urlSummary);
      if(res.statusText == "OK"){
        let arrSummary = res["data"].results;
        console.log(arrSummary);
        renderDataMoveTopEmployee(arrSummary);
        renderDataCheckingEmployee(arrSummary);
      }
      renderDataEmployee();
    })()
  },[])

  return (
    <>
      <Row className="flex flex-wrap justify-between items-center px-0 pt-5">
        <div className="flex justify-center items-center">
          <span className="text-2xl font-semibold leading-[21px]">Giám sát thời gian thực</span>
        </div>
        {/* <div className="flex mb-2">
          <Button icon={<FilterOutlined />}>Bộ lọc</Button>
        </div> */}
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
                        <div className='content_card'>{summaryOver.so_nv_online}</div>
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
                        <div className='content_card'>{summaryOver.so_nv_offline}</div>
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
                                <div style={{width: '42px', height: '42px', backgroundImage: `url("${item.pic_profile}")`, backgroundSize: 'Cover'}}></div>
                              </div>
                              <div className="mx-3">
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
                </WrapperCard>
              </Col>
              <Col span={12} className="card-container">
                <WrapperCard>
                  <div className="wrap-card-container">
                    <div style={{fontWeight: 500, fontSize: '14px',lineHeight: '28px'}}>Danh sách nhân viên</div>
                    <List
                      itemLayout="horizontal"
                      dataSource={dataEmployees}
                      renderItem={(item) => (
                        <List.Item>
                          <div className="flex items-center justify-between" style={{width: '100%'}}>
                            <div className="flex items-center" style={{width: '70%'}}>
                              <div className="mx-3">{item.stt}</div>
                              <div className="flex items-center justify-center" style={{height: '48px', width: '48px', borderRadius: '12px'}}>
                                <div style={{width: '48px', height: '48px', backgroundImage: `url("${item.pic_profile}")`, backgroundSize: 'Cover'}}></div>
                              </div>
                              <div className="mx-3">
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
              {options.projectId && <RealtimeMap options={options} onClickPopup={handlerShowHistory} />}
            
            </div>
          </WrapperCardMap>
        </Col>
      </Row>
    </>
  );
}