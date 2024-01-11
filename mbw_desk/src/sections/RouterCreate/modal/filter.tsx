import { Form, Select } from "antd";
import React, { useEffect } from "react";
import { FormItemCustom } from "../../../components";
import { FormInstance, useForm } from "antd/es/form/Form";

type Props = {
  filter: any;
  setFilter: any;
  form: FormInstance<any>;
};
export default function FilterCustomer({ form, filter, setFilter }: Props) {
  useEffect(() => {
    form.setFieldsValue(filter);
  }, [filter]);
  return (
    <Form form={form} layout="vertical" onFinish={setFilter}>
      <FormItemCustom label={"Loại khách hàng"} name="customer_type">
        <Select
          options={[
            {
                label: "Chọn loại ",
                value: "",
              },
            {
              label: "Loại A",
              value: "Type A",
            },
            {
                label: "Loại B",
                value: "Type B",
              },
          ]}
        />
      </FormItemCustom>
      <FormItemCustom label={"Nhóm khách hàng"} name="customer_group">
        <Select 
        options={[
            {
                label: "Chọn Nhóm ",
                value: "",
              },
            {
              label: "Nhóm A",
              value: "Group A",
            },
            {
                label: "Nhóm B",
                value: "Group B",
              },
          ]}
        />
      </FormItemCustom>
      <p className="font-medium text-sm">Địa chỉ</p>
      <FormItemCustom label={"Tỉnh/Thành phố"} name="city">
        <Select />
      </FormItemCustom>
      <FormItemCustom label={"Quận/huyện"} name="district">
        <Select />
      </FormItemCustom>
      <FormItemCustom label={"Phường/xã"} name="ward">
        <Select />
      </FormItemCustom>
    </Form>
  );
}
