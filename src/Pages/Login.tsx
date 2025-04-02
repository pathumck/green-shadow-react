import { useState } from "react";
import axiosInstance from "../utils/axios_instance";
import { useNavigate } from "react-router-dom";
import { FaRegEye } from "react-icons/fa6";
import { IoEyeOffOutline } from "react-icons/io5";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordType, setPasswordType] = useState("password");
  const [isError, setIsError] = useState({ status: false, message: "" });
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const response = await axiosInstance.post("/auth/login", {
        username,
        password,
      });
      const currentUser = response.data;
      localStorage.setItem("user", JSON.stringify(currentUser));
      setIsError({ status: false, message: "" });
      navigate("/dashboard", { replace: true });
    } catch (err: any) {
      setIsError({ status: true, message: err.response?.data?.message });
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
            boxShadow: "rgba(52, 53, 48, 0.5) 0px 5px 15px",
            backgroundColor: "rgba(169, 218, 160, 0.4)",
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
            className={
              isError.status
                ? "mb-3 rounded form-control w-75 border-danger"
                : "mb-3 rounded form-control w-75"
            }
          />
          <div className="input-group w-75 position-relative">
            <input
              type={passwordType}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className={
                isError.status
                  ? "rounded form-control w-75 border-danger"
                  : "mb-3 rounded form-control w-75"
              }
            />
            <span
              className="position-absolute end-0 align-items-center mt-1 me-2"
              onClick={() =>
                setPasswordType(
                  passwordType === "password" ? "text" : "password"
                )
              }
            >
              {passwordType === "password" ? (
                <FaRegEye
                  size={20}
                  style={{
                    color: "gray",
                    cursor: "pointer",
                    backgroundColor: "white",
                    zIndex: 10000,
                    position: "relative",
                  }}
                />
              ) : (
                <IoEyeOffOutline
                  size={20}
                  style={{
                    color: "gray",
                    cursor: "pointer",
                    backgroundColor: "white",
                    zIndex: 10000,
                    position: "relative",
                  }}
                />
              )}
            </span>
            {isError && (
              <label className="text-danger fw-bold w-100 text-center">
                {isError.message}
              </label>
            )}
          </div>

          <button
            onClick={handleLogin}
            className="btn btn-success w-75 mb-3"
            style={{
              background: "linear-gradient(90deg, #009688, #4caf50, #8bc34a)",
              transition: "all 0.3s ease-in-out",
            }}
            onMouseOver={(e) => (e.currentTarget.style.opacity = "0.85")}
            onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Login
          </button>
        </div>
      </div>
    </>
  );
}

export default Login;
