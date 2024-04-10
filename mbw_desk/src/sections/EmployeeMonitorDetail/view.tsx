import React, { useState } from 'react'
import { HeaderPage } from '../../components'
import { Breadcrumb, Radio } from 'antd'
import { UnorderedListOutlined } from '@ant-design/icons'
import { BackIos, HistoryRouterIcon } from '../../icons'
import TravelControl from './tabs/travel_control'
import TravelHistory from './tabs/travel_history'
import { Link, useParams } from 'react-router-dom'

export default function EmployeeMonitorDetail() {
  const [viewMode,setViewMode] = useState<"list"|"history">("list")
  const {employee_id} = useParams()
  return (
    <>
      <Breadcrumb items={[
      {
        title: 'Giám sát',
      },
      {
        title: <Link  to="/employee-monitor">Giám sát viếng thăm khách hàng</Link>,
      },
      {
        title: <Link to="">Nhân viên Trần Đình Tùng - NV1234</Link>,
      },
      {
        title: 'Danh sách viếng thăm',
      },
    ]} />
      <HeaderPage title={<div className="flex items-center">
          <Link to="/employee-monitor" > <BackIos/></Link>
          <span className='ml-4'>
            Nhân viên Trần Đình Tùng - NV1234
          </span>
      </div>} customButton={
        <>
        <Radio.Group defaultValue={viewMode} onChange={(e:any)=> setViewMode(e.target.value)} size="middle" className='flex items-center text-base font-medium'>
            <Radio.Button value="list"><UnorderedListOutlined /><span className='ml-2'>Danh sách viếng thăm</span></Radio.Button>
            <Radio.Button value="history" ><span className='inline-flex items-center'><HistoryRouterIcon/><span className='ml-1'>Lịch sử di chuyển</span></span></Radio.Button>
          </Radio.Group>
        </>
      }/>
      {
        viewMode == "list" ? <TravelControl employee={employee_id}/> : <TravelHistory employee={employee_id}/>
      }
    </>
  )
}
