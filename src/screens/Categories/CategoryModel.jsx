// CategoryModal.jsx
import React from "react";
import { Modal, Form, Input, Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const CategoryModal = ({
  isVisible,
  onCancel,
  onFinish,
  currentRecord,
  normFile,
}) => {
  const [form] = Form.useForm();

  return (
    <Modal
      title={currentRecord != null ? "Update Category" : "Create Category"}
      open={isVisible}
      onCancel={onCancel}
      footer={null}
    >
      <Form
        form={form}
        name="categoryForm"
        onFinish={onFinish}
        layout="vertical"
        initialValues={{ name: currentRecord?.name }}
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
            <Button icon={<UploadOutlined />}>Upload</Button>
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
  );
};

export default CategoryModal;
