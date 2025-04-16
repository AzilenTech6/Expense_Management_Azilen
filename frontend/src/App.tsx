import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout, Menu } from "antd";
import Dashboard from "./pages/Dashboard";
import Budget from "./pages/Budget";
import Category from "./pages/Category";
import Expense from "./pages/Expense";

const { Header, Content, Footer } = Layout;

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
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
        <Content style={{ padding: "50px", minHeight: "80vh" }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/budget" element={<Budget />} />
            <Route path="/category" element={<Category />} />
            <Route path="/expense" element={<Expense />} />
          </Routes>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          React App ©2023 Created with Ant Design
        </Footer>
      </Layout>
    </Router>
  );
};

export default App;
