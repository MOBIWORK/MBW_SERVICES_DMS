import { useEffect, useState } from 'react'
import { DatePick } from '../../../components/date-picker/date-picker'
import dayjs from 'dayjs'
import { TodayLimit, tmpToTimeZone } from '../../../util'
import { SupervisoryStaff } from '@/components'
import { AxiosService } from '../../../services/server'
import axios from "axios";
import { message } from 'antd'
// Thiết lập ngôn ngữ cho dayjs
// import 'dayjs/locale/vi';
// dayjs.locale('vi');
export default function TravelHistory({ employee }: { employee?: string }) {

  const [time, setTime] = useState<any>(Date.now())
  const [from_time, setFTime] = useState<string>(tmpToTimeZone(new Date().setHours(0, 0, 0).toString()))
  const [to_time, setTTime] = useState<string>(tmpToTimeZone(new Date().setHours(24, 0, 0).toString()))
  const [loading, setLoading] = useState<boolean>(true);
  const handleChangeTime = (value: any) => {
    setTime(value)
    setFTime(tmpToTimeZone(TodayLimit(value).today))
    setTTime(tmpToTimeZone(TodayLimit(value).nextday))
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
  
  const initDataSummary = async () => {
    setLoading(true);
    let urlSummary = `https://api.ekgis.vn/v2/tracking/locationHistory/summary/${options.projectId}/${options.objectId}?from_time=${from_time}&to_time=${to_time}&api_key=${options.apiKey}`;
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

  useEffect(() => {
    (async () => {
      try {
        initDataSummary();
        // const rs = await AxiosService.get(`/api/method/mbw_dms.api.user.get_project_object_id?name=${employee}`,)
        // setOptions(prev => ({
        //   ...prev, 
        //   projectId: rs.result["Project ID"],
        //   objectId: rs.result["Object ID"],
        // }))
        // console.log(rs);
        // console.log(options);
      }catch(error){
        message.error(error?.message || "Something was wrong!!!")
      }
    })()
  }, [employee])

  useEffect(() => {
    initDataSummary();
  },[from_time,to_time])

  return (
    <>
      <div className='border border-solid border-[#F5F5F5] rounded-lg'>
        <div className='p-4 border border-solid border-transparent border-b-[#F5F5F5]'>
          <DatePick defaultValue={dayjs(time)} format={"DD-MM-YYYY"} onChange={handleChangeTime} />
        </div>
        <div id="travel" className='h-[70vh] relative'>
          {/* <MapEkgisHistory from_time={from_time} to_time={to_time} objectId='654c8a12d65d3e52f2d286de' projectId= '6556e471178a1db24ac1a711'/> */}
          {options.projectId && options.objectId && <SupervisoryStaff options={options} loading={loading}/> }
          
        </div>

      </div>
    </>
  )
}
