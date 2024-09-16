import { Form, Select } from "antd";
import React, { useEffect, useState } from "react";
import { FormItemCustom } from "../../../components";
import { FormInstance, useForm } from "antd/es/form/Form";
import { rsDataFrappe, rsData } from '../../../types/response';
import { AxiosService } from "../../../services/server";
import { handleListGroup, handleListTerritory } from "../service";

type Props = {
  filter: any;
  setFilter: any;
  form: FormInstance<any>;
};
export default function FilterCustomer({ form, filter, setFilter }: Props) {
  const [listCustomerGroup, setCustomerGroup] = useState<any[]>([]);
  const [listTeritory, setTerritory] = useState<any[]>([]);
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
      /* mới */
      let promiseGroupCustomer = handleListGroup()

        let promiseTerritoty = handleListTerritory()

        let promiseCities = AxiosService.get("/api/method/mbw_dms.api.location.list_province")
      
        const [rsGroup,rsTerritory,rsCities] = await Promise.all([promiseGroupCustomer,promiseTerritoty,promiseCities])
        console.log([rsGroup,rsTerritory,rsCities]);
        
        
          setCustomerGroup(
            rsGroup.message.map((customer_group:any) => ({
              label: customer_group.value,
              value: customer_group.value,
            }))
          );
        SetCities(rsCities.result)
        setTerritory(rsTerritory.message.map((customer_group:any) => ({
          label: customer_group.value,
          value: customer_group.value,
        })))
        



    })();
  }, []);

  const handleSetListDistrict = async (value:string) => {
    let ma_tinh_thanh = listCities.find(city => city.ten_tinh == value)?.ma_tinh
    
    if (ma_tinh_thanh) {
      let rsDistrict = await AxiosService.get('/api/method/mbw_dms.api.location.list_district', {
        params: {
          ma_tinh: ma_tinh_thanh
        }
      })
  
      SetDistrict(rsDistrict.result)

    }

  }
  const handleSetListWard = async (value:string) => {
    let ma_huyen = listDistrict.find(district => district.ten_huyen == value)?.ma_huyen
    if(ma_huyen) {
      let rsWard = await AxiosService.get('/api/method/mbw_dms.api.location.list_ward', {
        params: {
          ma_quan_huyen: ma_huyen
        }
      })
      Setward(rsWard.result)

    }


  }

  const handleSearchGroup = (key: string) => {
    handleListGroup(key).then((rsGroup:any) => setCustomerGroup(
      rsGroup.message.map((customer_group:any) => ({
        label: customer_group.value,
        value: customer_group.value,
      }))
    )).catch()
  }
  
  const handleSearchTerritory = (key: string) => {
    handleListTerritory(key).then((rsTerritory:any) =>  setTerritory(rsTerritory.message.map((customer_group:any) => ({
      label: customer_group.value,
      value: customer_group.value,
    })))).catch()

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
        <Select showSearch onSearch={handleSearchGroup} options={listCustomerGroup}  />
      </FormItemCustom>
      <FormItemCustom label={"Khu vực"} name="territory">
        <Select showSearch onSearch={handleSearchTerritory} options={listTeritory} />
      </FormItemCustom>
      <p className="font-medium text-sm py-4">Địa chỉ</p>
      <FormItemCustom label={"Tỉnh/Thành phố"} name="city">
        <Select options={listCities.map(city => ({
        label: city.ten_tinh,
        value: city.ten_tinh
      }))} onChange={handleSetListDistrict}/>
      </FormItemCustom>
      <FormItemCustom label={"Quận/huyện"} name="district" >
        <Select options={listDistrict.map(district => ({
        label: district.ten_huyen,
        value: district.ten_huyen
      }))} disabled={!!(listDistrict.length == 0)}  onChange={handleSetListWard}/>
      </FormItemCustom>
      <FormItemCustom label={"Phường/xã"} name="ward" >
        <Select options={listward.map(ward => ({
        label: ward.ten_xa,
        value: ward.ten_xa
      }))} disabled={!!(listward.length == 0)} />
      </FormItemCustom>
    </Form>
  );
}
