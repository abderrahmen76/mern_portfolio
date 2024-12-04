import React, { useEffect } from "react";
import { Tabs } from "antd";
import AdminIntro from "./AdminIntro";
import AdminAbout from "./AdminAbout";
import AdminSkills from "./AdminSkills";
import AdminProjects from "./AdminProjects";
import AdminContact from "./AdminContact";
import "./admin.css"; // Custom styles
import { useSelector } from "react-redux";

function Admin() {
  const { portfolioData } = useSelector((state) => state.root);

  const onChange = (key) => {
    console.log(key);
  };

  const items = [
    {
      key: "1",
      label: "Intro",
      children: <AdminIntro />,
    },
    {
      key: "2",
      label: "About",
      children: <AdminAbout />,
    },
    {
      key: "3",
      label: "Skills",
      children: <AdminSkills />,
    },
    {
      key: "4",
      label: "Projects",
      children: <AdminProjects />,
    },
    {
      key: "5",
      label: "Contact",
      children: <AdminContact />,
    },
  ];

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      window.location.href = "/admin-login";
    }
  }, []);

  return (
    <div className="admin-dashboard">
      <h1 className="dashboard-title">Admin Dashboard</h1>
      {portfolioData && (
        <div>
          <Tabs
            defaultActiveKey="1"
            items={items}
            onChange={onChange}
            tabPosition="top" // Makes it horizontal
            size="large" // Makes the tabs larger
            type="card" // Applies a card-style theme
          />
        </div>
      )}
      <h1
        className="underline text-primary text-xl cursor-pointer py-10"
        onClick={() => (window.location.href = "/admin-login")}
      >
        Logout
      </h1>
    </div>
  );
}

export default Admin;
