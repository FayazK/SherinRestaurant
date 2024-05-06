import React, { useState, useEffect } from "react";
import { Typography, Input, Button, message, Table, Modal, Form } from "antd";
import axios from "axios";

const { Title } = Typography;

export const Setting = () => {
  const [settings, setSettings] = useState([]);
  const [isModalVisibleGST, setIsModalVisibleGST] = useState(false);
  const [isModalVisibleDelivery, setIsModalVisibleDelivery] = useState(false);
  const [isModalVisibleOrderDiscount, setIsModalVisibleOrderDiscount] =
    useState(false);
  const [formGST] = Form.useForm();
  const [formDelivery] = Form.useForm();
  const [formOrderDiscount] = Form.useForm();

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const [gstResponse, deliveryResponse, orderDiscountResponse] =
          await Promise.all([
            axios.get(`${process.env.REACT_APP_API_URL}/settings/get-gst`),
            axios.get(`${process.env.REACT_APP_API_URL}/settings/get-delivery`),
            axios.get(
              `${process.env.REACT_APP_API_URL}/settings/order-discount`
            ),
          ]);
        const gst = gstResponse.data.data.gst;
        const deliveryCharges = deliveryResponse.data.data.deliveryCharges;
        const orderDiscount = orderDiscountResponse.data.data.orderDiscount;
        setSettings([
          { key: "GST", value: gst },
          { key: "Delivery Charges", value: deliveryCharges },
          { key: "Order Discount", value: orderDiscount },
        ]);
        message.success("Settings retrieved successfully");
      } catch (error) {
        console.error("Failed to fetch settings:", error);
        message.error("Failed to retrieve settings");
      }
    };

    fetchSettings();
  }, []);

  const handleUpdateSetting = async (key, value, formInstance) => {
    const apiEndpoints = {
      GST: "settings/create-gst",
      "Delivery Charges": "settings/create-delivery",
      "Order Discount": "settings/create-discount",
    };

    const baseUrl = process.env.REACT_APP_API_URL; // Assuming the base URL is stored in an environment variable

    try {
      const url = `${baseUrl}/${apiEndpoints[key]}`; // Construct the URL dynamically based on the key
      const headers = {
        "Content-Type": "application/json",
      };
      const response = await axios.post(
        url,
        { [key.toLowerCase().replace(/\s+/g, "")]: value },
        { headers }
      );

      if (response.data.success) {
        updateSettings(key, value);
        message.success(`${key} updated successfully`);
        formInstance.resetFields();
      } else {
        message.error(`Failed to update ${key}`);
      }
    } catch (error) {
      console.error(`Error updating ${key}:`, error);
      message.error(`Failed to update ${key} due to an error.`);
    }
  };

  const updateSettings = (key, value) => {
    setSettings((prev) =>
      prev.map((setting) =>
        setting.key === key ? { ...setting, value } : setting
      )
    );
  };

  const showModal = (type) => {
    if (type === "GST") {
      setIsModalVisibleGST(true);
    } else if (type === "Delivery") {
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
    },
  ];

  return (
    <div style={{ marginTop: 50 }}>
      <div style={{ marginTop: 50 }}>
        <Title level={2}>Settings</Title>
        <Button
          style={{ backgroundColor: "#F49E1A", color: "white" }}
          type="secondary"
          onClick={() => showModal("GST")}
        >
          Update GST
        </Button>
        <Button
          type="secondary"
          onClick={() => showModal("Delivery")}
          style={{ marginLeft: 8, backgroundColor: "#F49E1A", color: "white" }}
        >
          Delivery Charges
        </Button>
        <Button
          type="secondary"
          onClick={() => showModal("Order Discount")}
          style={{ marginLeft: 8, backgroundColor: "#F49E1A", color: "white" }}
        >
          Order Discount
        </Button>
        <Modal
          title="Update GST"
          visible={isModalVisibleGST}
          onOk={() => formGST.submit()}
          onCancel={() => setIsModalVisibleGST(false)}
        >
          <Form
            form={formGST}
            onFinish={(values) =>
              handleUpdateSetting("GST", values.gst, formGST)
            }
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
          c
          onCancel={() => setIsModalVisibleDelivery(false)}
        >
          <Form
            form={formDelivery}
            onFinish={(values) =>
              handleUpdateSetting(
                "Delivery Charges",
                values.deliveryCharges,
                formDelivery
              )
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
              handleUpdateSetting(
                "Order Discount",
                values.orderDiscount,
                formOrderDiscount
              )
            }
          >
            <Form.Item name="orderDiscount" label="Order Discount Value">
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      </div>
      <div style={{ marginTop: 20 }}>
        <Table dataSource={settings} columns={columns} pagination={false} />
      </div>
    </div>
  );
};

export default Setting;
