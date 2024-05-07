import React, { useState } from "react";
import { Layout, Modal, Button, Typography } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Header } = Layout;

export const HeaderComp = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    localStorage.removeItem("token"); // Remove the token from local storage
    setIsModalVisible(false);
    navigate("/"); // Navigate to home/login page
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Header
      style={{
        width: "100%",
        paddingInline: 20,
        backgroundColor: "white",
        display: "flex", // Ensure flex display for alignment
        alignItems: "center", // Center items vertically
        justifyContent: "space-between", // Space between the logo and logout icon
      }}
    >
      <Typography.Title
        level={2}
        className="custom-title"
        style={{ margin: 0 }}
      >
        Welcome, Admin!
      </Typography.Title>
      <LogoutOutlined
        style={{ fontSize: 20, cursor: "pointer", color: "black" }}
        onClick={showModal}
      />

      <Modal
        title="Confirm Logout"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            No
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Yes
          </Button>,
        ]}
      >
        <p>Are you sure you want to logout?</p>
      </Modal>
    </Header>
  );
};
