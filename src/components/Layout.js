import React from "react";
import { Image, Layout } from "antd";
import { Outlet } from "react-router-dom";
import { MenuComp } from "./Menu";
import logo from "../assets/logo.png";
import { HeaderComp } from "./Header";

const { Content, Footer, Sider } = Layout;

const Dashboard = () => {
  const [collapsed, setCollapsed] = React.useState(false);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        style={{
          backgroundColor: "white",
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
        }}
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
          <Image
            preview={false}
            style={{ height: 50, width: "100%", maxWidth: 300 }}
            src={logo}
            alt=""
          />
        </div>
        <MenuComp />
      </Sider>
      <Layout
        className="site-layout"
        style={{ marginLeft: collapsed ? "80px" : "200px", height: "100vh" }}
      >
        <HeaderComp />
        <Content style={{ margin: "16px", overflow: "initial" }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
