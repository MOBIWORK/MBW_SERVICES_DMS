import React, { useState } from 'react';
import TravelHistory from './tabs/travel_history';
import { useParams } from 'react-router-dom';
import WidgetHistory from './components/WidgetHistory';

export default function EmployeeMonitorDetail() {
  const [viewMode,setViewMode] = useState<"list"|"history">("list")
  const {employee_id} = useParams()
  return (
    <>
      {/* <TravelHistory employee={employee_id}/> */}
      <WidgetHistory employee={employee_id}/>
    </>
  )
}
