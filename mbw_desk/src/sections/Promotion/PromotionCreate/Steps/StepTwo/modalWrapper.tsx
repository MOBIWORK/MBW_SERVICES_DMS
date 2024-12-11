/** @format */

import { Modal } from "antd";
import ModalChooseItem, { DataType, Header } from "./modalChooseItem";
import React, { createContext, useContext, useEffect } from "react";
import { handleAddproduct, handleAddProductMulti } from "./components/AddPd";
import { RowData } from "./components/type";
import { chooseKey } from "@/util";
import { PdContext } from ".";
import { useSelector, useDispatch } from "react-redux";
import {
  addPromotionProduct,
  addPromotionProductDetail,
  addPromotionProductMultiBuy,
  updatePromotionProduct,
  setPromotionProductMultiBuy,
} from "@/redux/slices/promotion-slice";
import { CTKM_MULTI } from "@/constant";

export const ContextProm = createContext<any>({});
export function HandlePDPromotion(product: RowData) {
  return chooseKey({
    objectIn: product,
    keys: ["name", "item_name", "item_code", "so_luong", "unit", "stock_uom"],
  });
}

function WrapperModal() {
  const {
    handleDataPromotion: { data, setData },
    handleModal: { modalChoose, setModalC },
  } = useContext(PdContext);
  // const {promotionData: {ptype_name:promotionType}}  = useSelector((state: any) => state.promotion);
  const [selectedRowKeys, setSelectedRowKeys] = React.useState<DataType[]>([]);
  const [uqProduct, setUqProduct] = React.useState<{ [key: string]: any }>({});
  const [options, setOption] = React.useState<any[]>([]);

  const {
    promotionData: { ptype_value: promotionType },
  } = useSelector((state: any) => state.promotion);

  const [multiProduct, setMultiProduct] = React.useState<boolean>(false);

  useEffect(() => {
    CTKM_MULTI.includes(promotionType) && setMultiProduct(true);
  }, [promotionType]);

  const handleAddPd = React.useCallback(() => {
    let pdAdd = options.filter((pd) =>
      Object.keys(uqProduct).includes(pd.name)
    );

    pdAdd = pdAdd.map((pd) => ({ ...pd, ...uqProduct[pd.name] }));

    if (modalChoose.product_id != undefined) {
      setData(
        addPromotionProductDetail({
          indexRow: modalChoose.product_id,
          promotions: pdAdd.map((pd2) => HandlePDPromotion(pd2)),
        })
      );
    } else {
      if (multiProduct == true) {
        //ctkm mua nhieu
        setData(setPromotionProductMultiBuy(handleAddProductMulti(pdAdd)));
      } else {
        //ctkm mua mot
        setData(addPromotionProduct(pdAdd.map((pd) => handleAddproduct(pd))));
      }
    }
  }, [options, uqProduct, modalChoose.product_id, multiProduct]);

  return (
    <ContextProm.Provider
      value={{
        handleSelect: { selectedRowKeys, setSelectedRowKeys },
        handleAddPd,
        handleProduct: { uqProduct, setUqProduct },
        handleList: { options, setOption },
        handlePromotionType: { setMultiProduct, multiProduct },
      }}>
      <Modal
        width={1234}
        open={modalChoose.status}
        onCancel={setModalC.bind(null, {
          status: false,
          product_id: undefined,
        })}
        closeIcon={false}
        footer={false}
        title={<Header handleClose={setModalC.bind(null, false)} />}>
        <ModalChooseItem />
      </Modal>
    </ContextProm.Provider>
  );
}

export default WrapperModal;
