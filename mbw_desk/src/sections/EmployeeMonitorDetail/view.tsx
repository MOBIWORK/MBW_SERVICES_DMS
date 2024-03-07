import React, { useState } from 'react'
import { HeaderPage } from '../../components'
import { Breadcrumb, Radio } from 'antd'
import { UnorderedListOutlined } from '@ant-design/icons'
import { HistoryRouterIcon } from '../../icons'
import TravelControl from './tabs/travel_control'
import TravelHistory from './tabs/travel_history'

export default function EmployeeMonitorDetail() {
  const [viewMode,setViewMode] = useState<"list"|"history">("list")
  return (
    <>
      <Breadcrumb items={[
      {
        title: 'Giám sát',
      },
      {
        title: <a href="">Giám sát viếng thăm khách hàng</a>,
      },
      {
        title: <a href="">Nhân viên Trần Đình Tùng - NV1234</a>,
      },
      {
        title: 'Danh sách viếng thăm',
      },
    ]} />
      <HeaderPage title='Nhân viên Trần Đình Tùng - NV1234' customButton={
        <>
        <Radio.Group defaultValue={viewMode} onChange={(e:any)=> setViewMode(e.target.value)} size="middle" className='flex items-center text-base font-medium'>
            <Radio.Button value="list"><UnorderedListOutlined /><span className='ml-2'>Danh sách viếng thăm</span></Radio.Button>
            <Radio.Button value="history" ><span className='inline-flex items-center'><HistoryRouterIcon/><span className='ml-1'>Lịch sử di chuyển</span></span></Radio.Button>
          </Radio.Group>
        </>
      }/>
      {
        viewMode == "list" ? <TravelControl/> : <TravelHistory/>
      }
    </>
  )
}
