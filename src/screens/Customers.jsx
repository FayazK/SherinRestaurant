import React, { useState, useEffect } from "react";
import { Typography, Table, Button, Popconfirm, message } from "antd";
import axios from "axios";
import { DeleteOutlined } from "@ant-design/icons";

export const CustomerScreen = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/auth/all-users`
        );
        console.log(response);
        setUsers(response.data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/auth/users/${id}`);
      const filteredUsers = users.filter((user) => user._id !== id);
      setUsers(filteredUsers);
      message.success("User deleted successfully");
    } catch (error) {
      console.error("Failed to delete user:", error);
      message.error("Failed to delete user");
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Popconfirm
          title="Are you sure you want to delete this user?"
          onConfirm={() => handleDelete(record._id)}
          okText="Yes"
          cancelText="No"
          disabled={record.role === 1}
        >
          <Button
            type="link"
            icon={
              <DeleteOutlined
                style={{ color: record.role === 1 ? "grey" : "red" }}
              />
            }
            onClick={(e) => e.stopPropagation()}
            disabled={record.role === 1}
            style={{ padding: 0, border: "none", background: "none" }}
          />
        </Popconfirm>
      ),
    },
  ];

  return (
    <>
      <div style={{ marginTop: 50, flexDirection: "column" }}>
        <Typography.Title level={2}>User List</Typography.Title>
        <Table columns={columns} dataSource={users} rowKey="_id" />
      </div>
    </>
  );
};
