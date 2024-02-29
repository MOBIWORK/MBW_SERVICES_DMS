import { Helmet } from 'react-helmet-async';
// sections
import ReportCustomer from '@/sections/ReportCustomer/view';
import React from 'react';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> ReportCustomer</title>
      </Helmet>

      <ReportCustomer />
    </>
  );
}
