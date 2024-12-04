import React, { useEffect, useState } from "react";
import { Form, Input, Button, message, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  ShowLoading,
  HideLoading,
  fetchPortfolioData,
} from "../../redux/rootSlice"; // Adjust path as necessary
import axios from "axios";

function AdminAbout() {
  const dispatch = useDispatch();
  const { portfolioData } = useSelector((state) => state.root);
  const [loading, setLoading] = useState(true);
  const [aboutData, setAboutData] = useState({
    aboutDesc: "",
    yellowHilights: "",
    boldHilights: "",
  });

  // Load About Data from Redux Store
  useEffect(() => {
    if (
      portfolioData &&
      portfolioData.about &&
      portfolioData.about.length > 0
    ) {
      const about = portfolioData.about[0];
      setAboutData({
        aboutDesc: about.aboutDesc,
        yellowHilights: about.yellowHilights.join(", "), // Convert array to comma-separated string
        boldHilights: about.boldHilights.join(", "), // Convert array to comma-separated string
      });
      setLoading(false);
    }
  }, [portfolioData]);

  const onFinish = async (values) => {
    const { about } = portfolioData; // Extract about data

    if (!about[0]._id) {
      message.error("About ID is missing.");
      return;
    }

    try {
      dispatch(ShowLoading());
      const response = await axios.post("/api/portfolio/update-about", {
        ...values,
        yellowHilights: values.yellowHilights
          .split(",")
          .map((item) => item.trim()), // Convert string to array
        boldHilights: values.boldHilights.split(",").map((item) => item.trim()), // Convert string to array
        _id: about[0]._id,
      });

      dispatch(HideLoading());

      if (response.data.success) {
        message.success(response.data.message);
        dispatch(fetchPortfolioData()); // Re-fetch portfolio data after update
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  if (loading) {
    return <Spin size="large" />;
  }

  return (
    <div>
      <Form
        onFinish={onFinish}
        layout="vertical"
        initialValues={aboutData} // Bind form to state
      >
        {/* About Description Input */}
        <Form.Item
          name="aboutDesc"
          label="Description"
          rules={[
            { required: true, message: "Please input your description!" },
          ]}
        >
          <Input.TextArea placeholder="About Me Description" />
        </Form.Item>

        {/* Yellow Highlights Input (Comma Separated) */}
        <Form.Item
          name="yellowHilights"
          label="Yellow Highlights"
          rules={[
            { required: true, message: "Please input your yellow highlights!" },
          ]}
        >
          <Input placeholder="Enter your yellow highlights (comma separated)" />
        </Form.Item>

        {/* Bold Highlights Input (Comma Separated) */}
        <Form.Item
          name="boldHilights"
          label="Bold Highlights"
          rules={[
            { required: true, message: "Please input your bold highlights!" },
          ]}
        >
          <Input placeholder="Enter your bold highlights (comma separated)" />
        </Form.Item>

        {/* Submit Button */}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save Changes
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default AdminAbout;
