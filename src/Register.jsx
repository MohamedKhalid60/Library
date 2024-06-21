import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Register({ onRegister }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    userName: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5041/api/user/UserAccount/register",
        formData
      );
      // If registration is successful, save email in local storage
      localStorage.setItem("email", formData.email);
      console.log("Registration successful:", response.data);
      // Redirect or perform any other action after successful registration
      // For example, redirect to home page:
      window.location.pathname = "/";
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  function LogIn() {
    window.location.pathname = "/LogIn";
  }

  return (
    <>
      <div className="container">
        <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                <div className="card mb-3">
                  <div className="card-body">
                    <div className="pt-4 pb-2">
                      <h5 className="card-title text-center pb-0 fs-4">
                        Create an Account
                      </h5>
                      <p className="text-center small">
                        Enter your personal details to create account
                      </p>
                    </div>

                    <form
                      className="row g-3 needs-validation"
                      onSubmit={handleSubmit}
                    >
                      <div className="col-12">
                        <label htmlFor="yourName" className="form-label">
                          First Name
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          className="form-control"
                          id="yourName"
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                        />
                        <div className="invalid-feedback">
                          Please, enter your first name!
                        </div>
                      </div>

                      <div className="col-12">
                        <label htmlFor="yourLastName" className="form-label">
                          Last Name
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          className="form-control"
                          id="yourLastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                        />
                        <div className="invalid-feedback">
                          Please, enter your last name!
                        </div>
                      </div>

                      <div className="col-12">
                        <label htmlFor="yourEmail" className="form-label">
                          Your Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          className="form-control"
                          id="yourEmail"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                        <div className="invalid-feedback">
                          Please enter a valid Email address!
                        </div>
                      </div>

                      <div className="col-12">
                        <label
                          htmlFor="yourPassword"
                          className="form-label"
                        >
                          Password
                        </label>
                        <input
                          type="password"
                          name="password"
                          className="form-control"
                          id="yourPassword"
                          value={formData.password}
                          onChange={handleChange}
                          required
                        />
                        <div className="invalid-feedback">
                          Please enter your password!
                        </div>
                      </div>

                      <div className="col-12">
                        <label htmlFor="yourUserName" className="form-label">
                          Username
                        </label>
                        <input
                          type="text"
                          name="userName"
                          className="form-control"
                          id="yourUserName"
                          value={formData.userName}
                          onChange={handleChange}
                          required
                        />
                        <div className="invalid-feedback">
                          Please enter your username!
                        </div>
                      </div>

                      <div className="col-12">
                        <button
                          className="btn btn-primary w-100"
                          type="submit"
                        >
                          Create Account
                        </button>
                      </div>
                      <div className="col-12">
                        <p className="small mb-0">
                          Already have an account?{" "}
                          <Link to="">
                            <button
                              className="btn btn-info w-100"
                              type="submit"
                              onClick={LogIn}
                            >
                              Log In
                            </button>
                          </Link>
                        </p>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
