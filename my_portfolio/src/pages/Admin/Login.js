import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { ShowLoading, HideLoading } from "../../redux/rootSlice";
import axios from "axios";
import { message } from "antd";
import "./admin.css"; // Import the CSS specific to this component

function Login() {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const dispatch = useDispatch();

  const login = async (e) => {
    e.preventDefault(); // Prevent form from submitting and refreshing the page

    try {
      dispatch(ShowLoading()); // Show loading indicator
      const response = await axios.post("/api/portfolio/admin-login", user); // Send the user data to the backend
      dispatch(HideLoading()); // Hide loading indicator

      if (response.data.success) {
        console.log("data", response.data);
        message.success(response.data.message); // Show success message
        localStorage.setItem("token", JSON.stringify(response.data)); // Save the token to localStorage
        window.location.href = "/admin"; // Redirect to the admin page
      } else {
        console.log("data", response.data);
        message.error(response.data.message); // Show error message
      }
    } catch (error) {
      message.error(error.message); // Show error message if request fails
      dispatch(HideLoading()); // Hide loading indicator
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <h1 className="login-heading">Login</h1>
        <form className="login-form" onSubmit={login}>
          <div className="input-group">
            <label htmlFor="username" className="input-label">
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              className="input-field"
            />
          </div>
          <div className="input-group">
            <label htmlFor="password" className="input-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="input-field"
            />
          </div>
          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
