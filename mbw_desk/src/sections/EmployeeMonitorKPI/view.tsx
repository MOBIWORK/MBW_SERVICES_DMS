import React from "react";
import { FormItemCustom, HeaderPage, TagCustomStatus } from "../../components";
import {
  Button,
  Col,
  DatePicker,
  Dropdown,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
} from "antd";
import {
  HistoryOutlined,
  MailOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { LuFilter, LuFilterX } from "react-icons/lu";
import { TableReport } from "../ReportSales/tableCustom";

const { Column, ColumnGroup } = TableReport;

interface DataTypeKPI {
  key: React.Key;
  name: string;
  stt?: number;
  employee_name: string;
  status: string;
  department: string;
  roleJob: string;
  khvisiting: number;
  thvisiting: number;
  clvisiting: number;
  tlvisiting: number;
  khorder: number;
  thorder: number;
  clorder: number;
  tlorder: number;
  khsale: number;
  thsale: number;
  clsale: number;
  tlsale: number;
}

const data: DataTypeKPI[] = [
  {
    key: "KDA",
    name: "7382jsd",
    employee_name: "Phương Anh",
    status: "Active",
    department: "Account Management",
    roleJob: "President of Sales",
    khvisiting: 4,
    thvisiting: 2,
    clvisiting: 2,
    tlvisiting: 50,
    khorder: 4,
    thorder: 2,
    clorder: 2,
    tlorder: 50,
    khsale: 5,
    thsale: 3,
    clsale: 0,
    tlsale: 100
  },
];

export default function EmployeeMonitorKPI() {
  return (
    <>
      <HeaderPage title="Giám sát nhân viên theo KPI" />
      <div className="bg-white px-4 rounded-md py-7 border-[#DFE3E8] border-[0.2px] border-solid w-full">
        <Row className="justify-between items-center w-full">
          <Col>
            <div className="flex justify-start items-center">
              <FormItemCustom className="w-[320px] border-none pr-2">
                <Input
                  className="!bg-[#F4F6F8] options:bg-[#F4F6F8] !h-8"
                  placeholder="Tìm kiếm nhân viên"
                  prefix={<SearchOutlined />}
                />
              </FormItemCustom>

              <FormItemCustom className="w-[200px] border-none mr-2">
                <Select
                  className="!bg-[#F4F6F8] options:bg-[#F4F6F8]"
                  defaultValue={""}
                  options={[{ label: "Sắp xếp", value: "" }]}
                  showSearch
                />
              </FormItemCustom>
              <FormItemCustom className="w-[200px] border-none mr-2">
                <Select
                  className="!bg-[#F4F6F8] options:bg-[#F4F6F8]"
                  defaultValue={""}
                  options={[{ label: "Chỉ tiêu", value: "" }]}
                  showSearch
                />
              </FormItemCustom>
            </div>
          </Col>

          <Col>
            <div className="flex flex-wrap items-center">
              <div className="flex justify-center items-center mr-4">
                <Dropdown
                  placement="bottom"
                  // trigger={["click"]}
                  dropdownRender={() => (
                    <div className="p-4 rounded-xl !bg-white w-[400px]">
                      <div className="text-base font-medium text-[#212B36] leading-5">
                        Bộ lọc
                      </div>

                      <div className="pt-6">
                        <Form>
                          <div className="font-semibold text-sm pb-3 leading-5 text-[#212B36]">
                            Giám sát
                          </div>
                          <Row className="py-2" gutter={16}>
                            <Col span={12}>
                              <span className="font-normal text-sm leading-5 text-[#637381]">
                                Chỉ tiêu
                              </span>
                              <FormItemCustom
                                className="pt-2"
                                name="expire_from"
                              >
                                <Select
                                  className="!bg-[#F4F6F8] options:bg-[#F4F6F8]"
                                  defaultValue={""}
                                  options={[{ label: "Chỉ tiêu", value: "" }]}
                                  showSearch
                                />
                              </FormItemCustom>
                            </Col>
                            <Col span={12}>
                              <span className="font-normal text-sm leading-5 text-[#637381]">
                                Vị trí
                              </span>
                              <FormItemCustom className="pt-2" name="expire_to">
                                <Select
                                  className="!bg-[#F4F6F8] options:bg-[#F4F6F8]"
                                  defaultValue={""}
                                  options={[{ label: "Vị trí", value: "" }]}
                                  showSearch
                                />
                              </FormItemCustom>
                            </Col>
                          </Row>

                          <Row className="py-2" gutter={16}>
                            <Col span={12}>
                              <span className="font-normal text-sm leading-5 text-[#637381]">
                                Viếng thăm
                              </span>
                              <FormItemCustom className="pt-2">
                                <Select
                                  className="!bg-[#F4F6F8] options:bg-[#F4F6F8]"
                                  defaultValue={""}
                                  options={[{ label: "Viếng thăm", value: "" }]}
                                  showSearch
                                />
                              </FormItemCustom>
                            </Col>
                            <Col span={12}>
                              <span className="font-normal text-sm leading-5 text-[#637381]">
                                Chấm công
                              </span>
                              <FormItemCustom className="pt-2">
                                <Select
                                  className="!bg-[#F4F6F8] options:bg-[#F4F6F8]"
                                  defaultValue={""}
                                  options={[{ label: "Chấm công", value: "" }]}
                                  showSearch
                                />
                              </FormItemCustom>
                            </Col>
                          </Row>
                          <Row className="pt-1" gutter={16}>
                            <Col span={12}>
                              <span className="font-normal text-sm leading-5 text-[#637381]">
                                Đơn hàng
                              </span>
                              <FormItemCustom
                                className="pt-2"
                                name="qty_inven_from"
                              >
                                <Select
                                  className="!bg-[#F4F6F8] options:bg-[#F4F6F8]"
                                  defaultValue={""}
                                  options={[{ label: "Đơn hàng", value: "" }]}
                                  showSearch
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
                    className="flex items-center text-nowrap !text-[13px] !leading-[21px] !font-normal  border-r-[0.1px] rounded-r-none h-9"
                    icon={<LuFilter style={{ fontSize: "20px" }} />}
                  >
                    Bộ lọc
                  </Button>
                </Dropdown>
                <Button className="border-l-[0.1px] rounded-l-none h-9">
                  <LuFilterX style={{ fontSize: "20px" }} />
                </Button>
              </div>
            </div>
          </Col>
        </Row>

        <div className="pt-5">
          <TableReport dataSource={data} bordered scroll={{ x: true }}>
            <Column
              title="STT"
              dataIndex="stt"
              key="stt"
              width={60}
              render={(_: any, record: any, index: number) => index + 1}
            />

            <Column
              title="Nhân viên"
              dataIndex="employee_name"
              key="employee_name"
              render={(_: any, record: any) => (
                <div className="!w-[145px]">{record.employee_name}</div>
              )}
            />
            <Column
              title="Trạng thái"
              dataIndex="status"
              key="status"
              render={(value: string) =>
                value == "Active" ? (
                  <TagCustomStatus> Hoạt động</TagCustomStatus>
                ) : (
                  <TagCustomStatus type="Warning"> Khóa</TagCustomStatus>
                )
              }
            />
            <Column
              title="Phòng/ nhóm"
              dataIndex="department"
              key="department"
              render={(_: any, record: any) => (
                <div className="!w-[145px]">{record.department}</div>
              )}
            />
            <Column
              title="Chức danh"
              dataIndex="roleJob"
              key="roleJob"
              render={(_: any, record: any) => (
                <div className="!w-[145px]">{record.roleJob}</div>
              )}
            />
            <ColumnGroup className="!whitespace-normal" title="Viếng thăm">
              <Column title="KH" dataIndex="khvisiting" key="khvisiting" />
              <Column title="TH" dataIndex="thvisiting" key="thvisiting" />
              <Column title="CL" dataIndex="clvisiting" key="clvisiting" />
              <Column
                title="TL"
                dataIndex="tlvisiting"
                key="tlvisiting"
                render={(_: any, record: DataTypeKPI) => (
                  <>{record.tlvisiting}%</>
                )}
              />
            </ColumnGroup>
            <ColumnGroup className="!whitespace-normal" title="Đơn hàng">
              <Column title="KH" dataIndex="khorder" key="khorder" />
              <Column title="TH" dataIndex="thorder" key="thorder" />
              <Column title="CL" dataIndex="clorder" key="clorder" />
              <Column
                title="TL"
                dataIndex="tlorder"
                key="tlorder"
                render={(_: any, record: DataTypeKPI) => <>{record.tlorder}%</>}
              />
            </ColumnGroup>
            <ColumnGroup className="!whitespace-normal" title="Doanh số">
              <Column title="KH" dataIndex="khsale" key="khsale" />
              <Column title="TH" dataIndex="thsale" key="thsale" />
              <Column title="CL" dataIndex="clsale" key="clsale" />
              <Column
                title="TL"
                dataIndex="tlsale"
                key="tlsale"
                render={(_: any, record: DataTypeKPI) => <>{record.tlsale}%</>}
              />
            </ColumnGroup>
            <Column
              title="Chức năng"
              key="action"
              render={(_: any, record: any) => (
                <div className="flex items-center">
                  <Button
                    className="mr-2"
                    icon={<MailOutlined style={{color: "#00A76F"}}/>}
                    size="middle"
                  />
                  <Button
                    icon={<HistoryOutlined style={{color: "#00B8D9"}}/>}
                    size="middle"
                  />
                </div>
              )}
            />
          </TableReport>
        </div>
      </div>
    </>
  );
}
