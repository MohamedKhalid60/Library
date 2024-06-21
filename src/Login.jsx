import React from "react";
import { Link } from "react-router-dom";

export default function Login() {
  function Register() {
    window.location.pathname = "/Register";
  }

  function onHome() {
    window.location.pathname = "/";
  }

  // Check if email exists in local storage
  const email = localStorage.getItem("email");

  // If email exists, redirect to home page
  if (email) {
    window.location.pathname = "/";
    return null; // Prevent rendering anything else
  }

  return (
    <>
      <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
              <div className="card mb-3">
                <div className="card-body">
                  <div className="pt-4 pb-2">
                    <h5 className="card-title text-center pb-0 fs-4">
                      Login to Your Account
                    </h5>
                    <p className="text-center small">
                      Enter your username & password to login
                    </p>
                  </div>
                  <form className="row g-3 needs-validation" noValidate>
                    <div className="col-12">
                      <label htmlFor="yourEmail" className="form-label">
                        Your Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        id="yourEmail"
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
                        required
                      />
                      <div className="invalid-feedback">
                        Please enter your password!
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="remember"
                          value="true"
                          id="rememberMe"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="rememberMe"
                        >
                          Remember me
                        </label>
                      </div>
                    </div>
                    <div className="col-12">
                      <Link to="" onClick={onHome}>
                        <button
                          className="btn btn-primary w-100"
                          type="submit"
                        >
                          Login
                        </button>
                      </Link>
                    </div>
                    <div className="col-12">
                      <p className="small mb-0">
                        Don't have an account?{" "}
                        <Link to="" onClick={Register}>
                          Create an account
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
    </>
  );
}
