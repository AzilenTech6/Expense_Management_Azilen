import React from "react";
import { Layout, Menu } from "antd";

const { Header, Content, Footer } = Layout;

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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
