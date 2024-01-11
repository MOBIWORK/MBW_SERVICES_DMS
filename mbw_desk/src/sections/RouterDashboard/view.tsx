import { IoIosMenu } from "react-icons/io";
import { VscAdd } from "react-icons/vsc";
import { LuUploadCloud } from "react-icons/lu";
import { LiaDownloadSolid } from "react-icons/lia";
import { LuFilter, LuFilterX } from "react-icons/lu";
import { PiSortAscendingBold } from "react-icons/pi";
import { Table, Button, Input, Select } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { useState } from "react";
import { FormItemCustom } from "../../components/form-item";
import { TableCustom } from '../../components'

interface DataType {
  key: React.Key;
  codeRouter: string;
  nameRouter: string;
  nvbh: string;
  status: string;
  created: string;
  usercreated: string;
  updated: string;
  userupdated: string;
}

const columns= [
  
  {
    title: "Mã tuyến",
    dataIndex: "codeRouter",
  },
  {
    title: "Tên tuyến",
    dataIndex: "nameRouter",
  },
  {
    title: "NVBH",
    dataIndex: "nvbh",
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
  },
  {
    title: "Ngày tạo",
    dataIndex: "created",
  },
  {
    title: "Người tạo",
    dataIndex: "usercreated",
  },
  {
    title: "Ngày cập nhật",
    dataIndex: "updated",
  },
  {
    title: "Người cập nhật",
    dataIndex: "userupdated",
  },
];

const data: DataType[] = [
  {
    key: "1",
    codeRouter: "John",
    nameRouter: "Brown",
    nvbh: "unasd",
    status: "New York No. 1 Lake Park",
    created: "222",
    usercreated: "12313",
    updated: "123",
    userupdated: "123123",
  },
  {
    key: "2",
    codeRouter: "John",
    nameRouter: "Brown",
    nvbh: "unasd",
    status: "New York No. 1 Lake Park",
    created: "222",
    usercreated: "12313",
    updated: "123",
    userupdated: "123123",
  },
];



export default function RouterDashboard() {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const onChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value: string) => {
    console.log("search:", value);
  };

  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  return (
    <>
      <div className="border-b-2 h-10"></div>

      <div className="bg-[#f9fafa]">
        <div className="mx-2 pt-5 pb-10 sm:mx-36 ">
          <div className="flex flex-wrap justify-between">
            <div className="flex justify-center items-center">
              <span className="mr-2">
                <IoIosMenu style={{ fontSize: "24px" }} />
              </span>
              <h1 className="text-2xl font-semibold leading-[21px]">
                Quản lý tuyến
              </h1>
            </div>
            <div className="flex mb-2">
              <Button
                className="flex items-center !text-[13px] !leading-[21px] !font-normal !text-[#212B36] !h-9"
                size={"large"}
                icon={<LiaDownloadSolid style={{ fontSize: "20px" }} />}
              >
                Xuất excel
              </Button>
              <Button
                className="flex items-center !text-[13px] !leading-[21px] !font-normal !text-[#212B36] ml-3 !h-9"
                size={"large"}
                icon={<LuUploadCloud style={{ fontSize: "20px" }} />}
              >
                Nhập excel
              </Button>
              <Button
                className="bg-[#1877F2] ml-3 text-white flex items-center !text-[13px] !leading-[21px] !font-medium !h-9"
                size={"large"}
                icon={<VscAdd style={{ fontSize: "20px" }} />}
              >
                Thêm mới
              </Button>
            </div>
          </div>

          <div className="pt-5">
            <div className="h-auto bg-white py-7 px-4 rounded-lg">
              <div className="flex flex-wrap justify-between items-center">
                <div className="flex flex-wrap items-center">
                  <Input
                    className="w-[200px] mr-3 bg-[#F4F6F8] placeholder:text-[#212B36]"
                    placeholder="Tuyến"
                  />
                  <Input
                    className="w-[200px] mr-3 bg-[#F4F6F8] placeholder:text-[#212B36]"
                    placeholder="Nhân viên bán hàng"
                  />

                  <FormItemCustom className="w-[150px]">
                  <Select
                    className="!bg-[#F4F6F8] options:bg-[#F4F6F8]"
                    optionFilterProp="children"
                    onChange={onChange}
                    onSearch={onSearch}
                    filterOption={filterOption}
                    defaultValue=""
                    options={[
                      {
                        value: "",
                        label: "Trạng thái",
                      },
                      {
                        value: "A",
                        label: "Hoạt động",
                      },
                      {
                        value: "B",
                        label: "Khóa",
                      },
                    ]}
                  />
                  </FormItemCustom>
                </div>

                <div className="flex flex-wrap items-center">
                  <div className="flex justify-center items-center mr-2 border-2 rounded-md">
                    <Button
                      className="flex items-center text-nowrap !text-[13px] !leading-[21px] !font-normal border-x-0 border-y-0 border-r-[0.1px] rounded-none"
                      icon={<LuFilter style={{ fontSize: "20px" }} />}
                    >
                      Filter
                    </Button>
                    <Button className="border-x-0 border-y-0 border-l-[0.1px] rounded-none">
                      <LuFilterX style={{ fontSize: "20px" }} />
                    </Button>
                  </div>
                  <div className="flex justify-center items-center  border-2 rounded-md">
                    <Button className="border-x-0 border-y-0 border-r-[0.1px] rounded-none">
                      <PiSortAscendingBold style={{ fontSize: "20px" }} />
                    </Button>
                    <Button className="border-x-0 border-y-0 border-l-[0.1px] rounded-none">
                      Last update on
                    </Button>
                  </div>
                </div>
              </div>

              <div className="pt-5">
                <div>
                  <TableCustom
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={data}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
