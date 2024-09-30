import { Row, Col, List, Spin } from "antd";
import "./SupervisoryStaffRealTime.css";
import {
  TableCustom,
  RealtimeMap,
  WrapperCard,
  WrapperCardTable,
  WrapperCardMap,
} from "@/components";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { AxiosService } from "@/services/server";
import axios from "axios";
import type { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import { employeeMoveType, employeeType, optionsType, RootObject, summaryMoveType } from "./types";
import { renderColumnsCheckingEmployee } from "./data";
import { GlobalContext } from "@/App";
import DepartmentSelect from './Department'
export default function SupervisoryStaffRealTime() {
  const navigate = useNavigate();
  const { errorMsg } = useContext(GlobalContext);
  const [teamSale,setTeamSale] = useState<string>("")
  const [summaryOver, setSummaryOver] = useState<{
    luot_vt: number | 0;
    don_hang: number | 0;
    doanh_so: number | 0;
  }>({
    luot_vt: 0,
    don_hang: 0,
    doanh_so: 0,
  });
  const [summaryOnlineAndOffline, setSummaryOnlineAndOffline] = useState<{
    so_nv_online: number;
    so_nv_offline: number;
  }>({
    so_nv_online: 0,
    so_nv_offline: 0,
  });
  const [dataTopDistanceEmployee, setDataTopDistanceEmployee] = useState<any[]>(
    []
  );
  const [dataEmployee, setDataEmployee] = useState<any[]>([]);
  const [dataCheckingEmployee, setDataCheckingEmployee] = useState<any[]>([]);
  const [loadingPage, setLoadingPape] = useState<boolean>(true);

  /**lấy dữ liệu tổng quan lượt viếng thăm, doanh số, đơn hàng */
  const initDataSummaryOver = async () => {
    const rs = await AxiosService.get(
      `/api/method/mbw_dms.api.report.real_time_monitoring_report`
    );
    if (rs.message == "Thành công") {
      setSummaryOver(rs.result);
    }
  };

  /** Số nhân viên onl/off */
  const handleSummaryOnlienAndOffline = (res: {
    online: number;
    offline: number;
  }) => {
    setSummaryOnlineAndOffline({
      so_nv_online: res.online,
      so_nv_offline: res.offline,
    });
  };

  // option hiển thị map
  const [options, setOptions] = useState<optionsType>({
    apiKey: import.meta.env.VITE_API_KEY,
    projectId: "",
  });

  /**format */
  const formatUnitNumber = (num: number) => {
    return num.toLocaleString("en-US").replace(/,/g, ".");
  };

  const formatDistance = (distance: number) => {
    if (distance < 1000) return `${Math.round(distance)} m`;
    return `${Math.round(distance / 1000)} km`;
  };
  const formatTime = (time: number) => {
    if (time < 60) return `${Math.round(time)} giây`;
    else if (time >= 60 && time < 3600) return `${Math.round(time / 60)} phút`;
    return `${Math.round(time / 3600)} giờ`;
  };
  /**end format */
  const handlerShowHistory = (evt: any) => {
    navigate(`/employee-monitor-detail/${evt["_id"]}`);
  };

  // điều hướng qua lịch sử di chuyển
  const handleShowHistoryEmployee = React.useCallback((employee: any) => {
    if (employee.objectId != null)
      navigate(`/employee-monitor-detail/${employee.objectId}`);
    else errorMsg(`Kiểm tra dữ liệu nhân viên bán hàng: ${employee.emp_name} `)
  },[]) ;

  //handle hiển thị realtime sumary nhân viên{đang xử lý}
  const handleUpdateData = useCallback(async(realtimeEmployee:{ online: number, offline: number }) => {
    console.log("10s chạy",options);
    
    

    /** bắt đầu xử lý hiển thị nhân viên  */
    const objectIds = options.objectId
    const arrEmployee = options.employees
     /* chỉnh lại dịch vụ đi tuyến của thằng này */
     let urlSummary = `https://api.ekgis.vn/v2/tracking/locationHistory/summary/lastest/${options.projectId}/${objectIds}?api_key=${options.apiKey}`;
     /** trả về mảng [
             {
               object: {id: "objectId",name: ""},
               summary: {
                 "move": {
                   "count": 4,
                   "totalTime": 2226,
                   "distance": 6633.500000000001
                 },
                 "stop": {
                   "count": 3,
                   "totalTime": 53620
                 },
                 "checkin": {
                   "count": 0,
                   "totalTime": 0
                 }
               } 
             }
             ] */
     let res: AxiosResponse<{ results: summaryMoveType }> = await axios.get(
       urlSummary
     );
     // if (import.meta.env.VITE_BASE_URL) {
     //   res = res.data;
     // }
     if (res.data?.results.length > 0) {
       let arrSummary = res.data?.results;
       renderDataEmployeeSummary(
         arrSummary,
         JSON.parse(JSON.stringify(arrEmployee))
       );
     }
     renderDataEmployee(JSON.parse(JSON.stringify(arrEmployee)));

     handleSummaryOnlienAndOffline(realtimeEmployee)
     initDataSummaryOver();
  },[options])



  // render top 5 nhân viên có nhiều SO
  const renderDataEmployee = async (arrEmployeeInput: any[]) => {
    let dateNow = new Date();
    let timeStamp = dateNow.getTime() / 1000;
    let res = await AxiosService(
      `/api/method/mbw_dms.api.user.get_list_top_employee?from_date=${timeStamp}&to_date=${timeStamp}`
    );
    let arrEmployee = [];
    if (res.message == "Thành công") {
      arrEmployee = res.result;
    }
    //tích hợp thông tin lượt vt, phải vt, đơn hàng vào ds nhân viên
    arrEmployeeInput = arrEmployeeInput
      .map((employeeInput: any) => {
        employeeInput = {
          ...employeeInput,
          today_visit: 0,
          must_visit: 0,
          sales_order: 0,
        };
        arrEmployee.forEach(
          (employee: {
            name: string;
            total_visit: number;
            must_visit: number;
            sales_order: number;
            employee: string;
          }) => {
            if (employeeInput.name == employee.employee) {
              employeeInput = {
                ...employeeInput,
                today_visit: employee.total_visit || 0,
                must_visit: employee.must_visit || 0,
                sales_order: employee.sales_order || 0,
              };
            }
          }
        );
        return employeeInput;
      })
      .sort((a, b) => {
        return b.sales_order - a.sales_order;
      })
      .slice(0, 5);
    let arrEmployeeOut = arrEmployeeInput.map(
      (employeeInput: any, index: number) => ({
        ...employeeInput,
        s1tt: index + 1,
        pic_profile:
          employeeInput.avatar != null && employeeInput.avatar != ""
            ? employeeInput.avatar
            : null,
        emp_name: employeeInput.employee_name,
        emp_id: employeeInput.name,
        visiting: `${employeeInput.today_visit}/${employeeInput.must_visit}`,
        boxing: employeeInput.sales_order,
        objectId: employeeInput.object_id,
      })
    );
    // danh sách nhân viên
    setDataEmployee(arrEmployeeOut);
  };

  // tổng hợp thời gian/quãng đường di chuyển theo nhân viên
  const renderDataEmployeeSummary = (
    arrSummary: summaryMoveType,
    arrEmployee: employeeMoveType[]
  ) => {
    console.log({arrSummary,arrEmployee});
    
    // thêm summary vào nhân viên
    arrEmployee = arrEmployee.map((employee: employeeMoveType) => {
      employee.summary = undefined;
      let summary = arrSummary.find(
        (summary: RootObject) =>
          employee.object_id != null &&
          employee.object_id == summary.object["_id"]
      );
      if (summary) employee.summary = summary.summary;

      return employee;
    });



    let dataCheckingEmployee = arrEmployee.map(
      (employee: employeeMoveType, i: number) => ({
        stt: i + 1,
        pic_profile: employee.avatar != null ? employee.avatar : null,
        emp_name: employee.employee_name,
        emp_id: employee.name,
        moving:
          employee.summary != null && employee.summary.move != null
            ? formatTime(employee.summary.move.totalTime)
            : formatTime(0),
        stopping:
          employee.summary != null && employee.summary.stop != null
            ? formatTime(employee.summary.stop.totalTime)
            : formatTime(0),
        visiting:
          employee.summary != null && employee.summary.checkin != null
            ? formatTime(employee.summary.checkin.totalTime)
            : formatTime(0),
        objectId: employee.object_id,
      })
    );
    // thống kê thời gian di chuyển, thời gian dừng, vt của nhân viên
    setDataCheckingEmployee(dataCheckingEmployee);
    
   const dataDistance = arrEmployee.filter((emp:employeeMoveType) => {
    // console.log("length summary",Object.keys(emp.summary).length);
    if(!emp.summary) return 0
    else {
      return Object.keys(emp.summary).length
    }
   }).sort((emp1:employeeMoveType,emp2:employeeMoveType) => {


    if (emp1.summary?.moves && emp2.summary?.moves) {
      return emp1.summary?.moves.distance - emp2.summary?.moves.distance
    }
    return 1
   } ).slice(0,5)
      

    let dataMoveTopEmployee = dataDistance.map(
      (employee: employeeMoveType, i: number) => ({
        stt: i + 1,
        pic_profile: employee.avatar != null ? employee.avatar : null,
        emp_name: employee.employee_name,
        emp_id: employee.name,
        distance:
          employee.summary != null && employee.summary.moves != null
            ? formatDistance(employee.summary.moves.distance)
            : formatDistance(0),
        objectId: employee.object_id,
      })
    )
    // quãng đường di chuyển của nhân viên
    setDataTopDistanceEmployee(dataMoveTopEmployee);
  };
  // query thông tin projectId,key bản đồ , danh sách nhân viên
  useEffect(() => {
    (async () => {
      try {
        setLoadingPape(true);
        /** Lấy project id và các object id thuộc công ty quản lý => chưa làm */
        const rs = AxiosService.get(
          "/api/method/mbw_dms.api.user.get_projectID",
          {
            params: {
              teamSale
            }
          }
        );
        
        const resApikey = AxiosService.get(
          "/api/method/mbw_dms.api.vgm.map_customer.get_config_api"
        );
         // lấy ds nhân viên bán hàng-sales person
         let responseEmployees = AxiosService.get(
          "/api/method/mbw_dms.api.user.get_list_employees",
          {
            params: {
              teamSale
            }
          }
        );
        
        const [rsPj,res_apikey,responseAllEmployee]  = await Promise.all([rs,resApikey,responseEmployees])
        
        const options:optionsType = {
          apiKey: res_apikey.result,
          projectId: rsPj.result["Project ID"],
          objectId:  rsPj.result["objectIds"],
          employees: []
        }
        // const objectIds = rsPj.result["objectIds"]
        
        let arrEmployee = [];
        if (responseAllEmployee.message == "Thành công") {
          arrEmployee = responseAllEmployee.result;
          options["employees"] =  arrEmployee
        }       
        
        setOptions((prev) => ({
          ...prev,
          ...options
        }));      
        
      } catch (error: any) {
        errorMsg(
          error?.message || error || "Something was wrong when query !!"
        );
      } finally {
        setLoadingPape(false);
      }
    })();
  }, [teamSale]);

  return (
    <>
      {/* loading screen  */}
      {loadingPage && (
        <div
          style={{
            position: "fixed",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 9999,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spin
            indicator={
              <LoadingOutlined style={{ fontSize: 30, color: "#fff" }} spin />
            }
          />
        </div>
      )}
      {/* header */}
      <Row className="flex flex-wrap justify-between items-center px-[30px] h-[48px] bg-white">
        <span className="text-2xl font-semibold leading-[21px]">
          Giám sát thời gian thực
        </span>

        <div className="flex">
          <DepartmentSelect team_sale={teamSale} setTeamSale={setTeamSale}/>
        </div>
        {/* Lịch sử di chuyển tất cả nhân viên  */}
        {/* <Button onClick={handlerShowHistoryForAnyOne}>Xem dữ liệu lịch sử</Button> */}
      </Row>
      <Row
        style={{ marginTop: "20px" }}
        gutter={[20, 20]}
        className="px-[30px] h-full overflow-y-scroll pb-20"
      >
        {/*  Thông tin chi tiết */}
        <Col className="card-container  w-full 1kr:w-1/2 order-1 1k:order-2 1kr:order-1 ">
          <div style={{ display: "block", width: "100%" }}>
            <Row gutter={[20, 20]} style={{ width: "100%" }}>
              {/* nhân viên on/off */}
              <Col span={12} className="card-container">
                <WrapperCard>
                  <div className="wrap-card-container">
                    <div className="flex items-center">
                      <div
                        className="flex items-center justify-center"
                        style={{
                          width: "56px",
                          height: "56px",
                          backgroundColor: "#22C55E1F",
                          gap: "8px",
                          borderRadius: "15px",
                        }}
                      >
                        <div
                          style={{
                            width: "44px",
                            height: "44px",
                            backgroundSize: "Cover",
                          }}
                          className="icon_user_online"
                        ></div>
                      </div>
                      <div style={{ marginLeft: "10px" }}>
                        <div className="title_card">Số nhân viên online</div>
                        <div className="content_card">
                          {summaryOnlineAndOffline.so_nv_online}
                        </div>
                      </div>
                    </div>
                  </div>
                </WrapperCard>
              </Col>
              <Col span={12} className="card-container">
                <WrapperCard>
                  <div className="wrap-card-container">
                    <div className="flex items-center">
                      <div
                        className="flex items-center justify-center"
                        style={{
                          width: "56px",
                          height: "56px",
                          backgroundColor: "#FF56301F",
                          gap: "8px",
                          borderRadius: "15px",
                        }}
                      >
                        <div
                          style={{
                            width: "44px",
                            height: "44px",
                            backgroundSize: "Cover",
                          }}
                          className="icon_user_offline"
                        ></div>
                      </div>
                      <div style={{ marginLeft: "10px" }}>
                        <div className="title_card">Số nhân viên offline</div>
                        <div className="content_card">
                          {summaryOnlineAndOffline.so_nv_offline}
                        </div>
                      </div>
                    </div>
                  </div>
                </WrapperCard>
              </Col>
              {/* chi tiết viếng thăm 1280-1440 là 100 , còn lại là 1/3*/}
              <Col className="card-container w-1/3 1kr:w-full 1_5k:w-1/3">
                <WrapperCard>
                  <div className="wrap-card-container">
                    <div className="flex items-center">
                      <div
                        className="flex items-center justify-center"
                        style={{
                          width: "56px",
                          height: "56px",
                          backgroundColor: "#00B8D91F",
                          gap: "8px",
                          borderRadius: "15px",
                        }}
                      >
                        <div
                          style={{
                            width: "44px",
                            height: "44px",
                            backgroundSize: "Cover",
                          }}
                          className="icon_visiting"
                        ></div>
                      </div>
                      <div style={{ marginLeft: "10px" }}>
                        <div className="title_card">Tổng lượt viếng thăm</div>
                        <div className="content_card">
                          {summaryOver.luot_vt}
                        </div>
                      </div>
                    </div>
                  </div>
                </WrapperCard>
              </Col>
              <Col className="card-container w-1/3 1kr:w-full 1_5k:w-1/3">
                <WrapperCard>
                  <div className="wrap-card-container">
                    <div className="flex items-center">
                      <div
                        className="flex items-center justify-center"
                        style={{
                          width: "56px",
                          height: "56px",
                          backgroundColor: "#FFAB001F",
                          gap: "8px",
                          borderRadius: "15px",
                        }}
                      >
                        <div
                          style={{
                            width: "44px",
                            height: "48px",
                            backgroundSize: "Cover",
                          }}
                          className="icon_boxing"
                        ></div>
                      </div>
                      <div style={{ marginLeft: "10px" }}>
                        <div className="title_card">Tổng đơn hàng</div>
                        <div className="content_card">
                          {summaryOver.don_hang}
                        </div>
                      </div>
                    </div>
                  </div>
                </WrapperCard>
              </Col>
              <Col className="card-container w-1/3 1kr:w-full 1_5k:w-1/3">
                <WrapperCard>
                  <div className="wrap-card-container">
                    <div className="flex items-center">
                      <div
                        className="flex items-center justify-center"
                        style={{
                          width: "56px",
                          height: "56px",
                          backgroundColor: "#1877F21F",
                          gap: "8px",
                          borderRadius: "15px",
                        }}
                      >
                        <div
                          style={{
                            width: "44px",
                            height: "44px",
                            backgroundSize: "Cover",
                          }}
                          className="icon_money"
                        ></div>
                      </div>
                      <div style={{ marginLeft: "10px" }}>
                        <div className="title_card">Tổng doanh số</div>
                        <div className="content_card">
                          {formatUnitNumber(summaryOver.doanh_so)}
                        </div>
                      </div>
                    </div>
                  </div>
                </WrapperCard>
              </Col>
              {/* Quãng đường di chuyển */}
              <Col span={12} className="card-container">
                <WrapperCard>
                  <div className="wrap-card-container">
                    <div
                      style={{
                        fontWeight: 500,
                        fontSize: "14px",
                        lineHeight: "28px",
                      }}
                    >
                      Quãng đường di chuyển của nhân viên
                    </div>
                    <div style={{ height: 210, overflow: "auto" }}>
                      <List
                        itemLayout="horizontal"
                        dataSource={dataTopDistanceEmployee}
                        renderItem={(item, index) => (
                          <List.Item>
                            <div
                              className="flex items-center justify-between"
                              style={{ width: "100%" }}
                            >
                              <div className="flex items-center">
                                <div
                                  className="flex items-center justify-center"
                                  style={{ width: "24px", height: "24px" }}
                                >
                                  {index == 0 && (
                                    <div
                                      style={{
                                        width: "24px",
                                        height: "24px",
                                        backgroundSize: "Cover",
                                      }}
                                      className="icon_first"
                                    ></div>
                                  )}
                                  {index == 1 && (
                                    <div
                                      style={{
                                        width: "24px",
                                        height: "24px",
                                        backgroundSize: "Cover",
                                      }}
                                      className="icon_second"
                                    ></div>
                                  )}
                                  {index == 2 && (
                                    <div
                                      style={{
                                        width: "24px",
                                        height: "24px",
                                        backgroundSize: "Cover",
                                      }}
                                      className="icon_third"
                                    ></div>
                                  )}
                                </div>
                                <div className="mx-3">{item.stt}</div>
                                <div
                                  className="flex items-center justify-center"
                                  style={{
                                    height: "42px",
                                    width: "42px",
                                    borderRadius: "12px",
                                  }}
                                >
                                  {item.pic_profile != null ? (
                                    <div
                                      style={{
                                        width: "42px",
                                        height: "42px",
                                        backgroundImage: `url("${item.pic_profile}")`,
                                        backgroundSize: "Cover",
                                      }}
                                    ></div>
                                  ) : (
                                    <div
                                      style={{
                                        width: "42px",
                                        height: "42px",
                                        backgroundSize: "Cover",
                                      }}
                                      className="icon_user_default"
                                    ></div>
                                  )}
                                </div>
                                <div
                                  className="mx-3"
                                  style={{ cursor: "pointer" }}
                                  onClick={() =>
                                    handleShowHistoryEmployee(item)
                                  }
                                >
                                  <div
                                    style={{
                                      fontWeight: 500,
                                      fontSize: "14px",
                                      lineHeight: "21px",
                                    }}
                                  >
                                    {item.emp_name}
                                  </div>
                                  {item.emp_id != null && (
                                    <div
                                      style={{
                                        marginTop: "5px",
                                        fontWeight: 400,
                                        fontSize: "12px",
                                        lineHeight: "21px",
                                      }}
                                    >
                                      ID: {item.emp_id}
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div
                                style={{
                                  marginRight: "10px",
                                  fontWeight: 500,
                                  fontSize: "14px",
                                  lineHeight: "22px",
                                  color: "#1877F2",
                                }}
                              >
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
                    <div
                      style={{
                        fontWeight: 500,
                        fontSize: "14px",
                        lineHeight: "28px",
                      }}
                    >
                      Danh sách nhân viên
                    </div>
                    <div style={{ height: 210, overflow: "auto" }}>
                      <List
                        itemLayout="horizontal"
                        dataSource={dataEmployee}
                        renderItem={(item) => (
                          <List.Item>
                            <div
                              className="flex items-center justify-between"
                              style={{ width: "100%" }}
                            >
                              <div
                                className="flex items-center"
                                style={{ width: "70%" }}
                              >
                                <div
                                  className="flex items-center justify-center"
                                  style={{
                                    height: "48px",
                                    width: "48px",
                                    borderRadius: "12px",
                                  }}
                                >
                                  {item.pic_profile != null ? (
                                    <div
                                      style={{
                                        width: "48px",
                                        height: "48px",
                                        backgroundImage: `url("${item.pic_profile}")`,
                                        backgroundSize: "Cover",
                                      }}
                                    ></div>
                                  ) : (
                                    <div
                                      style={{
                                        width: "48px",
                                        height: "48px",
                                        backgroundSize: "Cover",
                                      }}
                                      className="icon_user_default"
                                    ></div>
                                  )}
                                </div>
                                <div
                                  className="mx-3"
                                  style={{ cursor: "pointer" }}
                                  onClick={() =>
                                    handleShowHistoryEmployee(item)
                                  }
                                >
                                  <div
                                    style={{
                                      fontWeight: 500,
                                      fontSize: "14px",
                                      lineHeight: "21px",
                                    }}
                                  >
                                    {item.emp_name}
                                  </div>
                                  <div
                                    style={{
                                      marginTop: "5px",
                                      fontWeight: 400,
                                      fontSize: "12px",
                                      lineHeight: "21px",
                                    }}
                                  >
                                    ID: {item.emp_id}
                                  </div>
                                </div>
                              </div>
                              <div style={{ width: "30%" }} className="flex">
                                <div
                                  className="items-center mx-3 flex"
                                  style={{ flexDirection: "column" }}
                                >
                                  <div
                                    style={{
                                      fontWeight: 400,
                                      fontSize: "14px",
                                      lineHeight: "22px",
                                    }}
                                  >
                                    {item.visiting}
                                  </div>
                                  <div
                                    className="flex items-center justify-center"
                                    style={{ width: "20px", height: "20px" }}
                                  >
                                    <div
                                      style={{
                                        width: "14px",
                                        height: "17px",
                                        backgroundSize: "Cover",
                                      }}
                                      className="icon_visiting"
                                    ></div>
                                  </div>
                                </div>
                                <div
                                  className="items-center mx-3 flex"
                                  style={{ flexDirection: "column" }}
                                >
                                  <div
                                    style={{
                                      fontWeight: 400,
                                      fontSize: "14px",
                                      lineHeight: "22px",
                                    }}
                                  >
                                    {item.boxing}
                                  </div>
                                  <div
                                    className="flex items-center justify-center"
                                    style={{ width: "20px", height: "20px" }}
                                  >
                                    <div
                                      style={{
                                        width: "16px",
                                        height: "17px",
                                        backgroundSize: "Cover",
                                      }}
                                      className="icon_boxing"
                                    ></div>
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
          </div>
        </Col>
        {/* thống kê thời gian di chuyển  */}
        <Col className="card-container w-full order-2 1k:order-3 1kr:order-3">
          <WrapperCardTable>
            <div
              style={{
                fontWeight: 500,
                fontSize: "14px",
                lineHeight: "28px",
                paddingLeft: "10px",
                paddingBottom: "10px",
                paddingTop: "10px",
              }}
            >
              Thống kê thời gian di chuyển, thời gian dừng, thời gian viếng thăm
              của nhân viên
            </div>
            <TableCustom
              style={{ height: "100%" }}
              pagination={false}
              scroll={{ y: 350 }}
              columns={renderColumnsCheckingEmployee(handleShowHistoryEmployee)}
              dataSource={dataCheckingEmployee}
            />
          </WrapperCardTable>
        </Col>
        {/* Giao diện map */}
        <Col className="card-container min-h-[400px] w-full 1kr:w-1/2 order-3 1k:order-1 1kr:order-2 ">
          <WrapperCardMap>
            <div style={{ height: "100%" }}>
              {options.projectId && (
                <RealtimeMap
                  options={options}
                  onClickPopup={handlerShowHistory}
                  status={handleUpdateData}
                />
              )}
            </div>
          </WrapperCardMap>
        </Col>
      </Row>
    </>
  );
}
