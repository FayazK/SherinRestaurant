import React, { useState } from "react";
import { Layout, Modal, Button, Typography, Space } from "antd";
import { LogoutOutlined, SmileOutlined } from "@ant-design/icons";
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
    navigate("/"); // Navigate to login
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Header
      style={{
        paddingInline: 20,
        backgroundColor: "white",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Space direction="horizontal" align="center">
          <Typography.Title level={2} className="custom-title">
            Welcome,Admin{" "}
          </Typography.Title>
          <SmileOutlined style={{ color: "red", fontSize: 20 }} />
        </Space>

        <LogoutOutlined style={{ fontSize: 20 }} onClick={showModal} />
      </div>

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
