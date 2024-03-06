import { UserOutlined } from "@ant-design/icons";
import { Avatar, Badge } from "antd";
import React from "react";
import { Bag } from "../../icons/bag";
import { Clock } from "../../icons/clock";
import { Pin } from "../../icons/pin";
import data from "./datamonitor/dataunactive.json";

export default function CardUnActive() {
  console.log("data", data);

  return (
    <>
      {data &&
        data.length > 0 &&
        data.map((rsData) => {
          return (
            <>
              <div className="pt-5 border-[#DFE3E8] border-b-[1px] border-x-0 border-t-0 border-solid">
                <div className="flex mx-3">
                  <Badge
                    dot
                    color="rgb(169,169,169)"
                    style={{
                      position: "absolute",
                      bottom: 0,
                      right: 2,
                      transform: "translate(30%, 355%)",
                      fontSize: "10px",
                      width: "10px",
                      height: "10px",
                    }}
                  >
                    <Avatar
                      src={rsData.urlImg}
                      size={48}
                      icon={<UserOutlined />}
                    />
                  </Badge>
                  <div className="ml-2">
                    <div className="text-[#212B36] font-medium leading-[21px] text-sm">
                      {rsData.customer_name} - {rsData.customer_code}
                    </div>
                    <div className="flex items-center h-5">
                      <Bag size={16} />
                      <p className="font-normal text-sm leading-[21px] text-[#637381] ml-2">
                        [{rsData.department}]
                      </p>
                    </div>
                    <div className="flex items-center h-5">
                      <Clock size={16} />
                      <p className="font-normal text-sm leading-[21px] text-[#637381] ml-2">
                        {rsData.status}
                      </p>
                    </div>
                    <div className="flex items-center h-5">
                      <Pin size={16} />
                      <p className="font-normal text-sm leading-[21px] text-[#637381] ml-2">
                      {rsData.pin}%
                      </p>
                    </div>
                  </div>
                </div>
                <div className="rounded-lg my-4 bg-[#F4F6F8]  h-auto">
                  <div className="flex p-2">
                    <div className="flex-1 border mr-2">
                      <div className="text-center text-[#637381] font-normal text-xs leading-[21px]">
                        Viếng thăm
                      </div>
                      <div className="text-center font-medium text-sm leading-[21px] text-[#212B36] pt-1">
                      {rsData.viengtham}
                      </div>
                    </div>
                    <div className="flex-1 border mr-2">
                      <div className="text-center text-[#637381] font-normal text-xs leading-[21px]">
                        Đơn đặt hàng
                      </div>
                      <div className="text-center font-medium text-sm leading-[21px] text-[#212B36] pt-1">
                      {rsData.order}
                      </div>
                    </div>
                    <div className="flex-1 border mr-2">
                      <div className="text-center text-[#637381] font-normal text-xs leading-[21px]">
                        Doanh số
                      </div>
                      <div className="text-center font-medium text-sm leading-[21px] text-[#212B36] pt-1">
                        {Intl.NumberFormat().format(rsData.doanhso)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        })}
    </>
  );
}
