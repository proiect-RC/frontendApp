import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5000/login", {
        username,
        password,
      });
      console.log(response.data.message);
      localStorage.setItem("user", username);
      navigate("/home");
      toast.success("User logged in successfully!");
    } catch (error: any) {
      console.error("Login failed:", error.response.data.message);
      toast.error(error.response.data.message);
    }
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post("http://localhost:5000/register", {
        username,
        password,
      });
      console.log(response.data.message);
      toast.success("User registered successfully!");
    } catch (error: any) {
      console.error("Registration failed:", error.response.data.message);
      toast.error(error.response.data.message);
    }
  };
  useEffect(() => {
    if (!!localStorage.getItem("user")) {
      navigate("/home");
    }
  }, [navigate]);

  return (
    <>
      <div
        className="container p-4"
        style={{
          width: "400px",
          marginTop: "150px",
          border: "1px solid",
          borderRadius: "8px",
          borderColor: "lightgrey",
        }}
      >
        <h1 className="h3 mb-3 " style={{ fontWeight: "600" }}>
          Log In
        </h1>

        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            id="floatingInput"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="floatingInput">Username</label>
        </div>
        <div className="form-floating my-3">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>

        <button
          className="btn btn-dark  my-2 me-2"
          onClick={() => handleLogin()}
        >
          Log in
        </button>
        <button
          className="btn btn-outline-dark my-2"
          onClick={() => handleRegister()}
        >
          Register
        </button>
      </div>
    </>
  );
}

export default LoginPage;
