import React from "react";
import axios from "axios";

class SignIn extends React.Component {
    state = {
        username: "Boromir",
        password: "pass"
    }

    handleChanges = e => {
        const {name, value} = e.target;
        this.setState({[name]: value})
    }

    handleSubmit = e => {
        e.preventDefault();
        axios
            .post("http://localhost:5000/api/login", this.state)
            .then(res => {
                localStorage.setItem("jwt", res.data.token)
                this.props.history.push("/users")
            })
            .catch(err => console.log(err))
    }
    render() {
        return (
            <div>
            <h2>Login</h2>
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="username"/>
                <input
                    name="username"
                    id="username"
                    type="text"
                    value={this.state.username}
                    onChange={this.handleChanges}
                />
                <label htmlFor="password"/>
                <input
                    name="password"
                    id="password"
                    type="password"
                    value={this.state.password}
                    onChange={this.handleChanges}
                />
                <button type="submit">Login</button>
            </form>
        </div>
        )
    }
}

export default SignIn;