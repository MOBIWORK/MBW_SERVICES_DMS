import React, { useState } from "react";
import { FormItemCustom, HeaderPage, TableCustom } from "../../components";
import { VerticalAlignBottomOutlined } from "@ant-design/icons";
import { DatePicker, Select, message } from "antd";
import { arrayDays } from "../../util";
import dayjs from "dayjs";

const { Column, ColumnGroup } = TableCustom;
const { RangePicker } = DatePicker;

export default function ReportDistance() {
  const [selectedRange, setSelectedRange] = useState([]);
  const [dateColumn, setDateColumn] = useState<any[]>([])

  const handleRangeChange = (dates) => {
    setSelectedRange(dates);
    if (dates.length === 2) {
      const [start, end] = dates;
      const dateObjects = arrayDays(start, end);
      setDateColumn(dateObjects);
    }
  };

  // const [selectedRange, setSelectedRange] = useState([]);

  // const handleRangeChange = (dates) => {
  //   setSelectedRange(dates);
  //   const startDate = dayjs(dates[0]);
  //   const endDate = dayjs(dates[1]);
  //   const dateObjects = generateDateObjects(startDate, endDate);
  //   console.log(dateObjects);
  // };

  // const generateDateObjects = (startDate, endDate) => {
  //   const dateObjects = [];
  //   let currentDate = startDate;

  //   while (currentDate.isBefore(endDate) || currentDate.isSame(endDate, 'day')) {
  //     dateObjects.push({
  //       date: currentDate.format('DD/MM/YYYY'),
  //       dayOfWeek: currentDate.format('dddd')
  //     });
  //     currentDate = currentDate.add(1, 'day');
  //   }

  //   return dateObjects;
  // };

  return (
    <>
      <HeaderPage
        title="Báo cáo tổng hợp cự ly di chuyển từng nhân viên (km)"
        buttons={[
          {
            label: "Xuất dữ liệu",
            type: "primary",
            icon: <VerticalAlignBottomOutlined className="text-xl" />,
            size: "20px",
            className: "flex items-center",
          },
        ]}
      />
      <div className="bg-white rounded-md py-7 px-4 border-[#DFE3E8] border-[0.2px] border-solid">
        {/* filter */}
        <div className="flex justify-start items-center">
          <FormItemCustom className="w-[200px] border-none mr-2">
            <Select
              className="!bg-[#F4F6F8] options:bg-[#F4F6F8]"
              defaultValue={""}
              options={[{ label: "Phòng/nhóm", value: "" }]}
              showSearch
              notFoundContent={null}
            />
          </FormItemCustom>
          <FormItemCustom className="w-[200px] border-none mr-2">
            <Select
              className="!bg-[#F4F6F8] options:bg-[#F4F6F8]"
              defaultValue={""}
              options={[{ label: "Thông tin giám sát", value: "" }]}
              showSearch
              notFoundContent={null}
            />
          </FormItemCustom>
          <FormItemCustom className="w-[200px] border-none mr-2">
            <Select
              className="!bg-[#F4F6F8] options:bg-[#F4F6F8]"
              defaultValue={""}
              options={[{ label: "Thứ trong tuần", value: "" }]}
              showSearch
              notFoundContent={null}
            />
          </FormItemCustom>
          <FormItemCustom className="w-[200px] border-none mr-2">
            <Select
              className="!bg-[#F4F6F8] options:bg-[#F4F6F8]"
              defaultValue={""}
              options={[{ label: "Loại di chuyển", value: "" }]}
              showSearch
              notFoundContent={null}
            />
          </FormItemCustom>
          <FormItemCustom className="w-[250px] border-none mr-2">
            {/* <Select
              className="!bg-[#F4F6F8] options:bg-[#F4F6F8]"
              defaultValue={""}
              options={[{ label: "Từ ngày đến ngày", value: "" }]}
              showSearch
              notFoundContent={null}
            /> */}
            <RangePicker
              onChange={handleRangeChange}
              value={selectedRange}
              placeholder={["Từ ngày", "Đến ngày"]}
              className="!bg-[#F4F6F8] !h-8"
              format={"DD/MM/YYYY"}
            />
          </FormItemCustom>
        </div>
        {/* end filter */}

        table
        <div className="pt-5">
          <TableCustom bordered scroll={{ x: true }}>
            <Column
              title="STT"
              dataIndex="stt"
              key="stt"
              width={60}
              render={(_: any, record: any, index: number) => index + 1}
            />
            <Column
              title="Mã thị trường/nhân viên"
              dataIndex="employee_code"
              key="employee_code"
              width={177}
            />
            <Column
              title="Thị trường /nhân viên"
              dataIndex="employee_name"
              key="employee_name"
              width={177}
            />
            {/* ngày  */}
            {dateColumn.map((dColumn) => <ColumnGroup
              key={dColumn.date}
              className="!whitespace-normal"
              width={180}
              title={`Ngày ${dayjs(dColumn.date,"DD/MM/YYYY").date()}`}
            >
              <ColumnGroup title={dColumn.dayOfWeek}>
                <Column
                  title="Viếng thăm"
                  dataIndex="checkin_1"
                  key="checkin_1"
                />
                <Column title="Tự động" dataIndex="auto_1" key="auto_1" />
              </ColumnGroup>
            </ColumnGroup>)}
          
            {/* kết thúc ngày */}
            
            <ColumnGroup title="Bình quân/ngày" width={190}>
              <Column
                title="Viếng thăm"
                dataIndex="checkin_3"
                key="checkin_2"
              />
              <Column title="Tự động" dataIndex="auto_3" key="auto_3" />
              {/* <ColumnGroup title="">
               
              </ColumnGroup> */}
            </ColumnGroup>
            {/* <ColumnGroup>
            </ColumnGroup> */}
            <ColumnGroup title="Tổng cộng" width={190}>
              <Column
                title="Viếng thăm"
                dataIndex="checkin_4"
                key="checkin_4"
              />
              <Column title="Tự động" dataIndex="auto_4" key="auto_4" />
            </ColumnGroup>
          </TableCustom>
        </div>
      </div>
    </>
  );
}
