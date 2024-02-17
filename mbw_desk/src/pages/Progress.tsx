import { Helmet } from 'react-helmet-async';
// sections
import MonitorAlbum from '@/sections/MonitorAlbum/view';
import React from 'react';
import { Button, Result } from 'antd';
// ----------------------------------------------------------------------

export default function Progress() {
  return (
    <>
      <Helmet>
        <title>Progress</title>
      </Helmet>

      <Result
        status="500"
        title="500"
        subTitle="Trang đang tiến hành."
        // extra={<Button type="primary">Back Home</Button>}
    />
    </>
  );
}
