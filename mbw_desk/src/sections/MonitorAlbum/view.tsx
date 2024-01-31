import { useEffect, useRef, useState } from "react";
import { FormItemCustom, HeaderPage } from "../../components";
import { Col, Row, Select, Modal } from "antd";
import { CardCustom } from "../../components/card/card";
import { UserIcon } from "../../icons/user";
import { PictureIcon } from "../../icons/picture";
import { SlickCustom } from "../../components/slick/slick";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import Slider from "react-slick";
import { rsDataFrappe } from "../../types/response";
import { AxiosService } from "../../services/server";

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

export default function MonitorAlbum() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [listCustomerGroup, setCustomerGroup] = useState<any[]>([]);
  const [listEmployee, setListEmployee] = useState<any[]>([]);

  const [nav1, setNav1] = useState<Slider | null>(null);
  const [nav2, setNav2] = useState<Slider | null>(null);
  const slider1 = useRef<Slider | null>(null);
  const slider2 = useRef<Slider | null>(null);

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

  // const handleDotClick = (index: any) => {
  //   setCurrentSlide(index);
  // };

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
    customPaging: function (i: number) {
      return (
        <a>
          <img
            src={`https://s3.amazonaws.com/static.neostack.com/img/react-slick/abstract0${
              i + 1
            }.jpg`}
          />
        </a>
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
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

  useEffect(() => {
    setNav1(slider1);
    setNav2(slider2);
  }, []);

  useEffect(() => {
    (async () => {
      let rsCustomer: rsDataFrappe<any[]> = await AxiosService.get(
        "/api/method/frappe.desk.search.search_link",
        {
          params: {
            txt: "",
            doctype: "Customer Group",
            ignore_user_permissions: 0,
            reference_doctype: "Customer",
          },
        }
      );

      let { results } = rsCustomer;
      
      setCustomerGroup(
        results.map((customer_group) => ({
          label: customer_group.value,
          value: customer_group.value,
        }))
      );
    })();
  }, []);

  useEffect(() => {
    (async () => {
      let rsEmployee: rsDataFrappe<any[]> = await AxiosService.get(
        "/api/method/frappe.desk.search.search_link",
        {
          params: {
            txt: "",
            doctype: "Employee",
            ignore_user_permissions: 0,
            reference_doctype: "",
          },
        }
      );

      let { results } = rsEmployee;
      
      setListEmployee(
        results.map((employee) => ({
          label: employee.description,
          value: employee.value,
        }))
      );
    })();
  }, []);

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
              placeholder={"Nhân viên"}
              options={listEmployee}
            />
          </FormItemCustom>

          <FormItemCustom
            className="w-[200px] border-none mr-2"
            name="customer_type"
          >
            <Select
              className="!bg-[#F4F6F8] options:bg-[#F4F6F8]"
              placeholder={"Loại khách hàng"}
              options={[
                {
                  label: "Company",
                  value: "Company",
                },
                {
                  label: "Individual",
                  value: "Individual",
                },
              ]}
            />
          </FormItemCustom>

          <FormItemCustom className="w-[200px] border-none mr-2" name="customer_group">
            <Select
              placeholder={"Nhóm khách hàng"}
              className="!bg-[#F4F6F8] options:bg-[#F4F6F8]"
              options={listCustomerGroup}
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
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <Slider
                    asNavFor={nav2 && nav2.current}
                    ref={slider1}
                    prevArrow={
                      <CustomArrow
                        direction="prev"
                        isHovered={isHovered}
                        onClick={handlePrevArrowClick}
                      />
                    }
                    nextArrow={
                      <CustomArrow
                        direction="next"
                        isHovered={isHovered}
                        onClick={handleNextArrowClick}
                      />
                    }
                  >
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
                    <div className="">
                      <img
                        className="w-full rounded-lg"
                        src={
                          "https://s3.amazonaws.com/static.neostack.com/img/react-slick" +
                          "/abstract01.jpg"
                        }
                      />
                    </div>
                  </Slider>
                  <Slider
                    className="custom-slider"
                    asNavFor={nav1 && nav1.current}
                    ref={slider2}
                    slidesToShow={4}
                    swipeToSlide={true}
                    focusOnSelect={true}
                  >
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
                    <div className="">
                      <img
                        className="w-full rounded-lg"
                        src={
                          "https://s3.amazonaws.com/static.neostack.com/img/react-slick" +
                          "/abstract01.jpg"
                        }
                      />
                    </div>
                  </Slider>
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
