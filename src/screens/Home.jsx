import React from "react";
import { Row, Col, Card, Statistic, Progress, Table } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";

export const HomeScreen = () => {
  // Dummy data for table
  const recentLeadsColumns = [
    {
      title: "Client",
      dataIndex: "client",
      key: "client",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
  ];

  // Data for the Recent Leads table
  const recentLeadsData = [
    {
      key: "1",
      client: "Test Client 1",
      phone: "1234567890",
      status: "Pending",
    },
    {
      key: "2",
      client: "Test Client 2",
      phone: "0987654321",
      status: "Contacted",
    },
    {
      key: "3",
      client: "Test Client 3",
      phone: "1122334455",
      status: "Converted",
    },
  ];
  const recentProductsColumns = [
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    // Add more columns if necessary
  ];
  const recentProductsData = [
    {
      key: "1",
      productName: "Product A",
      price: "Pkr 100",
      status: "Available",
    },
    {
      key: "2",
      productName: "Product B",
      price: "Pkr 200",
      status: "Unavailable",
    },
    {
      key: "3",
      productName: "Product C",
      price: "Pkr 300",
      status: "Available",
    },
    // Add more data if necessary
  ];

  return (
    <div>
      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Statistic title="Leads" value={1128} />
            <Progress percent={70} status="active" />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Order" value={93} suffix="pkr" />
            <Progress percent={80} status="active" />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Payment" value={93} suffix="pkr" />
            <Progress percent={50} status="exception" />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Due Balance" value={2300} suffix="pkr" />
            <Progress percent={40} status="exception" />
          </Card>
        </Col>
      </Row>

      {/* Other Cards and Progress Indicators as per your layout */}

      <Row gutter={16} style={{ marginTop: "16px" }}>
        <Col span={12}>
          <Card title="Recent Leads">
            <Table
              columns={recentLeadsColumns}
              dataSource={recentLeadsData}
              pagination={false}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Recent Products">
            <Table
              columns={recentProductsColumns}
              dataSource={recentProductsData}
              pagination={false}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};
