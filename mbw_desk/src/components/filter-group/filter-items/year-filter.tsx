/** @format */

import { Col, DatePicker } from "antd";
import { DatePickerProps } from "antd/lib";
import dayjs from "dayjs";
import { setYear } from "@/redux/slices/month-slice";
import { useDispatch } from "react-redux";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { mediaQuery } from "@/constant";

export const YearFilter = () => {
  const dispatch = useDispatch();
  const onChange: DatePickerProps["onChange"] = (date: any) => {
    dispatch(setYear(date?.["$y"].toString()));
  };
  const matchMedia = useMediaQuery(`${mediaQuery}`);

  return (
    <Col className={`min-w-[130px] ${matchMedia ? "w-full" : " w-[20%]"}`}>
      <label className="text-xs font-normal leading-[21px] pl-1 ">Năm</label>
      <DatePicker
        className="!bg-[#F4F6F8] w-full rounded-lg h-7"
        onChange={onChange}
        placeholder="Chọn năm"
        picker="year"
        allowClear={false}
        defaultValue={dayjs().startOf("year")}
      />
    </Col>
  );
};
