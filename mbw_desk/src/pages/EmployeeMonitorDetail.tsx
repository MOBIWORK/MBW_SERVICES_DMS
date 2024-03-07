import React from 'react'
import EmployeeMonitorDetail from '../sections/EmployeeMonitorDetail/view'
import { Helmet } from 'react-helmet-async'

export default function EmployeeMonitorDetailPage() {
  return (
    <>
     <Helmet>
        <title> EmployeeMonitor Detail</title>
      </Helmet>
      <EmployeeMonitorDetail/>

    </>
  )
}
