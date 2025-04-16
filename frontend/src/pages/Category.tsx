import React, { useState, useEffect } from "react";
import { Table, Button, Space, Modal, Form, Input, message } from "antd";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../services/categoryService";

const Category: React.FC = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [form] = Form.useForm();

  // Fetch categories from the API
  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error: any) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddCategory = () => {
    setIsAddModalVisible(true);
    form.resetFields();
  };

  const handleAddModalOk = async () => {
    try {
      const values = await form.validateFields();
      await createCategory(values);
      message.success("Category added successfully!");
      setIsAddModalVisible(false);
      fetchCategories(); // Refresh the category list
    } catch (error: any) {
      message.error(error.message);
    }
  };

  const handleEditModalOk = async () => {
    try {
      const values = await form.validateFields();
      await updateCategory(selectedCategory.id, values);
      message.success("Category updated successfully!");
      setIsEditModalVisible(false);
      fetchCategories(); // Refresh the category list
    } catch (error: any) {
      message.error(error.message);
    }
  };

  const handleDeleteModalOk = async () => {
    try {
      await deleteCategory(selectedCategory.id);
      message.success("Category deleted successfully!");
      setIsDeleteModalVisible(false);
      fetchCategories(); // Refresh the category list
    } catch (error: any) {
      message.error(error.message);
    }
  };

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
              form.setFieldsValue(record); // Populate form with selected category
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

  return (
    <div>
      <Button
        type="primary"
        style={{ marginBottom: 16 }}
        onClick={handleAddCategory}
      >
        Add Category
      </Button>
      <Table dataSource={categories} columns={columns} rowKey="id" />

      {/* Add Category Modal */}
      <Modal
        title="Add Category"
        visible={isAddModalVisible}
        onOk={handleAddModalOk}
        onCancel={() => setIsAddModalVisible(false)}
      >
        <Form layout="vertical" form={form}>
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
        <Form layout="vertical" form={form}>
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
