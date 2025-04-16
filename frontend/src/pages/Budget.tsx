import React, { useState } from "react";
import {
  Table,
  Button,
  Space,
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  Progress,
  InputNumber,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const { Option } = Select;
const { RangePicker } = DatePicker;

const Budget: React.FC = () => {
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState<any>(null);
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();

  // Mock data
  const categories = [
    { id: "1", name: "Food" },
    { id: "2", name: "Transportation" },
    { id: "3", name: "Entertainment" },
    { id: "4", name: "Shopping" },
    { id: "5", name: "Overall" },
  ];

  const dataSource = [
    {
      key: "1",
      name: "Monthly Groceries",
      category_id: "1",
      category_name: "Food",
      amount: 500,
      period_type: "monthly",
      start_date: "2023-01-01",
      end_date: "2023-12-31",
      utilized: 320,
      utilized_percentage: 64,
    },
    {
      key: "2",
      name: "Transportation Budget",
      category_id: "2",
      category_name: "Transportation",
      amount: 200,
      period_type: "monthly",
      start_date: "2023-01-01",
      end_date: "2023-12-31",
      utilized: 180,
      utilized_percentage: 90,
    },
    {
      key: "3",
      name: "Entertainment",
      category_id: "3",
      category_name: "Entertainment",
      amount: 150,
      period_type: "monthly",
      start_date: "2023-01-01",
      end_date: "2023-12-31",
      utilized: 50,
      utilized_percentage: 33,
    },
    {
      key: "4",
      name: "Overall Monthly Budget",
      category_id: "5",
      category_name: "Overall",
      amount: 2000,
      period_type: "monthly",
      start_date: "2023-01-01",
      end_date: "2023-12-31",
      utilized: 1500,
      utilized_percentage: 75,
    },
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Category",
      dataIndex: "category_name",
      key: "category_name",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount: number) => `$${amount.toFixed(2)}`,
    },
    {
      title: "Period",
      dataIndex: "period_type",
      key: "period_type",
      render: (text: string) => text.charAt(0).toUpperCase() + text.slice(1),
    },
    {
      title: "Date Range",
      key: "date_range",
      render: (_: any, record: any) => (
        <span>{`${record.start_date} to ${record.end_date || "Ongoing"}`}</span>
      ),
    },
    {
      title: "Utilization",
      key: "utilization",
      render: (_: any, record: any) => (
        <div style={{ width: 150 }}>
          <Progress
            percent={record.utilized_percentage}
            size="small"
            status={record.utilized_percentage > 90 ? "exception" : "normal"}
          />
          <div style={{ fontSize: "12px", marginTop: "2px" }}>
            ${record.utilized} of ${record.amount}
          </div>
        </div>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button
            type="link"
            onClick={() => {
              setSelectedBudget(record);
              editForm.setFieldsValue({
                ...record,
                date_range: [
                  dayjs(record.start_date),
                  record.end_date ? dayjs(record.end_date) : null,
                ],
              });
              setIsEditModalVisible(true);
            }}
          >
            Edit
          </Button>
          <Button
            type="link"
            danger
            onClick={() => {
              setSelectedBudget(record);
              setIsDeleteModalVisible(true);
            }}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const handleAddBudget = () => {
    form.resetFields();
    setIsAddModalVisible(true);
  };

  const handleAddModalOk = () => {
    form
      .validateFields()
      .then((values) => {
        console.log("Add budget values:", values);
        // Here you would typically make an API call to add the budget
        setIsAddModalVisible(false);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleEditModalOk = () => {
    editForm
      .validateFields()
      .then((values) => {
        console.log("Edit budget values:", values);
        // Here you would typically make an API call to update the budget
        setIsEditModalVisible(false);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleDeleteModalOk = () => {
    // Here you would typically make an API call to delete the budget
    console.log("Delete budget:", selectedBudget);
    setIsDeleteModalVisible(false);
  };

  // For the formatter and parser functions
  const formatNumber = (value: any) => {
    return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const parseNumber = (value: any) => {
    return value!.replace(/\$\s?|(,*)/g, "");
  };

  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{
          marginBottom: "16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2 style={{ margin: 0 }}>Budgets</h2>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAddBudget}
        >
          Add Budget
        </Button>
      </div>

      <Table dataSource={dataSource} columns={columns} />

      {/* Add Budget Modal */}
      <Modal
        title="Add Budget"
        open={isAddModalVisible}
        onOk={handleAddModalOk}
        onCancel={() => setIsAddModalVisible(false)}
        width={600}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Budget Name"
            name="name"
            rules={[{ required: true, message: "Please enter a budget name" }]}
          >
            <Input placeholder="E.g., Monthly Groceries" />
          </Form.Item>

          <Form.Item
            label="Category"
            name="category_id"
            rules={[{ required: true, message: "Please select a category" }]}
          >
            <Select placeholder="Select a category">
              {categories.map((category) => (
                <Option key={category.id} value={category.id}>
                  {category.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Budget Amount"
            name="amount"
            rules={[
              { required: true, message: "Please enter a budget amount" },
            ]}
          >
            <InputNumber
              prefix="$"
              style={{ width: "100%" }}
              min={1}
              placeholder="Enter amount"
              formatter={(value) => (value ? formatNumber(value) : "")}
            />
          </Form.Item>

          <Form.Item
            label="Period"
            name="period_type"
            rules={[{ required: true, message: "Please select a period type" }]}
          >
            <Select placeholder="Select period type">
              <Option value="weekly">Weekly</Option>
              <Option value="monthly">Monthly</Option>
              <Option value="yearly">Yearly</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Date Range"
            name="date_range"
            rules={[{ required: true, message: "Please select a date range" }]}
          >
            <RangePicker style={{ width: "100%" }} />
          </Form.Item>
        </Form>
      </Modal>

      {/* Edit Budget Modal */}
      <Modal
        title="Edit Budget"
        open={isEditModalVisible}
        onOk={handleEditModalOk}
        onCancel={() => setIsEditModalVisible(false)}
        width={600}
      >
        <Form form={editForm} layout="vertical" initialValues={selectedBudget}>
          <Form.Item
            label="Budget Name"
            name="name"
            rules={[{ required: true, message: "Please enter a budget name" }]}
          >
            <Input placeholder="E.g., Monthly Groceries" />
          </Form.Item>

          <Form.Item
            label="Category"
            name="category_id"
            rules={[{ required: true, message: "Please select a category" }]}
          >
            <Select placeholder="Select a category">
              {categories.map((category) => (
                <Option key={category.id} value={category.id}>
                  {category.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Budget Amount"
            name="amount"
            rules={[
              { required: true, message: "Please enter a budget amount" },
            ]}
          >
            <InputNumber
              prefix="$"
              style={{ width: "100%" }}
              min={1}
              placeholder="Enter amount"
              formatter={(value) => (value ? formatNumber(value) : "")}
            />
          </Form.Item>

          <Form.Item
            label="Period"
            name="period_type"
            rules={[{ required: true, message: "Please select a period type" }]}
          >
            <Select placeholder="Select period type">
              <Option value="weekly">Weekly</Option>
              <Option value="monthly">Monthly</Option>
              <Option value="yearly">Yearly</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Date Range"
            name="date_range"
            rules={[{ required: true, message: "Please select a date range" }]}
          >
            <RangePicker style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item label="Current Utilization" name="utilized">
            <div style={{ display: "flex", alignItems: "center" }}>
              <InputNumber
                prefix="$"
                style={{ width: "100%" }}
                min={0}
                disabled
              />
              {selectedBudget && (
                <div style={{ marginLeft: "10px", minWidth: "80px" }}>
                  <Progress
                    percent={selectedBudget.utilized_percentage}
                    size="small"
                    status={
                      selectedBudget.utilized_percentage > 90
                        ? "exception"
                        : "normal"
                    }
                  />
                </div>
              )}
            </div>
          </Form.Item>
        </Form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        title="Delete Confirmation"
        open={isDeleteModalVisible}
        onOk={handleDeleteModalOk}
        onCancel={() => setIsDeleteModalVisible(false)}
        okText="Delete"
        okButtonProps={{ danger: true }}
      >
        <p>
          Are you sure you want to delete the budget "{selectedBudget?.name}"?
        </p>
        <p>This action cannot be undone.</p>
      </Modal>
    </div>
  );
};

export default Budget;
