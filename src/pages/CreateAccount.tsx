import React, { useState } from "react";
import { handleRegister } from "../services/axios";
import { handleFacebookRegister } from "../services/axios";
import { useNavigate } from "react-router-dom";

export default function CreateAccount() {
  type FormFields = {
    name: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    acceptedTerms: boolean;
  };

  const navigate = useNavigate();

  type FormErrors = Partial<Record<keyof FormFields, string>>;

  const [formData, setFormData] = useState<FormFields>({
    name: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptedTerms: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Limpa erro ao digitar
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validate = () => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format.";
    }

    if (!formData.password) newErrors.password = "Password is required.";
    if (!formData.confirmPassword) newErrors.confirmPassword = "Confirmation is required.";
    if (formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    if (!formData.acceptedTerms) newErrors.acceptedTerms = "You must accept the terms.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      console.log("Dados enviados:", formData);
      // Enviar para API aqui
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
        <h1 className="mb-1 fs-3 fw-light">Create your account</h1>
        <span className="d-block fs-6 mb-4 text-secondary">
          Already have an account?{" "}
          <a href="./ConnectAccount" className="text-decoration-none text-light">
            Login
          </a>
        </span>

        <div className="mb-3 row gx-2">
          <div className="col-12 col-md-6">
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`bg-dark w-100 py-1 px-2 rounded border-0 text-white fw-light ${errors.name ? "border border-danger" : ""}`}
              type="text"
              placeholder="Name"
            />
            {errors.name && <small className="text-danger" style={{ fontSize: "10px", marginTop: "5px" }}>{errors.name}</small>}
          </div>
          <div className="col-12 col-md-6">
            <input
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={`bg-dark w-100 py-1 px-2 rounded border-0 text-white fw-light ${errors.lastName ? "border border-danger" : ""}`}
              type="text"
              placeholder="Last name"
            />
            {errors.lastName && <small className="text-danger" style={{ fontSize: "10px", marginTop: "5px" }}>{errors.lastName}</small>}
          </div>
        </div>

        <div className="mb-3">
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`bg-dark w-100 py-1 px-2 rounded border-0 text-white fw-light ${errors.email ? "border border-danger" : ""}`}
            type="email"
            placeholder="Email"
          />
          {errors.email && <small className="text-danger" style={{ fontSize: "10px", marginTop: "5px" }}>{errors.email}</small>}
        </div>

        <div className="mb-3">
          <input
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`bg-dark w-100 py-1 px-2 rounded border-0 text-white fw-light ${errors.password ? "border border-danger" : ""}`}
            type="password"
            placeholder="Enter your password"
          />
          {errors.password && <small className="text-danger" style={{ fontSize: "10px", marginTop: "5px" }}>{errors.password}</small>}
        </div>

        <div className="mb-3">
          <input
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`bg-dark w-100 py-1 px-2 rounded border-0 text-white fw-light ${errors.confirmPassword ? "border border-danger" : ""}`}
            type="password"
            placeholder="Confirm your password"
          />
          {errors.confirmPassword && <small className="text-danger" style={{ fontSize: "10px", marginTop: "5px" }}>{errors.confirmPassword}</small>}
        </div>

        <div className="form-check mb-4">
          <input
            type="checkbox"
            className={`form-check-input ${errors.acceptedTerms ? "is-invalid" : ""}`}
            id="terms"
            name="acceptedTerms"
            checked={formData.acceptedTerms}
            onChange={handleChange}
          />
          <label className="form-check-label text-secondary fs-6" htmlFor="terms">
            I agree to the{" "}
            <a href="#" className="text-decoration-none text-light">
              Terms & Conditions
            </a>
          </label>
          {errors.acceptedTerms && <div className="text-danger" style={{ fontSize: "10px" }}>{errors.acceptedTerms}</div>}
        </div>

        <button
          type="submit"
          className="btn btn-light rounded w-100 py-2 mb-4"
        >
          Create Account
        </button>

        <div className="d-flex align-items-center mb-3 gap-2">
          <hr className="flex-grow-1" />
          <span className="text-secondary fs-6">Or register with</span>
          <hr className="flex-grow-1" />
        </div>

        <div className="row gx-2">
          <div className="col-6">
            <button
              type="button"
              className="w-100 text-center bg-transparent border border-secondary py-2 px-2 rounded text-white fw-light d-flex align-items-center justify-content-center gap-2"
              onClick={() => handleRegister(navigate)}
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
              onClick={() => handleFacebookRegister(navigate)}
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
