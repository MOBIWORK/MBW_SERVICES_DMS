/** @format */

import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";
// import {PromotionProps} from '@/types/promotion'

interface Promotion {
  promotionChooseCustomer: Array<String>;

  promotionData: PromotionProps;
}

const startOfMonth: any = dayjs().startOf("month");
const endOfMonth: any = dayjs().endOf("month");
let start = Date.parse(startOfMonth["$d"]) / 1000;
let end = Date.parse(endOfMonth["$d"]) / 1000;

const initPromotionType: Promotion = {
  promotionChooseCustomer: [],
  promotionData: {
    code: undefined,
    name_promotion: undefined,
    products_buy_multi: [],
    customers: [],
    territory: [],
    description: undefined,
    gpromotion: undefined,
    gpromotion_prioritize: undefined,
    promotion_type: "0",
    ptype_value: undefined,
    ptype_name: undefined,
    multiple: false,
    status: "Hoạt động",
    products: [],
    start_date: start,
    end_date: end,
    customer_group: [],
    customer_type: [],
  },
};

const promotionSlice = createSlice({
  name: "promotion",
  initialState: initPromotionType,
  reducers: {
    clearPromotion(state, action) {
      return (state = {
        promotionChooseCustomer: [],
        promotionData: {
          code: undefined,
          products_buy_multi: [],
          customers: [],
          territory: [],
          description: undefined,
          gpromotion: undefined,
          gpromotion_prioritize: undefined,
          name_promotion: undefined,
          promotion_type: "0",
          ptype_value: undefined,
          ptype_name: undefined,

          multiple: false,
          status: "Hoạt động",
          products: [],
          start_date: start,
          end_date: end,

          customer_group: [],
          customer_type: [],
        },
      });
    },
    setPromotionChooseCustomer: (state, action) => {
      state.promotionChooseCustomer = action.payload;
    },

    setPromotionType: (state, action) => {
      state.promotionData.promotion_type = action.payload;
    },

    setPromotionCode: (state, action) => {
      state.promotionData.code = action.payload;
    },
    setPromotionCustomer: (state, action) => {
      state.promotionData.customers = action.payload;
    },
    setPromotionTerritory: (state, action) => {
      const datas = action.payload;
      if (datas.length > 0) {
        const arrData = datas.map((data: any) => {
          return {
            value: data,
            territory: data,
            territory_name: data,
          };
        });
        state.promotionData.territory = arrData;
      } else {
        state.promotionData.territory = datas;
      }
    },
    setPromotionGpromotion: (state, action) => {
      state.promotionData.gpromotion = action.payload;
    },
    setPromotionPriority: (state, action) => {
      state.promotionData.gpromotion_prioritize = action.payload;
    },
    setPromotionName: (state, action) => {
      state.promotionData.name_promotion = action.payload;
    },

    setPromotionMultiple: (state, action) => {
      state.promotionData.multiple = action.payload;
    },
    setPromotionStatus: (state, action) => {
      state.promotionData.status = action.payload;
    },
    //products
    setPromotionProduct: (state, action) => {
      state.promotionData.products = action.payload;
    },
    addPromotionProduct: (state, action) => {
      state.promotionData.products = [
        ...state.promotionData.products,
        ...action.payload,
      ];
    },

    setPromotionProductMultiBuy: (state, action) => {
      const { payload, viewPromotion } = action.payload;
      if (viewPromotion) {
        state.promotionData.products_buy_multi = payload;
      } else {
        state.promotionData.products_buy_multi = [
          ...state.promotionData.products_buy_multi,
          {
            khuyen_mai: undefined,
            yeu_cau: {
              qualityMin: 0,
              qualityMax: 0,
            },
            san_pham_mua: [...action.payload.san_pham_mua],
            san_pham_khuyen_mai: [],
          },
        ];
      }
    },
    addPromotionProductMultiBuy: (state, action) => {
      const { indexRow, prodBuyAdd } = action.payload;
      if (state.promotionData.products_buy_multi[indexRow]) {
        state.promotionData.products_buy_multi[indexRow].san_pham_mua.push(
          prodBuyAdd
        );
      } else {
        state.promotionData.products_buy_multi.push({
          san_pham_mua: [prodBuyAdd],
        });
      }
    },
    addPromotionProductMultiOrder: (state, action) => {
      const { value, indexRow, field } = action.payload;
      state.promotionData.products_buy_multi[indexRow].yeu_cau[field] = value;
    },

    addPromotionProductMultiKM: (state, action) => {
      const { indexRow, prodBuyAdd, typeAdd } = action.payload;

      // Lấy index của mảng cuối cùng trong san_pham_khuyen_mai
      const lastIndex =
        state.promotionData.products_buy_multi[indexRow].san_pham_khuyen_mai
          .length - 1;
      if (typeAdd === "V") {
        // Thêm prodBuyAdd vào mảng cuối cùng
        if (lastIndex >= 0) {
          state.promotionData.products_buy_multi[indexRow].san_pham_khuyen_mai[
            lastIndex
          ].push(prodBuyAdd);
        } else {
          // Nếu san_pham_khuyen_mai rỗng, tạo mảng mới với prodBuyAdd
          state.promotionData.products_buy_multi[
            indexRow
          ].san_pham_khuyen_mai.push([prodBuyAdd]);
        }
      }

      if (typeAdd === "H") {
        // Thêm một mảng rỗng mới vào san_pham_khuyen_mai
        if (
          state.promotionData.products_buy_multi[indexRow].san_pham_khuyen_mai[
            lastIndex
          ].length > 0
        ) {
          state.promotionData.products_buy_multi[
            indexRow
          ].san_pham_khuyen_mai.push([]);
        }
      }
    },

    deletePromotionProductMultiKM: (state, action) => {
      const { indexRow, index, id } = action.payload;

      // Kiểm tra tồn tại của mảng cha và mảng con
      if (
        state.promotionData.products_buy_multi[indexRow]?.san_pham_khuyen_mai[
          index
        ]
      ) {
        // Xóa phần tử tại vị trí id trong mảng con
        state.promotionData.products_buy_multi[indexRow].san_pham_khuyen_mai[
          index
        ] = state.promotionData.products_buy_multi[
          indexRow
        ].san_pham_khuyen_mai[index].filter(
          (_: any, idx: number) => idx !== id
        );

        // Nếu mảng con trống sau khi xóa, xóa luôn mảng con đó
        if (
          state.promotionData.products_buy_multi[indexRow].san_pham_khuyen_mai[
            index
          ].length === 0
        ) {
          state.promotionData.products_buy_multi[indexRow].san_pham_khuyen_mai =
            state.promotionData.products_buy_multi[
              indexRow
            ].san_pham_khuyen_mai.filter(
              (_: any, idx: number) => idx !== index
            );
        }
      }
    },

    updatePromotionProductMultiKM: (state, action) => {
      const { indexRow, index, id, value, field } = action.payload;
      state.promotionData.products_buy_multi[indexRow].san_pham_khuyen_mai[
        index
      ][id][field] = value;
    },

    updatePromotionProductMulti_khuyen_mai: (state, action) => {
      const { indexRow, value, field, totalMoney } = action.payload;
      if (totalMoney == true) {
        state.promotionData.products_buy_multi[indexRow][field] = {
          amountMin: value,
          amountMax: value,
        };
      } else {
        state.promotionData.products_buy_multi[indexRow][field] = value;
      }
    },

    deletePromotionProductMultiRow: (state, action) => {
      state.promotionData.products_buy_multi = [
        ...state.promotionData.products_buy_multi.filter(
          (pd, index) => index != action.payload
        ),
      ];
    },

    deletePromotionProduct: (state, action) => {
      state.promotionData.products = [
        ...state.promotionData.products.filter(
          (pd, index) => index != action.payload
        ),
      ];
    },

    deletePromotionPM: (state, action) => {
      const { indexRow, index } = action.payload;
      // Kiểm tra xem indexRow có tồn tại không
      if (state.promotionData.products_buy_multi[indexRow]) {
        // Cập nhật mảng product_buy bằng cách xóa phần tử tại index
        state.promotionData.products_buy_multi[indexRow].san_pham_mua =
          state.promotionData.products_buy_multi[indexRow].san_pham_mua.filter(
            (_: any, idx: number) => idx !== index
          );
      }
    },
    updatePromotionProductMultiBuy: (state, action) => {
      const { indexRow, index, value, field } = action.payload;
      if (field == "so_luong") {
        state.promotionData.products_buy_multi[indexRow].san_pham_mua[
          index
        ].so_luong = value;
      } else if (field == "dvt") {
        state.promotionData.products_buy_multi[indexRow].san_pham_mua[
          index
        ].stock_uom = value;
      }
    },
    updatePromotionProduct: (state, action) => {
      const { indexRow, field, value } = action.payload;
      state.promotionData.products = state.promotionData.products.map(
        (pd, index) => {
          if (index == indexRow) {
            pd[field] = value;
          }

          return pd;
        }
      );
    },
    addPromotionProductDetail: (state, action) => {
      const { indexRow, promotions } = action.payload;
      state.promotionData.products = state.promotionData.products.map(
        (pd, index) => {
          if (index == indexRow) {
            pd["khuyen_mai"] = pd["khuyen_mai"].concat(promotions);
          }
          return pd;
        }
      );
    },
    updatePromotionProductDetail: (state, action) => {
      const { indexRow, indexPromotion, field, value } = action.payload;
      state.promotionData.products = state.promotionData.products.map(
        (pd, index) => {
          if (index == indexRow) {
            pd["khuyen_mai"] = pd["khuyen_mai"].map(
              (pdPro: any, indexP: any) => {
                if (indexP == indexPromotion) {
                  pdPro[field] = value;
                }
                return pdPro;
              }
            );
          }
          return pd;
        }
      );
    },
    deletePromotionProductDetail: (state, action) => {
      const { indexRow, indexPromotion } = action.payload;
      state.promotionData.products = state.promotionData.products.map(
        (pd, index) => {
          if (index == indexRow) {
            pd["khuyen_mai"] = pd["khuyen_mai"].filter(
              (pdPro: any, indexP: any) => indexP !== indexPromotion
            );
          }
          return pd;
        }
      );
    },
    //end prodcut
    setPromotionStartDate: (state, action) => {
      state.promotionData.start_date = action.payload;
    },
    setPromotionEndDate: (state, action) => {
      state.promotionData.end_date = action.payload;
    },

    setPromotionPtypeValue: (state, action) => {
      state.promotionData.ptype_value = action.payload;
    },
    setPromotionPtypeName: (state, action) => {
      state.promotionData.ptype_name = action.payload;
    },

    setPromotionDiscription: (state, action) => {
      state.promotionData.description = action.payload;
    },

    setPromotionCustomerGroup: (state, action) => {
      const datas = action.payload;
      if (datas?.length > 0) {
        const arrData = datas.map((data: any) => {
          return {
            value: data,
            customer_group: data,
            name_customer_group: data,
          };
        });
        state.promotionData.customer_group = arrData;
      } else {
        state.promotionData.customer_group = datas;
      }
    },

    setPromotionCustomerType: (state, action) => {
      const datas = action.payload;
      if (datas.length > 0) {
        const arrData = datas.map((data: any) => {
          return {
            value: data,
            customer_type: data,
            name_customer_type: data,
          };
        });

        state.promotionData.customer_type = arrData;
      } else {
        state.promotionData.customer_type = datas;
      }
    },
  },
});

export const {
  clearPromotion,
  setPromotionPriority,
  setPromotionMultiple,
  setPromotionType,
  setPromotionCode,
  setPromotionName,
  setPromotionChooseCustomer,
  setPromotionCustomer,

  setPromotionTerritory,
  setPromotionGpromotion,
  setPromotionStatus,
  setPromotionProduct,
  addPromotionProduct,
  deletePromotionProduct,
  updatePromotionProduct,
  addPromotionProductDetail,
  updatePromotionProductDetail,
  deletePromotionProductDetail,
  setPromotionStartDate,
  setPromotionEndDate,
  setPromotionPtypeValue,
  setPromotionDiscription,
  setPromotionCustomerGroup,
  setPromotionCustomerType,
  setPromotionPtypeName,
  addPromotionProductMultiBuy,
  deletePromotionPM,
  setPromotionProductMultiBuy,
  updatePromotionProductMultiBuy,
  addPromotionProductMultiOrder,
  addPromotionProductMultiKM,
  deletePromotionProductMultiKM,
  updatePromotionProductMultiKM,
  deletePromotionProductMultiRow,
  updatePromotionProductMulti_khuyen_mai,
} = promotionSlice.actions;
export default promotionSlice.reducer;
