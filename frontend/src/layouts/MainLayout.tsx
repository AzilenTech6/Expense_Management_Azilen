import React, { useEffect } from "react";
import { Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";

const { Header, Content, Footer } = Layout;

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();

  // Check if the user is logged in
  const isLoggedIn = !!localStorage.getItem("token");

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login"); // Redirect to login if not logged in
    }
  }, [isLoggedIn, navigate]);

  // If the user is not logged in, don't render the layout
  if (!isLoggedIn) {
    return null;
  }

  return (
    <Layout>
      {/* Header */}
      <Header>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1">
            <a href="/">Dashboard</a>
          </Menu.Item>
          <Menu.Item key="2">
            <a href="/budget">Budget</a>
          </Menu.Item>
          <Menu.Item key="3">
            <a href="/category">Category</a>
          </Menu.Item>
          <Menu.Item key="4">
            <a href="/expense">Expense</a>
          </Menu.Item>
        </Menu>
      </Header>

      {/* Content */}
      <Content style={{ padding: "50px", minHeight: "80vh" }}>
        {children}
      </Content>

      {/* Footer */}
      <Footer style={{ textAlign: "center" }}>
        React App ©2023 Created with Ant Design
      </Footer>
    </Layout>
  );
};

export default MainLayout;
