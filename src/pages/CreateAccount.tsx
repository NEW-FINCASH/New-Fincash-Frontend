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
        <h1 className="mb-3 fw-light">Create your account</h1>
        <span className="d-block mb-4 text-secondary">
          Already have an account?{" "}
          <a href="./ConnectAccount" style={{ color: "#9848B3", textDecoration: "none" }}>
            Login
          </a>
        </span>

        <div className="mb-3 row gx-2">
          <div className="col-12 col-md-6">
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`bg-dark w-100 py-3 px-2 rounded border-0 text-white fw-light ${errors.name ? "border border-danger" : ""}`}
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
              className={`bg-dark w-100 py-3 px-2 rounded border-0 text-white fw-light ${errors.lastName ? "border border-danger" : ""}`}
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
            className={`bg-dark w-100 py-3 px-2 rounded border-0 text-white fw-light ${errors.email ? "border border-danger" : ""}`}
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
            className={`bg-dark w-100 py-3 px-2 rounded border-0 text-white fw-light ${errors.password ? "border border-danger" : ""}`}
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
            className={`bg-dark w-100 py-3 px-2 rounded border-0 text-white fw-light ${errors.confirmPassword ? "border border-danger" : ""}`}
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
          <label className="form-check-label" htmlFor="terms">
            I agree to the{" "}
            <a href="#" style={{ color: "#9848B3", textDecoration: "none" }}>
              Terms & Conditions
            </a>
          </label>
          {errors.acceptedTerms && <div className="text-danger" style={{ fontSize: "10px" }}>{errors.acceptedTerms}</div>}
        </div>

        <button
          type="submit"
          className="btn btn-primary w-100 py-3 mb-4"
          style={{ backgroundColor: "#9848B3", border: "none" }}
        >
          Create Account
        </button>

        <div className="d-flex align-items-center mb-3 gap-2">
          <hr className="flex-grow-1" />
          <span className="text-secondary">Or register with</span>
          <hr className="flex-grow-1" />
        </div>

        <div className="row gx-2">
          <div className="col-6">
            <button
              type="button"
              className="w-100 text-center bg-transparent border border-secondary py-3 px-2 rounded text-white fw-light d-flex align-items-center justify-content-center gap-2"
              onClick={() => handleRegister(navigate)}
            >
              <img src="/assets/google.png" alt="Google" style={{ width: "20px" }} />
              Google
            </button>
          </div>
          <div className="col-6">
            <button
              type="button"
              className="w-100 text-center bg-transparent border border-secondary py-3 px-2 rounded text-white fw-light d-flex align-items-center justify-content-center gap-2"
              onClick={() => handleFacebookRegister(navigate)}
            >
              <img src="/assets/face.png" alt="Facebook" style={{ width: "20px" }} />
              Facebook
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
