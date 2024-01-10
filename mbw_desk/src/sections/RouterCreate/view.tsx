// @mui

import React from "react";
import { Link } from 'react-router-dom'
import { Button, DatePicker, Tabs, Form } from 'antd';
import GeneralInformation from "./general-information";
import Customer from './customer';
// ----------------------------------------------------------------------

export default function RouterCreate() {
  const [form] = Form.useForm();
  return (
    <div>
      <Form layout="vertical" form={form} onFinish={(value) => {console.log(value);
      }} >
        <Tabs
          defaultActiveKey="1"
          items={[
            {
              label: 'Thông tin chung',
              key: '1',
              children: <GeneralInformation />,
            },
            {
              label: 'Khách hàng',
              key: '2',
              children: <Customer />,
            },
          ]}
        />
      </Form>

    </div>
  );
}
