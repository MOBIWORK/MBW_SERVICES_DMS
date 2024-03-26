import React from "react";
import { Layout, Menu } from "antd";
import Header from "../dashboard/header";

type Props = {
  children: React.ReactNode;
};
const { Content} = Layout;
export default function MonitorLayout({ children }: Props) {
  return (
    <Layout >
      <Content style={{ padding: "0 0px"}} className="!bg-[#fff] w-screen min-h-screen">
        <Header />
        <Layout
          style={{
            padding: "24px 20px 24px 0",
            background: "#fff",
            borderRadius: "8px",
            margin: "0 auto"
          }}
        >
          <Content
            className="round"
            style={{ minHeight: 280 }}
          >
            <div>{children}</div>
          </Content>
        </Layout>
      </Content>
    </Layout>
  );
}
