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
import { Link } from 'react-router-dom'
// Thiết lập ngôn ngữ cho dayjs
// import 'dayjs/locale/vi';
// dayjs.locale('vi');
export default function TravelHistory({ employee }: { employee?: string }) {

  const [time, setTime] = useState<any>(new Date("03-27-2024")) //Date.now()
  const [from_time, setFTime] = useState<string>(tmpToTimeZone(new Date("03-27-2024").setHours(0, 0, 0).toString()))
  const [to_time, setTTime] = useState<string>(tmpToTimeZone(new Date("03-27-2024").setHours(24, 0, 0).toString()))
  const [loading, setLoading] = useState<boolean>(true);
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
  const [options, setOptions] = useState<
    {
      apiKey: string | null,
      projectId: string | null,
      objectId: string | null,
      from_time: string | null,
      to_time: string | null,
    }>({
      apiKey: import.meta.env.VITE_API_KEY,
      projectId: "6556e471178a1db24ac1a711",
      objectId: "654c8a12d65d3e52f2d286de",
      from_time: from_time,
      to_time: to_time,
    })
  
  const initDataSummary = async (projectId: string, objectId: string) => {
    setLoading(true);
    let urlSummary = `https://api.ekgis.vn/v2/tracking/locationHistory/summary/${projectId}/${objectId}?from_time=${from_time}&to_time=${to_time}&api_key=${options.apiKey}`;
    let resSummary = await axios.get(urlSummary);
    if(resSummary.statusText == "OK"){
      setOptions(prev => ({
        ...prev, 
        summary: resSummary.data["summary"],
        details: resSummary.data["details"],
      }));
    }
    setLoading(false);
  }
  const initDataEmployee = async (projectId: string) => {
    let urlSummary = `https://api.ekgis.vn/tracking/${projectId}/objects?api_key=${options.apiKey}`;
    let resSummary = await axios.get(urlSummary);
    if(resSummary.statusText == "OK"){
      let arrEmployee = resSummary["data"].results.objects.map(function(item){
        return {value: item["_id"], label: item["name"]};
      });
      setArrEmployee(arrEmployee);
    }
  }
  const handleChangeEmployee = async (item) => {
    setOptions(prev => ({
      ...prev, 
      objectId: item,
    }))
    initDataSummary(options.projectId, item);
    const infoEmployee = await AxiosService.get(`/api/method/mbw_dms.api.user.get_employee_info_by_objid?object_id=${item}`);
    if(infoEmployee.message == "Thành công"){
      if(infoEmployee.result.length > 0){
        setNameEmployee(infoEmployee.result[0].employee_name);
      }
    }
  }

  useEffect(() => {
    (async () => {
      if(employee == null || employee == ""){
        setOptions(prev => ({
          ...prev, 
          projectId: "6556e471178a1db24ac1a711", //rs.result["Project ID"]
        }))
        initDataEmployee("6556e471178a1db24ac1a711");
        return;
      }
      employee = "654c8a12d65d3e52f2d286de";
      try {
        const rs = await AxiosService.get(`/api/method/mbw_dms.api.user.get_project_object_id?name=${employee}`)
        setOptions(prev => ({
          ...prev, 
          projectId: "6556e471178a1db24ac1a711", //rs.result["Project ID"]
          objectId: employee,
        }))
        initDataEmployee("6556e471178a1db24ac1a711"); //rs.result["Project ID"]
        if(employee != null && employee != "") setDefaultEmployeeSelect(employee);
        initDataSummary("6556e471178a1db24ac1a711", employee); //rs.result["Project ID"]
        const infoEmployee = await AxiosService.get(`/api/method/mbw_dms.api.user.get_employee_info_by_objid?object_id=${employee}`);
        if(infoEmployee.message == "Thành công"){
          if(infoEmployee.result.length > 0){
            setNameEmployee(infoEmployee.result[0].employee_name);
          }
        }
      }catch(error){
        message.error(error?.message || "Something was wrong!!!")
      }
    })()
  }, [employee])

  useEffect(() => {
    initDataSummary(options.projectId, options.objectId);
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
              style={{ width: 120 }}
              onChange={handleChangeEmployee}
              options={arrEmployee}
            />
        </div>
      }/>
      <div className='border border-solid border-[#F5F5F5] rounded-lg'>
        <div id="travel" className='relative'>
          {/* <MapEkgisHistory from_time={from_time} to_time={to_time} objectId='654c8a12d65d3e52f2d286de' projectId= '6556e471178a1db24ac1a711'/> */}
          {options.projectId && <SupervisoryStaff options={options} loading={loading}/> }
          
        </div>

      </div>
    </>
  )
}
