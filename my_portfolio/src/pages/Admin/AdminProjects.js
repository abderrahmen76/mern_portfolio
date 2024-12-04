import React, { useEffect, useState } from "react";
import { Table, Button, Form, Input, message, Modal, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  ShowLoading,
  HideLoading,
  fetchPortfolioData,
} from "../../redux/rootSlice";
import axios from "axios";

function AdminProjects() {
  const dispatch = useDispatch();
  const { portfolioData } = useSelector((state) => state.root);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  const [form] = Form.useForm(); // Create a form instance

  useEffect(() => {
    if (
      portfolioData &&
      portfolioData.project &&
      portfolioData.project.length > 0
    ) {
      setProjects(portfolioData.project);
      setLoading(false);
    }
  }, [portfolioData]);

  const handleDelete = async (id) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.delete(`/api/portfolio/projects/${id}`);
      dispatch(HideLoading());

      if (response.data.success) {
        message.success("Project deleted successfully!");
        dispatch(fetchPortfolioData());
      } else {
        message.error("Failed to delete project");
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const handleFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const url = editingProject
        ? `/api/portfolio/projects/${editingProject._id}`
        : "/api/portfolio/projects";
      const method = editingProject ? "put" : "post";

      const response = await axios({
        method,
        url,
        data: {
          ...values,
          technologies: Array.isArray(values.technologies)
            ? values.technologies
            : values.technologies.split(",").map((tech) => tech.trim()),
          media: Array.isArray(values.media)
            ? values.media
            : values.media.split(",").map((url) => url.trim()),
        },
      });

      dispatch(HideLoading());

      if (response.status === 201 || response.data.success) {
        message.success(
          editingProject
            ? "Project updated successfully!"
            : "Project added successfully!"
        );
        setIsModalOpen(false);
        setEditingProject(null);
        form.resetFields(); // Reset the form fields
        dispatch(fetchPortfolioData());
      } else {
        message.error("Failed to save project");
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const openEditModal = (project) => {
    setEditingProject(project);
    setIsModalOpen(true);
    form.setFieldsValue({
      ...project,
      technologies: project.technologies.join(", "), // Convert array to string
      media: project.media.join(", "), // Convert array to string
    });
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Technologies",
      dataIndex: "technologies",
      render: (techs) => techs.join(", "),
    },
    {
      title: "Actions",
      render: (_, record) => (
        <div>
          <Button type="link" onClick={() => openEditModal(record)}>
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
            setEditingProject(null);
            setIsModalOpen(true);
            form.resetFields(); // Reset the form when adding a new project
          }}
        >
          Add Project
        </Button>
      </div>
      <Table columns={columns} dataSource={projects} rowKey="_id" />

      {/* Modal for Add/Edit Project */}
      <Modal
        title={editingProject ? "Edit Project" : "Add Project"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form
          form={form}
          onFinish={handleFinish}
          layout="vertical"
          initialValues={{
            title: "",
            description: "",
            technologies: "",
            link: "",
            media: "",
          }}
        >
          <Form.Item
            name="title"
            label="Title"
            rules={[
              { required: true, message: "Please input the project title!" },
            ]}
          >
            <Input placeholder="Project Title" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[
              {
                required: true,
                message: "Please input the project description!",
              },
            ]}
          >
            <Input.TextArea placeholder="Project Description" />
          </Form.Item>
          <Form.Item
            name="technologies"
            label="Technologies"
            rules={[
              {
                required: true,
                message: "Please input the technologies used!",
              },
            ]}
          >
            <Input placeholder="Comma-separated (e.g., React, Node.js)" />
          </Form.Item>
          <Form.Item
            name="link"
            label="Project Link"
            rules={[
              { required: true, message: "Please input the project link!" },
            ]}
          >
            <Input placeholder="Project URL" />
          </Form.Item>
          <Form.Item
            name="media"
            label="Media"
            rules={[
              { required: true, message: "Please input the media URLs!" },
            ]}
          >
            <Input placeholder="Comma-separated media URLs" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingProject ? "Update Project" : "Add Project"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default AdminProjects;
