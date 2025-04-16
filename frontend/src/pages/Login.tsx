import React from "react";
import { Form, Input, Button, Card, message } from "antd";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Login: React.FC = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const onFinish = async (values: { email: string; password: string }) => {
    try {
      const response = await login(values);
      message.success(`Welcome, ${response.user.name}!`);
      // Save the token to localStorage or context
      localStorage.setItem("token", response.access_token);
      // Redirect to the dashboard using navigate
      navigate("/");
    } catch (error: any) {
      message.error(error.message);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f0f2f5",
      }}
    >
      <Card title="Login" style={{ width: 300 }}>
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
