import { Helmet } from 'react-helmet-async';
// sections
import MonitorAlbum from '@/sections/MonitorAlbum/view';
import React from 'react';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> MonitorAlbum</title>
      </Helmet>

      <MonitorAlbum />
    </>
  );
}
