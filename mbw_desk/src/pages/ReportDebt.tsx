import { Helmet } from 'react-helmet-async';
// sections
import ReportDebt from '@/sections/ReportDebt/view';
import React from 'react';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> ReportDebt</title>
      </Helmet>

      <ReportDebt />
    </>
  );
}
