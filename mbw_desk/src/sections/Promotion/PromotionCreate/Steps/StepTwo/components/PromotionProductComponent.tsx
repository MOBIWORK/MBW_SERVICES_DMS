/** @format */

import React, { memo, useEffect } from "react";
import { Promotion, RowData, Unit } from "./type";
import { Button, InputNumber, Select } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { PdContext } from "..";
import {
  deletePromotionProductDetail,
  updatePromotionProductDetail,
} from "@/redux/slices/promotion-slice";
import useDebounce from "@/hooks/useDebount";

type PromoProductType = {
  record: RowData;
  indexRow: string | number;
};

type ValueNType = {
  value: number | string;
  field: "so_luong" | "stock_uom";
  promoRow: string;
};
function PromotionProductHandle({ record, indexRow }: PromoProductType) {
  const {
    handleDataPromotion: { setData },
  } = React.useContext(PdContext);
  const [valueN, setValueN] = React.useState<ValueNType>();
  let slw: ValueNType = useDebounce(valueN);
 
  const handlePromotionChange = ({ value, field, promoRow }: ValueNType) => {
    setData(
      updatePromotionProductDetail({
        indexRow,
        indexPromotion: promoRow,
        field,
        value,
      })
    );
  };

  useEffect(() => {
    slw && handlePromotionChange(slw as any);
  }, [slw]);
  return (
    <>
      {record?.khuyen_mai.map((promo: Promotion, index: any) => (
        <div key={promo.name}>
          <p className="pb-3">({record.khuyen_mai.length} sản phẩm)</p>

          <div className="pb-2 flex items-center">
            <div>
              <p className="w-[350px] truncate font-medium text-sm leading-5">
                {promo.item_name}
              </p>
              <p className="text-[#637381] text-sm font-normal italic">
                {promo.item_code}
              </p>
            </div>
            <Select
              value={promo.stock_uom}
              style={{ width: 100, marginLeft: 10 }}
              onChange={(value) => {
                setValueN({
                  field: "stock_uom",
                  promoRow: index,
                  value,
                });
              }}
              options={promo.unit.map((unit: Unit) => ({
                label: unit.uom,
                value: unit.uom,
              }))}
            />
            <InputNumber
              min={0}
              value={promo.so_luong}
              style={{ marginLeft: 10 }}
              onChange={(value) => {
                setValueN({
                  field: "so_luong",
                  promoRow: index,
                  value: value as number,
                });
              }}
            />
            <Button
              className="border-0 ml-2"
              type="link"
              icon={<DeleteOutlined />}
              onClick={() =>
                setData(
                  deletePromotionProductDetail({
                    indexRow,
                    indexPromotion: index,
                  })
                )
              }></Button>
          </div>
        </div>
      ))}
    </>
  );
}

export default memo(PromotionProductHandle);
