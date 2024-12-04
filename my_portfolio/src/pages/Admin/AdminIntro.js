import React, { useEffect, useState } from "react";
import { Button, Form, Input, Spin } from "antd"; // Adding Spin for loading indicator
import { useDispatch, useSelector } from "react-redux";
import {
  ShowLoading,
  HideLoading,
  fetchPortfolioData,
} from "../../redux/rootSlice";
import axios from "axios";
import { message } from "antd";

function AdminIntro() {
  const { portfolioData } = useSelector((state) => state.root);

  // Initialize introData state
  const [introData, setIntroData] = useState({
    fullName: "",
    occupation: "",
    description: "",
    cvButton: "",
  });

  const [loading, setLoading] = useState(true);

  // Update introData when portfolioData.intro is available
  useEffect(() => {
    // Check if portfolioData.intro is available and not empty
    if (
      portfolioData &&
      portfolioData.intro &&
      portfolioData.intro.length > 0
    ) {
      setIntroData(portfolioData.intro[0]); // Set the first intro object
      setLoading(false); // Set loading to false when data is available
    }
  }, [portfolioData]);

  const dispatch = useDispatch();
  const onFinish = async (values) => {
    const { intro } = portfolioData; // Extract intro data

    if (!intro[0]._id) {
      message.error("Intro ID is missing.");
      return;
    }

    try {
      dispatch(ShowLoading());
      const response = await axios.post("/api/portfolio/update-intro", {
        ...values,
        _id: intro[0]._id.$oid || intro[0]._id, // Use $oid if present
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
    return <Spin size="large" />; // Show loading spinner while data is loading
  }

  return (
    <div>
      <Form
        onFinish={onFinish}
        layout="vertical"
        initialValues={introData} // Initialize form with introData state
      >
        {/* Full Name Input */}
        <Form.Item
          name="fullName"
          label="Full Name"
          rules={[{ required: true, message: "Please input your full name!" }]}
        >
          <Input placeholder="Full Name" />
        </Form.Item>

        {/* Occupation Input */}
        <Form.Item
          name="occupation"
          label="Occupation"
          rules={[{ required: true, message: "Please input your occupation!" }]}
        >
          <Input placeholder="Occupation" />
        </Form.Item>

        {/* Description Textarea */}
        <Form.Item
          name="description"
          label="Description"
          rules={[
            { required: true, message: "Please input your description!" },
          ]}
        >
          <Input.TextArea placeholder="Description" />
        </Form.Item>

        {/* CV Button Input */}
        <Form.Item
          name="cvButton"
          label="CV Button"
          rules={[
            {
              required: true,
              message: "Enter the link of the file in Dropbox",
            },
          ]}
        >
          <Input placeholder="Enter the link of the file in Dropbox" />
        </Form.Item>

        <Form.Item>
          <Button type="submit" htmlType="submit" className="bg-blue-500">
            Save Changes
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default AdminIntro;
