import React, { useEffect, useState } from "react";
import { Table, Button, Form, Input, message, Modal, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  ShowLoading,
  HideLoading,
  fetchPortfolioData,
} from "../../redux/rootSlice";
import axios from "axios";

function AdminSkills() {
  const dispatch = useDispatch();
  const { portfolioData } = useSelector((state) => state.root);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);

  useEffect(() => {
    if (
      portfolioData &&
      portfolioData.skills &&
      portfolioData.skills.length > 0
    ) {
      setSkills(portfolioData.skills);
      setLoading(false);
    }
  }, [portfolioData]);

  const handleDelete = async (id) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post("/api/portfolio/delete-skill", {
        _id: id,
      });
      dispatch(HideLoading());

      if (response.data.success) {
        message.success(response.data.message);
        dispatch(fetchPortfolioData());
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const handleFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post(
        editingSkill
          ? "/api/portfolio/update-skill"
          : "/api/portfolio/add-skill",
        editingSkill ? { ...values, _id: editingSkill._id } : values
      );
      dispatch(HideLoading());

      if (response.data.success) {
        message.success(response.data.message);
        setIsModalOpen(false);
        setEditingSkill(null);
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
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Image Source",
      dataIndex: "imageSrc",
      key: "imageSrc",
    },
    {
      title: "Alt Text",
      dataIndex: "alt",
      key: "alt",
    },
    {
      title: "Actions",
      render: (_, record) => (
        <div>
          <Button
            type="link"
            onClick={() => {
              setEditingSkill(record);
              setIsModalOpen(true);
            }}
          >
            Edit
          </Button>
          <Button type="link" danger onClick={() => handleDelete(record._id)}>
            Delete
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
      <div className="flex justify-end mb-4">
        <Button
          type="primary"
          onClick={() => {
            setEditingSkill(null);
            setIsModalOpen(true);
          }}
        >
          Add Skill
        </Button>
      </div>
      <Table columns={columns} dataSource={skills} rowKey="_id" />

      {/* Modal for Add/Edit Skill */}
      <Modal
        title={editingSkill ? "Edit Skill" : "Add Skill"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form
          onFinish={handleFinish}
          layout="vertical"
          initialValues={editingSkill || { name: "", imageSrc: "", alt: "" }}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[
              { required: true, message: "Please input the skill name!" },
            ]}
          >
            <Input placeholder="Skill Name" />
          </Form.Item>
          <Form.Item
            name="imageSrc"
            label="Image Source"
            rules={[
              { required: true, message: "Please input the image source URL!" },
            ]}
          >
            <Input placeholder="Image Source (e.g., /path/to/image)" />
          </Form.Item>
          <Form.Item
            name="alt"
            label="Alt Text"
            rules={[{ required: true, message: "Please input the alt text!" }]}
          >
            <Input placeholder="Alt Text" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingSkill ? "Update Skill" : "Add Skill"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default AdminSkills;
