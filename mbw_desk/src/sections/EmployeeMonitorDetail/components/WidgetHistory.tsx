import { DatePick } from "@/components/date-picker/date-picker";
import { BackIos } from "@/icons";
import { AxiosService } from "@/services/server";
import { message, Row, Select } from "antd";
import dayjs from "dayjs";
import type {Dayjs} from "dayjs"
import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface optionsType extends timeType {
  apiKey: string | null;
  projectId: string | null;
  objectId: string | null | undefined;
}

interface timeType {
  date: string,
  from_time:string,
  to_time:string
}

const handleTime = (d:any):timeType => {
  return {
    date: dayjs(d["$d"]).format("YYYY-MM-DD"),
    from_time:dayjs(d["$d"]).startOf('day').format("YYYY-MM-DDTHH:mm:ss"),
    to_time: dayjs(d["$d"]).endOf('day').format("YYYY-MM-DDTHH:mm:ss")
  }
}
function WidgetHistory({ employee }: { employee?: string }) {
  const [nameEmployee, setNameEmployee] = useState<string>("");
  const [time,setTime] = useState<timeType>({
    date: dayjs().format("YYYY-MM-DD"),
    from_time:dayjs().startOf('day').format("YYYY-MM-DDTHH:mm:ss"),
    to_time: dayjs().endOf('day').format("YYYY-MM-DDTHH:mm:ss")
  })
  
  const [options, setOptions] = useState<optionsType>({
    apiKey: import.meta.env.VITE_KEY_MAP,
    projectId: "",
    objectId: "",
    ...time
  });
  const handleChangeTime = (date: any) => {
      setTime(handleTime(date))
      setOptions((prev:optionsType) => ({...prev,...handleTime(date)}))
  }

  // get objectId,...
  useEffect(() => {
    (async () => {
      try {
        const rsProjectId = AxiosService.get(
          `/api/method/mbw_dms.api.user.get_projectID`
        );

        const rsEmployeeInfo = employee ?  AxiosService.get(
          `/api/method/mbw_dms.api.user.get_employee_info_by_objid`,
          {
            params: {
              object_id: employee ?? ""
            }
          }
        ): {}

        const [rsPj,rsEmp] = await Promise.all([rsProjectId,rsEmployeeInfo])
        
        setOptions((prev:optionsType):optionsType => ({
          ...prev,
          projectId: rsPj.result["Project ID"],
          objectId: employee ?? ""
        }))
        if(employee) {
          setNameEmployee(`${rsEmp.result.employee_name}-${rsEmp.result.name}`)
        }
      } catch (error:any) {
        message.error(error?.message || "Something was wrong!!!");
      }
    })();
  }, [employee]);

  // aDD widget vào
  useEffect(() => {
    var widgetScript: any = "";
    if (options.projectId) {
      widgetScript = document.createElement("script");
      widgetScript.src =
        "https://files.ekgis.vn/sdks/tracking/v2/ekmapplf-history-map.min.js";
      widgetScript.async = true;
      document.body.appendChild(widgetScript);
      widgetScript.onload = async () => {
        try {
          console.log("loading...");
          let data = await new window.ekmapplf_Tracking.HistoryMap().init(
            "map_history_1sss",
            options
          );
          console.log("results...", data);
        } catch (err) {
          console.log("error......", err);
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
  return (
    <>
      <Row className="flex flex-wrap justify-between items-center px-[30px] bg-[#fff] sticky top-0 z-10">
        <div className="flex justify-center items-center">
          <Link to="/employee-monitor">
            {" "}
            <BackIos />
          </Link>
          <span className="text-2xl font-semibold leading-[21px] mx-5">
            {nameEmployee}
          </span>
        </div>
        <div className="flex">
          <div className="p-4 border border-solid border-transparent border-b-[#F5F5F5]">
            <DatePick
              defaultValue={dayjs()}
              format={"DD-MM-YYYY"}
              onChange={ handleChangeTime}
            />
          </div>
        </div>
      </Row>
      <div id="map_history_1sss" className=" h-full px-[30px]"></div>
    </>
  );
}

export default WidgetHistory;
