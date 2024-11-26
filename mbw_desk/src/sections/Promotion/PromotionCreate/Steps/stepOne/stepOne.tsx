/** @format */

import { useState, memo, useEffect } from "react";
import { SelectCommon } from "@/components";
import { useSelector, useDispatch } from "react-redux";
import dayjs from "dayjs";
import { DatePickerProps } from "antd/lib";
import { Helmet } from "react-helmet-async";
import Discription from "../../components/discription";
import { AxiosService } from "@/services/server";
import {
  Checkbox,
  CheckboxProps,
  DatePicker,
  Form,
  Input,
  InputNumber,
  message,
} from "antd";
import {
  PROMOTION_TYPE,
  PROMOTION_MULTI,
  PROMOTION_ONE,
  PROMOTION_STATUS,
  SHOWMUTIPLE,
  CTKM_SINGLE,
  CTKM_MULTI,
} from "@/constant";
import {
  setPromotionType,
  setPromotionCode,
  setPromotionName,
  setPromotionMultiple,
  setPromotionPriority,
  setPromotionEndDate,
  setPromotionGpromotion,
  setPromotionStartDate,
  setPromotionStatus,
  setPromotionPtypeValue,
  setPromotionDiscription,
  setPromotionPtypeName,
  deletePromotionProduct,
  setPromotionProduct,
  setPromotionProductMultiBuy,
} from "@/redux/slices/promotion-slice";
import { RootState } from "@/redux/store";
import { valueType } from "antd/es/statistic/utils";

const startOfMonth: any = dayjs().startOf("month");
const endOfMonth: any = dayjs().endOf("month");
let start = Date.parse(startOfMonth["$d"]) / 1000;
let end = Date.parse(endOfMonth["$d"]) / 1000;

const StepOne = () => {
  //Add thong tin chung
  const [fromDate, setFromDate] = useState(start);
  const [toDate, setToDate] = useState(end);
  const [promotion, setPromotion] = useState(PROMOTION_ONE);

  const [showMutiple, setShowMultiple] = useState<boolean>(false);
  const [showPriority, setShowPriority] = useState<boolean>(false);

  const [groupPromotion, setGroupPromotion] = useState();
  const [searchGroupPromotion, setSearchGroupPromotion] = useState<String>("");

  const {
    promotionData: {
      code,
      name_promotion,
      promotion_type,
      gpromotion,
      status,
      gpromotion_prioritize,
      multiple,
      ptype_value,
      description,
      start_date,
      end_date,
    },
  } = useSelector((state: RootState) => state.promotion);

  useEffect(() => {
    if (SHOWMUTIPLE.includes(ptype_value as string)) {
      setShowMultiple(true);
    } else {
      setShowMultiple(false);
    }
  }, [multiple]);

  useEffect(() => {
    gpromotion ? setShowPriority(true) : setShowPriority(false);
  }, [gpromotion]);
  useEffect(() => {
    (async () => {
      let grPromotion: any = await AxiosService.get(
        "/api/method/frappe.desk.search.search_link",
        {
          params: {
            txt: searchGroupPromotion,
            doctype: "SFA Group promotion",
            ignore_user_permissions: 0,
            query: "",
          },
        }
      );

      let { message: results } = grPromotion;
      setGroupPromotion(
        results.map((grPromotion: { value: string; description: string }) => ({
          value: grPromotion?.value,
          description: grPromotion?.description,
        }))
      );
    })();
  }, [setSearchGroupPromotion]);

  const dispatch = useDispatch();

  const hanlerSwitchPromotion = (value: string) => {
    dispatch(setPromotionPtypeValue(undefined));
    setShowMultiple(false);
    if (value === "0") {
      setPromotion(PROMOTION_ONE);
      dispatch(setPromotionType("0"));
    }
    if (value === "1") {
      setPromotion(PROMOTION_MULTI);
      dispatch(setPromotionType("1"));
    }
  };

  useEffect(() => {
    //   CTKM_SINGLE,
    // CTKM_MULTI,
    if (CTKM_SINGLE.includes(ptype_value as string)) {
      setPromotion(PROMOTION_ONE);
    }
    if (CTKM_MULTI.includes(ptype_value as string)) {
      setPromotion(PROMOTION_MULTI);
    }
  }, [ptype_value]);

  const handlerChangeMultiple: CheckboxProps["onChange"] = (e) => {
    dispatch(setPromotionMultiple(e.target.checked));
  };

  const handlerChangePromotion = (value: string) => {
    if (value) {
      dispatch(setPromotionPtypeValue(value));
      if (CTKM_SINGLE.includes(value)) {
        PROMOTION_ONE.forEach((item) => {
          if (item.value === value) {
            dispatch(setPromotionPtypeName(item.label));
          }
        });
      }
      if (CTKM_MULTI.includes(value)) {
        PROMOTION_MULTI.forEach((item) => {
          if (item.value === value) {
            dispatch(setPromotionPtypeName(item.label));
          }
        });
      }

      dispatch(deletePromotionProduct(false));
      dispatch(setPromotionProduct([]));
      dispatch(
        setPromotionProductMultiBuy({
          payload: [],
          viewPromotion: true,
        })
      );
    }

    // an hien input boi so
    if (SHOWMUTIPLE.includes(value)) {
      setShowMultiple(true);
    } else {
      setShowMultiple(false);
    }
  };

  const onChangeFromDate: DatePickerProps["onChange"] = (dateString: any) => {
    // if (toDate && dateString && dateString.isAfter(dayjs.unix(toDate), "day")) {
    //   message.error("Từ ngày phải nhỏ hơn hoặc bằng Đến ngày");
    // } else
    if (
      end_date &&
      dateString &&
      dateString.isAfter(dayjs(end_date as number, "YYYY-MM-DD").unix() * 1000)
    ) {
      message.error("Từ ngày phải nhỏ hơn hoặc bằng Đến ngày");
    } else {
      let fDate = Date.parse(dateString["$d"]) / 1000;
      dispatch(setPromotionStartDate(fDate));
      setFromDate(fDate);
    }
  };

  const onChangeToDate: DatePickerProps["onChange"] = (dateString: any) => {
    if (
      fromDate &&
      dateString &&
      dateString.isBefore(dayjs.unix(fromDate), "day")
    ) {
      message.error("Đến ngày phải lớn hơn hoặc bằng Từ ngày");
    } else if (
      start_date &&
      dateString &&
      dateString.isBefore(
        dayjs(start_date as number, "YYYY-MM-DD").unix() * 1000
      )
    ) {
      message.error("Đến ngày phải lớn hơn hoặc bằng Từ ngày");
    } else {
      let tDate = Date.parse(dateString["$d"]) / 1000;
      dispatch(setPromotionEndDate(tDate));
      setToDate(tDate);
    }
  };

  const disabledEndDate = (current: any) => {
    return current && current < dayjs().startOf("day");
  };

  return (
    <>
      <Helmet>
        <title>Thông tin chung</title>
      </Helmet>
      <Form layout="vertical">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 overflow-y-auto">
          <Form.Item className="w-[90%] border-none" label={"Mã chương trình"}>
            <Input
              maxLength={20}
              className="border-none outline-none bg-[#F4F6F8]"
              onChange={(e) =>
                dispatch(setPromotionCode(e.target.value.trim()))
              }
              value={code as valueType}
            />
          </Form.Item>
          <Form.Item className="w-[90%] border-none" label={"Tên chương trình"}>
            <Input
              className="border-none outline-none bg-[#F4F6F8]"
              maxLength={80}
              onChange={(e) => dispatch(setPromotionName(e.target.value))}
              value={name_promotion as valueType}
            />
          </Form.Item>
          <Form.Item className="w-[90%] xl:block hidden" label="Trạng thái">
            <SelectCommon
              filterOption={true}
              allowClear={false}
              showSearch
              placeholder="Tất cả"
              defaultValue={"Hoạt động"}
              options={PROMOTION_STATUS}
              value={status}
              onChange={(value) => dispatch(setPromotionStatus(value))}
            />
          </Form.Item>

          <Form.Item className="w-[90%]" label={"Loại hình thức khuyến mại"}>
            <SelectCommon
              filterOption={true}
              defaultValue={"0"}
              allowClear
              showSearch
              placeholder="Tất cả"
              options={PROMOTION_TYPE}
              onChange={(value) => hanlerSwitchPromotion(value as string)}
              value={promotion_type}
            />
          </Form.Item>

          <Form.Item className="w-[90%] mb-0" label={"Hình thức khuyến mại"}>
            <SelectCommon
              filterOption={true}
              allowClear={false}
              showSearch
              placeholder="Tất cả"
              options={promotion}
              value={ptype_value}
              onChange={(value, option) => {
                handlerChangePromotion(value as string);
              }}
              onClear={() => {
                dispatch(setPromotionPtypeValue(undefined));
                dispatch(setPromotionProduct([]));
              }}
            />
          </Form.Item>

          <Form.Item className="w-[90%] mt-5 md:mt-0" label={"Nhóm CTKM"}>
            <SelectCommon
              filterOption={true}
              allowClear
              showSearch
              placeholder="Tất cả"
              options={groupPromotion}
              value={gpromotion}
              onChange={(value) => dispatch(setPromotionGpromotion(value))}
              onClear={() => {}}
            />
          </Form.Item>

          {showMutiple && (
            <Form.Item className="w-[90%]" label="">
              <Checkbox
                checked={multiple === 0 || multiple === false ? false : true}
                className="mt-2 font-bold  text-[14px] leading-5"
                onChange={handlerChangeMultiple}>
                Bội số
              </Checkbox>
              <p className="text-xs text-[#637381] ml-6">
                (Ví dụ : Chọn : mua 5 tặng 1 và mua 10 tặng 2 -- Không chọn :
                mua 5 tặng 1 và mua 10 tặng 1)
              </p>
            </Form.Item>
          )}
          {showPriority && (
            <Form.Item className="w-[90%] " label={"Độ ưu tiên"}>
              <InputNumber
                controls={false}
                className="border-none outline-none bg-[#F4F6F8] w-full"
                min={0}
                value={gpromotion_prioritize as valueType}
                onChange={(value) => dispatch(setPromotionPriority(value))}
              />
            </Form.Item>
          )}

          <Form.Item className="w-[90%] xl:hidden" label={"Ngày bắt đầu"}>
            <DatePicker
              format={"DD-MM-YYYY"}
              className="!bg-[hsl(210,22%,96%)] w-full rounded-lg h-7"
              onChange={onChangeFromDate}
              allowClear={false}
              value={
                typeof start_date === "string"
                  ? dayjs(start_date)
                  : typeof start_date === "number"
                  ? dayjs.unix(start_date)
                  : undefined
              }
              defaultValue={
                typeof start_date === "number" ? startOfMonth : undefined
              }
            />
          </Form.Item>
        </div>
        <div className="xl:flex">
          <div className="xl:w-[33%] md:w-[50%]">
            <Form.Item
              className="w-[90%] hidden xl:block"
              label={"Ngày bắt đầu"}>
              <DatePicker
                format={"DD-MM-YYYY"}
                className="!bg-[#F4F6F8] w-full rounded-lg h-7"
                onChange={onChangeFromDate}
                allowClear={false}
                value={
                  typeof start_date === "string"
                    ? dayjs(start_date)
                    : typeof start_date === "number"
                    ? dayjs.unix(start_date)
                    : undefined
                }
                defaultValue={
                  typeof start_date === "number" ? startOfMonth : undefined
                }
              />
            </Form.Item>
            <Form.Item className="w-[90%]" label={"Ngày kết thúc"}>
              <DatePicker
                format={"DD-MM-YYYY"}
                className="!bg-[#F4F6F8] w-full rounded-lg h-7"
                onChange={onChangeToDate}
                disabledDate={disabledEndDate}
                allowClear={false}
                value={
                  typeof end_date === "string"
                    ? dayjs(end_date)
                    : typeof end_date === "number"
                    ? dayjs.unix(end_date)
                    : undefined
                }
                defaultValue={
                  typeof end_date === "number" ? endOfMonth : undefined
                }
              />
            </Form.Item>
          </div>
          <div className="flex-1 ml-2 mr-8 2xl:mr-12">
            <Discription
              setPromotionDiscription={setPromotionDiscription}
              value={description}
            />
          </div>
        </div>
      </Form>
    </>
  );
};

export default memo(StepOne);
