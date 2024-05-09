import React, { useState, useEffect } from "react";
import { Typography, Input, Button, message, Table, Modal, Form } from "antd";
import axios from "axios";

const { Title } = Typography;

export const Setting = () => {
  const [settings, setSettings] = useState([]);
  const [isModalVisibleGST, setIsModalVisibleGST] = useState(false);
  const [isModalVisibleDelivery, setIsModalVisibleDelivery] = useState(false);
  const [reload, setReload] = useState("");

  const [isModalVisibleOrderDiscount, setIsModalVisibleOrderDiscount] =
    useState(false);
  const [formGST] = Form.useForm();
  const [formDelivery] = Form.useForm();
  const [formOrderDiscount] = Form.useForm();

  useEffect(() => {
    fetchInitialSettings();
  }, []);

  const fetchInitialSettings = async () => {
    try {
      const [gstResponse, deliveryResponse, orderDiscountResponse] =
        await Promise.all([
          axios.get(`${process.env.REACT_APP_API_URL}/settings/get-gst`),
          axios.get(`${process.env.REACT_APP_API_URL}/settings/get-delivery`),
          axios.get(`${process.env.REACT_APP_API_URL}/settings/order-discount`),
        ]);
      setSettings([
        { key: "GST", value: gstResponse.data.data.gst },
        {
          key: "Delivery Charges",
          value: deliveryResponse.data.data.deliveryCharges,
        },
        {
          key: "Order Discount",
          value: orderDiscountResponse.data.data.orderDiscount,
        },
      ]);
      message.success("Settings retrieved successfully");
    } catch (error) {
      console.error("Failed to fetch settings:", error);
      message.error("Failed to retrieve settings");
    }
  };

  const handleUpdateGST = async (value, form) => {
    const url = `${process.env.REACT_APP_API_URL}/settings/create-gst`;
    const payload = { gst: value };
    await updateSetting(url, payload, form);
  };

  const handleUpdateDeliveryCharges = async (value, form) => {
    const url = `${process.env.REACT_APP_API_URL}/settings/create-delivery`;
    const payload = { deliveryCharges: value };
    await updateSetting(url, payload, form);
  };

  const handleUpdateOrderDiscount = async (value, form) => {
    const url = `${process.env.REACT_APP_API_URL}/settings/create-discount`;
    const payload = { orderDiscount: value };
    await updateSetting(url, payload, form);
  };

  const updateSetting = async (url, payload, form) => {
    try {
      const response = await axios.post(url, payload, {
        headers: { "Content-Type": "application/json" },
      });
      if (response.status === 200 && response.data.success) {
        setSettings((prev) =>
          prev.map((item) =>
            item.key === Object.keys(payload)[0]
              ? { ...item, value: Object.values(payload)[0] }
              : item
          )
        );
        message.success("Setting updated successfully");
        form.resetFields();
        setReload(!reload);
      } else {
        message.error(
          `Failed to update setting: ${response.data.message || ""}`
        );
      }
    } catch (error) {
      console.error("Error updating setting:", error);
      message.error(
        `Failed to update setting due to an error: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  // Modal handling
  const showModal = (type) => {
    if (type === "GST") {
      setIsModalVisibleGST(true);
    } else if (type === "Delivery Charges") {
      setIsModalVisibleDelivery(true);
    } else if (type === "Order Discount") {
      setIsModalVisibleOrderDiscount(true);
    }
  };

  const columns = [
    {
      title: "Setting",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Value",
      dataIndex: "value",
      key: "value",
      render: (text, record) => {
        switch (record.key) {
          case "GST":
          case "Order Discount":
            return `${text} %`;
          case "Delivery Charges":
            return `${text} /km`;
          default:
            return text;
        }
      },
    },
  ];

  return (
    <div style={{ marginTop: 50 }}>
      <Title level={2}>Settings</Title>
      <Button
        onClick={() => showModal("GST")}
        style={{ backgroundColor: "#F49E1A", color: "white" }}
      >
        Update GST
      </Button>
      <Button
        onClick={() => showModal("Delivery Charges")}
        style={{ marginLeft: 8, backgroundColor: "#F49E1A", color: "white" }}
      >
        Update Delivery Charges
      </Button>
      <Button
        onClick={() => showModal("Order Discount")}
        style={{ marginLeft: 8, backgroundColor: "#F49E1A", color: "white" }}
      >
        Update Order Discount
      </Button>

      {/* Modals for updating settings */}
      <Modal
        title="Update GST"
        visible={isModalVisibleGST}
        onOk={() => formGST.submit()}
        onCancel={() => setIsModalVisibleGST(false)}
      >
        <Form
          form={formGST}
          onFinish={(values) => handleUpdateGST(values.gst, formGST)}
        >
          <Form.Item name="gst" label="GST Value">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Update Delivery Charges"
        visible={isModalVisibleDelivery}
        onOk={() => formDelivery.submit()}
        onCancel={() => setIsModalVisibleDelivery(false)}
      >
        <Form
          form={formDelivery}
          onFinish={(values) =>
            handleUpdateDeliveryCharges(values.deliveryCharges, formDelivery)
          }
        >
          <Form.Item name="deliveryCharges" label="Delivery Charges">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Update Order Discount"
        visible={isModalVisibleOrderDiscount}
        onOk={() => formOrderDiscount.submit()}
        onCancel={() => setIsModalVisibleOrderDiscount(false)}
      >
        <Form
          form={formOrderDiscount}
          onFinish={(values) =>
            handleUpdateOrderDiscount(values.orderDiscount, formOrderDiscount)
          }
        >
          <Form.Item name="orderDiscount" label="Order Discount Value">
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      <Table dataSource={settings} columns={columns} pagination={false} />
    </div>
  );
};

export default Setting;
