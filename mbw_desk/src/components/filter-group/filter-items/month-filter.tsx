/** @format */

import { Col } from "antd";
import { SelectCommon } from "../../select/select";
import { mediaQuery, monthAll } from "../../../constant";
import { setMonth } from "@/redux/slices/month-slice";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";
import { useMediaQuery } from "@/hooks/useMediaQuery";
interface MonthFilterProps {
  setPage?: (value: number) => void;
}

const month = (dayjs().month() + 1).toString();

export const MonthFilter = ({ setPage }: MonthFilterProps) => {
  const dispatch = useDispatch();
  const matchMedia = useMediaQuery(`${mediaQuery}`);

  return (
    <Col className={`min-w-[130px] ${matchMedia ? "w-full" : " w-[20%]"}`}>
      <label className="text-xs font-normal leading-[21px] pl-1 ">Tháng</label>
      <SelectCommon
        className="!bg-[#F4F6F8] "
        defaultValue={month}
        options={monthAll}
        onChange={(value: string) => {
          dispatch(setMonth(value));
          setPage && setPage(1);
        }}
      />
    </Col>
  );
};
