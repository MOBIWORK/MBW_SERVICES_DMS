import { Form, Select } from "antd";
import React, { useEffect, useState } from "react";
import { FormItemCustom } from "../../../components";
import { FormInstance, useForm } from "antd/es/form/Form";
import { rsDataFrappe, rsData } from '../../../types/response';
import { AxiosService } from "../../../services/server";

type Props = {
  filter: any;
  setFilter: any;
  form: FormInstance<any>;
};
export default function FilterCustomer({ form, filter, setFilter }: Props) {
  const [listCustomerGroup, setCustomerGroup] = useState<any[]>([]);
  const [listCities, SetCities] = useState<any[]>([]);
  const [listDistrict, SetDistrict] = useState<any[]>([]);
  const [listward, Setward] = useState<any[]>([]);
  const [maQuanHuyen, setMaQuanHuyen] = useState<string>("");
  const [maTinhThanh, setMaTinhThanh] = useState<string>("");

  useEffect(() => {
    form.setFieldsValue(filter);
  }, [filter]);
  useEffect(() => {
    (async () => {
      let rsEmployee: rsDataFrappe<any[]> = await AxiosService.get(
        "/api/method/frappe.desk.search.search_link",
        {
          params: {
            txt: "",
            doctype: "Customer Group",
            ignore_user_permissions: 0,
            reference_doctype: "Customer",
          },
        }
      );

      let rsCities:rsData<any[]>  = await  AxiosService.get("/api/method/mbw_dms.api.location.list_province")
      SetCities(rsCities.result.map(city => ({
        label: city.ten_tinh,
        value: city.ma_tinh
      })))

      let { results } = rsEmployee;
      setCustomerGroup(
        results.map((customer_group) => ({
          label: customer_group.value,
          value: customer_group.value,
        }))
      );
    })();
  }, []);

  const handleSetListDistrict = async (value:string) => {
    let rsDistrict = await AxiosService.get('/api/method/mbw_dms.api.location.list_district', {
      params: {
        ma_tinh_thanh: Number.parseInt(value)
      }
    })

    SetDistrict(rsDistrict.result.map(district => ({
      label: district.ten_huyen,
      value: district.ma_huyen
    })))

  }
  const handleSetListWard = async (value:string) => {
    let rsWard = await AxiosService.get('/api/method/mbw_dms.api.location.list_ward', {
      params: {
        ma_quan_huyen: value
      }
    })

    Setward(rsWard.result.map(ward => ({
      label: ward.ten_xa,
      value: ward.ma_xa
    })))

  }
  return (
    <Form form={form} layout="vertical" onFinish={setFilter}>
      <FormItemCustom label={"Loại khách hàng"} name="customer_type">
        <Select
          options={[
            {
              label: "Tất cả",
              value: false,
            },
            {
              label: "Company",
              value: "Company",
            },
            {
              label: "Individual",
              value: "Individual",
            },
          ]}
        />
      </FormItemCustom>
      <FormItemCustom label={"Nhóm khách hàng"} name="customer_group">
        <Select options={listCustomerGroup} />
      </FormItemCustom>
      <p className="font-medium text-sm">Địa chỉ</p>
      <FormItemCustom label={"Tỉnh/Thành phố"} name="city">
        <Select options={listCities} onChange={handleSetListDistrict}/>
      </FormItemCustom>
      <FormItemCustom label={"Quận/huyện"} name="district" >
        <Select options={listDistrict} disabled={!!(listDistrict.length == 0)}  onChange={handleSetListWard}/>
      </FormItemCustom>
      <FormItemCustom label={"Phường/xã"} name="ward" >
        <Select options={listward} disabled={!!(listward.length == 0)}/>
      </FormItemCustom>
    </Form>
  );
}
