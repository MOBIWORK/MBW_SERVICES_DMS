/** @format */

import { CTKM_MULTI, CTKM_SINGLE } from "@/constant";
import { handleDataToApi } from "./Steps/StepTwo/data";

export const validateField = (data: PromotionProps) => {
  const {
    code,
    products,
    products_buy_multi,
    ptype_value,
    start_date,
    end_date,
    name_promotion,
  } = data;
  if (code === "" || !code) {
    return "Bạn phải nhập mã chương trình!!!";
  }

  //ten chuong trinh KM
  if (name_promotion === "" || !name_promotion) {
    return "Bạn phải nhập tên chương trình!!!";
  }
  //hinh thuc khuyen mai
  if (ptype_value === "" || !ptype_value) {
    return "Bạn phải nhập hình thức khuyến mại!!!";
  }

  if (end_date < start_date) {
    return "Ngày kết thúc phải lớn hơn ngày bắt đầu!!!";
  }

  if (
    CTKM_SINGLE.includes(ptype_value as string) &&
    (!products || products.length === 0)
  ) {
    return "Bạn chưa chọn sản phẩm hoặc tiền khuyến mại!!!";
  } else if (
    CTKM_MULTI.includes(ptype_value as string) &&
    (!products_buy_multi || products_buy_multi.length === 0)
  ) {
    return "Bạn chưa chọn sản phẩm hoặc tiền khuyến mại!!!";
  } else {
    switch (ptype_value) {
      case "SP_SL_CKSP":
      case "SP_SL_TIEN":
        let message1;
        const hasError1 = products.some((prod: any) => {
          if (!prod.so_luong || prod.so_luong === 0) {
            message1 = "Số lượng sản phẩm khuyến mại phải lớn hơn 0!!!";
            return true;
          }
          if (
            !prod.khuyen_mai ||
            prod.khuyen_mai === 0 ||
            (prod.khuyen_mai && prod.khuyen_mai.length === 0)
          ) {
            message1 = `${
              ptype_value === "SP_SL_CKSP"
                ? "Tỉ lệ chiết khấu"
                : "Tiền chiết khấu"
            } chương trình khuyến mại phải lớn hơn 0!!!`;
            return true;
          }

          return false;
        });
        if (hasError1) return message1;
        else break;

      case "SP_SL_SP":
      case "SP_ST_SP":
        let message2 = "";
        const hasError2 = products.some((prod: any) => {
          if (ptype_value == "SP_SL_SP") {
            if (!prod.so_luong || prod.so_luong === 0) {
              message2 = "Số lượng sản phẩm phải lớn hơn 0!!!";
              return true;
            }
          } else {
            if (prod.yeu_cau === 0 || !prod.yeu_cau) {
              message2 = "Tổng tiền sản phẩm khuyến mại phải lớn hơn 0!!!";
              return true;
            }
          }
          if (prod.khuyen_mai && prod.khuyen_mai.length === 0) {
            message2 = "Bạn phải chọn sản phẩm khuyến mại!!!";
            return true;
          }
          if (!prod.khuyen_mai || prod.khuyen_mai === 0) {
            message2 =
              "Tỉ lệ chiết khấu chương trình khuyến mại phải lớn hơn 0!!!";
            return true;
          } else {
            const itemProduct = prod.khuyen_mai.some((item: any) => {
              if (item.so_luong === 0 || !item.so_luong) {
                message2 = "Số lượng sản phẩm khuyến mại phải lớn hơn 0!!!";
                return true;
              }
            });
            if (itemProduct) return true;
          }
        });
        if (hasError2) return message2;
        else break;

      case "SP_ST_CKSP":
      case "SP_ST_TIEN":
        let message4 = "";
        const hasError4 = products.some((prod: any) => {
          if (!prod.yeu_cau || prod.yeu_cau === 0) {
            message4 = "Tổng tiền sản phẩm khuyến mại phải lớn hơn 0!!!";
            return true;
          }
          if (ptype_value === "SP_ST_CKSP") {
            if (!prod.khuyen_mai || prod.khuyen_mai === 0) {
              message4 =
                "Tỉ lệ chiết khấu sản phẩm khuyến mại phải lớn hơn 0!!!";
              return true;
            }
          } else {
            if (!prod.khuyen_mai || prod.khuyen_mai === 0) {
              message4 =
                "Tiền chiết khấu sản phẩm khuyến mại phải lớn hơn 0!!!";
              return true;
            }
          }
        });
        if (hasError4) return message4;
        else break;

      case "TIEN_CKDH":
      case "TIEN_TIEN":
        let message5 = "";
        const hasError5 = products.some((prod: any) => {
          if (prod.khuyen_mai === 0 || !prod.khuyen_mai) {
            message5 = `${
              ptype_value === "TIEN_CKDH"
                ? "Tỉ lệ chiết khấu"
                : "Tiền chiết khấu"
            } phải lớn hơn 0!!!`;
            return true;
          }
          if (prod.yeu_cau === 0 || !prod.yeu_cau) {
            message5 = "Tổng tiền mua phải lớn hơn 0!!!";
            return true;
          }
        });
        if (hasError5) return message5;
        else break;

      case "TIEN_SP":
        let message6 = "";
        const hasError = products.some((prod: any) => {
          if (!prod.yeu_cau || prod.yeu_cau === 0) {
            message6 = "Tổng tiền mua phải lớn hơn 0!!!";
            return true;
          }
          if (
            !prod.khuyen_mai ||
            (prod.khuyen_mai && prod.khuyen_mai.length === 0)
          ) {
            message6 = "Bạn phải chọn sản phẩm khuyến mại!!!";
            return true;
          } else {
            const errorPro = prod.khuyen_mai.some((item: any) => {
              if (!item.so_luong || item.so_luong === 0) {
                message6 = "Số lượng sản phẩm khuyến mại phải lớn hơn 0!!!";
                return true;
              }
            });
            if (errorPro) return true;
          }
        });
        if (hasError) return message6;
        else break;

      case "MUTI_SP_ST_SP": //2.1
      case "MUTI_SP_SL_SP": //2.4
        let message7 = "";
        const hasError7 = products_buy_multi.some((prod: any) => {
          // Kiểm tra yeu_cau

          // Kiểm tra san_pham_mua
          if (!prod.san_pham_mua || prod.san_pham_mua.length === 0) {
            message7 = "Bạn phải chọn sản phẩm mua!!!";
            return true;
          }

          // Kiểm tra số lượng trong san_pham_mua
          const hasInvalidBuyProduct = prod.san_pham_mua.some((item: any) => {
            if (!item.so_luong || item.so_luong <= 0) {
              message7 = "Số lượng sản phẩm mua phải lớn hơn 0!!!";
              return true;
            }
            return false;
          });
          if (hasInvalidBuyProduct) return true;

          if (!prod.yeu_cau || prod.yeu_cau.qualityMin <= 0) {
            if (ptype_value === "MUTI_SP_ST_SP") {
              message7 = "Tổng tiền phải lớn hơn 0 !!!";
            } else {
              message7 = "Tổng số lượng phải lớn hơn 0 !!!";
            }
            return true;
          }

          // Kiểm tra san_pham_khuyen_mai
          if (
            !prod.san_pham_khuyen_mai ||
            prod.san_pham_khuyen_mai.length === 0
          ) {
            message7 = "Bạn phải chọn sản phẩm khuyến mãi!!!";
            return true;
          }

          // Kiểm tra số lượng trong san_pham_khuyen_mai
          const hasInvalidPromoProduct = prod.san_pham_khuyen_mai.some(
            (promoGroup: any) => {
              return promoGroup.some((item: any) => {
                if (!item.so_luong || item.so_luong <= 0) {
                  message7 = "Số lượng sản phẩm khuyến mãi phải lớn hơn 0!!!";
                  return true;
                }
                return false;
              });
            }
          );

          return hasInvalidPromoProduct;
        });

        if (hasError7) return message7;
        else break;

      case "MUTI_SP_ST_CKSP": //2.2
      case "MUTI_SP_SL_CKSP": //2.5
      case "MUTI_SP_ST_TIEN": //2.3
      case "MUTI_SP_SL_TIEN": //2.6
        let message8 = "";
        const hasError8 = products_buy_multi.some((prod: any) => {
          // Kiểm tra yeu_cau

          // Kiểm tra san_pham_mua
          if (!prod.san_pham_mua || prod.san_pham_mua.length === 0) {
            message8 = "Bạn phải chọn sản phẩm mua!!!";
            return true;
          }

          // Kiểm tra số lượng trong san_pham_mua
          const hasInvalidBuyProduct = prod.san_pham_mua.some((item: any) => {
            if (!item.so_luong || item.so_luong <= 0) {
              message8 = "Số lượng sản phẩm mua phải lớn hơn 0!!!";
              return true;
            }
            return false;
          });
          if (hasInvalidBuyProduct) return true;

          if (!prod.yeu_cau || prod.yeu_cau.qualityMin <= 0) {
            message8 = "Tổng tiền phải lớn hơn 0 !!!";
            return true;
          }

          // Kiểm tra san_pham_khuyen_mai
          if (!prod.khuyen_mai || prod.khuyen_mai === 0) {
            if (
              ptype_value === "MUTI_SP_ST_TIEN" ||
              ptype_value === "MUTI_SP_SL_TIEN"
            ) {
              message8 = "Tiền chiết khấu phải lớn hơn 0!!!";
            } else {
              message8 = "Tỷ lệ chiết khấu phải lớn hơn 0!!!";
            }
            return true;
          }
        });

        if (hasError8) return message8;
        break;
      case "MUTI_TIEN_SP": //2.7
        let message9 = "";
        const hasError9 = products_buy_multi.some((prod: any) => {
          if (!prod.yeu_cau || prod.yeu_cau.qualityMin <= 0) {
            message9 = "Tổng tiền phải lớn hơn 0 !!!";
            return true;
          }
          // Kiểm tra số lượng trong san_pham_khuyen_mai
          const hasInvalidPromoProduct = prod.san_pham_khuyen_mai.some(
            (promoGroup: any) => {
              return promoGroup.some((item: any) => {
                if (!item.so_luong || item.so_luong <= 0) {
                  message9 = "Số lượng sản phẩm khuyến mãi phải lớn hơn 0!!!";
                  return true;
                }
                return false;
              });
            }
          );

          return hasInvalidPromoProduct;
        });
        if (hasError9) return message9;
        else break;

      case "MUTI_TIEN_CKDH": //2.8
      case "MUTI_TIEN_TIEN": //2.9
        let message10 = "";
        const hasError10 = products_buy_multi.some((prod: any) => {
          if (!prod.yeu_cau || prod.yeu_cau.qualityMin <= 0) {
            message10 = "Tổng tiền phải lớn hơn 0 !!!";
            return true;
          }
          if (!prod.khuyen_mai || prod.khuyen_mai <= 0) {
            message10 = "Tỷ lệ chiết khấu phải lớn hơn 0!!!";
            return true;
          }
        });
        if (hasError10) return message10;
        else break;
    }
  }

  return false;
};

export const changeDataProduc = (
  type: "MULTI" | "SINGLE",
  data: PromotionProps
) => {
  let dataChange;
  if (type === "MULTI") {
    dataChange = handleDataToApi({
      products: data.products_buy_multi,
      ptype_value: data.ptype_value,
    });
  }
  if (type === "SINGLE") {
    dataChange = handleDataToApi({
      products: data.products,
      ptype_value: data.ptype_value,
    });
  }
  return dataChange;
};
