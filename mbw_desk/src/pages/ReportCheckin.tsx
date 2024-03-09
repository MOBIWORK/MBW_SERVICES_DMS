import { Helmet } from 'react-helmet-async';
// sections
import ReportCheckin from '@/sections/ReportCheckin/view';
import React from 'react';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> ReportCheckin</title>
      </Helmet>

      <ReportCheckin />
    </>
  );
}
