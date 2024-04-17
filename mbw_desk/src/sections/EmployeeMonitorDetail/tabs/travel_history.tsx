import { useEffect, useState } from 'react'
import { DatePick } from '../../../components/date-picker/date-picker'
import dayjs from 'dayjs'
import { TodayLimit, tmpToTimeZone } from '../../../util'
import { SupervisoryStaff } from '@/components'
import { AxiosService } from '../../../services/server'
import axios from "axios";
import { message, Select } from 'antd';
import { HeaderPage } from '../../../components';
import { BackIos } from '../../../icons';
import { Link } from 'react-router-dom';

// Thiết lập ngôn ngữ cho dayjs
// import 'dayjs/locale/vi';
// dayjs.locale('vi');
export default function TravelHistory({ employee }: { employee?: string }) {

  const [time, setTime] = useState<any>(new Date("03-29-2024")) //Date.now()
  const [from_time, setFTime] = useState<string>(tmpToTimeZone(new Date("03-29-2024").setHours(0, 0, 0).toString()))
  const [to_time, setTTime] = useState<string>(tmpToTimeZone(new Date("03-29-2024").setHours(24, 0, 0).toString()))
  const [nameEmployee, setNameEmployee] = useState<string>("");
  const [arrEmployee,setArrEmployee] = useState<any[]>([]);
  const [defaultEmployeeSelect, setDefaultEmployeeSelect] = useState<string>("");
  const handleChangeTime = (value: any) => {
    setTimeout(()=> {
      setTime(value)
      setFTime(tmpToTimeZone(TodayLimit(value).today))
      setTTime(tmpToTimeZone(TodayLimit(value).nextday))
    }, 200)
  }
  //const [loadingPage, setLoadingPage] = useState<boolean>(true);
  const [options, setOptions] = useState<
    {
      apiKey: string | null,
      projectId: string | null,
      objectId: string | null,
      from_time: string | null,
      to_time: string | null,
    }>({
      apiKey: import.meta.env.VITE_API_KEY,
      projectId: "",
      objectId: "",
      from_time: from_time,
      to_time: to_time,
    })
  
  const initDataSummary = async (projectId: string, objectId: string) => {
    if(objectId != null && objectId != ""){
      let urlSummary = `https://api.ekgis.vn/v2/tracking/locationHistory/summary/${projectId}/${objectId}?from_time=${from_time}&to_time=${to_time}&api_key=${options.apiKey}`;
      let resSummary = await axios.get(urlSummary);
      if(import.meta.env.VITE_BASE_URL){
        resSummary = resSummary.data;
      }
      console.log("Dữ liệu lịch swr ", resSummary);
      setOptions(prev => ({
        ...prev, 
        summary: resSummary?.summary,
        details: resSummary?.details,
      }));
    }else{
      setOptions(prev => ({
        ...prev, 
        summary: {
          move: {
            avgSpeed: 0,
            count: 0,
            distance: 0,
            totalTime: 0
          },
          stop: {
            count: 0,
            totalTime: 0
          },
          checkin: {
            count: 0,
            totalTime: 0
          }
        },
        details: [],
      }));
    }
  }
  const initDataEmployee = async (projectId: string) => {
    let resSummary = await AxiosService.get("/api/method/mbw_dms.api.user.get_list_employees");
    if(resSummary.message == "Thành công"){
      let arrEmployee = resSummary["result"].map(function(item){
        return {value: item["name"], label: item["employee_name"]};
      });
      setArrEmployee(arrEmployee);
    }
  }
  const handleChangeEmployee = async (item, option) => {
    setOptions(prev => ({
      ...prev, 
      objectId: option.object_id,
    }))
    //initDataSummary(options.projectId, option.object_id);
    setNameEmployee(`${option.label} - ${item}`);
  }

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
        console.log(rs);
        setOptions(prev => ({
          ...prev, 
          projectId: rs.result["Project ID"], //rs.result["Project ID"]
          objectId: employee,
        }))
        initDataEmployee(rs.result["Project ID"]); //rs.result["Project ID"]
        //initDataSummary(rs.result["Project ID"], emnameployee); //rs.result["Project ID"]
        console.log(options);
        const infoEmployee = await AxiosService.get(`/api/method/mbw_dms.api.user.get_employee_info_by_objid?object_id=${employee}`);
        if(infoEmployee.message == "Thành công"){
          if(infoEmployee.result.length > 0){
            setNameEmployee(infoEmployee.result[0].employee_name);
            setDefaultEmployeeSelect(infoEmployee.result[0].name);
          }
        }
        //setLoadingPage(false);
      }catch(error){
        message.error(error?.message || "Something was wrong!!!")
      }
    })()
  }, [employee])

  useEffect(() => {
    (
      async ()=> {
        //setLoadingPage(true);
        //await initDataSummary(options.projectId, options.objectId);
        //setLoadingPage(false);
        setOptions(prev => ({
          ...prev, 
          from_time: from_time,
          to_time: to_time
        }));
      }
    )()
  },[from_time,to_time])
  //Goij dich vu lay thong tin nhan vien theo objectId
  return (
    <>
      <HeaderPage title={<div className="flex items-center">
            <Link to="/employee-monitor" > <BackIos/></Link>
            <span className='ml-4'>
              {nameEmployee}
            </span>
        </div>} customButton={
          <div className='p-4 border border-solid border-transparent border-b-[#F5F5F5]'>
            <DatePick defaultValue={dayjs(time)} format={"DD-MM-YYYY"} onChange={handleChangeTime} />
          </div>
        } customSlect={
          <div className='py-4 border border-solid border-transparent border-b-[#F5F5F5]'>
            <Select
                defaultValue={defaultEmployeeSelect}
                style={{ width: 150 }}
                onChange={handleChangeEmployee}
                options={arrEmployee}
              />
          </div>
        }/>
      <div className='border border-solid border-[#F5F5F5] rounded-lg'>
        <div id="travel" className='relative'>
          {options.projectId && <SupervisoryStaff options={options}/> }
        </div>
      </div>
    </>
  )
}
