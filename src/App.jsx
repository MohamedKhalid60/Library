import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import BookList from "./BookList";
import Dashboard from "./Dashboard/Dashboard";
import Users from "./Dashboard/Users";
import Admin from "./Dashboard/Admin/Admin"
import Books from "./Dashboard/Books";
import DashList from "./Dashboard/DashList";


export default class App extends Component {
  handleRegisterClick = () => {
    window.location.href = "/Register";
  };
  handleRegister = () => {
    window.location.href = "/";
  };

  render() {
    if (window.location.pathname === "/Register") {
      return <Register onRegister={this.handleRegister} />;
    } else if (window.location.pathname === "/LogIn") {
      return <Login onRegister={this.handleRegister} />;
    } else {
      return (
        <>
          <Header onRegisterClick={this.handleRegisterClick}  />
          <Routes>
            <Route path="/" element={<Home />} />
      
            <Route path="/booklist" element={<BookList />} />
            <Route path="/dashboard" element={<Dashboard />}>
              <Route path="users" element={<Users />} />
              <Route path="dashblist" element={<DashList />} />
              <Route path="admin" element={<Admin/>} />
              <Route path="books" element={<Books />} />
            </Route>
          </Routes>
        </>
      );
    }
  }
}
