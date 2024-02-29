import { SearchOutlined, VerticalAlignBottomOutlined } from "@ant-design/icons";
import { FormItemCustom, HeaderPage, TableCustom } from "../../components";
import {
  Input,
  Row,
  Col,
  Button,
  Dropdown,
  Form,
  DatePicker,
  Table,
} from "antd";
import type { DatePickerProps, TableColumnsType } from "antd";
import { LuFilter, LuFilterX } from "react-icons/lu";
import { PiSortAscendingBold } from "react-icons/pi";

interface DataCustomer {
  key: React.Key;
  stt?: string;
  customer_code: string;
  customer_name: string;
  type_customer: string;
  address: string;
}

interface ExpandedDataType {
  key: React.Key;
  stt: string;
  item_code: string;
  item_name: string;
  hsd: string;
  unit: string;
  ton: string;
  total: string;
  updateAt: string;
  updateBy: string;
}

export default function ReportCustomer() {
  const onChange: DatePickerProps["onChange"] = (dateString: any) => {
    console.log(dateString);
  };
  const expandedRowRender = () => {
    const columns: TableColumnsType<ExpandedDataType> = [
      {
        title: "STT",
        dataIndex: "stt",
        key: "stt",
        render: (_, record, index) => index + 1,
      },
      { title: "Mã sản phẩm", dataIndex: "item_code", key: "item_code" },
      { title: "Tên sản phẩm", dataIndex: "item_name", key: "item_name" },
      { title: "Hạn sử dụng", dataIndex: "hsd", key: "hsd" },
      { title: "Đơn vị tính", dataIndex: "unit", key: "unit" },
      { title: "Tồn", dataIndex: "ton", key: "ton" },
      { title: "Tổng giá trị", dataIndex: "total", key: "total" },
      { title: "Ngày cập nhật", dataIndex: "updateAt", key: "updateAt" },
      { title: "Người cập nhật", dataIndex: "updateBy", key: "updateBy" },
    ];

    const data = [];
    for (let i = 0; i < 3; ++i) {
      data.push({
        key: i.toString(),
        item_code: "2014-12-24 23:12:00",
        name: "This is production name",
        item_name: "Upgraded: 56",
        hsd: "",
        unit: "",
        ton: "",
        total: "",
        updateAt: "",
        updateBy: "",
      });
    }
    return <Table columns={columns} dataSource={data} pagination={false} />;
  };

  const columns: TableColumnsType<DataCustomer> = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      render: (_, record, index) => index + 1,
    },
    {
      title: "Mã khách hàng",
      dataIndex: "customer_code",
      key: "customer_code",
    },
    {
      title: "Tên khách hàng",
      dataIndex: "customer_name",
      key: "customer_name",
    },
    {
      title: "Loại khách hàng",
      dataIndex: "type_customer",
      key: "type_customer",
    },
    { title: "Địa chỉ", dataIndex: "address", key: "address" },
  ];

  const data: DataCustomer[] = [];
  for (let i = 0; i < 3; ++i) {
    data.push({
      key: i.toString(),
      customer_code: "Screen",
      customer_name: "iOS",
      type_customer: "10.3.4.565",
      address: "500",
    });
  }
  return (
    <>
      <HeaderPage
        title="Báo cáo tồn kho khách hàng"
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
      <div className="bg-white rounded-xl pt-4">
        <Row className="justify-between items-center w-full">
          <Col span={14}>
            <Row gutter={8}>
              <Col span={8}>
                <FormItemCustom className="w-[320px] border-none p-4">
                  <Input
                    className="!bg-[#F5F7FA] !h-8"
                    placeholder="Tìm kiếm chiến dịch"
                    prefix={<SearchOutlined />}
                  />
                </FormItemCustom>
              </Col>
            </Row>
          </Col>
          <Col className="mr-5">
            <div className="flex flex-wrap items-center">
              <div className="flex justify-center items-center mr-4">
                <Dropdown
                  placement="bottom"
                  trigger={["click"]}
                  dropdownRender={() => (
                    <div className="p-4 rounded-xl !bg-white w-[400px]">
                      <div className="text-base font-medium text-[#212B36] leading-5">
                        Bộ lọc
                      </div>

                      <div className="pt-6">
                        <Form>
                          <div className="font-semibold text-sm leading-5 text-[#212B36]">
                            Hạn sử dụng
                          </div>
                          <Row className="pt-1" gutter={16}>
                            <Col span={12}>
                              <span className="font-normal text-sm leading-5 text-[#637381]">
                                Ngày bắt đầu
                              </span>
                              <FormItemCustom className="pt-2">
                                <DatePicker
                                  format={"DD-MM-YYYY"}
                                  className="!bg-[#F4F6F8]"
                                  onChange={onChange}
                                />
                              </FormItemCustom>
                            </Col>
                            <Col span={12}>
                              <span className="font-normal text-sm leading-5 text-[#637381]">
                                Kết thúc
                              </span>
                              <FormItemCustom className="pt-2">
                                <DatePicker
                                  format={"DD-MM-YYYY"}
                                  className="!bg-[#F4F6F8]"
                                  onChange={onChange}
                                />
                              </FormItemCustom>
                            </Col>
                          </Row>

                          <div className="pt-5 font-semibold text-sm leading-5 text-[#212B36]">
                            Ngày cập nhật
                          </div>
                          <Row className="pt-1" gutter={16}>
                            <Col span={12}>
                              <span className="font-normal text-sm leading-5 text-[#637381]">
                                Ngày bắt đầu
                              </span>
                              <FormItemCustom className="pt-2">
                                <DatePicker
                                  format={"DD-MM-YYYY"}
                                  className="!bg-[#F4F6F8]"
                                  onChange={onChange}
                                />
                              </FormItemCustom>
                            </Col>
                            <Col span={12}>
                              <span className="font-normal text-sm leading-5 text-[#637381]">
                                Kết thúc
                              </span>
                              <FormItemCustom className="pt-2">
                                <DatePicker
                                  format={"DD-MM-YYYY"}
                                  className="!bg-[#F4F6F8]"
                                  onChange={onChange}
                                />
                              </FormItemCustom>
                            </Col>
                          </Row>

                          <div className="pt-5 font-semibold text-sm leading-5 text-[#212B36]">
                            Số lượng tồn kho
                          </div>
                          <Row className="pt-1" gutter={16}>
                            <Col span={12}>
                              <span className="font-normal text-sm leading-5 text-[#637381]">
                                Từ
                              </span>
                              <FormItemCustom className="pt-2">
                                <Input placeholder="0" />
                              </FormItemCustom>
                            </Col>
                            <Col span={12}>
                              <span className="font-normal text-sm leading-5 text-[#637381]">
                                Đến
                              </span>
                              <FormItemCustom className="pt-2">
                                <Input placeholder="0" />
                              </FormItemCustom>
                            </Col>
                          </Row>

                          <div className="pt-5 font-semibold text-sm leading-5 text-[#212B36]">
                            Tổng giá trị
                          </div>
                          <Row className="pt-1" gutter={16}>
                            <Col span={12}>
                              <span className="font-normal text-sm leading-5 text-[#637381]">
                                Từ
                              </span>
                              <FormItemCustom className="pt-2">
                                <Input
                                  className="!bg-[#F5F7FA]"
                                  placeholder="0"
                                  suffix="VND"
                                />
                              </FormItemCustom>
                            </Col>
                            <Col span={12}>
                              <span className="font-normal text-sm leading-5 text-[#637381]">
                                Đến
                              </span>
                              <FormItemCustom className="pt-2">
                                <Input
                                  className="!bg-[#F5F7FA]"
                                  placeholder="0"
                                  suffix="VND"
                                />
                              </FormItemCustom>
                            </Col>
                          </Row>
                          <Row className="justify-between pt-6 pb-4">
                            <div></div>
                            <div>
                              <Button className="mr-3">Đặt lại</Button>
                              <Button type="primary">Áp dụng</Button>
                            </div>
                          </Row>
                        </Form>
                      </div>
                    </div>
                  )}
                >
                  <Button
                    onClick={(e: any) => e.preventDefault()}
                    className="flex items-center text-nowrap !text-[13px] !leading-[21px] !font-normal  border-r-[0.1px] rounded-r-none h-[32px]"
                    icon={<LuFilter style={{ fontSize: "20px" }} />}
                  >
                    Bộ lọc
                  </Button>
                </Dropdown>
                <Button className="border-l-[0.1px] rounded-l-none h-[32px]">
                  <LuFilterX style={{ fontSize: "20px" }} />
                </Button>
              </div>
              <div className="flex justify-center items-center rounded-md">
                <Button className="border-r-[0.1px] rounded-r-none">
                  <PiSortAscendingBold style={{ fontSize: "20px" }} />
                </Button>
                <Button className="border-l-[0.1px] rounded-l-none">
                  Lần cập nhật cuối cùng
                </Button>
              </div>
            </div>
          </Col>
        </Row>

        <div className="p-4">
          <TableCustom
            columns={columns}
            expandable={{ expandedRowRender, defaultExpandedRowKeys: ["0"] }}
            dataSource={data}
          />
        </div>
      </div>
    </>
  );
}
