/** @format */

import DiscountIcon from "@/icons/discount";
import {
  AliyunOutlined,
  BarChartOutlined,
  FileDoneOutlined,
  FileImageOutlined,
  FileSearchOutlined,
  ReconciliationOutlined,
} from "@ant-design/icons";
import { MenuProps } from "antd";
import { Link } from "react-router-dom";

type MenuItem = Required<MenuProps>["items"][number];
export const listMenu: MenuItem[] = [
  //dashboard
  {
    label: (
      <Link className={""} to="/">
        Tổng quan
      </Link>
    ),
    icon: <BarChartOutlined style={{ fontSize: "22px" }} />,
    key: "dashboard",
  },
  //customer map
  {
    label: (
      <Link className={""} to="/customers-map">
        Bản đồ khách hàng
      </Link>
    ),
    icon: <AliyunOutlined style={{ fontSize: "22px" }} />,
    key: "csmap",
  },
  //giam sat
  {
    label: (
      <Link className={"text-[#212B36] hover:text-[#212B36]"} to="#">
        Giám sát
      </Link>
    ),
    icon: <FileSearchOutlined style={{ fontSize: "22px" }} />,
    key: "giamsat",
    children: [
      {
        label: (
          <Link className={""} to="/monitor-album">
            Giám sát chụp ảnh khách hàng
          </Link>
        ),
        key: "giamsat-image",
      },
      {
        label: (
          <Link className={""} to="employee-monitor">
            Giám sát viếng thăm khách hàng
          </Link>
        ),
        key: "employee-monitor",
      },
      // {
      //   label: (
      //     <Link className={""} to="employee-monitor-kpi">
      //         Giám sát nhân viên theo kpi
      //     </Link>
      //   ),
      //   key: "employee-monitor-kpi",
      // },
    ],
  },
  //control router
  {
    label: (
      <Link className={""} to="/router-control">
        Quản lý tuyến
      </Link>
    ),
    icon: <FileDoneOutlined style={{ fontSize: "22px" }} />,
    key: "control",
  },

  //CTKM
  {
    label: (
      <Link className={""} to="/promotion">
        Chương trình khuyến mại
      </Link>
    ),
    icon: <DiscountIcon />,
    key: "promotion",
  },

  //cham diem trung bay
  {
    label: (
      <Link className={"text-[#212B36] hover:text-[#212B36]"} to={"#"}>
        Chấm điểm trưng bày
      </Link>
    ),
    icon: <FileImageOutlined style={{ fontSize: "22px" }} />,
    key: "checkinimage",
    children: [
      {
        label: (
          <a
            className={"text-[#212B36] hover:text-[#212B36]"}
            href="/mbw_audit">
            Dashboard
          </a>
        ),
        key: "imagedb",
      },
      {
        label: (
          <a
            className={"text-[#212B36] hover:text-[#212B36]"}
            href="/mbw_audit/reports">
            Báo cáo
          </a>
        ),
        key: "imagerb",
      },
      {
        label: (
          <a
            className={"text-[#212B36] hover:text-[#212B36]"}
            href="/mbw_audit/product_sku">
            Sản phẩm
          </a>
        ),
        key: "imagesp",
      },
      {
        label: (
          <a
            className={"text-[#212B36] hover:text-[#212B36]"}
            href="/mbw_audit/campaign">
            Chiến dịch
          </a>
        ),
        key: "imagecd",
      },
    ],
  },
  //report
  {
    label: (
      <Link to={"#"} className={"text-[#212B36] hover:text-[#212B36]"}>
        Báo cáo
      </Link>
    ),
    icon: <ReconciliationOutlined style={{ fontSize: "22px" }} />,
    key: "report",
    children: [
      {
        label: (
          <Link
            className={"text-[#212B36] hover:text-[#212B36]"}
            to="/report-customer">
            Tồn kho khách hàng
          </Link>
        ),
        key: "report-customer",
      },
      {
        label: (
          <Link
            className={"text-[#212B36] hover:text-[#212B36]"}
            to="/report-kpi">
            Thống kê KPI
          </Link>
        ),
        key: "report_kpi",
      },
      {
        label: (
          <Link
            className={"text-[#212B36] hover:text-[#212B36]"}
            to="/report-checkin">
            Viếng thăm
          </Link>
        ),
        key: "report-checkin",
      },
      {
        label: (
          <Link
            className={"text-[#212B36] hover:text-[#212B36]"}
            to="/report-sales">
            Tổng hợp bán hàng
          </Link>
        ),
        key: "report-sales",
      },
      {
        label: (
          <Link
            className={"text-[#212B36] hover:text-[#212B36]"}
            to="/report-saleorder">
            Tổng hợp đặt hàng
          </Link>
        ),
        key: "report-saleorder",
      },
      {
        label: (
          <Link
            className={"text-[#212B36] hover:text-[#212B36]"}
            to="/report-custom-new">
            Khách hàng mới
          </Link>
        ),
        key: "report-custom-new",
      },
      {
        label: (
          <Link
            className={"text-[#212B36] hover:text-[#212B36]"}
            to="/report-checkin-first">
            Thống kê khách hàng viếng thăm lần đầu
          </Link>
        ),
        key: "report-checkin-first",
      },
      {
        label: (
          <Link
            className={"text-[#212B36] hover:text-[#212B36]"}
            to="/report-visitor_kpi">
            Báo cáo tổng hợp Viếng thăm - KPI
          </Link>
        ),
        key: "report-visitor_kpi",
      },
      {
        label: (
          <Link
            className={"text-[#212B36] hover:text-[#212B36]"}
            to="/report-analysis-kpi">
            Báo cáo tổng hợp phân tích KPI
          </Link>
        ),
        key: "report-analysis-kpi",
      },
      {
        label: (
          <Link
            className={"text-[#212B36] hover:text-[#212B36]"}
            to="/report-prod-daybyday">
            Báo cáo theo dõi sản lượng trong ngày từng thị trường
          </Link>
        ),
        key: "report-prod-daybyday",
      },
    ],
  },
];
