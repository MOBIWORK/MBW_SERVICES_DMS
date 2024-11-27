/** @format */

import {
  CopyOutlined,
  DeleteOutlined,
  FormOutlined,
  LeftOutlined,
} from "@ant-design/icons/";
import { Button, Modal } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  clearPromotion,
  setPromotionPtypeName,
} from "@/redux/slices/promotion-slice";
import { setMessage } from "@/redux/slices/message-slice";
import { changeDataProduc, validateField } from "../validateField";
import { AxiosService } from "@/services/server";
import dayjs from "dayjs";
import {
  CTKM_MULTI,
  CTKM_SINGLE,
  PROMOTION_MULTI,
  PROMOTION_ONE,
} from "@/constant";

type HeaderPromotionProps = {
  idPromotion: string | undefined;
  promotionData: PromotionProps;
  setCurrentStep: (value: number) => void;
  showMessage: (message: string, type: "success" | "error") => void;
  typePromotion: "MULTI" | "SINGLE";
};
const HeaderPromotion = ({
  idPromotion,
  promotionData,
  setCurrentStep,
  showMessage,
  typePromotion,
}: HeaderPromotionProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isModalOpenCancel, setIsModalOpenCancel] = useState(false);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);

  const handleOkCancel = () => {
    setIsModalOpenCancel(false);
    dispatch(clearPromotion(""));
    navigate("/promotion");
  };

  const handleOkDelete = async () => {
    const reposone = await AxiosService.patch(
      "/api/method/mbw_dms.api.promotion.promotion.delete_multi",
      {
        name: [idPromotion],
        is_deleted: 1,
      }
    );

    if (reposone.result == true) {
      dispatch(setMessage({ message: reposone.message, type: "success" }));
      navigate("/promotion");
    } else {
      dispatch(setMessage({ message: reposone.message, type: "error" }));
    }
    setIsModalOpenDelete(false);
  };

  const handleCancel = () => {
    setIsModalOpenCancel(false);
  };

  const handleCancelDelete = () => {
    setIsModalOpenDelete(false);
  };

  const handlerBackButton = () => {
    !idPromotion
      ? setIsModalOpenCancel(true)
      : (navigate("/promotion"), dispatch(clearPromotion("")));
  };

  const handlerEditPromotion = async () => {
    try {
      const errorSubmit = validateField(promotionData);
      const products = changeDataProduc(typePromotion, promotionData);

      if (!errorSubmit) {
        const reponse = await AxiosService.patch(
          "/api/method/mbw_dms.api.promotion.update_promotion",
          {
            ...promotionData,
            products_buy_multi: undefined,
            products,
            customers: promotionData.customers.map(customer => {
              let newcus:any = {...customer}
              delete newcus.name
              return ({...newcus})
            }),
            name: idPromotion,
            start_date: dayjs(promotionData.start_date as number).valueOf(),
            end_date: dayjs(promotionData.end_date as number).valueOf(),
          }
        );
        if (reponse.result === true) {
          dispatch(
            setMessage({
              message: "Cập nhật thành công chương trình khuyến mại!!!",
              type: "success",
            })
          );

          navigate("/promotion");
        }
      } else {
        // co loi thi show loi len
        showMessage(errorSubmit, "error");
      }
    } catch (err: any) {
      console.log(err, ": Error Update");
      const errorMessage = err ? err : "Có lỗi xẩy ra!!!";
      showMessage(errorMessage, "error");
    }
  };

  const hanldedulicatePromotion = async () => {
    if (CTKM_SINGLE.includes(promotionData.ptype_value as string)) {
      PROMOTION_ONE.forEach((item) => {
        if (item.value === promotionData.ptype_value) {
          dispatch(setPromotionPtypeName(item.label));
        }
      });
    }
    if (CTKM_MULTI.includes(promotionData.ptype_value as string)) {
      PROMOTION_MULTI.forEach((item) => {
        if (item.value === promotionData.ptype_value) {
          dispatch(setPromotionPtypeName(item.label));
        }
      });
    }
    navigate("/promotion/promotion-create");
  };

  return (
    <div className="flex justify-between my-2 mr-6">
      <div className="flex items-center ml-4">
        <Button onClick={handlerBackButton} className="border-none">
          <LeftOutlined className="text-[#ABABAB] hover:text-[#1f1c1c]" />
        </Button>
        <p className="font-semibold text-lg">
          {idPromotion ? "Thêm chương trình" : "Chương trình khuyến mại"}
        </p>
      </div>
      {idPromotion && (
        <div className="flex items-center gap-2">
          <Button
            onClick={handlerEditPromotion}
            type="primary"
            className="border-none w-[113px] h-[28px] bg-[#1877F2] rounded-lg text-white hover:bg-blue-500">
            <FormOutlined className="text-[#FFFFFF]" /> Cập nhật
          </Button>
          <Button
            onClick={hanldedulicatePromotion}
            type="primary"
            className="border-none w-[113px] h-[28px] bg-[#1877F2] rounded-lg text-white hover:bg-blue-500">
            <CopyOutlined className="text-[#FFFFFF]" /> Nhân bản
          </Button>
          <Button
            onClick={() => setIsModalOpenDelete(true)}
            type="primary"
            danger
            className="border-none w-[75px] h-[28px] bg-[#1877F2] rounded-lg text-white hover:bg-blue-500">
            <DeleteOutlined className="text-[#FFFFFF]" /> Xóa
          </Button>
        </div>
      )}

      <Modal
        title="Hủy thêm chương trình?"
        open={isModalOpenCancel}
        onOk={handleOkCancel}
        okText="Xác nhận hủy"
        cancelText="Quay lại"
        onCancel={handleCancel}>
        <p className="text-[#637381] text-base font-normal">
          Khi xác nhận hủy, mọi dữ liệu bạn nhập sẽ bị xóa và sẽ không thể khôi
          phục lại
        </p>
      </Modal>

      <Modal
        title="Xóa chương trình khuyến mại?"
        open={isModalOpenDelete}
        onOk={handleOkDelete}
        okText="Xác nhận xóa"
        cancelText="Quay lại"
        onCancel={handleCancelDelete}>
        <p className="text-[#637381] text-base font-normal">
          Bạn có muốn xóa chương trình khuyến mại này không
        </p>
      </Modal>
    </div>
  );
};

export default HeaderPromotion;
