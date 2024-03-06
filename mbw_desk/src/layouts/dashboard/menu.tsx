import { MenuProps } from "antd/lib";
import { useState } from "react";
import { MenuCustom } from "../../components/menu/menu";
import { listMenu } from "./data";

export default function MenuLeft() {
  const [current, setCurrent] = useState(
    localStorage.getItem("selectedKey") || "1"
  );
  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
    localStorage.setItem("selectedKey", e.key);
  };

 
  return (
    <MenuCustom
      onClick={onClick}
      selectedKeys={[current]}
      mode="inline"
      items={listMenu}
    ></MenuCustom>
  );
}
