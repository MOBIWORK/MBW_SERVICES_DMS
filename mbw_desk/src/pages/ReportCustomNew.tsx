import { Helmet } from 'react-helmet-async';
// sections
import ReportCustomNew from '@/sections/ReportCustomNew/view';
import React from 'react';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> ReportCustomNew</title>
      </Helmet>

      <ReportCustomNew />
    </>
  );
}
