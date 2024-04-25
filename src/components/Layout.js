// Dashboard.js
import React from "react";
import { Image, Layout } from "antd";
import { Outlet } from "react-router-dom";
import { MenuComp } from "./Menu";
import logo from "../assets/logo.jpg";
import { HeaderComp } from "./Header";

const { Header, Content, Footer, Sider } = Layout;

const Dashboard = () => {
  const [collapsed, setCollapsed] = React.useState(false);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        style={{ backgroundColor: "white" }}
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
      >
        <div
          style={{
            justifyContent: "center",
            display: "flex",
            marginTop: 10,
          }}
        >
          <Image style={{ height: 50, width: "100%" }} src={logo} alt="" />
        </div>
        <MenuComp />
      </Sider>
      <Layout className="site-layout">
        <HeaderComp />
        <Content style={{ margin: "16px" }}>
          <Outlet />
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
