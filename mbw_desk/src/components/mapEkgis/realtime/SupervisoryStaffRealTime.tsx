import { Button, Row, Col, List } from 'antd';
import { FilterOutlined } from '@ant-design/icons';
import "./SupervisoryStaffRealTime.css";
import {TableCustom,RealtimeMap,WrapperCard, WrapperCardTable, WrapperCardMap} from "@/components";
import { useEffect, useState } from 'react';
import { AxiosService } from '../../../services/server';
import { use } from 'i18next';

export default function SupervisoryStaffRealTime() {

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
    })

    useEffect(()=>{
      initDataSummaryOver();
    })
  
    const initDataSummaryOver = async () => {
      console.log("call service");
      const rs = await AxiosService.get(`/mbw_dms.api.report.real_time_monitoring_report`);
      console.log(rs);
    }

  // data di chuyển nhân viên
  const dataDistanceEmployee = [
    {
      'stt': 1,
      'pic_profile': "/user_demo/user_1.png",
      'emp_name': "Khánh Hoàn",
      'emp_id': "1234-4455",
      'distance': "10km"
    },{
      'stt': 2,
      'pic_profile': "/user_demo/user_2.png",
      'emp_name': "Tường Vân",
      'emp_id': "1234-4455",
      'distance': "8km"
    },{
      'stt': 3,
      'pic_profile': "/user_demo/user_3.png",
      'emp_name': "Nghiêm Ngọc Trâm",
      'emp_id': "1234-4455",
      'distance': "7km"
    },{
      'stt': 4,
      'pic_profile': "/user_demo/user_4.png",
      'emp_name': "Đinh Thùy Linh",
      'emp_id': "1234-4455",
      'distance': "4km"
    },{
      'stt': 5,
      'pic_profile': "/user_demo/user_5.png",
      'emp_name': "Hà Nguyễn",
      'emp_id': "1234-4455",
      'distance': "2km"
    }
  ]

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

  //data checkin
  const dataCheckingEmployee = [
    {
      'stt': 1,
      'pic_profile': "/user_demo/user_1.png",
      'emp_name': "Khánh Hoàn",
      'emp_id': "1234-4455",
      'moving': "60 phút",
      'stopping': "10 phút",
      'visiting': "10 phút"
    },{
      'stt': 2,
      'pic_profile': "/user_demo/user_2.png",
      'emp_name': "Tường Vân",
      'emp_id': "1234-4455",
      'moving': "60 phút",
      'stopping': "10 phút",
      'visiting': "10 phút"
    },{
      'stt': 3,
      'pic_profile': "/user_demo/user_3.png",
      'emp_name': "Nghiêm Ngọc Trâm",
      'emp_id': "1234-4455",
      'moving': "60 phút",
      'stopping': "10 phút",
      'visiting': "10 phút"
    },{
      'stt': 4,
      'pic_profile': "/user_demo/user_4.png",
      'emp_name': "Đinh Thùy Linh",
      'emp_id': "1234-4455",
      'moving': "60 phút",
      'stopping': "10 phút",
      'visiting': "10 phút"
    },{
      'stt': 5,
      'pic_profile': "/user_demo/user_5.png",
      'emp_name': "Hà Nguyễn",
      'emp_id': "1234-4455",
      'moving': "60 phút",
      'stopping': "10 phút",
      'visiting': "10 phút"
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
                  <div style={{marginTop: '5px', fontWeight: 400, fontSize: '12px', lineHeight: '21px'}}>ID: {record.emp_id}</div>
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
    projectId: '6556e471178a1db24ac1a711'
  })

  useEffect(() => {
    // (async() => {
    //   const rs = await AxiosService.get('/api/method/mbw_dms.api.user.get_projectID')
    //   setOptions(prev => ({
    //     ...prev,
    //     projectId: rs.result[ "Project ID"]
    //   }))
    // })()
  },[])
  return (
    <>
      <Row className="flex flex-wrap justify-between items-center px-0 pt-5">
        <div className="flex justify-center items-center">
          <span className="text-2xl font-semibold leading-[21px]">Giám sát thời gian thực</span>
        </div>
        <div className="flex mb-2">
          <Button icon={<FilterOutlined />}>Bộ lọc</Button>
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
                        <div style={{width: '44px', height: '44px', backgroundImage: 'url("/user_online.png")', backgroundSize: 'Cover'}}></div>
                      </div>
                      <div style={{marginLeft: '10px'}}>
                        <div style={{fontSize: '14px',fontWeight: 500, lineHeight: '17px', color: '#212B36'}}>Số nhân viên online</div>
                        <div style={{fontWeight: 600, fontSize: '20px', lineHeight: '24px', color: '#22C55E', marginTop: '10px'}}>10</div>
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
                        <div style={{width: '44px', height: '44px', backgroundImage: 'url("/user_offline.png")', backgroundSize: 'Cover'}}></div>
                      </div>
                      <div style={{marginLeft: '10px'}}>
                        <div style={{fontSize: '14px',fontWeight: 500, lineHeight: '17px', color: '#212B36'}}>Số nhân viên offline</div>
                        <div style={{fontWeight: 600, fontSize: '20px', lineHeight: '24px', color: '#FF5630', marginTop: '10px'}}>10</div>
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
                        <div style={{width: '44px', height: '44px', backgroundImage: 'url("/visiting.png")', backgroundSize: 'Cover'}}></div>
                      </div>
                      <div style={{marginLeft: '10px'}}>
                        <div style={{fontSize: '14px',fontWeight: 500, lineHeight: '17px', color: '#212B36'}}>Tổng lượt viếng thăm</div>
                        <div style={{fontWeight: 600, fontSize: '20px', lineHeight: '24px', color: '#212B36', marginTop: '10px'}}>20</div>
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
                        <div style={{width: '44px', height: '48px', backgroundImage: 'url("/boxing.png")', backgroundSize: 'Cover'}}></div>
                      </div>
                      <div style={{marginLeft: '10px'}}>
                        <div style={{fontSize: '14px',fontWeight: 500, lineHeight: '17px', color: '#212B36'}}>Tổng đơn hàng</div>
                        <div style={{fontWeight: 600, fontSize: '20px', lineHeight: '24px', color: '#212B36', marginTop: '10px'}}>10</div>
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
                        <div style={{width: '44px', height: '44px', backgroundImage: 'url("/money.png")', backgroundSize: 'Cover'}}></div>
                      </div>
                      <div style={{marginLeft: '10px'}}>
                        <div style={{fontSize: '14px',fontWeight: 500, lineHeight: '17px', color: '#212B36'}}>Tổng doanh số</div>
                        <div style={{fontWeight: 600, fontSize: '20px', lineHeight: '24px', color: '#212B36', marginTop: '10px'}}>200.000.000</div>
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
                      dataSource={dataDistanceEmployee}
                      renderItem={(item, index) => (
                        <List.Item>
                          <div className="flex items-center justify-between" style={{width: '100%'}}>
                            <div className="flex items-center">
                              <div className="flex items-center justify-center" style={{width: '24px', height: '24px'}}>
                                {index == 0 && (
                                  <div style={{width: '24px', height: '24px', backgroundImage: 'url("/first.png")', backgroundSize: 'Cover'}}></div>
                                )}
                                {index == 1 && (
                                  <div style={{width: '24px', height: '24px', backgroundImage: 'url("/second.png")', backgroundSize: 'Cover'}}></div>
                                )}
                                {index == 2 && (
                                  <div style={{width: '24px', height: '24px', backgroundImage: 'url("/third.png")', backgroundSize: 'Cover'}}></div>
                                )}
                              </div>
                              <div className="mx-3">{item.stt}</div>
                              <div className="flex items-center justify-center" style={{height: '48px', width: '48px', borderRadius: '12px'}}>
                                <div style={{width: '48px', height: '48px', backgroundImage: `url("${item.pic_profile}")`, backgroundSize: 'Cover'}}></div>
                              </div>
                              <div className="mx-3">
                                <div style={{fontWeight: 500, fontSize: '14px', lineHeight: '21px'}}>{item.emp_name}</div>
                                <div style={{marginTop: '5px', fontWeight: 400, fontSize: '12px', lineHeight: '21px'}}>ID: {item.emp_id}</div>
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
                                  <div style={{width: '14px', height: '17px', backgroundImage: 'url("/visiting.png")', backgroundSize: 'Cover'}}></div>
                                </div>
                              </div>
                              <div className="items-center mx-3 flex" style={{flexDirection: 'column'}}>
                                <div style={{fontWeight: 400, fontSize: '14px', lineHeight: '22px'}}>
                                  {item.boxing}
                                </div>
                                <div className="flex items-center justify-center" style={{width: '20px', height: '20px'}}>
                                  <div style={{width: '16px', height: '17px', backgroundImage: 'url("/boxing.png")', backgroundSize: 'Cover'}}></div>
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
                    <TableCustom style={{height:'100%'}}  pagination={false}
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
              {options.projectId && <RealtimeMap options={options} />}
            
            </div>
          </WrapperCardMap>
        </Col>
      </Row>
    </>
  );
}