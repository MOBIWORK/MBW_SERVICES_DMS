/** @format */

import { RowData } from "../sections/Promotion/PromotionCreate/Steps/StepTwo/components/type";
import {
  handleDataProductMultiBuy,
  handleDataProductMultiKM,
} from "../sections/Promotion/PromotionCreate/Steps/StepTwo/data";

interface TransformedProduct {
  san_pham_mua: any;
  san_pham_khuyen_mai: any;
  khuyen_mai: any;
  yeu_cau: any;
}

export const usePromotionProductTransform = () => {
  const transformProducts = (products: RowData[]): TransformedProduct[] => {
    return products.map((product) => ({
      san_pham_mua: handleDataProductMultiBuy(product.san_pham_mua),
      san_pham_khuyen_mai: handleDataProductMultiKM(
        product.san_pham_khuyen_mai
      ),
      khuyen_mai: product.khuyen_mai,
      yeu_cau: product.yeu_cau,
    }));
  };

  return { transformProducts };
};
