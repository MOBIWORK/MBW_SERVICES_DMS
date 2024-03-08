import { VerticalAlignBottomOutlined } from "@ant-design/icons";
import { FormItemCustom, HeaderPage } from "../../components";
import { DatePicker, Select, Table, Typography } from "antd";
import { TableReport } from "../ReportSales/tableCustom";
import { month } from "./data";
import { DatePickerProps } from "antd/lib";

const { Column, ColumnGroup } = TableReport;

interface DataTypeKPI {
  key: React.Key;
  name: string;
  stt?: number;
  employee_code: string;
  employee_name: string;
  department: string;
  khvisiting: number;
  thvisiting: number;
  tlvisiting: number;
  khvisitingfirst: number;
  thvisitingfirst: number;
  tlvisitingfirst: number;
  khvisitingcustomerorder: number;
  thvisitingcustomerorder: number;
  tlvisitingcustomerorder: number;
  khvisitingnew: number;
  thvisitingnew: number;
  tlvisitingnew: number;
  khvisitingorder: number;
  thvisitingorder: number;
  tlvisitingorder: number;
  khvisitingsale: number;
  thvisitingsale: number;
  tlvisitingsale: number;
  khvisitingRevenue: number;
  thvisitingRevenue: number;
  tlvisitingRevenue: number;
  khvisitingQuantity: number;
  thvisitingQuantity: number;
  tlvisitingQuantity: number;
  khvisitingSKU: number;
  thvisitingSKU: number;
  tlvisitingSKU: number;
  khvisitingwork: number;
  thvisitingwork: number;
  tlvisitingwork: number;
  total?: number;
}

const data: DataTypeKPI[] = [
  {
    key: "KDA",
    name: "7382jsd",
    employee_code: "HHHH01",
    employee_name: "Tần Hạo",
    department: "Phòng 1",
    khvisiting: 5,
    thvisiting: 1,
    tlvisiting: 25,
    khvisitingfirst: 4,
    thvisitingfirst: 1,
    tlvisitingfirst: 60,
    khvisitingcustomerorder: 1,
    thvisitingcustomerorder: 2,
    tlvisitingcustomerorder: 59,
    khvisitingnew: 1,
    thvisitingnew: 1,
    tlvisitingnew: 24,
    khvisitingorder: 1,
    thvisitingorder: 12,
    tlvisitingorder: 56,
    khvisitingsale: 1,
    thvisitingsale: 2,
    tlvisitingsale: 35,
    khvisitingRevenue: 2,
    thvisitingRevenue: 9,
    tlvisitingRevenue: 87,
    khvisitingQuantity: 0,
    thvisitingQuantity: 0,
    tlvisitingQuantity: 89,
    khvisitingSKU: 2,
    thvisitingSKU: 10,
    tlvisitingSKU: 67,
    khvisitingwork: 10,
    thvisitingwork: 14,
    tlvisitingwork: 45,
  },
  {
    key: "KDSD",
    name: "7382112",
    employee_code: "HHHH02",
    employee_name: "Hạo Thần",
    department: "Phòng 2",
    khvisiting: 5,
    thvisiting: 1,
    tlvisiting: 25,
    khvisitingfirst: 4,
    thvisitingfirst: 1,
    tlvisitingfirst: 60,
    khvisitingcustomerorder: 1,
    thvisitingcustomerorder: 2,
    tlvisitingcustomerorder: 59,
    khvisitingnew: 1,
    thvisitingnew: 1,
    tlvisitingnew: 24,
    khvisitingorder: 1,
    thvisitingorder: 12,
    tlvisitingorder: 56,
    khvisitingsale: 1,
    thvisitingsale: 2,
    tlvisitingsale: 35,
    khvisitingRevenue: 2,
    thvisitingRevenue: 9,
    tlvisitingRevenue: 87,
    khvisitingQuantity: 0,
    thvisitingQuantity: 0,
    tlvisitingQuantity: 89,
    khvisitingSKU: 2,
    thvisitingSKU: 10,
    tlvisitingSKU: 67,
    khvisitingwork: 10,
    thvisitingwork: 14,
    tlvisitingwork: 45,
  },
];


export default function ReportKPI() {
  const onChange: DatePickerProps['onChange'] = (dateString) => {
    console.log(dateString);
  };
  return (
    <>
      <HeaderPage
        title="Báo cáo KPI"
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
      <div className="bg-white rounded-md py-7 px-4 border-[#DFE3E8] border-[0.2px] border-solid">
        <div className="flex justify-start items-center">
          <FormItemCustom className="w-[200px] border-none mr-2">
            <Select
              className="!bg-[#F4F6F8] options:bg-[#F4F6F8]"
              defaultValue={""}
              options={month}
              showSearch
            />
          </FormItemCustom>
          <FormItemCustom className="w-[200px] border-none mr-2">
            <DatePicker className="!bg-[#F4F6F8]" onChange={onChange} picker="year" />
          </FormItemCustom>
        </div>
        <div className="pt-5">
          <TableReport
            dataSource={data}
            bordered
            scroll={{ x: true }}
            summary={(pageData) => {
              let total = 0;
              pageData.forEach((record) => {
                // Calculate total from data rows
                total += record.khvisiting
              });
      
              return (
                <Table.Summary.Row>
                  <Table.Summary.Cell index={0}></Table.Summary.Cell>
                  <Table.Summary.Cell index={1}>Tổng</Table.Summary.Cell>
                  <Table.Summary.Cell index={2}></Table.Summary.Cell>
                  <Table.Summary.Cell index={3}></Table.Summary.Cell>
                  <Table.Summary.Cell index={4}>{total}</Table.Summary.Cell>
                  <Table.Summary.Cell index={5}></Table.Summary.Cell>
                  <Table.Summary.Cell index={6}></Table.Summary.Cell>
                  <Table.Summary.Cell index={7}></Table.Summary.Cell>
                </Table.Summary.Row>
              );
            }}
          >
            <Column
              title="STT"
              dataIndex="stt"
              key="stt"
              fixed="left"
              width={60}
              render={(_: any, record: any, index: number) => index + 1}
            />
            <Column
              title="Mã Nhân viên"
              dataIndex="employee_code"
              key="employee_code"
              fixed="left"
              width={130}
            />
            <Column
              title="Nhân viên"
              dataIndex="employee_name"
              key="employee_name"
              fixed="left"
              width={200}
            />
            <Column
              title="Phòng/nhóm"
              dataIndex="department"
              key="department"
              width={210}
            />
            <ColumnGroup
              className="!whitespace-normal"
              title="Số khách hàng viếng thăm"
              width={210}
            >
              <Column
                title="KH"
                width={70}
                dataIndex="khvisiting"
                key="khvisiting"
              />
              <Column
                title="TH"
                width={70}
                dataIndex="thvisiting"
                key="thvisiting"
              />
              <Column
                title="TL"
                width={70}
                dataIndex="tlvisiting"
                key="tlvisiting"
                render={(_: any, record: DataTypeKPI) => (
                  <>{record.tlvisiting}%</>
                )}
              />
            </ColumnGroup>
            <ColumnGroup
              className="!whitespace-normal"
              title="Số khách hàng viếng thăm duy nhất"
              width={210}
            >
              <Column
                title="KH"
                width={70}
                dataIndex="khvisitingfirst"
                key="khvisitingfirst"
              />
              <Column
                title="TH"
                width={70}
                dataIndex="thvisitingfirst"
                key="thvisitingfirst"
              />
              <Column
                title="TL"
                width={70}
                dataIndex="tlvisitingfirst"
                key="tlvisitingfirst"
                render={(_: any, record: DataTypeKPI) => (
                  <>{record.tlvisitingfirst}%</>
                )}
              />
            </ColumnGroup>
            <ColumnGroup
              className="!whitespace-normal"
              title="Số khách hàng đặt hàng"
              width={210}
            >
              <Column
                title="KH"
                width={70}
                dataIndex="khvisitingcustomerorder"
                key="khvisitingcustomerorder"
              />
              <Column
                title="TH"
                width={70}
                dataIndex="thvisitingcustomerorder"
                key="thvisitingcustomerorder"
              />
              <Column
                title="TL"
                width={70}
                dataIndex="tlvisitingcustomerorder"
                key="tlvisitingcustomerorder"
                render={(_: any, record: DataTypeKPI) => (
                  <>{record.tlvisitingcustomerorder}%</>
                )}
              />
            </ColumnGroup>
            <ColumnGroup
              className="!whitespace-normal"
              title="Số khách hàng thêm mới"
              width={210}
            >
              <Column
                title="KH"
                width={70}
                dataIndex="khvisitingnew"
                key="khvisitingnew"
              />
              <Column
                title="TH"
                width={70}
                dataIndex="thvisitingnew"
                key="thvisitingnew"
              />
              <Column
                title="TL"
                width={70}
                dataIndex="tlvisitingnew"
                key="tlvisitingnew"
                render={(_: any, record: DataTypeKPI) => (
                  <>{record.tlvisitingnew}%</>
                )}
              />
            </ColumnGroup>
            <ColumnGroup
              className="!whitespace-normal"
              title="Số đơn hàng"
              width={210}
            >
              <Column
                title="KH"
                width={70}
                dataIndex="khvisitingorder"
                key="khvisitingorder"
              />
              <Column
                title="TH"
                width={70}
                dataIndex="thvisitingorder"
                key="thvisitingorder"
              />
              <Column
                title="TL"
                width={70}
                dataIndex="tlvisitingorder"
                key="tlvisitingorder"
                render={(_: any, record: DataTypeKPI) => (
                  <>{record.tlvisitingorder}%</>
                )}
              />
            </ColumnGroup>
            <ColumnGroup
              className="!whitespace-normal"
              title="Doanh số"
              width={210}
            >
              <Column
                title="KH"
                width={70}
                dataIndex="khvisitingsale"
                key="khvisitingsale"
              />
              <Column
                title="TH"
                width={70}
                dataIndex="thvisitingsale"
                key="thvisitingsale"
              />
              <Column
                title="TL"
                width={70}
                dataIndex="tlvisitingsale"
                key="tlvisitingsale"
                render={(_: any, record: DataTypeKPI) => (
                  <>{record.tlvisitingsale}%</>
                )}
              />
            </ColumnGroup>
            <ColumnGroup
              className="!whitespace-normal"
              title="Doanh thu"
              width={210}
            >
              <Column
                title="KH"
                width={70}
                dataIndex="khvisitingRevenue"
                key="khvisitingRevenue"
              />
              <Column
                title="TH"
                width={70}
                dataIndex="thvisitingRevenue"
                key="thvisitingRevenue"
              />
              <Column
                title="TL"
                width={70}
                dataIndex="tlvisitingRevenue"
                key="tlvisitingRevenue"
                render={(_: any, record: DataTypeKPI) => (
                  <>{record.tlvisitingRevenue}%</>
                )}
              />
            </ColumnGroup>
            <ColumnGroup
              className="!whitespace-normal"
              title="Sản lượng"
              width={210}
            >
              <Column
                title="KH"
                width={70}
                dataIndex="khvisitingQuantity"
                key="khvisitingQuantity"
              />
              <Column
                title="TH"
                width={70}
                dataIndex="thvisitingQuantity"
                key="thvisitingQuantity"
              />
              <Column
                title="TL"
                width={70}
                dataIndex="tlvisitingQuantity"
                key="tlvisitingQuantity"
                render={(_: any, record: DataTypeKPI) => (
                  <>{record.tlvisitingQuantity}%</>
                )}
              />
            </ColumnGroup>
            <ColumnGroup className="!whitespace-normal" title="SKU" width={210}>
              <Column
                title="KH"
                width={70}
                dataIndex="khvisitingSKU"
                key="khvisitingSKU"
              />
              <Column
                title="TH"
                width={70}
                dataIndex="thvisitingSKU"
                key="thvisitingSKU"
              />
              <Column
                title="TL"
                width={70}
                dataIndex="tlvisitingSKU"
                key="tlvisitingSKU"
                render={(_: any, record: DataTypeKPI) => (
                  <>{record.tlvisitingSKU}%</>
                )}
              />
            </ColumnGroup>
            <ColumnGroup
              className="!whitespace-normal"
              title="Số giờ làm việc"
              width={210}
            >
              <Column
                title="KH"
                width={70}
                dataIndex="khvisitingwork"
                key="khvisitingwork"
              />
              <Column
                title="TH"
                width={70}
                dataIndex="thvisitingwork"
                key="thvisitingwork"
              />
              <Column
                title="TL"
                width={70}
                dataIndex="tlvisitingwork"
                key="tlvisitingwork"
                render={(_: any, record: DataTypeKPI) => (
                  <>{record.tlvisitingwork}%</>
                )}
              />
            </ColumnGroup>
          </TableReport>
        </div>
      </div>
    </>
  );
}
