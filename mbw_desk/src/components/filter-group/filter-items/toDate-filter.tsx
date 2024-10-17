/** @format */

import { Col, DatePicker, message } from "antd";
import { DatePickerProps } from "antd/lib";
import dayjs from "dayjs";
import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";
import { setEndDate } from "@/redux/slices/date-slice";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { mediaQuery } from "@/constant";
import { useEffect } from "react";

const endOfMonth: any = dayjs().endOf("month");

export const ToDateFilter = () => {
  const dispath = useDispatch();
  const { startDate, endDate } = useSelector((state: any) => state.date);

  useEffect(() => {
    dispath(setEndDate(Date.parse(endOfMonth["$d"]) / 1000));
  }, []);
  const disabledEndDate = (current: any) => {
    if (startDate) {
      const startMonth = dayjs.unix(startDate).month();
      return current && current.month() !== startMonth;
    }
  };
  const onChange1: DatePickerProps["onChange"] = (dateString: any) => {
    if (dateString === null || dateString === undefined) {
      dispath(setEndDate(dateString));
    } else if (
      startDate &&
      dateString &&
      dateString.isBefore(dayjs.unix(startDate), "day")
    ) {
      message.error("Đến ngày phải lớn hơn hoặc bằng Từ ngày");
    } else {
      let tDate = Date.parse(dateString["$d"]) / 1000;
      dispath(setEndDate(tDate));
    }
  };
  const matchMedia = useMediaQuery(`${mediaQuery}`);

  const value = dayjs(endDate * 1000);

  return (
    <Col className={`min-w-[130px] ${matchMedia ? "w-full" : " w-[20%]"}`}>
      <label className="text-xs font-normal leading-[21px] pl-1 ">
        Đến ngày
      </label>
      <DatePicker
        format={"DD-MM-YYYY"}
        className="!bg-[#F4F6F8] w-full rounded-lg h-7"
        onChange={onChange1}
        placeholder="Đến ngày"
        defaultValue={endOfMonth}
        disabledDate={disabledEndDate}
        value={value}
        allowClear={false}
      />
    </Col>
  );
};
