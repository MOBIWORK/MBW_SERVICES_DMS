import { Helmet } from 'react-helmet-async';
// sections
import RouterControl from '@/sections/RouterControl/view';
import React from 'react';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Five</title>
      </Helmet>

      <RouterControl />
    </>
  );
}
