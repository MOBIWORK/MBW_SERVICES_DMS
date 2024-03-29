import React, { useState } from "react";
import Header from "./header";
import MenuLeft from "./menu";
import { Layout } from "antd";
import styled from "styled-components";

type Props = {
  children: React.ReactNode;
};
const { Content, Sider } = Layout;


const SiderCustome = styled(Sider)` 
& .ant-layout-sider-trigger {
  display: none;
}
`
export default function DashboardLayout({ children }: Props) {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout>
        <SiderCustome style={{ background: "#fff" }} width={!collapsed ? 250 : 78} collapsible collapsed={collapsed} >            
            <MenuLeft handleCollapsed = {setCollapsed} collapsed={collapsed}/>
          </SiderCustome>
      <Layout >
        <Content style={{ padding: "0 0px"}} className="!bg-[#fff] min-h-screen">
          <Header />
          <Layout
            style={{
              padding: "24px 0",
              background: "#fff",
              borderRadius: "8px",
              margin: "0 auto"
            }}
          >
          
            <Content
              className="round"
              style={{ padding: "0 24px", minHeight: "90vh" ,background:"#F4F6F8" }}
            >
              <div>{children}</div>
            </Content>
          </Layout>
        </Content>
      </Layout>
    </Layout>
  );
}
