import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/slices/authSlice";
import axiosInstance from "../utils/axios_instance";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER");

  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const response = await axiosInstance.post("/auth/register", {
        username,
        password,
        role,
      });

      alert(response.data.user.id);

      navigate("/dashboard");
    } catch (err: any) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center min-vh-100"
        style={{
          backgroundImage: "url('../../public/field-background.jpg')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <div
          className="d-flex flex-column align-items-center justify-content-center rounded border-1 w-100 w-md-50 w-lg-25"
          style={{
            boxShadow: "rgba(109, 183, 29, 0.5) 0px 5px 15px",
            backgroundColor: "rgb(230, 229, 153, 0.7)",
            maxWidth: "350px",
          }}
        >
          <img
            className="w-50 py-3"
            src="../../public/green-shadow.png"
            alt=""
          />
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="mb-3 rounded form-control w-75"
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="mb-3 rounded form-control w-75"
          />

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="mb-3 rounded form-control w-75"
          >
            <option value="USER">User</option>
            <option value="MANAGER">Manager</option>
          </select>

          <button onClick={handleSignup} className="btn btn-success w-75 mb-3">
            Signup
          </button>
        </div>
      </div>
    </>
  );
}

export default Signup;
