import React, { Component } from 'react';
import { Route, NavLink, withRouter } from "react-router-dom"

import './App.css';
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Users from "./components/Users";

class App extends Component {

  handleLogout = e => {
    localStorage.clear()
  }
  render() {
    return (
      <div className="App">
        <nav>
          <NavLink to="/signin">Login</NavLink>
          <NavLink to="/signup">Sign Up</NavLink>
          <NavLink to="/users">Users</NavLink>
          <NavLink to="/signin" onClick={this.handleLogout}>Logout</NavLink>

        </nav>
        <Route
          path="/signup"
          component={SignUp}
        />
        <Route
          path="/signin"
          component={SignIn}
        />
        <Route
          path="/users"
          component={Users}
        />
      </div>
    );
  }
}

export default withRouter(App);
