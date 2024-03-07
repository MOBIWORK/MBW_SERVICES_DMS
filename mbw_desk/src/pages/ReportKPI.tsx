import { Helmet } from 'react-helmet-async';
// sections
import ReportKPI from '@/sections/ReportKPI/view';
import React from 'react';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> ReportKPI</title>
      </Helmet>

      <ReportKPI />
    </>
  );
}
