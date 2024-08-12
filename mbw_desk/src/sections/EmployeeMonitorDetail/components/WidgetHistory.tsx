import { AxiosService } from "@/services/server";
import { message } from "antd";
import dayjs from "dayjs";
import React, { useCallback, useEffect, useState } from "react";

function WidgetHistory({ employee }: { employee?: string }) {
  const [nameEmployee, setNameEmployee] = useState<string>("");
  const [arrEmployee,setArrEmployee] = useState<any[]>([]);
  const [defaultEmployeeSelect, setDefaultEmployeeSelect] = useState<string>("");
    const [options, setOptions] = useState<
    {
      apiKey: string | null,
      projectId: string | null,
      objectId: string | null,
      date: string
    }>({
      apiKey: import.meta.env.VITE_API_KEY,
      projectId: "",
      objectId: "",
      date:  "2024-08-03"
    })

    const initDataEmployee = useCallback( async (projectId: string) => {
      let resSummary = await AxiosService.get("/api/method/mbw_dms.api.user.get_list_employees");
      if(resSummary.message == "Thành công"){
        let arrEmployee = resSummary["result"].map(function(item){
          return {value: item["name"], label: item["employee_name"], object_id: item["object_id"]};
        });
        setArrEmployee(arrEmployee);
        for(let i = 0; i < arrEmployee.length; i++){
          if(employee != null && arrEmployee[i].object_id == employee){
            setTimeout(() => {
              setDefaultEmployeeSelect(arrEmployee[i].value);
            }, 500);
            break;
          }
        }
      }
    },[])
    // get objectId,...
    useEffect(() => {
      (async () => {
        //setLoadingPage(true);
        if(employee == null || employee == ""){
          const rs = await AxiosService.get(`/api/method/mbw_dms.api.user.get_projectID`)
          setOptions(prev => ({
            ...prev,
            projectId: rs.result["Project ID"], //
            objectId: "" //Fix cứng dữ liệu để demo
          }))
          initDataEmployee(rs.result["Project ID"]);
          //setLoadingPage(false);
          return;
        }
        try {
          const rs = await AxiosService.get(`/api/method/mbw_dms.api.user.get_projectID`);
          setOptions(prev => ({
            ...prev,
            projectId: rs.result["Project ID"], //rs.result["Project ID"]
            objectId: employee,
          }))
          // initDataEmployee(rs.result["Project ID"]); //rs.result["Project ID"]
          // //initDataSummary(rs.result["Project ID"], emnameployee); //rs.result["Project ID"]
          // const infoEmployee = await AxiosService.get(`/api/method/mbw_dms.api.user.get_employee_info_by_objid?object_id=${employee}`);
          // if(infoEmployee.message == "Thành công"){
          //   if(infoEmployee.result.length > 0){
          //     setNameEmployee(infoEmployee.result[0].employee_name);
          //     setDefaultEmployeeSelect(infoEmployee.result[0].name);
          //   }
          // }
          //setLoadingPage(false);
        }catch(error){
          message.error(error?.message || "Something was wrong!!!")
        }
      })()
    }, [employee])

  useEffect(() => {
    var widgetScript: any = "";
    if(options.projectId) {
      widgetScript = document.createElement("script");
      widgetScript.src =
        "https://files.ekgis.vn/sdks/tracking/v2/ekmapplf-history-map.min.js";
      widgetScript.async = true;
      document.body.appendChild(widgetScript);
      widgetScript.onload = async() => {
        try {
          console.log("loading...");
          let data = await new window.ekmapplf_Tracking.HistoryMap()
          .init("map_history_1sss", options)
          console.log("results...",data);
          
        }
        catch(err) {
          console.log("error......",err);
          
        }
        
      };

    }

    return () => {
      // document.body.removeChild(script);
      if (widgetScript) {
        document.body.removeChild(widgetScript);
      }
    };
  }, [options]);
  return <div id="map_history_1sss" className=" h-full"></div>;
}

export default WidgetHistory;
