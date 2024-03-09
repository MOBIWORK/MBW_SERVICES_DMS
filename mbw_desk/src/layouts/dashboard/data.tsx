import { BarChartOutlined, FileDoneOutlined, FileSearchOutlined, ReconciliationOutlined } from "@ant-design/icons";
import { MenuProps } from "antd";
import { Link } from "react-router-dom";

type MenuItem = Required<MenuProps>["items"][number];
export const listMenu: MenuItem[] = [
  //dashboard
  {
    label: <Link
      className={""}
      to="/"
    >
      <p className="text-[#212B36] text-custom font-normal text-sm leading-[22px]">
        Dashboard
      </p>
    </Link>,
    icon: <BarChartOutlined style={{ fontSize: "22px" }} />,
    key: "dashboard",
  },
  //giam sat
  {
    label: <Link
      className={""}
      to="#"
    >
      <p className="text-[#212B36] text-custom font-normal text-sm leading-[22px]">
        Giám sát
      </p>
    </Link>,
    icon: <FileSearchOutlined style={{ fontSize: "22px" }} />,
    key: "giamsat",
    children: [
      {
        label: <Link
          className={""}
          to="/monitor-album"
        >
          <p className="text-[#212B36] text-custom font-normal text-sm leading-[22px]">
            Giám sát chụp ảnh khách hàng
          </p>
        </Link>,
        key: "giamsat-image",
      },
      {
        label: <Link
          className={""}
          to="employee-monitor"
        >
          <p className="text-[#212B36] text-custom font-normal text-sm leading-[22px]">
            Giám sát viếng thăm khách hàng
          </p>
        </Link>,
        key: "employee-monitor",
      },
      {
        label: <Link
          className={""}
          to="#"
        >
          <p className="text-[#212B36] text-custom font-normal text-sm leading-[22px]">
            Giám sát nhân viên theo kpi
          </p>
        </Link>,
        key: "giamsat-kpi",
      },
    ]
  },
  //control router
  {
    label: <Link
      className={""}
      to="/router-control"
    >
      <p className="text-[#212B36] text-custom font-normal text-sm leading-[22px]">
        Quản lý tuyến
      </p>
    </Link>,
    icon: <FileDoneOutlined style={{ fontSize: "22px" }} />,
    key: "control",
  },
  //report
  {
    label: <Link
      to={'#'}
      className={""}
    >
      <p className="text-[#212B36] text-custom font-normal text-sm leading-[22px]">
        Báo cáo
      </p>
    </Link>,
    icon: <ReconciliationOutlined style={{ fontSize: "22px" }} />,
    key: "report",
    children: [
      {
        label: <Link
          className={""}
          to="/report-customer"
        >
          <p className="text-[#212B36] text-custom font-normal text-sm leading-[22px]">
            Báo cáo tồn kho khách hàng
          </p>
        </Link>,
        key: "report-customer",
      },
      {
        label: <Link
          className={""}
          to="/report-kpi"
        >
          <p className="text-[#212B36] text-custom font-normal text-sm leading-[22px]">
            Báo cáo KPI
          </p>
        </Link>,
        key: "report_kpi",
      },
      {
        label: <Link
          className={""}
          to="/report-checkin"
        >
          <p className="text-[#212B36] text-custom font-normal text-sm leading-[22px]">
          Báo cáo viếng thăm
          </p>
        </Link>,
        key: "report-checkin",
      },
      {
        label: <Link
          className={""}
          to="/report-sales"
        >
          <p className="text-[#212B36] text-custom font-normal text-sm leading-[22px]">
            Báo cáo tổng hợp bán hàng
          </p>
        </Link>,
        key: "report-sales",
      },
      {
        label: <Link
          className={""}
          to="/report-saleorder"
        >
          <p className="text-[#212B36] text-custom font-normal text-sm leading-[22px]">
            Báo cáo tổng hợp đặt hàng
          </p>
        </Link>,
        key: "report-saleorder",
      },
      {
        label: <Link
          className={""}
          to="/report-debt"
        >
          <p className="text-[#212B36] text-custom font-normal text-sm leading-[22px]">
           Báo cáo công nợ khách hàng
          </p>
        </Link>,
        key: "report-debt",
      },
    ]
  },
]