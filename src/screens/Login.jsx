import React, { useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Checkbox,
  Row,
  Col,
  Card,
  Typography,
} from "antd";
import img from "../assets/login.avif";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { notification } from "antd";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  const onFinish = async (values) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/login`,
        {
          email: values.email,
          password: values.password,
        }
      );
      console.log("response", response.data);

      if (response.data.user && response.data.user.role === 1) {
        notification.success({
          message: "Login Successful",
          description: "Logged in successfully as Admin!",
        });
        localStorage.setItem("token", response.data.token);
        navigate("/dashboard");
      } else if (response.data.user && response.data.user.role === 0) {
        notification.error({
          message: "Access Denied",
          description: "Only admin has access to the dashboard!",
        });
        localStorage.removeItem("token");
        navigate("/", { replace: true });
      } else {
        notification.error({
          message: "Access Denied",
          description: "Unexpected role type or user not found.",
        });
        localStorage.removeItem("token");
      }
    } catch (error) {
      if (error.response) {
        notification.error({
          message: "Login Failed",
          description: error.response.data.message || "Failed to log in!",
        });
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Row style={{ padding: 0 }}>
        <Col lg={16} md={24} sm={24} xs={24}>
          <div
            style={{
              backgroundImage: `url(${img})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "100vh",
            }}
          ></div>
        </Col>
        <Col
          lg={8}
          md={24}
          sm={24}
          xs={24}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Card
            style={{
              width: "100%",
              maxWidth: "400px", // Max width of the form
              margin: "auto", // Center the card in its column
              padding: "20px",
              boxShadow: "0px 8px 16px 0px rgba(0,0,0,0.2)", // Shadow effect for depth
              borderRadius: "15px", // Slightly larger border radius for a softer look
              backgroundColor: "#ffffff", // A neutral background color
              border: "1px solid #f0f0f0", // A subtle border
              overflow: "hidden", // Ensure nothing leaks outside the border-radius
            }}
          >
            <Typography.Title
              level={2}
              style={{ textAlign: "center", color: "#5CDB95" }}
            >
              Welcome Back!
            </Typography.Title>
            <Typography.Paragraph
              style={{
                textAlign: "center",
                marginBottom: "24px",
                color: "#05386B",
              }}
            >
              Sign in to your account
            </Typography.Paragraph>
            <Form
              name="basic"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              layout="vertical" // This will place the labels on top of the inputs
            >
              <Form.Item
                label="Email"
                name="email" // Changed from 'username' to 'email'
                rules={[
                  {
                    type: "email", // Validation rule to ensure it is an email
                    message: "The input is not valid E-mail!",
                  },
                  {
                    required: true,
                    message: "Please input your E-mail!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item name="remember" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: "100%" }}
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Login;
