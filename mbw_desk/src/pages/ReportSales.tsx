import { Helmet } from 'react-helmet-async';
// sections
import ReportSales from '@/sections/ReportSales/view';
import React from 'react';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> ReportSales</title>
      </Helmet>

      <ReportSales />
    </>
  );
}
