import React, { useState ,useEffect,useRef} from "react";
import { AxiosService } from "../../../services/server";
import { Form, Select,Input } from "antd";
export function TypeIndustry ({form}) {
    const [typeIndustry, setTypeIndustry] = useState(null);
    const [inputValue, setInputValue] = useState('Bản đồ độ phủ khách hàng');
    const [transformedStoreTypes, setTransformedStoreTypes] = useState([]);
    
    const filterOption = (input: string, option?: { label: string; value: string }) =>
  (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
  useEffect(() => {
    getlistIndustry()
  }, []);
  const getlistIndustry = async () => {
    let url= `/api/resource/DMS Industry?fields=["*"]&limit_page_length=100`;
    let res = await AxiosService.get(url);
    if(res && res.data.length > 0){
     let transformedStoreTypes = res.data.map(({ name, type }) => ({
        label: name,
        value: type
      }));
      setTransformedStoreTypes(transformedStoreTypes)
    }
  };
  const onChangeTypeIndustry = (value,label) => {
    setTypeIndustry(value)
    form.setFieldsValue({ nganhhang: value });
    form.setFieldsValue({ namBando: "Bản đồ " + label });
  }
    return (
        <>
                <Form.Item label="Chọn ngành hàng : " name="nganhhang">
                  <Select showSearch placeholder="Chọn ngành hàng" value={typeIndustry} onChange={onChangeTypeIndustry} options={transformedStoreTypes} filterOption={filterOption}></Select>
                </Form.Item>
                <Form.Item label="Tên bản đồ: " name="namBando">
                  <Input defaultValue={inputValue}  disabled/>
                </Form.Item>
              
        </>
    );
}