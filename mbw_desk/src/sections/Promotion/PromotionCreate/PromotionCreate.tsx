/** @format */

import { ContentFrame } from "@/components";
import React, { useContext, useEffect, useState } from "react";
import HeaderPromotion from "./components/headerPromotion";
import { Button, message, Steps } from "antd";
import { chooseKey, transformDataPromotion } from "@/util";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import StepOne from "./Steps/stepOne/stepOne";
import StepFourth from "./Steps/StepFourth";
import classNames from "classnames";
import StepTwo from "./Steps/StepTwo";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { NoticeType } from "antd/es/message/interface";
import {
  clearPromotion,
  setPromotionProductMultiBuy,
  setPromotionTerritory,
} from "@/redux/slices/promotion-slice";
import { AxiosService } from "@/services/server";
import { useNavigate, useParams } from "react-router-dom";
import {
  setPromotionType,
  setPromotionCode,
  setPromotionName,
  setPromotionMultiple,
  setPromotionPriority,
  // setPromotionCustomer,
  // setPromotionChooseCustomer,
  setPromotionEndDate,
  setPromotionGpromotion,
  // setPromotionProduct,
  setPromotionStartDate,
  setPromotionStatus,
  setPromotionPtypeValue,
  setPromotionDiscription,
  setPromotionCustomerGroup,
  setPromotionCustomerType,
  setPromotionProduct,
  setPromotionCustomer,
} from "@/redux/slices/promotion-slice";
import { changeDataProduc, validateField } from "./validateField";
import { CTKM_MULTI, CTKM_SINGLE } from "@/constant";
const steps = [
  {
    title: "Thông tin chung",
    // status: "process",
    description: "Thông tin chương trình",
    content: <StepOne />,
  },
  {
    title: "Chi tiết khuyến mại",
    description: "Chọn sản phẩm",
    // status: "wait",
    content: <StepTwo />,
  },

  {
    title: "Danh sách khách hàng",
    description: "Chọn khách hàng",
    // status: "wait",
    content: <StepFourth />,
  },
];
const items = steps.map((step) => ({
  ...chooseKey({ objectIn: step, keys: ["title", "description", "status"] }),
}));

// const startOfMonth: any = dayjs().startOf("month");
// const endOfMonth: any = dayjs().endOf("month");
// let start = Date.parse(startOfMonth["$d"]) / 1000;
// let end = Date.parse(endOfMonth["$d"]) / 1000;

const PromotionCreate = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [currentStep, setCurrentStep] = useState<number>(0);

  const { type } = useParams();
  const dispatch = useDispatch();

  const idPromotion = type === "promotion-create" ? undefined : type;

  const onChange = (value: number) => {
    setCurrentStep(value);
  };
  const mediaQuery = useMediaQuery("(max-width: 767px)");

  const { promotionData } = useSelector((state: RootState) => state.promotion);

  const [typePromotion, setTypePromotion] = useState<"MULTI" | "SINGLE">(
    "SINGLE"
  );

  useEffect(() => {
    if (
      promotionData.ptype_value &&
      CTKM_MULTI.includes(promotionData.ptype_value as string)
    ) {
      setTypePromotion("MULTI");
    }

    if (
      promotionData.ptype_value &&
      CTKM_SINGLE.includes(promotionData.ptype_value as string)
    ) {
      setTypePromotion("SINGLE");
    }
  }, [promotionData.ptype_value]);
  const showMessage = (message: String, type: NoticeType) => {
    messageApi.open({
      type,
      content: message,
    });
  };

  const navigate = useNavigate();
  const handleSubmitPromotion = async () => {
    const errorSubmit = validateField(promotionData);

    const products = changeDataProduc(typePromotion, promotionData);
    //them moi CTKM
    if (!errorSubmit) {
      //neu khong co loi thi chay try-catch
      try {
        await AxiosService.post(
          "/api/method/mbw_dms.api.promotion.create_promotion",
          {
            ...promotionData,
            products_buy_multi: undefined,
            products,
          }
        );

        dispatch(clearPromotion(""));
        navigate("/promotion");
      } catch (err: any) {
        const errorMessage = err ? err : "Có lỗi xẩy ra!!!";

        showMessage(errorMessage, "error");
      }
    } else {
      // co loi thi show loi len
      showMessage(errorSubmit, "error");
    }
  };

  React.useEffect(() => {
    //get CTKM view len
    (async () => {
      if (idPromotion) {
        let promotion = await AxiosService.get(
          "/api/method/mbw_dms.api.promotion.promotion.get_list_promotion",
          {
            params: {
              name: idPromotion,
            },
          }
        );
        let { result } = promotion;

        const data = result?.data[0];

        dispatch(setPromotionCode(data.code));
        dispatch(setPromotionName(data.name_promotion));
        dispatch(setPromotionType(data.promotion_type));
        dispatch(setPromotionGpromotion(data.gpromotion));
        dispatch(setPromotionMultiple(data.multiple));
        dispatch(setPromotionStatus(data.status));
        dispatch(setPromotionCustomerGroup(data.customer_group));
        dispatch(setPromotionCustomerType(data.customer_type));
        dispatch(setPromotionDiscription(data.description));
        dispatch(setPromotionEndDate(data.end_date));
        dispatch(setPromotionStartDate(data.start_date));
        dispatch(setPromotionPtypeValue(data.ptype_value));
        dispatch(setPromotionPriority(data.gpromotion_prioritize));
        dispatch(setPromotionCustomer(data.customers));
        dispatch(setPromotionTerritory(data.territory));

        if (CTKM_MULTI.includes(data.ptype_value as string)) {
          dispatch(
            setPromotionProductMultiBuy({
              payload: transformDataPromotion(data.products, data.ptype_value),
              viewPromotion: true,
            })
          );
        }
        if (CTKM_SINGLE.includes(data.ptype_value as string)) {
          dispatch(
            setPromotionProduct(
              transformDataPromotion(data.products, data.ptype_value)
            )
          );
        }

        //bien doi data product
        // dispatch(
        //   setPromotionProduct(
        //     transformDataPromotion(data.products, data.ptype_value)
        //   )
        // );
      }
    })();
  }, [idPromotion]);
  return (
    <ContentFrame
      header={
        <HeaderPromotion
          idPromotion={idPromotion}
          promotionData={promotionData}
          setCurrentStep={setCurrentStep}
          showMessage={showMessage}
          typePromotion={typePromotion}
        />
      }>
      {contextHolder}
      <div className="bg-white px-[27px] pb-4 border border-solid rounded-2xl border-[#DFE3E8] ">
        <Steps
          className="mx-auto lg:w-[70%] pt-[40px] pb-5"
          current={currentStep}
          onChange={onChange}
          items={items}
          direction={mediaQuery ? "vertical" : "horizontal"}
        />
        {steps.map((step, index) => {
          return (
            <div
              key={index.toString()}
              className={classNames(currentStep != index && "hidden")}>
              {step.content}
            </div>
          );
        })}
        <div className="flex justify-end m-10 gap-4">
          {currentStep > 0 && (
            <Button
              type="default"
              onClick={() => setCurrentStep((prev) => prev - 1)}
              className="px-4">
              <ArrowLeftOutlined /> Quay lại
            </Button>
          )}
          {currentStep < 2 && (
            <Button
              type="primary"
              onClick={() => setCurrentStep((prev) => prev + 1)}>
              Tiếp tục <ArrowRightOutlined />
            </Button>
          )}

          {/* {currentStep == 2 && (
          )} */}
          {!idPromotion && currentStep == 2 && (
            <Button type="primary" onClick={handleSubmitPromotion}>
              {idPromotion ? "Cập nhật" : "Hoàn Thành"} <CheckOutlined />
            </Button>
          )}
        </div>
      </div>
    </ContentFrame>
  );
};

export default PromotionCreate;
