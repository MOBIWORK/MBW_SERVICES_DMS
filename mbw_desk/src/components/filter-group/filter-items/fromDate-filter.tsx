/** @format */

import { Col, DatePicker, message } from "antd";
import { DatePickerProps } from "antd/lib";
import dayjs from "dayjs";
import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";
import { setStartDate } from "@/redux/slices/date-slice";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { mediaQuery } from "@/constant";

const startOfMonth: any = dayjs().startOf("month");

export const FromDateFilter = () => {
  const dispath = useDispatch();
  const { endDate } = useSelector((state: any) => state.date);
  const matchMedia = useMediaQuery(`${mediaQuery}`);

  const onChange: DatePickerProps["onChange"] = (dateString: any) => {
    if (dateString === null || dateString === undefined) {
      dispath(setStartDate(dateString));
    }
    // } else if (
    //   endDate &&
    //   dateString &&
    //   dateString.isAfter(dayjs.unix(endDate), "day")
    // ) {
    //   message.error("Từ ngày phải nhỏ hơn hoặc bằng Đến ngày");
    // }
    else {
      let fDate = Date.parse(dateString["$d"]) / 1000;
      dispath(setStartDate(fDate));
    }
  };
  const disabledStartDate = (current: any) => {
    return endDate
      ? current && current.isAfter(dayjs.unix(endDate), "day")
      : false;
  };

  return (
    <Col className={`min-w-[130px]  ${matchMedia ? "w-full" : " w-[20%]"}`}>
      <label className="text-xs font-normal leading-[21px] pl-1 ">
        Từ ngày
      </label>
      <DatePicker
        format={"DD-MM-YYYY"}
        className="!bg-[#F4F6F8] w-full rounded-lg h-7"
        placeholder="Từ ngày"
        onChange={onChange}
        defaultValue={startOfMonth}
        // disabledDate={disabledStartDate}
        allowClear={false}
      />
    </Col>
  );
};
