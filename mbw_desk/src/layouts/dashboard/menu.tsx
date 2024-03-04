import {
  BarChartOutlined,
  BarsOutlined,
  FileDoneOutlined,
  FileSearchOutlined,
  FileTextOutlined,
  PieChartOutlined,
  ReconciliationOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { MenuProps } from "antd/lib";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

export default function MenuLeft() {
  const [current, setCurrent] = useState(
    localStorage.getItem("selectedKey") || "1"
  );
  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
    localStorage.setItem("selectedKey", e.key);
  };

  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[]
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
    } as MenuItem;
  }

  const items: MenuItem[] = [
    getItem(
      <NavLink
        className={({ isActive, isPending }) =>
          isPending ? "pending" : isActive ? "active" : ""
        }
        to="/"
      >
        <p className="text-[#637381] font-normal text-sm leading-[22px]">
          Dashboard
        </p>
      </NavLink>,
      "1",
      <BarChartOutlined style={{ fontSize: "22px" }} />
    ),
    getItem(
      <NavLink
        className={({ isActive, isPending }) =>
          isPending ? "pending" : isActive ? "active" : ""
        }
        to="/monitor-album"
      >
        <p className="text-[#637381] font-normal text-sm leading-[22px]">
          Giám sát
        </p>
      </NavLink>,
      "2",
      <FileSearchOutlined style={{ fontSize: "22px" }} />
    ),
    getItem(
      <NavLink
        className={({ isActive, isPending }) =>
          isPending ? "pending" : isActive ? "active" : ""
        }
        to="/router-control"
      >
        <p className="text-[#637381] font-normal text-sm leading-[22px]">
          Quản lý tuyến
        </p>
      </NavLink>,
      "3",
      <FileDoneOutlined style={{ fontSize: "22px" }} />
    ),

    getItem(
      <NavLink
        className={({ isActive, isPending }) =>
          isPending ? "pending" : isActive ? "active" : ""
        }
      >
        <p className="text-[#637381] font-normal text-sm leading-[22px]">
          Báo cáo
        </p>
      </NavLink>,
      "4",
      <ReconciliationOutlined style={{ fontSize: "22px" }} />,
      [
        getItem(
          <NavLink
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }
            to="/report-customer"
          >
            Báo cáo tồn kho khách hàng
          </NavLink>,
          "5"
        ),
        getItem(
          <NavLink
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }
            to="/app/report-kpi-dms"
          >
            Báo cáo KPI
          </NavLink>,
          "6"
        ),
      ]
    ),
  ];
  type MenuItem = Required<MenuProps>["items"][number];
  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="inline"
      items={items}
    ></Menu>
  );
}
