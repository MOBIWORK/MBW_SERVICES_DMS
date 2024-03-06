import { Helmet } from 'react-helmet-async';
// sections
import EmployeeMonitor from '@/sections/EmployeeMonitor/view';
import React from 'react';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> EmployeeMonitor</title>
      </Helmet>

      <EmployeeMonitor />
    </>
  );
}
