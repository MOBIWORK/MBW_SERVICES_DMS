import { Helmet } from 'react-helmet-async';
// sections
import ReportDistance from '@/sections/ReportDistance/view';
import React from 'react';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> ReportDistance</title>
      </Helmet>

      <ReportDistance />
    </>
  );
}
