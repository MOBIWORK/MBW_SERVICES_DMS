import { useState } from "react";
import { FormItemCustom, HeaderPage } from "../../components";
import { Col, Row, Select, Modal } from "antd";
import { CardCustom } from "../../components/card/card";
import { UserIcon } from "../../icons/user";
import { PictureIcon } from "../../icons/picture";
import { SlickCustom } from "../../components/slick/slick";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const CustomArrow = ({ direction, onClick, isHovered }: any) => (
  <div
    className={`custom-arrow rounded-lg bg-black bg-opacity-15 !h-14 ${direction} ${
      isHovered ? "visible" : ""
    }`}
    onClick={onClick}
  >
    {direction === "prev" ? <LeftOutlined /> : <RightOutlined />}
  </div>
);

const CustomDot = ({ onClick, index, isActive }: any) => (
  <div className={`custom-dot ${isActive ? "active" : ""}`} onClick={onClick}>
    <img
      src={`https://s3.amazonaws.com/static.neostack.com/img/react-slick/abstract0${
        index + 1
      }.jpg`}
    />
  </div>
);

export default function MonitorAlbum() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
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

  const handleDotClick = (index: any) => {
    setCurrentSlide(index);
  };

  const handlePrevArrowClick = () => {
    const newIndex =
      (currentSlide - 1 + settings.slidesToShow) % settings.slidesToShow;
    setCurrentSlide(newIndex);
  };

  const handleNextArrowClick = () => {
    const newIndex = (currentSlide + 1) % settings.slidesToShow;
    setCurrentSlide(newIndex);
  };

  const settings = {
    // customPaging: function (i: number) {
    //   return (
    //     <a>
    //       <img
    //         src={`https://s3.amazonaws.com/static.neostack.com/img/react-slick/abstract0${
    //           i + 1
    //         }.jpg`}
    //       />
    //     </a>
    //   );
    // }
    // ),
    dots: true,
    appendDots: (dots: any) => (
      <div className="custom-dots-container">
        {dots.map((dot: any, index: any) => (
          <CustomDot
            key={index}
            {...dot}
            index={index}
            onClick={() => handleDotClick(index)}
            isActive={index === currentSlide}
          />
        ))}
      </div>
    ),
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: (
      <CustomArrow
        direction="prev"
        isHovered={isHovered}
        onClick={handlePrevArrowClick}
      />
    ),
    nextArrow: (
      <CustomArrow
        direction="next"
        isHovered={isHovered}
        onClick={handleNextArrowClick}
      />
    ),
    beforeChange: (oldIndex: any, newIndex: any) => setCurrentSlide(newIndex),
  };
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
            onCancel={handleCancel}
            footer={null}
          >
            <Row className="pt-4" gutter={32}>
              <Col span={12}>
                <div
                  className={`custom-slider-container !pb-16 ${
                    isHovered ? "hovered" : ""
                  }`}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <SlickCustom {...settings}>
                    <div className="">
                      <img
                        className="w-full rounded-lg"
                        src={
                          "https://s3.amazonaws.com/static.neostack.com/img/react-slick" +
                          "/abstract01.jpg"
                        }
                      />
                    </div>
                    <div className="">
                      <img
                        className="w-full rounded-lg"
                        src={
                          "https://s3.amazonaws.com/static.neostack.com/img/react-slick" +
                          "/abstract02.jpg"
                        }
                      />
                    </div>
                    <div className="">
                      <img
                        className="w-full rounded-lg"
                        src={
                          "https://s3.amazonaws.com/static.neostack.com/img/react-slick" +
                          "/abstract03.jpg"
                        }
                      />
                    </div>
                  </SlickCustom>
                </div>
              </Col>
              <Col span={12}>
                <div className="flex items-center h-6">
                  <p className="w-[32%] text-base leading-5 font-normal text-[#637381]">
                    Nhóm bán hàng
                  </p>
                  <p className="text-base leading-5 font-medium text-[#212B36]">
                    Nhóm bán hàng ABC
                  </p>
                </div>
                <div className="flex items-center pt-2 h-6">
                  <p className="w-[32%] text-base leading-5 font-normal text-[#637381]">
                    Nhân viên
                  </p>
                  <p className="text-base leading-5 font-medium text-[#212B36]">
                    Chu Quỳnh Anh
                  </p>
                </div>
                <div className="flex items-center pt-2 h-6">
                  <p className="w-[32%] text-base leading-5 font-normal text-[#637381]">
                    Loại khách hàng
                  </p>
                  <p className="text-base leading-5 font-medium text-[#212B36]">
                    Cá nhân
                  </p>
                </div>
                <div className="flex items-center pt-2 h-6">
                  <p className="w-[32%] text-base leading-5 font-normal text-[#637381]">
                    Nhóm khách hàng
                  </p>
                  <p className="text-base leading-5 font-medium text-[#212B36]">
                    Thân thiết
                  </p>
                </div>
                <div className="flex items-center pt-2 h-6">
                  <p className="w-[32%] text-base leading-5 font-normal text-[#637381]">
                    Album
                  </p>
                  <p className="text-base leading-5 font-medium text-[#212B36]">
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
