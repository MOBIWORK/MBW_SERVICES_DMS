import { Helmet } from 'react-helmet-async';
// sections
import ReportSalesOrder from '@/sections/ReportSalesOrder/view';
import React from 'react';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> ReportSalesOrder</title>
      </Helmet>

      <ReportSalesOrder />
    </>
  );
}
