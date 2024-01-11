// @mui

import React from "react";
import { Link } from "react-router-dom";
import { Button, DatePicker, Tabs, Form } from "antd";
import GeneralInformation from "./general-information";
import Customer from "./customer";
import { IoIosMenu } from "react-icons/io";
import { LiaDownloadSolid } from "react-icons/lia";
import { LuUploadCloud } from "react-icons/lu";
import { VscAdd } from "react-icons/vsc";
import { HeaderPage } from "../../components";
// ----------------------------------------------------------------------

export default function RouterCreate() {
  const [form] = Form.useForm();
  return (
    <>
      <HeaderPage
        title="Thêm tuyến"
        buttons={[
          {
            label: "Thêm",
            action: form.submit,
            type: "primary",
          },
        ]}
      />
      <div className="bg-white rounded-md">
        <Form
          layout="vertical"
          form={form}
          onFinish={(value) => {
            console.log(value);
          }}
        >
          <Tabs
            defaultActiveKey="1"
            items={[
              {
                label: <p className="px-4 mb-0"> Thông tin chung</p>,
                key: "1",
                children: <GeneralInformation />,
              },
              {
                label: <p className="px-4 mb-0">Khách hàng</p>,
                key: "2",
                children: <Customer />,
              },
            ]}
            indicatorSize={(origin) => origin - 18}
          />
        </Form>
      </div>
    </>
  );
}
