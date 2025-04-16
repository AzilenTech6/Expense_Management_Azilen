import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout, Menu } from "antd";
import Dashboard from "./pages/Dashboard";
import Budget from "./pages/Budget";
import Category from "./pages/Category";
import Expense from "./pages/Expense";
import Login from "./pages/Login";
import MainLayout from "./layouts/MainLayout";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Routes with MainLayout */}
        <Route
          path="/"
          element={
            <MainLayout>
              <Dashboard />
            </MainLayout>
          }
        />
        <Route
          path="/budget"
          element={
            <MainLayout>
              <Budget />
            </MainLayout>
          }
        />
        <Route
          path="/category"
          element={
            <MainLayout>
              <Category />
            </MainLayout>
          }
        />
        <Route
          path="/expense"
          element={
            <MainLayout>
              <Expense />
            </MainLayout>
          }
        />

        {/* Login Route without MainLayout */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
