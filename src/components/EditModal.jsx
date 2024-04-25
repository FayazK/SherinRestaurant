import React, { useEffect } from "react";
import { Modal, Form, Input, Upload, Button, notification } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";

const EditModal = ({ record, isVisible, onClose, onUpdate }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      name: record.name,
    });
  }, [record, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      console.log("Validated Form Values:", values); // Debug log

      if (!values.name) {
        notification.error({
          message: "Validation Error",
          description: "The category name cannot be empty.",
        });
        return;
      }

      // Get the auth token
      const authToken = localStorage.getItem("token");
      if (!authToken) {
        notification.error({
          message: "Authorization Error",
          description: "No authorization token was found.",
        });
        return;
      }

      // Prepare the formData
      const formData = new FormData();
      formData.append("name", values.name);
      console.log("FormData for API Request:", formData.get("name"));

      // Make the PUT request
      const response = await axios.put(
        `http://localhost:8000/api/v1/category/update-category/${record._id}`,
        { name: values.name },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      console.log("API Response:", response.data); // Debug log

      if (response.data.success) {
        notification.success({
          message: "Success",
          description: "Category updated successfully.",
        });
        onUpdate();
        onClose();
      } else {
        notification.error({
          message: "Update Error",
          description: response.data.message || "Failed to update category.",
        });
      }
    } catch (error) {
      console.error("API Error:", error); // Debug log
      notification.error({
        message: "Update failed",
        description:
          error.response?.data?.message ||
          error.message ||
          "There was an error updating the category.",
      });
    }
  };

  return (
    <Modal
      title="Edit Category"
      visible={isVisible}
      onOk={handleOk}
      onCancel={onClose}
      okText="Update"
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label="Category Name"
          rules={[
            { required: true, message: "Please input the category name!" },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditModal;
