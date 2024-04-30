import {
  Table,
  Button,
  Form,
  notification,
  Upload,
  Input,
  Modal,
  Image,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  UploadOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { Spin } from "antd";

export const CatagoriesScreen = () => {
  const [categories, setCategories] = useState([]);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    if (currentRecord != null) {
      form.setFieldsValue({ name: currentRecord.name });
    } else {
      form.resetFields();
    }
  }, [currentRecord]);

  const showCreateModal = () => {
    setCurrentRecord(null);
    setIsCreateModalVisible(true);
  };

  const showEditModal = (record) => {
    console.log(record);
    setCurrentRecord(record);
    setIsCreateModalVisible(true);
  };
  const closeEditModal = () => {
    setIsEditModalVisible(false);
  };

  const handleUpdate = () => {
    getAllCategories();
    closeEditModal();
  };

  // Create Api
  const handleSubmit = async (values) => {
    try {
      const authToken = localStorage.getItem("token");
      if (!authToken) {
        throw new Error("Authorization token not found");
      }

      const formData = new FormData();
      formData.append("name", values.name);
      if (values.image && values.image.length > 0) {
        formData.append("image", values.image[0].originFileObj);
      }

      const config = {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };

      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/category/create-category`,
        formData,
        config
      );

      if (data?.success) {
        notification.success({
          message: "Success",
          description: `${values.name} is created`,
        });
        form.resetFields();
        getAllCategories();
      } else {
        notification.error({
          message: "Error",
          description: data?.message || "Unable to create category",
        });
      }
    } catch (error) {
      console.error(error);
      notification.error({
        message: "Failed",
        description: "Something went wrong in creating category",
      });
    }
  };

  //Get All Api
  const getAllCategories = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/category/get-category`
      );
      console.log("cat", data.category);
      if (data.success && data.category) {
        setCategories(data.category);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error(error);
      notification.error({
        message: "Fetching failed",
        description: "Something went wrong in getting categories",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  //Delete API
  const handleDelete = async (id) => {
    try {
      const confirm = window.confirm(
        "Are you sure you want to delete this category?"
      );
      if (!confirm) {
        return;
      }

      const authToken = localStorage.getItem("token");
      if (!authToken) {
        notification.error({
          message: "Authorization Error",
          description: "No authorization token was found.",
        });
        return;
      }
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/category/delete-category/${id}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.data.success) {
        notification.success({
          message: "Deleted",
          description: "Category deleted successfully.",
        });
        getAllCategories();
      } else {
        notification.error({
          message: "Deletion Failed",
          description: response.data.message || "Failed to delete category.",
        });
      }
    } catch (error) {
      notification.error({
        message: "Deletion failed",
        description:
          error.response?.data?.message ||
          error.message ||
          "There was an error deleting the category.",
      });
    }
  };

  //Table Data
  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image, record) => (
        <div style={{ position: "relative" }}>
          <Image src={image} alt="Category Image" width={50} height={50} />
        </div>
      ),
    },
    {
      title: "Category Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>{text}</span>
          <div style={{ position: "absolute", top: 20, right: 10 }}>
            <Button
              icon={<EditOutlined />}
              style={{ backgroundColor: "red", color: "white", marginRight: 8 }}
              onClick={() => showEditModal(record)}
            >
              Edit
            </Button>
            <Button
              icon={<DeleteOutlined />}
              style={{ backgroundColor: "red", color: "white" }}
              onClick={() => {
                if (
                  window.confirm(
                    "Are you sure you want to delete this category?"
                  )
                ) {
                  handleDelete(record._id);
                }
              }}
            >
              Delete
            </Button>
          </div>
        </div>
      ),
    },
  ];

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

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
        <Typography.Title level={2}>Categories</Typography.Title>
        <Button
          style={{ backgroundColor: "red" }}
          type="primary"
          onClick={showCreateModal}
        >
          Create Category
        </Button>
      </div>

      <Modal
        title={currentRecord != null ? "Update Category" : "Create Category"}
        open={isCreateModalVisible}
        onCancel={() => setIsCreateModalVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          name="categoryForm"
          onFinish={handleSubmit}
          layout="vertical"
        >
          <Form.Item
            label="Category Name"
            name="name"
            rules={[
              { required: true, message: "Please input the category name!" },
            ]}
          >
            <Input placeholder="Enter category name" />
          </Form.Item>
          <Form.Item
            label="Category Image"
            name="image"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            rules={[
              {
                required: true,
                message: "Please upload an image for the category.",
              },
            ]}
          >
            <Upload name="image" listType="picture" beforeUpload={() => false}>
              <Button icon={<UploadOutlined />}></Button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button
              style={{ backgroundColor: "red" }}
              type="primary"
              htmlType="submit"
            >
              {currentRecord != null ? "Update Category" : "Add Category"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
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
          dataSource={categories}
          columns={columns}
          rowKey="_id" // Make sure this matches the unique identifier in your category data
          style={{ marginTop: "16px" }}
        />
      )}
    </div>
  );
};
