import React, { useState ,useEffect,useRef} from "react";
import { AxiosService } from "../../../services/server";
import { Form, Select,Input } from "antd";
export function TypeIndustry ({ onResult,form, industryResult }) {
    const [typeIndustry, setTypeIndustry] = useState(null);
    const storeTypes = [
        { value: 'restaurant', label: 'Nhà hàng' },
        { value: 'cafe', label: 'Quán cà phê' },
        { value: 'bakery', label: 'Tiệm bánh' },
        { value: 'grocery', label: 'Cửa hàng tạp hóa' },
        { value: 'clothing', label: 'Cửa hàng quần áo' },
        { value: 'electronics', label: 'Cửa hàng điện tử' },
        { value: 'bookstore', label: 'Hiệu sách' },
        { value: 'pharmacy', label: 'Nhà thuốc' },
        { value: 'petstore', label: 'Cửa hàng thú cưng' },
        { value: 'hardware', label: 'Cửa hàng vật liệu xây dựng' },
      ];
    const filterOption = (input: string, option?: { label: string; value: string }) =>
  (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
  const onChangeTypeIndustry = (value) => {
    setTypeIndustry(value)
  }
    return (
        <>

                <Form.Item label="Chọn ngành hàng : " name="nganhhang">
                  <Select showSearch placeholder="Chọn ngành hàng" onChange={onChangeTypeIndustry} options={storeTypes} filterOption={filterOption}></Select>
                </Form.Item>
                <Form.Item label="Tên bản đồ: " name="namBando">
                  <Input />
                </Form.Item>
              
        </>
    );
}