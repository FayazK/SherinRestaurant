import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  Typography,
  Spin,
  notification,
  Popconfirm,
  Image,
  Modal,
  Select,
  Tag,
} from "antd";
import {
  DeleteOutlined,
  PrinterOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import OrderInvoice from "../components/Invoice";
const { Option } = Select;

export const OrderScreen = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [previousOrdersCount, setPreviousOrdersCount] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [modalContent, setModalContent] = useState([]);

  const showModal = (productNames) => {
    setModalContent(productNames);
    setIsModalVisible2(true);
  };

  const handleOk = () => {
    setIsModalVisible2(false);
  };

  const handleCancel = () => {
    setIsModalVisible2(false);
  };

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/orders/all-orders`
        );
        setLoading(false);

        const fetchedOrders = response.data.data || [];
        console.log("Response Data:", response.data);
        console.log("Complete Orders:", fetchedOrders);

        if (fetchedOrders.length > 0) {
          setOrders(fetchedOrders);
        } else {
          console.error("Orders not found in response data");
        }

        if (fetchedOrders.length > previousOrdersCount) {
          notification.open({
            message: "New Order Received",
            description: `You have new orders. Total orders: ${fetchedOrders.length}`,
            onClick: () => {
              console.log("Notification Clicked!");
            },
          });
        }

        setPreviousOrdersCount(fetchedOrders.length);
      } catch (error) {
        setLoading(false);
        console.error("Failed to fetch orders:", error);
        notification.error({
          message: "Error",
          description: "Failed to fetch orders. Please try again later.",
        });
      }
    };

    fetchOrders();
  }, []);

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/orders/delete-order/${id}`
      );
      setOrders(orders.filter((order) => order._id !== id));
      notification.success({
        message: "Order Deleted",
        description: "The order has been successfully deleted.",
      });
    } catch (error) {
      console.error("Error deleting order:", error.response.data); // Log the specific API error message
      notification.error({
        message: "Error",
        description:
          "There was an error deleting the order. Please try again later.",
      });
    }
    setLoading(false);
  };

  const handleStatusUpdate = async (id, selectedStatus) => {
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_API_URL}/orders/${id}/status`,
        { status: selectedStatus },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      const updatedOrders = orders.map((order) =>
        order._id === id ? { ...order, status: selectedStatus } : order
      );
      setOrders(updatedOrders);
      notification.success({
        message: "Status Updated",
        description: "The status of the order has been updated successfully.",
      });
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const columns = [
    {
      title: "No.",
      key: "index",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Name",
      key: "name",
      render: (text, record) => record.userDetails.name,
    },
    {
      title: "Phone",
      key: "phone",
      render: (text, record) => record.userDetails.phone,
    },
    {
      title: "Delivery Address",
      key: "deliveryaddress",
      render: (text, record) => record.deliveryaddress,
    },
    {
      title: "Product Photo",
      key: "photo",
      render: (text, record) =>
        record.cartItems.map((item) =>
          item.product?.photo ? (
            <Image
              src={`${process.env.REACT_APP_IMAGE_URL}/uploads/${item.product.photo}`}
              alt={item.product.name}
              style={{ width: "50px", height: "50px" }}
            />
          ) : (
            <span>No Image</span>
          )
        ),
    },
    {
      title: "Product Name",
      key: "productName",
      render: (text, record) => (
        <>
          {record.cartItems.map((item, index) => (
            <Tag color="blue" key={index}>
              {`${item.product?.name} - Qty-${item.quantity}`}
            </Tag>
          ))}
          {record.cartItems.length > 1 && (
            <EyeOutlined
              onClick={() =>
                showModal(
                  record.cartItems.map((item) => ({
                    name: item.product?.name,
                    price: item.product?.price,
                  }))
                )
              }
            />
          )}
        </>
      ),
    },

    {
      title: "Total Amount",
      key: "total",
      render: (text, record) => record.total,
    },
    {
      title: "Total Discount",
      key: "total",
      render: (text, record) => record.discount,
    },
    {
      title: "Total GST",
      key: "total",
      render: (text, record) => record.gst,
    },
    {
      title: "Delivery Charges",
      key: "deliverycharges",
      render: (text, record) => Number(record.deliverycharges).toFixed(0),
    },
    {
      title: "Total Items",
      key: "quantity",
      render: (text, record) => {
        if (record.cartItems && record.cartItems.length > 0) {
          const totalQuantity = record.cartItems.reduce(
            (sum, item) => sum + (item.quantity || 0),
            0
          );

          if (record.cartItems.length > 1) {
            return totalQuantity;
          } else {
            return record.cartItems[0].quantity || "N/A";
          }
        } else {
          return "N/A"; // Handle case where cartItems is undefined or empty
        }
      },
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text, record) => (
        <Select
          style={{
            width: 120,
            backgroundColor: "rgba(255, 165, 0, 0.2)",
            borderRadius: 20,
            alignSelf: "flex-start",
          }}
          value={text}
          onChange={(value) => handleStatusUpdate(record._id, value)}
        >
          <Option value="Pending">Pending</Option>
          <Option value="Processing">Processing</Option>
          <Option value="Completed">Completed</Option>
          <Option value="Delivered">Delivered</Option>
        </Select>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <>
          <PrinterOutlined
            onClick={() => handlePrint(record)}
            style={{ color: "green", marginRight: 12, cursor: "pointer" }}
          />
          <Popconfirm
            title="Are you sure you want to delete this order?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <DeleteOutlined style={{ color: "red", cursor: "pointer" }} />
          </Popconfirm>
        </>
      ),
    },
  ];
  const handlePrint = (order) => {
    setCurrentOrder(order);
    setIsModalVisible(true);
  };
  return (
    <div style={{ padding: 20 }}>
      <Typography.Title level={2}>Orders</Typography.Title>
      {loading ? (
        <Spin
          size="large"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "200px",
          }}
        />
      ) : (
        <Table
          dataSource={orders}
          columns={columns}
          rowKey={(record) => record._id}
          pagination={{ pageSize: 10 }}
        />
      )}
      <Modal
        title="Print Invoice"
        visible={isModalVisible}
        onOk={() => setIsModalVisible(false)}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={800}
      >
        {currentOrder && <OrderInvoice order={currentOrder} />}
      </Modal>
      <Modal
        title="Product Names"
        visible={isModalVisible2}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            flexDirection: "column",
          }}
        >
          {modalContent.map((product, index) => (
            <Tag color="red" key={index}>
              {`${product.name} - Rs.${product.price.toFixed(2)}`}
            </Tag>
          ))}
        </div>
      </Modal>
    </div>
  );
};
