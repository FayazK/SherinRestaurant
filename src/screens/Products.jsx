import React, { useEffect, useState } from "react";
import {
  Typography,
  Table,
  Button,
  Space,
  notification,
  Image,
  Form,
} from "antd";
import { Spin } from "antd";
import axios from "axios";
import CreateProductModal from "../components/ProductModal";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { DescriptionCell } from "../components/DescriptionCell";

export const ProductScreen = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [form] = Form.useForm();

  const showModal = () => {
    setCurrentRecord(null);
    setIsModalVisible(true);
  };
  const showEditModal = (record) => {
    console.log("record", isModalVisible);

    setCurrentRecord(record);
    setIsModalVisible(true);
  };
  const handleModalClose = () => {
    setIsModalVisible(false);
    setCurrentRecord(null);
  };

  //Table Columns
  const columns = [
    {
      title: "ID",
      dataIndex: "customId",
      key: "customId",
      render: (text) => text || "N/A",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Slug",
      dataIndex: "slug",
      key: "slug",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text) => <DescriptionCell description={text} />,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },

    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (text, record) => {
        const categoryName = record.category?.name || "No Category";
        return categoryName;
      },
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
      render: (discount) => `${discount}%`,
    },
    {
      title: "Photo",
      dataIndex: "photo",
      key: "photo",
      render: (_, record) => {
        return (
          <>
            {record ? (
              <Image
                src={`${process.env.REACT_APP_IMAGE_URL}/uploads/${record.photo}`}
                alt="Product Photo"
                style={{ maxWidth: "100px", maxHeight: "100px" }}
              />
            ) : (
              "No Photo"
            )}
          </>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      fixed: "right",
      width: 100,
      render: (_, record) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            onClick={() => showEditModal(record)}
            style={{ backgroundColor: "red", color: "white" }}
          ></Button>
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record._id)}
            style={{ backgroundColor: "red", color: "white" }}
          ></Button>
        </Space>
      ),
    },
  ];

  //DeleteProduct
  const handleDelete = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const response = await axios.delete(
          `${process.env.REACT_APP_API_URL}/product/delete-product/${productId}`
        );
        if (response.status === 200) {
          setProducts(products.filter((product) => product._id !== productId));
          notification.success({
            message: "Delete Successful",
            description: `The product has been deleted successfully.`,
          });
        }
      } catch (error) {
        console.error("There was an error deleting the product", error);
        notification.error({
          message: "Delete Failed",
          description: `There was an error deleting the product: ${error.message}`,
        });
      }
    }
  };

  //ALL Products

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/product/get-products`
      );
      console.log("response", response);
      if (response.data.success && response.data.products) {
        const formattedProducts = response.data.products.map((product) => {
          return {
            _id: product._id,
            customId: product.customId,
            name: product.name,
            slug: product.slug,
            description: product.description,
            price: product.price,
            category: product.category || "N/A",
            quantity: product.quantity,
            discount: product.discount,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt,
            photo: product.photo || "N/A",
          };
        });
        setProducts(formattedProducts);
      } else {
        throw new Error("Failed to load products");
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
      notification.error({
        message: "Fetching failed",
        description: "Something went wrong in getting products",
      });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 5,
          alignItems: "center",
        }}
      >
        <Typography.Title level={2}>Products</Typography.Title>
        <Button
          onClick={showModal}
          style={{ backgroundColor: "red", color: "white" }}
        >
          Create Product
        </Button>
        <CreateProductModal
          form={form}
          isModalVisible={isModalVisible}
          onClose={handleModalClose}
          currentProduct={currentRecord}
          fetchProducts={fetchProducts}
          setIsModalVisible={setIsModalVisible}
        />
      </div>
      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: "20px",
          }}
        >
          <Spin size="large" className="custom-spin" />
        </div>
      ) : (
        <Table
          columns={columns}
          dataSource={products}
          rowKey="_id"
          scroll={{ x: "max-content" }}
          style={{ overflowX: "auto" }}
        />
      )}
    </div>
  );
};
