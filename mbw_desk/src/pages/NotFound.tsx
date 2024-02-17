import { Helmet } from 'react-helmet-async';
// sections
import MonitorAlbum from '@/sections/MonitorAlbum/view';
import React from 'react';
import { Button, Result } from 'antd';
// ----------------------------------------------------------------------

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>NotFound</title>
      </Helmet>

      <Result
        status="404"
        title="404"
        subTitle="Trang không tồn tại."
        // extra={<Button type="primary">Back Home</Button>}
    />
    </>
  );
}