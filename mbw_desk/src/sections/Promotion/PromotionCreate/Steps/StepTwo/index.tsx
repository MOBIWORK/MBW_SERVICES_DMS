/** @format */

import { Helmet } from "react-helmet-async";
import { useSelector, useDispatch } from "react-redux";
import React, { createContext, useEffect } from "react";
import WrapperModal from "./modalWrapper";
import { PROMOTION_MULTI } from "@/constant";
import {
  Promotion1,
  Promotion2,
  Promotion3,
  Promotion4,
  Promotion5,
  Promotion6,
  Promotion7,
  Promotion8,
  Promotion9,
} from "./components/Single";
import {
  PromotionMulti1,
  PromotionMulti2,
  PromotionMulti3,
  PromotionMulti4,
  PromotionMulti5,
  PromotionMulti6,
  PromotionMulti7,
  PromotionMulti8,
  PromotionMulti9,
} from "./components/Multi";

export const PdContext = createContext<any>(null);
function StepTwo() {
  const {
    promotionData: { ptype_value: promotionType, products, products_buy_multi },
  } = useSelector((state: any) => state.promotion);
  const dispatch = useDispatch();

  const [multiProduct, setMultiProduct] = React.useState<boolean>(false);
  const [showAdd, setShowAdd] = React.useState<boolean>(false);
  const [isDataReady, setIsDataReady] = React.useState<boolean>(true);

  const [modalChoose, setModalC] = React.useState<{
    status: boolean;
    product_id?: string;
  }>({ status: false, product_id: undefined });
  const [expandedRows, setExpandedRows] = React.useState<string[]>([]);

  const RenderPromotion = () => {
    switch (promotionType) {
      case "SP_SL_CKSP":
        return <Promotion1 />;

      case "SP_SL_SP":
        return <Promotion2 />;

      case "SP_SL_TIEN":
        return <Promotion3 />;

      case "SP_ST_CKSP":
        return <Promotion4 />;

      case "SP_ST_SP":
        return <Promotion5 />;

      case "SP_ST_TIEN":
        return <Promotion6 />;

      case "TIEN_CKDH":
        return <Promotion7 />;

      case "TIEN_SP":
        return <Promotion8 />;

      case "TIEN_TIEN":
        return <Promotion9 />;

      case "MUTI_SP_ST_SP":
        return <PromotionMulti1 />;

      case "MUTI_SP_ST_CKSP":
        return <PromotionMulti2 />;

      case "MUTI_SP_ST_TIEN":
        return <PromotionMulti3 />;

      case "MUTI_SP_SL_SP":
        return <PromotionMulti4 />;

      case "MUTI_SP_SL_CKSP":
        return <PromotionMulti5 />;
      case "MUTI_SP_SL_TIEN":
        return <PromotionMulti6 />;
      case "MUTI_TIEN_SP":
        return <PromotionMulti7 />;
      case "MUTI_TIEN_CKDH":
        return <PromotionMulti8 />;
      case "MUTI_TIEN_TIEN":
        return <PromotionMulti9 />;
      default:
        return <h3 className="text-center">Chưa chọn hình thức khuyến mại</h3>;
    }
  };

  useEffect(() => {
    setIsDataReady(false);
    const isMulti = PROMOTION_MULTI.some(
      (item) => item.value === promotionType
    );
    setMultiProduct(isMulti);

    const timeoutId = setTimeout(() => {
      setIsDataReady(true);
    }, 0);

    // Cleanup function
    return () => {
      clearTimeout(timeoutId);
    };
  }, [promotionType]);

  return (
    <>
      <Helmet>
        <title>Chi tiết khuyến mại</title>
      </Helmet>
      <PdContext.Provider
        value={{
          handleDataPromotion: {
            data: multiProduct ? products_buy_multi : products,
            setData: dispatch,
          },
          typePromotion: multiProduct,
          handleExpanded: { expandedRows, setExpandedRows },
          handleModal: { modalChoose, setModalC },
          handleAddRow: { showAdd, setShowAdd },
        }}>
        {isDataReady && <RenderPromotion />}
        <WrapperModal />
      </PdContext.Provider>
    </>
  );
}

export default StepTwo;
