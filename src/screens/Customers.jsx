import React, { useState, useEffect } from "react";
import { Typography, Table } from "antd";
import axios from "axios";

export const CustomerScreen = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/auth/all-users`
        );
        setUsers(response.data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

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
    // Add other columns as necessary
  ];

  return (
    <>
      <Typography.Title level={2}>User List</Typography.Title>
      <Table columns={columns} dataSource={users} rowKey="_id" />
    </>
  );
};
