import React from "react";
import { FormItemCustom, HeaderPage, TableCustom } from "../../components";
import { Avatar, Badge, Input } from "antd";
import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import { Bag } from "../../icons/bag";
import { Clock } from "../../icons/clock";
import { Pin } from "../../icons/pin";
import CardActive from "./card-active";

export default function ActiveEmployee() {
  return (
    <>
      <div className="border-[#DFE3E8] border-b-[1px] border-x-0 border-t-0 border-solid">
        <FormItemCustom className="w-full border-none pr-4 pb-3">
          <Input
            className="!bg-[#F4F6F8]"
            placeholder="Tìm kiếm sản phẩm"
            prefix={<SearchOutlined />}
          />
        </FormItemCustom>
      </div>

      <div className="overscroll-none h-[70vh] overflow-y-scroll">
        <CardActive/>
      </div>
    </>
  );
}
