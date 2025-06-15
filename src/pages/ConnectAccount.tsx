import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { handleLogin } from "../services/axios";
import { handleFacebookLogin } from "../services/axios";


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
    <div className="d-flex flex-column justify-content-center align-items-center vw-100 vh-100">
      <form
        onSubmit={handleSubmit}
        className="p-4 text-white fw-regular"
        style={{ width: "100%", maxWidth: "400px" }}
        noValidate
      >
        <h1 className="mb-1 fs-3 fw-light">Connect your account</h1>

        <span className="d-block fs-6 mb-4 text-secondary">
          Don’t have an account?{" "}
          <a href="./CreateAccount" className="text-decoration-none text-light">
            Register
          </a>
        </span>

        <div className="mb-3">
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`bg-dark w-100 py-1 px-2 rounded border-0 text-white fw-light ${errors.email ? "border border-danger" : ""}`}
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
            className={`bg-dark w-100 py-1 px-2 rounded border-0 text-white fw-light ${errors.password ? "border border-danger" : ""}`}
            type="password"
            placeholder="Enter your password"
          />
          {errors.password && <small className="text-danger" style={{ fontSize: "10px" }}>{errors.password}</small>}
        </div>

        <div className="mb-4 text-end">
          <a href="./ForgotPassword" className="text-white fs-6 text-decoration-none">
            Forgot password?
          </a>
        </div>

        <button
          type="submit"
          className="btn btn-light w-100 py-2 mb-4 rounded"
          onClick={() => {
            const params = new URLSearchParams(window.location.search);
            const redirect = params.get('redirect');
            if (redirect) {
              navigate(redirect);
            }
          }}
        >
          Connect Account
        </button>

        <div className="d-flex align-items-center mb-3 gap-2">
          <hr className="flex-grow-1" />
          <span className="text-secondary fs-6">Or login with</span>
          <hr className="flex-grow-1" />
        </div>

        <div className="row gx-2">
          <div className="col-6">
            <button
              type="button"
              className="w-100 text-center bg-transparent border border-secondary py-2 px-2 rounded text-white fw-light d-flex align-items-center justify-content-center gap-2"
              onClick={() => handleLogin(navigate)}
            >
              <svg width="20" height="20" fill="currentColor" className="bi bi-google" viewBox="0 0 16 16">
                <path d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.8 4.8 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.7 3.7 0 0 0 1.599-2.431H8v-3.08z"/>
              </svg>
              Google
            </button>
          </div>
          <div className="col-6">
            <button
              type="button"
              className="w-100 text-center bg-transparent border border-secondary py-2 px-2 rounded text-white fw-light d-flex align-items-center justify-content-center gap-2"
              onClick={() => handleFacebookLogin(navigate)}
            >
              <svg width="20" height="20" fill="currentColor" className="bi bi-facebook" viewBox="0 0 16 16">
                <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"/>
              </svg>
              Facebook
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
