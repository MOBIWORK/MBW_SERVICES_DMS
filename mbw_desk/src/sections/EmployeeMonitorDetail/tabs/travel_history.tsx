import React, { useState } from 'react'
import { DatePick } from '../../../components/date-picker/date-picker'
import dayjs, { Dayjs } from 'dayjs'
import { TodayLimit, tmpToTimeZone } from '../../../util'
import { MapEkgisHistory } from '../../../components/mapEkgis'
// Thiết lập ngôn ngữ cho dayjs
// import 'dayjs/locale/vi';
// dayjs.locale('vi');
export default function TravelHistory() {

  const [time,setTime] = useState<any>(Date.now())
  const [from_time,setFTime] = useState<string>( tmpToTimeZone(new Date().setHours(0,0,0).toString()) )
  const [to_time,setTTime] = useState<string>( tmpToTimeZone(new Date().setHours(24,0,0).toString()) )

  const handleChangeTime = (value:any) => {
      setTime(value)
      setFTime(tmpToTimeZone(TodayLimit(value).today))
      setTTime(tmpToTimeZone(TodayLimit(value).nextday))
  }
  return (
    <>
     <div className='border border-solid border-[#F5F5F5] rounded-lg'>
      <div className='p-4 border border-solid border-transparent border-b-[#F5F5F5]'>
        <DatePick defaultValue={dayjs(time)} format={"DD-MM-YYYY"} onChange={handleChangeTime}/>
      </div>
     <div id = "travel" className='h-[70vh] relative'>
     <MapEkgisHistory from_time={from_time} to_time={to_time} objectId='654c8a12d65d3e52f2d286de' projectId= '6556e471178a1db24ac1a711'/>
     </div>

     </div>
    </>
  )
}
