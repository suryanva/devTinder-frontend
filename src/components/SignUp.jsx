import React, { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: "",
    gender: "",
    skills: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: "", message: "" });
  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    const errors = [];
    if (password.length < minLength)
      errors.push("Password must be at least 8 characters");
    if (!hasUpperCase) errors.push("Include at least one uppercase letter");
    if (!hasLowerCase) errors.push("Include at least one lowercase letter");
    if (!hasNumbers) errors.push("Include at least one number");
    if (!hasSpecialChar) errors.push("Include at least one special character");

    return errors;
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (formData.firstName.length < 4) {
      newErrors.firstName = "First name must be at least 4 characters";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    const age = parseInt(formData.age);
    if (age < 18 || age > 99) {
      newErrors.age = "Age must be between 18 and 99";
    }

    const passwordErrors = validatePassword(formData.password);
    if (passwordErrors.length > 0) {
      newErrors.password = passwordErrors;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (formData.gender && !["M", "F", "O"].includes(formData.gender)) {
      newErrors.gender = "Please select a valid gender";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitStatus({ type: "", message: "" });

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    try {
      const formattedData = {
        ...formData,
        skills: formData.skills.split(",").map((skill) => skill.trim()),
        age: parseInt(formData.age),
      };
      delete formattedData.confirmPassword;

      await axios
        .post(
          `${import.meta.env.VITE_PUBLIC_URL}/api/v1/users/signUp`,
          formattedData,
          { withCredentials: true }
        )
        .then((response) => {
          console.log(response.data);
          setSubmitStatus({
            type: "success",
            message: "Account created successfully!",
          });
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            age: "",
            gender: "",
            skills: "",
          });
        });
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message:
          error.response?.data?.error || "An error occurred during signup",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 py-8">
      <div className="max-w-md mx-auto bg-base-100 rounded-lg shadow-xl p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">First Name *</span>
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={`input input-bordered w-full ${
                errors.firstName ? "input-error" : ""
              }`}
            />
            {errors.firstName && (
              <label className="label">
                <span className="label-text-alt text-error">
                  {errors.firstName}
                </span>
              </label>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Last Name</span>
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Email *</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`input input-bordered w-full ${
                errors.email ? "input-error" : ""
              }`}
            />
            {errors.email && (
              <label className="label">
                <span className="label-text-alt text-error">
                  {errors.email}
                </span>
              </label>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Age</span>
            </label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              min="18"
              max="99"
              className={`input input-bordered w-full ${
                errors.age ? "input-error" : ""
              }`}
            />
            {errors.age && (
              <label className="label">
                <span className="label-text-alt text-error">{errors.age}</span>
              </label>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Gender</span>
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className={`select select-bordered w-full ${
                errors.gender ? "select-error" : ""
              }`}
            >
              <option value="">Select gender</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
              <option value="O">Other</option>
            </select>
            {errors.gender && (
              <label className="label">
                <span className="label-text-alt text-error">
                  {errors.gender}
                </span>
              </label>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Password *</span>
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`input input-bordered w-full ${
                errors.password ? "input-error" : ""
              }`}
            />
            {errors.password && (
              <label className="label">
                <ul className="list-disc list-inside">
                  {Array.isArray(errors.password) ? (
                    errors.password.map((error, index) => (
                      <li key={index} className="label-text-alt text-error">
                        {error}
                      </li>
                    ))
                  ) : (
                    <li className="label-text-alt text-error">
                      {errors.password}
                    </li>
                  )}
                </ul>
              </label>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Confirm Password *</span>
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`input input-bordered w-full ${
                errors.confirmPassword ? "input-error" : ""
              }`}
            />
            {errors.confirmPassword && (
              <label className="label">
                <span className="label-text-alt text-error">
                  {errors.confirmPassword}
                </span>
              </label>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Skills (comma-separated)</span>
            </label>
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="e.g. JavaScript, React, Node.js"
              className="input input-bordered w-full"
            />
          </div>

          {submitStatus.message && (
            <div
              className={`alert ${
                submitStatus.type === "error" ? "alert-error" : "alert-success"
              }`}
            >
              <span>{submitStatus.message}</span>
            </div>
          )}

          <button
            type="submit"
            className={`ml-8 btn btn-primary w-1/4  ${
              isLoading ? "loading" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Creating Account..." : "Sign Up"}
          </button>
          <button className="ml-4 btn btn-secondary w-1/2 ">
            <Link to="/login">Back to Login</Link>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
