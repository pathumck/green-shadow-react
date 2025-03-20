import { useEffect, useState } from "react";
import axiosInstance from "../utils/axios_instance";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const user = localStorage.getItem("user");
  useEffect(() => {
    if (user) {
      navigate("/dashboard", { replace: true });
    }
  }, [user, navigate]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState({ status: false, message: "" });

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
            boxShadow: "rgba(109, 183, 29, 0.5) 0px 5px 15px",
            backgroundColor: "rgba(255, 255, 255, 0.4)",
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

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className={
              isError.status
                ? "rounded form-control w-75 border-danger"
                : "mb-3 rounded form-control w-75"
            }
          />
          {isError && (
            <label className="text-danger fw-bold">{isError.message}</label>
          )}
          <button onClick={handleLogin} className="btn btn-success w-75 mb-3">
            Login
          </button>
        </div>
      </div>
    </>
  );
}

export default Login;
