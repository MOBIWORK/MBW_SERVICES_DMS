import React, { useState } from "react";
import { FormItemCustom, HeaderPage } from "../../components";
import { Button, Card, Col, Input, Row, Select, Modal } from "antd";
import { CardCustom } from "../../components/card/card";
import { UserIcon } from "../../icons/user";
import { PictureIcon } from "../../icons/picture";

export default function MonitorAlbum() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
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
      <HeaderPage title="Giám sát chụp ảnh khách hàng" />
      <div className="bg-white rounded-md py-7 px-4">
        <div className="flex justify-start items-center">
          <FormItemCustom className="w-[200px] border-none mr-2">
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
                  label: "Nhóm bán hàng",
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

          <FormItemCustom className="w-[200px] border-none mr-2">
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
                  label: "Nhân viên",
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

          <FormItemCustom className="w-[200px] border-none mr-2">
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
                  label: "Loại khách hàng",
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

          <FormItemCustom className="w-[200px] border-none mr-2">
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
                  label: "Nhóm khách hàng",
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

          <FormItemCustom className="w-[200px] border-none mr-2">
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
                  label: "Ablum",
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

        <div className="pt-5">
          <Row gutter={[16, 8]}>
            <Col
              className="flex justify-center items-center px-4 pt-4 rounded-lg"
              span={4}
            >
              <CardCustom
                hoverable
                onClick={showModal}
                cover={
                  <img
                    alt="example"
                    src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                  />
                }
              >
                <div className="flex items-center h-3">
                  <UserIcon />
                  <p>Boo trần</p>
                </div>
                <div className="flex items-center pt-2 h-5">
                  <PictureIcon />
                  <p>Album 001</p>
                </div>
              </CardCustom>
            </Col>
            <Col
              className="flex justify-center items-center px-4 pt-4 rounded-lg"
              span={4}
            >
              <CardCustom
                cover={
                  <img
                    alt="example"
                    src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                  />
                }
              >
                <div className="flex items-center h-3">
                  <UserIcon />
                  <p>Boo trần</p>
                </div>
                <div className="flex items-center pt-2 h-5">
                  <UserIcon />
                  <p>Album 001</p>
                </div>
              </CardCustom>
            </Col>
            <Col
              className="flex justify-center items-center px-4 pt-4 rounded-lg"
              span={4}
            >
              <CardCustom
                cover={
                  <img
                    alt="example"
                    src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                  />
                }
              >
                <div className="flex items-center h-3">
                  <UserIcon />
                  <p>Boo trần</p>
                </div>
                <div className="flex items-center pt-2 h-5">
                  <UserIcon />
                  <p>Album 001</p>
                </div>
              </CardCustom>
            </Col>
            <Col
              className="flex justify-center items-center px-4 pt-4 rounded-lg"
              span={4}
            >
              <CardCustom
                cover={
                  <img
                    alt="example"
                    src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                  />
                }
              >
                <div className="flex items-center h-3">
                  <UserIcon />
                  <p>Boo trần</p>
                </div>
                <div className="flex items-center pt-2 h-5">
                  <UserIcon />
                  <p>Album 001</p>
                </div>
              </CardCustom>
            </Col>
            <Col
              className="flex justify-center items-center px-4 pt-4 rounded-lg"
              span={4}
            >
              <CardCustom
                cover={
                  <img
                    alt="example"
                    src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                  />
                }
              >
                <div className="flex items-center h-3">
                  <UserIcon />
                  <p>Boo trần</p>
                </div>
                <div className="flex items-center pt-2 h-5">
                  <UserIcon />
                  <p>Album 001</p>
                </div>
              </CardCustom>
            </Col>
            <Col
              className="flex justify-center items-center px-4 pt-4 rounded-lg"
              span={4}
            >
              <CardCustom
                cover={
                  <img
                    alt="example"
                    src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                  />
                }
              >
                <div className="flex items-center h-3">
                  <UserIcon />
                  <p>Boo trần</p>
                </div>
                <div className="flex items-center pt-2 h-5">
                  <UserIcon />
                  <p>Album 001</p>
                </div>
              </CardCustom>
            </Col>

            <Col
              className="flex justify-center items-center px-4 pt-4 rounded-lg"
              span={4}
            >
              <CardCustom
                cover={
                  <img
                    alt="example"
                    src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                  />
                }
              >
                <div className="flex items-center h-3">
                  <UserIcon />
                  <p>Boo trần</p>
                </div>
                <div className="flex items-center pt-2 h-5">
                  <UserIcon />
                  <p>Album 001</p>
                </div>
              </CardCustom>
            </Col>
          </Row>

          <Modal
            width={1064}
            title="Hình ảnh khách hàng"
            open={isModalOpen}
            footer={false}
          >
            <Row className="pt-4" gutter={[8, 8]}>
              <Col span={12}> 1</Col>
              <Col span={12}>
                <div className="flex items-center pt-2 h-6">
                  <p className="w-[32%] text-sm leading-[21px] font-normal">
                    Nhóm bán hàng
                  </p>
                  <p className="text-sm leading-[21px] font-normal">
                    Nhóm bán hàng ABC
                  </p>
                </div>
                <div className="flex items-center pt-2 h-6">
                  <p className="w-[32%] text-sm leading-[21px] font-normal">
                    Nhân viên
                  </p>
                  <p className="text-sm leading-[21px] font-normal">
                    Chu Quỳnh Anh
                  </p>
                </div>
                <div className="flex items-center pt-2 h-6">
                  <p className="w-[32%] text-sm leading-[21px] font-normal">
                    Loại khách hàng
                  </p>
                  <p className="text-sm leading-[21px] font-normal">Cá nhân</p>
                </div>
                <div className="flex items-center pt-2 h-6">
                  <p className="w-[32%] text-sm leading-[21px] font-normal">
                    Nhóm khách hàng
                  </p>
                  <p className="text-sm leading-[21px] font-normal">
                    Thân thiết
                  </p>
                </div>
                <div className="flex items-center pt-2 h-6">
                  <p className="w-[32%] text-sm leading-[21px] font-normal">
                    Album
                  </p>
                  <p className="text-sm leading-[21px] font-normal">
                    Album ảnh thăm khách
                  </p>
                </div>
              </Col>
            </Row>
          </Modal>
        </div>
      </div>
    </>
  );
}
