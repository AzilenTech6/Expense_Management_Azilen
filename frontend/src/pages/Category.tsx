import React, { useState } from "react";
import { Table, Button, Space, Modal, Form, Input } from "antd";

const Category: React.FC = () => {
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);

  const dataSource = [
    {
      key: "1",
      name: "Food",
      description: "Expenses related to food and dining",
    },
    {
      key: "2",
      name: "Travel",
      description: "Expenses related to travel and transportation",
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
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button
            type="link"
            onClick={() => {
              setSelectedCategory(record);
              setIsEditModalVisible(true);
            }}
          >
            Edit
          </Button>
          <Button
            type="link"
            danger
            onClick={() => {
              setSelectedCategory(record);
              setIsDeleteModalVisible(true);
            }}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const handleAddCategory = () => {
    setIsAddModalVisible(true);
  };

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
        onClick={handleAddCategory}
      >
        Add Category
      </Button>
      <Table dataSource={dataSource} columns={columns} />

      {/* Add Category Modal */}
      <Modal
        title="Add Category"
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
        </Form>
      </Modal>

      {/* Edit Category Modal */}
      <Modal
        title="Edit Category"
        visible={isEditModalVisible}
        onOk={handleEditModalOk}
        onCancel={() => setIsEditModalVisible(false)}
      >
        <Form layout="vertical" initialValues={selectedCategory}>
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
          Are you sure you want to delete the category "{selectedCategory?.name}
          "?
        </p>
      </Modal>
    </div>
  );
};

export default Category;
