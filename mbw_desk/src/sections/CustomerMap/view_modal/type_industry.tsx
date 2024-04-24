import React, { useState ,useEffect,useRef} from "react";
import { AxiosService } from "../../../services/server";
import { Form, Select,Input } from "antd";
export function TypeIndustry () {
    const [typeIndustry, setTypeIndustry] = useState(null);
    const storeTypes = [
      {
        "name": "Siêu thị mini, cửa hàng tiện lợi",
        "type": "supermarket"
      },{
        "name": "Siêu thị mẹ và bé",
        "type": "mom_and_baby"
      },{
        "name": "Hiệu thuốc bán lẻ",
        "type": "pharma"
      },{
        "name": "Cửa hàng thực phẩm",
        "type": "grocery_store"
      },{
        "name": "Cửa hàng trái cây",
        "type": "fruit_store"
      },{
        "name": "Cửa hàng thời trang cho trẻ em",
        "type": "children_fashion_store"
      },{
        "name": "Cửa hàng đồ chơi cho trẻ em",
        "type": "children_toy_store"
      },{
        "name": "Cửa hàng sữa và sản phẩm từ sữa",
        "type": "milk"
      },{
        "name": "Cửa hàng đồ gia dụng",
        "type": "home_goods_store"
      },{
        "name": "Hiệu sách",
        "type": "bookstore"
      },{
        "name": "Trung tâm ngoại ngữ",
        "type": "foreign_language_center"
      },{
        "name": "Kem và trà sữa",
        "type": "cream_tea"
      },{
        "name": "Cafe",
        "type": "cafe"
      },{
        "name": "Nhà hàng",
        "type": "restaurant"
      },{
        "name": "Quán ăn",
        "type": "eatery"
      },{
        "name": "Bia hơi, quán nhậu",
        "type": "beer_pub"
      },{
        "name": "Siêu thị thú cưng",
        "type": "pet"
      },{
        "name": "Cửa hàng cá cảnh",
        "type": "aquarium_shop"
      },{
        "name": "Cửa hàng chim cảnh",
        "type": "bird_shop"
      },{
        "name": "Phòng khám thú y",
        "type": "veterinary_clinic"
      },{
        "name": "Bệnh viện thú y",
        "type": "veterinary_hospital"
      },{
        "name": "Cửa hàng hóa mỹ phẩm",
        "type": "cosmetics_store"
      },{
        "name": "Phòng khám",
        "type": "clinic"
      },{
        "name": "Làm đẹp, spa",
        "type": "spa_beauty"
      },{
        "name": "Phòng tập GYM, Yoga, Fitness",
        "type": "gym"
      }
    ];
    const transformedStoreTypes = storeTypes.map(({ name, type }) => ({
      label: name,
      value: type
    }));
    const filterOption = (input: string, option?: { label: string; value: string }) =>
  (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
  const onChangeTypeIndustry = (value) => {
    setTypeIndustry(value)
  }
    return (
        <>
                <Form.Item label="Chọn ngành hàng : " name="nganhhang">
                  <Select showSearch placeholder="Chọn ngành hàng" value={typeIndustry} onChange={onChangeTypeIndustry} options={transformedStoreTypes} filterOption={filterOption}></Select>
                </Form.Item>
                <Form.Item label="Tên bản đồ: " name="namBando">
                  <Input />
                </Form.Item>
              
        </>
    );
}