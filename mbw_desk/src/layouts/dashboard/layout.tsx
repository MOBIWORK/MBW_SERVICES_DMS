import React, { useState } from "react";
import Header from "./header";
import MenuLeft from "./menu";
import { Layout } from "antd";
import styled from "styled-components";
import AvatarComponent from "./avatar-component";

type Props = {
  children: React.ReactNode;
};
const { Content, Sider } = Layout;


const SiderCustome = styled(Sider)` 
& .ant-layout-sider-trigger {
  width:100%;
  height: fit-content;
}
`
export default function DashboardLayout({ children }: Props) {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout className="overflow-y-auto h-screen w-screen">
        <SiderCustome className="!bg-[#fff]" style={{height:"unset"}} width={!collapsed ? 250 : 78} collapsible collapsed={collapsed} trigger={<AvatarComponent mini={collapsed}/>} >            
            <MenuLeft handleCollapsed = {setCollapsed} collapsed={collapsed}/>
        </SiderCustome>
          <Content
              className="round max-h-screen p-0 bg-[#F4F6F8] !max-w-screen"
            >
              {children}
            </Content>
    </Layout>
  );
}
