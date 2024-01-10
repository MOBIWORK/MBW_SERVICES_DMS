import { IoIosMenu } from "react-icons/io";
import { VscAdd } from "react-icons/vsc";
import { LuUploadCloud } from "react-icons/lu";
import { LiaDownloadSolid } from "react-icons/lia";
import { LuFilter, LuFilterX } from "react-icons/lu";
import { PiSortAscendingBold } from "react-icons/pi";
import { Table, Button, Input, Select } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { useState } from "react";

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

const columns: ColumnsType<DataType> = [
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
        <div className="mx-36 pt-5">
          <div className="flex justify-between">
            <div className="flex justify-center items-center">
              <span className="mr-2">
                <IoIosMenu style={{ fontSize: "32px" }} />
              </span>
              <h1 className="text-2xl font-semibold">Quản lý tuyến</h1>
            </div>

            <div className="flex justify-center items-center">
              <Button
                className="text-nowrap"
                size={"large"}
                icon={<LiaDownloadSolid />}
              >
                Xuất excel
              </Button>
              <Button
                className="text-nowrap ml-4"
                size={"large"}
                icon={<LuUploadCloud />}
              >
                Nhập excel
              </Button>
              <Button
                className="bg-[#1877F2] ml-4 text-nowrap text-white"
                size={"large"}
                icon={<VscAdd />}
              >
                Thêm mới
              </Button>
            </div>
          </div>

          <div className="pt-5">
            <div className="h-auto bg-white py-7 px-4">
              <div className="flex justify-between">
                <div className="flex justify-center items-center">
                  <Input className="w-[200px] mr-3" placeholder="Tuyến" />
                  <Input
                    className="w-[200px] mr-3"
                    placeholder="Nhân viên bán hàng"
                  />

                  <Select
                    className="w-[150px]"
                    showSearch
                    placeholder="Trạng thái"
                    optionFilterProp="children"
                    onChange={onChange}
                    onSearch={onSearch}
                    filterOption={filterOption}
                    options={[
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
                </div>

                <div className="flex justify-center items-center">
                  <div className="flex justify-center items-center rounded-lg w-full h-9 p-5 bg-white border-2 text-[21px] cursor-pointer">
                    <div className="flex justify-center items-center border-r-2 pr-2">
                      <span>
                        <LuFilter />
                      </span>
                      <p className="mx-1 whitespace-nowrap">Filter</p>
                    </div>
                    <div className="ml-3">
                      <span>
                        <LuFilterX />
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-center items-center rounded-lg w-full h-9 p-5 bg-white border-2 text-[21px] ml-4 cursor-pointer">
                    <span className="mr-2">
                      <PiSortAscendingBold />
                    </span>
                    <p className="mx-1 pl-2 whitespace-nowrap border-l-2">
                      Last update on
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-5">
                <div>
                  <Table
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
