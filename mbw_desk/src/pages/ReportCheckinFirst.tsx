import { Helmet } from 'react-helmet-async';
// sections
import ReportCheckinFirst from '@/sections/ReportCheckinFirst/view';
import React from 'react';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> ReportCheckinFirst</title>
      </Helmet>

      <ReportCheckinFirst />
    </>
  );
}
