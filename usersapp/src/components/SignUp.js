import React from "react";
import axios from "axios";

class SignIn extends React.Component {
    state = {
        username: "",
        password: "",
        department: ""
    }

    handleChanges = e => {
        const {name, value} = e.target;
        this.setState({[name]: value})
    }

    handleRegister = e => {
        e.preventDefault();
        axios
            .post("http://localhost:5000/api/register", this.state)
            .then(res => {
                this.props.history.push("/signin")
            })
            .catch(err => console.log(err))
    }
    render() {
        return (
            <div>
            <h2>Register</h2>
            <form onSubmit={this.handleRegister}>
                <label htmlFor="username"/>
                <input
                    name="username"
                    placeholder="username"
                    id="username"
                    type="text"
                    value={this.state.username}
                    onChange={this.handleChanges}
                />
                <label htmlFor="department"/>
                <input
                    name="department"
                    placeholder="department"
                    id="department"
                    type="text"
                    value={this.state.department}
                    onChange={this.handleChanges}
                />
                <label htmlFor="password"/>
                <input
                    name="password"
                    placeholder="password"
                    id="password"
                    type="password"
                    value={this.state.password}
                    onChange={this.handleChanges}
                />
                <button type="submit">Sign Up</button>
            </form>
        </div>
        )
    }
}

export default SignIn;