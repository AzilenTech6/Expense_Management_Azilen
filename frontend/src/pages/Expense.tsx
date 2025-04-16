import React, { useState } from "react";
import {
  Table,
  Button,
  Space,
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
} from "antd";

const { Option } = Select;

const Expense: React.FC = () => {
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<any>(null);

  const dataSource = [
    {
      key: "1",
      name: "Groceries",
      description: "Weekly grocery shopping",
      categoryName: "Food",
      amount: 150,
      expenseDate: "2023-10-01",
    },
    {
      key: "2",
      name: "Taxi",
      description: "Taxi ride to the airport",
      categoryName: "Travel",
      amount: 50,
      expenseDate: "2023-10-02",
    },
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Category Name",
      dataIndex: "categoryName",
      key: "categoryName",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Expense Date",
      dataIndex: "expenseDate",
      key: "expenseDate",
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button
            type="link"
            onClick={() => {
              setSelectedExpense(record);
              setIsEditModalVisible(true);
            }}
          >
            Edit
          </Button>
          <Button
            type="link"
            danger
            onClick={() => {
              setSelectedExpense(record);
              setIsDeleteModalVisible(true);
            }}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const handleAddModalOk = () => {
    setIsAddModalVisible(false);
  };

  const handleEditModalOk = () => {
    setIsEditModalVisible(false);
  };

  const handleDeleteModalOk = () => {
    setIsDeleteModalVisible(false);
  };

  return (
    <div>
      <Button
        type="primary"
        style={{ marginBottom: 16 }}
        onClick={() => setIsAddModalVisible(true)}
      >
        Add Expense
      </Button>
      <Table dataSource={dataSource} columns={columns} />

      {/* Add Expense Modal */}
      <Modal
        title="Add Expense"
        visible={isAddModalVisible}
        onOk={handleAddModalOk}
        onCancel={() => setIsAddModalVisible(false)}
      >
        <Form layout="vertical">
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter a name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please enter a description" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Category"
            name="category"
            rules={[{ required: true, message: "Please select a category" }]}
          >
            <Select>
              <Option value="Food">Food</Option>
              <Option value="Travel">Travel</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Amount"
            name="amount"
            rules={[{ required: true, message: "Please enter an amount" }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="Expense Date"
            name="expenseDate"
            rules={[{ required: true, message: "Please select a date" }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
        </Form>
      </Modal>

      {/* Edit Expense Modal */}
      <Modal
        title="Edit Expense"
        visible={isEditModalVisible}
        onOk={handleEditModalOk}
        onCancel={() => setIsEditModalVisible(false)}
      >
        <Form layout="vertical" initialValues={selectedExpense}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter a name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please enter a description" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Category"
            name="category"
            rules={[{ required: true, message: "Please select a category" }]}
          >
            <Select>
              <Option value="Food">Food</Option>
              <Option value="Travel">Travel</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Amount"
            name="amount"
            rules={[{ required: true, message: "Please enter an amount" }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="Expense Date"
            name="expenseDate"
            rules={[{ required: true, message: "Please select a date" }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
        </Form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        title="Delete Confirmation"
        visible={isDeleteModalVisible}
        onOk={handleDeleteModalOk}
        onCancel={() => setIsDeleteModalVisible(false)}
        okText="Delete"
        okButtonProps={{ danger: true }}
      >
        <p>
          Are you sure you want to delete the expense "{selectedExpense?.name}
          "?
        </p>
      </Modal>
    </div>
  );
};

export default Expense;
