import React, { useState } from "react";
import { Col, Row } from "antd";
import { RadiusUpleftOutlined } from "@ant-design/icons";
import { ARR_REGIONSTR } from "./AppConst";
import { Avatar, Flex, Segmented, Form, Select } from "antd";
import "./style.css";
export function ScopeAnalysis() {
  const [selectedOption, setSelectedOption] = useState("user1");
  const handleOptionChange = (value) => {
    setSelectedOption(value); // Cập nhật giá trị hiện tại của Segmented khi thay đổi lựa chọn
  };
  const [arrTinh, setArrTinh] = useState([]);
  const [selectTinh, setSelectTinh] = useState({});
  const arr_region = JSON.parse(ARR_REGIONSTR).map((item) => {
    return {
      ...item,
      value: item.code, 
      label: item.name,
    };
  });
  const filterOption = (input: string, option?: { label: string; value: string }) =>
  (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
  const onChangeKhuvuc = (value) => {
  const filteredRegion = arr_region
  .filter((item) => item.value === value)
   // Lấy mảng arrProvince từ đối tượng đầu tiên trong kết quả lọc
   const arrProvince = filteredRegion.length > 0 ? filteredRegion[0].arrProvince : [];
   const modifiedTinh =  arrProvince.map((item) => ({
    ...item,
    value: item.provinceid, // Thay đổi trường value thành item.code
    label: item.name, // Thay đổi trường label thành item.name
  }));
  setArrTinh(modifiedTinh)

  }
  const onChangeTinh = (value) => {
    setSelectTinh(value)
}
  return (
    <>
      <Row>
        <Col span={12}>
          <Flex
            gap="small"
            align="flex-start"
            vertical
            style={{ width: "100%" }}
          >
            <Segmented
              style={{ width: "100%", justifyContent: "space-between" }}
              onChange={handleOptionChange}
              options={[
                {
                  label: (
                    <div style={{ padding: 4 }}>
                      <RadiusUpleftOutlined style={{ fontSize: "2rem" }} />
                      <div>Theo vùng bao nhỏ nhất </div>
                    </div>
                  ),
                  value: "user1",
                },
                {
                  label: (
                    <div style={{ padding: 4 }}>
                      <svg
                        className="custom-svg"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 576 512"
                      >
                        <path d="M302.8 312C334.9 271.9 408 174.6 408 120C408 53.7 354.3 0 288 0S168 53.7 168 120c0 54.6 73.1 151.9 105.2 192c7.7 9.6 22 9.6 29.6 0zM416 503l144.9-58c9.1-3.6 15.1-12.5 15.1-22.3V152c0-17-17.1-28.6-32.9-22.3l-116 46.4c-.5 1.2-1 2.5-1.5 3.7c-2.9 6.8-6.1 13.7-9.6 20.6V503zM15.1 187.3C6 191 0 199.8 0 209.6V480.4c0 17 17.1 28.6 32.9 22.3L160 451.8V200.4c-3.5-6.9-6.7-13.8-9.6-20.6c-5.6-13.2-10.4-27.4-12.8-41.5l-122.6 49zM384 255c-20.5 31.3-42.3 59.6-56.2 77c-20.5 25.6-59.1 25.6-79.6 0c-13.9-17.4-35.7-45.7-56.2-77V449.4l192 54.9V255z" />
                      </svg>
                      <div>Theo đơn vị hành chính</div>
                    </div>
                  ),
                  value: "user2",
                },
              ]}
            />
          </Flex>
          {selectedOption === "user1" && (
            <div style={{ lineHeight: "20px", textAlign: "left" }}>
              <p
                style={{
                  padding: "10px",
                  fontWeight: "bold",
                  color: "#0a743e",
                }}
              >
                Xác định khu vực đánh giá theo vùng bao đóng đại lý phân phối
              </p>
            </div>
          )}

          {selectedOption === "user2" && (
            <div style={{ lineHeight: "20px", textAlign: "left" }}>
              <p
                style={{
                  padding: "10px",
                  fontWeight: "bold",
                  color: "#0a743e",
                }}
              >
                Xác định giới hạn khu vực bằng đơn vị hành chính các cấp tỉnh,
                huyện
              </p>
              <Form layout="vertical" style={{ paddingLeft: "10px" }}>
                <Form.Item label="Khu vực" name="khuvuc">
                  <Select showSearch placeholder="Chọn khu vực"  onChange={onChangeKhuvuc} options={arr_region} filterOption={filterOption}></Select>
                </Form.Item>
                <Form.Item label="Đơn vị hành chính cấp tỉnh" name="tinh">
                  <Select showSearch placeholder="Chọn khu vực hành chính cấp tỉnh/thành phố" value={selectTinh} onChange={onChangeTinh} options={arrTinh} filterOption={filterOption}></Select>
                </Form.Item>
                <Form.Item  label="Đơn vị hành chính cấp huyện" name="huyen">
                  <Select showSearch placeholder="Chọn khu vực hành chính cấp quận/huyện" filterOption={filterOption}></Select>
                </Form.Item>
              </Form>
            </div>
          )}
        </Col>
        <Col span={12}>col-12</Col>
      </Row>
    </>
  );
}
