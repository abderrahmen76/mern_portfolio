import React, { useEffect, useState } from "react";
import { Table, Button, Form, Input, message, Modal, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  ShowLoading,
  HideLoading,
  fetchPortfolioData,
} from "../../redux/rootSlice";
import axios from "axios";

function AdminContact() {
  const dispatch = useDispatch();
  const { portfolioData } = useSelector((state) => state.root);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingContact, setEditingContact] = useState(null);

  useEffect(() => {
    if (
      portfolioData &&
      portfolioData.contacts &&
      portfolioData.contacts.length > 0
    ) {
      setContacts(portfolioData.contacts);
      setLoading(false);
    }
  }, [portfolioData]);

  const handleFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post(
        editingContact
          ? "/api/portfolio/update-contact"
          : "/api/portfolio/add-contact",
        editingContact ? { ...values, _id: editingContact._id } : values
      );
      dispatch(HideLoading());

      if (response.data.success) {
        message.success(response.data.message);
        setIsModalOpen(false);
        setEditingContact(null);
        dispatch(fetchPortfolioData());
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const columns = [
    {
      title: "LinkedIn URL",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "GitHub URL",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Facebook URL",
      dataIndex: "message",
      key: "message",
    },
    {
      title: "Instagram URL",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Actions",
      render: (_, record) => (
        <div>
          <Button
            type="link"
            onClick={() => {
              setEditingContact(record);
              setIsModalOpen(true);
            }}
          >
            Edit
          </Button>
        </div>
      ),
    },
  ];

  if (loading) {
    return <Spin size="large" />;
  }

  return (
    <div>
      <Table columns={columns} dataSource={contacts} rowKey="_id" />

      <Modal
        title={editingContact ? "Edit Contact" : "Add Contact"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form
          onFinish={handleFinish}
          layout="vertical"
          initialValues={{
            fullName: editingContact ? editingContact.fullName : "",
            email: editingContact ? editingContact.email : "",
            message: editingContact ? editingContact.message : "",
            date: editingContact ? editingContact.date : "",
          }}
        >
          <Form.Item
            name="fullName"
            label="LinkedIn URL"
            rules={[
              { required: true, message: "Please input the LinkedIn URL!" },
            ]}
          >
            <Input placeholder="LinkedIn URL" />
          </Form.Item>

          <Form.Item
            name="email"
            label="GitHub URL"
            rules={[
              { required: true, message: "Please input the GitHub URL!" },
            ]}
          >
            <Input placeholder="GitHub URL" />
          </Form.Item>

          <Form.Item
            name="message"
            label="Facebook URL"
            rules={[
              { required: true, message: "Please input the Facebook URL!" },
            ]}
          >
            <Input placeholder="Facebook URL" />
          </Form.Item>

          <Form.Item
            name="date"
            label="Instagram URL"
            rules={[
              { required: true, message: "Please input the Instagram URL!" },
            ]}
          >
            <Input placeholder="Instagram URL" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingContact ? "Update Contact" : "Add Contact"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default AdminContact;
