import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBook, faSignInAlt,  faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import "../App.css";

export default function Header({ onRegisterClick }) {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // Check if there is an email in local storage
    const email = localStorage.getItem('email');
    if (email) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
      window.location.pathname="/Register"
    }
  }, []);

  const handleLogout = () => {
    // Remove email from local storage
    localStorage.removeItem('email');
    // Update state to reflect logged out status
    setLoggedIn(false);
    window.location.pathname="/Register"
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <Link to={"/"} className="navbar-brand">
            <img src={require("../Assets/image.png")} alt="" />
            <span>Book Store</span>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-between" id="navbarSupportedContent">
            <form className="d-flex m-auto" role="search">
              <input
                className="form-control me-2 search"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-light" type="submit">
                Search
              </button>
            </form>
            <ul className="navbar-nav justify-content-between mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" to="/" aria-current="page" >
                  <FontAwesomeIcon icon={faHome} /> Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/booklist">
                  <FontAwesomeIcon icon={faBook} /> Bookstore
                </Link>
              </li>
              {loggedIn ? (
                <li className="nav-item">
                  <Link className="nav-link" to="/" onClick={handleLogout}>
                    <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                  </Link>
                </li>
              ) : (
                <li className="nav-item">
                  <Link className="nav-link" onClick={onRegisterClick} to="/Register">
                    <FontAwesomeIcon icon={faSignInAlt} /> Register
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}
