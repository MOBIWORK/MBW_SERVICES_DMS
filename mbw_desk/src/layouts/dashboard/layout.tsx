import React from "react";
import Header from "./header";
import MenuLeft from "./menu";
import { Layout, Menu } from "antd";

type Props = {
  children: React.ReactNode;
};
const { Content, Sider, theme } = Layout;
export default function DashboardLayout({ children }: Props) {
  return (
    // <div className="bg-[#F5F7FA] w-screen min-h-screen">
    //   <Header />
    //   <div className="flex">
    //     <MenuLeft />
    //     {/* <div className='max-w-full w-[80%] mx-auto'><div  className="rounded-md">{children}</div></div> */}
    //   </div>
    // </div>
    <Layout>
      <Content style={{ padding: "0 0px" }}>
        <Header />
        <Layout
          style={{
            padding: "24px 0",
            background: "#fff",
            borderRadius: "8px",
          }}
        >
          <Sider style={{ background: "#fff" }} width={200}>
            <div className="font-semibold text-lg text-[#919EAB] leading-[22px] mx-6 pb-4">
              DMS
            </div>
            <MenuLeft />
          </Sider>
          <Content
            className="round"
            style={{ padding: "0 24px", minHeight: 280 }}
          >
            <div>{children}</div>
          </Content>
        </Layout>
      </Content>
    </Layout>
  );
}
