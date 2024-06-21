import React, { Component } from 'react';

export default class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      userName: '',
      token: '',
      error: null
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      error: null // Clear any previous errors when user starts typing
    });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password, userName } = this.state;
  
    try {
      const response = await fetch('http://localhost:5041/api/user/UserAccount/RegisterAdmin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ firstName, lastName, email, password, userName })
      });
  
      if (!response.ok) {
        throw new Error('Failed to register admin');
      }
  
      const data = await response.json();
      if (data.token) {
        // Store the token in local storage
        localStorage.setItem('token', data.token);
  
        this.setState({ token: data.token });
        // Clear form fields after successful registration
        this.setState({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          userName: ''
        });
      }
    } catch (error) {
      this.setState({ error: 'Failed to register admin' });
    }
  }

  handleTokenRefresh = async () => {
    try {
      const response = await fetch('http://localhost:5041/api/user/UserAccount/RefreshToken', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to refresh token');
      }

      const data = await response.json();
      if (data.token) {
        // Update the token in local storage
        localStorage.setItem('token', data.token);
        this.setState({ token: data.token });
      }
    } catch (error) {
      console.error('Error refreshing token:', error);
    }
  }

  render() {
    const { firstName, lastName, email, password, userName, error } = this.state;

    return (
      <div className="container mt-5">
        <h2 className="mb-4">Admin Registration Form</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="row mb-3">
            <div className="col">
              <input type="text" className="form-control" required placeholder="First Name" name="firstName" value={firstName} onChange={this.handleChange} />
            </div>
            <div className="col">
              <input type="text" className="form-control" required placeholder="Last Name" name="lastName" value={lastName} onChange={this.handleChange} />
            </div>
          </div>
          <div className="mb-3">
            <input type="email" className="form-control" required placeholder="Email" name="email" value={email} onChange={this.handleChange} />
          </div>
          <div className="mb-3">
            <input type="password" className="form-control" required placeholder="Password" name="password" value={password} onChange={this.handleChange} />
          </div>
          <div className="mb-3">
            <input type="text" className="form-control"  required placeholder="Username" name="userName" value={userName} onChange={this.handleChange} />
          </div>
          <button type="submit" className="btn btn-info w-100">Register</button>
        </form>
        {error && <div className="alert alert-danger mt-3">{error}</div>}
      </div>
    );
  }
}
