import { Col, Image, Row } from "antd";

export default function DetailModal(data: any) {
  console.log("====data", data);

  return (
    <>
      <Row className="pt-4" gutter={32}>
        <Col span={12}>
          <Image
            className="rounded-xl"
            preview={false}
            src={data?.data.image_url}
          />
        </Col>
        <Col span={12}>
          <div className="flex items-center h-6">
            <p className="w-[32%] text-base leading-5 font-normal text-[#637381]">
              Thời gian chụp
            </p>
            <p className="text-base leading-5 font-medium text-[#212B36]">
                {data?.data?.creation}
            </p>
          </div>
          <div className="flex items-center pt-2 h-6">
            <p className="w-[32%] text-base leading-5 font-normal text-[#637381]">
              Khách hàng
            </p>
            <p className="text-base leading-5 font-medium text-[#212B36]">
              {data?.data?.info_customer[0]?.customer_name}
            </p>
          </div>
          <div className="flex items-center pt-2 h-6">
            <p className="w-[32%] text-base leading-5 font-normal text-[#637381]">
              Nhóm bán hàng
            </p>
            <p className="text-base leading-5 font-medium text-[#212B36]">
            {data?.data?.person[0]?.sales_person_name}
            </p>
          </div>
          <div className="flex items-center pt-2 h-6">
            <p className="w-[32%] text-base leading-5 font-normal text-[#637381]">
              Nhân viên
            </p>
            <p className="text-base leading-5 font-medium text-[#212B36]">
              {data?.data?.detail_employee[0]?.first_name}
            </p>
          </div>
          <div className="flex items-center pt-2 h-6">
            <p className="w-[32%] text-base leading-5 font-normal text-[#637381]">
              Loại khách hàng
            </p>
            <p className="text-base leading-5 font-medium text-[#212B36]">
              {data?.data?.info_customer[0]?.customer_type}
            </p>
          </div>
          <div className="flex items-center pt-2 h-6">
            <p className="w-[32%] text-base leading-5 font-normal text-[#637381]">
              Nhóm khách hàng
            </p>
            <p className="text-base leading-5 font-medium text-[#212B36]">
              {data?.data?.info_customer[0]?.customer_group}
            </p>
          </div>
          <div className="flex items-center pt-2 h-6">
            <p className="w-[32%] text-base leading-5 font-normal text-[#637381]">
              Album
            </p>
            <p className="text-base leading-5 font-medium text-[#212B36]">
              {data?.data?.album_name}
            </p>
          </div>
        </Col>
      </Row>
    </>
  );
}
