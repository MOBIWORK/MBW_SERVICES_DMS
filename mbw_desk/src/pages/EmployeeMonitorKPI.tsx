import { Helmet } from 'react-helmet-async';
// sections
import EmployeeMonitorKPI from '@/sections/EmployeeMonitorKPI/view';
import React from 'react';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> EmployeeMonitorKPI</title>
      </Helmet>

      <EmployeeMonitorKPI />
    </>
  );
}
