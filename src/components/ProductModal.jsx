import React, { useEffect, useState } from "react";
import {
  Modal,
  Form,
  Input,
  InputNumber,
  Button,
  Select,
  notification,
  Upload,
} from "antd";
import axios from "axios";
import { UploadOutlined } from "@ant-design/icons";

const { Option } = Select;

const CreateProductModal = ({
  currentProduct,
  isModalVisible,
  setIsModalVisible,
  fetchProducts,
}) => {
  console.log();
  const [form] = Form.useForm();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
    if (currentProduct) {
      form.setFieldsValue({
        name: currentProduct.name,
        description: currentProduct.description,
        price: currentProduct.price,
        category: currentProduct.category?._id,
        quantity: currentProduct.quantity,
        discount: currentProduct.discount,
        photo: [
          {
            uid: "-1",
            name: "image.png",
            status: "done",
            url:
              `${process.env.REACT_APP_IMAGE_URL}/uploads/` +
              currentProduct.photo,
          },
        ],
      });
    } else {
      form.resetFields();
    }
  }, [currentProduct, form]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/category/get-category`
      );
      setCategories(response.data.category || []);
    } catch (error) {
      notification.error({
        message: "Error fetching categories",
        description: "Could not fetch categories. Please try again later.",
      });
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("price", values.price);
    formData.append("category", values.category);
    formData.append("quantity", values.quantity);
    formData.append("discount", values.discount);

    if (values.photo && values.photo.length > 0) {
      formData.append("photo", values.photo[0].originFileObj);
    }

    try {
      const authToken = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${authToken}`,
        },
      };

      let response;
      if (currentProduct) {
        response = await axios.put(
          `${process.env.REACT_APP_API_URL}/product/update-product/${currentProduct._id}`,
          formData,
          config
        );
      } else {
        response = await axios.post(
          `${process.env.REACT_APP_API_URL}/product/create-product`,
          formData,
          config
        );
      }

      if (response.data.success) {
        notification.success({
          message: `Product ${currentProduct ? "Updated" : "Created"}`,
          description: `The product has been successfully ${
            currentProduct ? "updated" : "created"
          }.`,
        });
        setIsModalVisible(false);
        fetchProducts();
      } else {
        notification.error({
          message: "Operation Failed",
          description:
            response.data.message ||
            `Failed to ${currentProduct ? "update" : "create"} the product.`,
        });
      }
    } catch (error) {
      notification.error({
        message: "Operation Error",
        description:
          error.response?.data?.message ||
          `There was an error ${
            currentProduct ? "updating" : "creating"
          } the product.`,
      });
    }
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const uploadButton = (
    <div>
      <UploadOutlined />
      <div style={{ marginTop: 8 }}>Click to upload</div>
    </div>
  );

  const beforeUpload = (file) => {
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      notification.error({
        message: "File is too large",
        description: "The file must be less than 5MB in size.",
      });
    }
    return isLt5M;
  };

  return (
    <>
      <Modal
        title={currentProduct ? "Edit Product" : "Create New Product"}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form layout="vertical" form={form} onFinish={handleSubmit}>
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="price" label="Price" rules={[{ required: true }]}>
            <InputNumber min={1} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true }]}
          >
            <Select placeholder="Select a category">
              {categories.map((category) => (
                <Option key={category._id} value={category._id}>
                  {category.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="quantity"
            label="Quantity"
            rules={[{ required: true }]}
          >
            <InputNumber min={1} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="discount"
            label="Discount"
            rules={[{ required: true }]}
          >
            <InputNumber min={1} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="photo"
            label="Photo"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            rules={[
              { required: true, message: "Please upload a product image." },
            ]}
          >
            <Upload
              name="photo"
              listType="picture-card"
              beforeUpload={beforeUpload}
              accept="image/*"
              maxCount={1}
            >
              {uploadButton}
            </Upload>
          </Form.Item>
          <Button
            style={{ backgroundColor: "red", color: "white" }}
            type="primary"
            htmlType="submit"
          >
            {currentProduct ? "Update Product" : "Create Product"}
          </Button>
        </Form>
      </Modal>
    </>
  );
};

export default CreateProductModal;
