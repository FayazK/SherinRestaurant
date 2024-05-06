import React from "react";
import {
  DesktopOutlined,
  AppstoreOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Menu } from "antd";

export const MenuComp = () => {
  return (
    <Menu theme="light" defaultSelectedKeys={["1"]} mode="inline">
      <Menu.Item
        key="1"
        icon={<DesktopOutlined />}
        style={{ marginTop: "18px" }}
      >
        <Link to="/dashboard">Home</Link>
      </Menu.Item>
      <Menu.Item key="2" icon={<AppstoreOutlined />}>
        <Link to="catagories">Categories</Link>
      </Menu.Item>
      <Menu.Item key="3" icon={<UnorderedListOutlined />}>
        <Link to="products">Products</Link>
      </Menu.Item>
      <Menu.Item key="4" icon={<UserOutlined />}>
        <Link to="users">Users</Link>
      </Menu.Item>
      <Menu.Item key="5" icon={<ShoppingCartOutlined />}>
        <Link to="orders">Orders</Link>
      </Menu.Item>
      <Menu.Item key="6" icon={<ShoppingCartOutlined />}>
        <Link to="settings">Settings</Link>
      </Menu.Item>
    </Menu>
  );
};
