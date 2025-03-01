import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Login: React.FC = () => {
  const [userId, setUserId] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("User ID:", userId);
    console.log("Password:", password);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow-lg border-0" style={{ width: "350px", borderRadius: "15px", backgroundColor: "#E3F2E1" }}>
        <h3 className="text-center mb-4 text-success fw-bold">Welcome Back</h3>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label fw-semibold text-success">User ID</label>
            <input
              type="text"
              className="form-control border-0 shadow-sm"
              value={userId}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserId(e.target.value)}
              required
              style={{ borderRadius: "10px" }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold text-success">Password</label>
            <input
              type="password"
              className="form-control border-0 shadow-sm"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              required
              style={{ borderRadius: "10px" }}
            />
          </div>
          <button
            type="submit"
            className="btn w-100 text-white fw-semibold"
            style={{
              backgroundColor: "#28A745",
              borderRadius: "10px",
              padding: "10px",
              transition: "0.3s"
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#218838")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#28A745")}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
