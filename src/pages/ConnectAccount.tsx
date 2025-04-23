import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { handleLogin } from "../services/axios";


export default function ConnectAccount() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Partial<typeof formData>>({});

  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const redirect = params.get('redirect');

    if (redirect) {
      navigate(redirect);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors: Partial<typeof formData> = {};
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format.";
    }
    if (!formData.password) newErrors.password = "Password is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      console.log("Login data:", formData);
      // Lógica de login aqui
    }
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
      <form
        onSubmit={handleSubmit}
        className="p-4 text-white fw-regular"
        style={{ width: "100%", maxWidth: "400px" }}
        noValidate
      >
        <h1 className="mb-3 fw-light">Connect your account</h1>

        <span className="d-block mb-4 text-secondary">
          Don’t have an account?{" "}
          <a href="./CreateAccount" style={{ color: "#9848B3", textDecoration: "none" }}>
            Register
          </a>
        </span>

        <div className="mb-3">
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`bg-dark w-100 py-3 px-2 rounded border-0 text-white fw-light ${errors.email ? "border border-danger" : ""}`}
            type="email"
            placeholder="Email"
          />
          {errors.email && <small className="text-danger" style={{ fontSize: "10px" }}>{errors.email}</small>}
        </div>

        <div className="mb-2">
          <input
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`bg-dark w-100 py-3 px-2 rounded border-0 text-white fw-light ${errors.password ? "border border-danger" : ""}`}
            type="password"
            placeholder="Enter your password"
          />
          {errors.password && <small className="text-danger" style={{ fontSize: "10px" }}>{errors.password}</small>}
        </div>

        <div className="mb-4 text-end">
          <a href="./ForgotPassword" className="text-secondary" style={{ fontSize: "12px" }}>
            Forgot Password?
          </a>
        </div>

        <button
          type="submit"
          className="btn btn-primary w-100 py-3 mb-4"
          style={{ backgroundColor: "#9848B3", border: "none" }}
        >
          Connect Account
        </button>

        <div className="d-flex align-items-center mb-3 gap-2">
          <hr className="flex-grow-1" />
          <span className="text-secondary">Or login with</span>
          <hr className="flex-grow-1" />
        </div>

        <div className="row gx-2">
          <div className="col-6">
            <button
              type="button"
              className="w-100 text-center bg-transparent border border-secondary py-3 px-2 rounded text-white fw-light d-flex align-items-center justify-content-center gap-2"
              onClick={() => handleLogin(navigate)}
              >
              <img src="/assets/google.png" alt="Google" style={{ width: "20px" }} />
              Google
            </button>
          </div>
          <div className="col-6">
            <button
              type="button"
              className="w-100 text-center bg-transparent border border-secondary py-3 px-2 rounded text-white fw-light d-flex align-items-center justify-content-center gap-2"
            >
              <img src="/assets/apple.png" alt="Apple" style={{ width: "20px" }} />
              Apple
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
