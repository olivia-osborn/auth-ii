import React from "react";
import axios from "axios";

class Users extends React.Component {
    state = {
        users: []
    }

    componentDidMount() {
        console.log("mounting")
        const token = localStorage.getItem("jwt")
        const reqOptions = {
            headers: {
                authorization: token,
            },
        };
        axios
            .get("http://localhost:5000/api/users", reqOptions)
            .then(res => {
                console.log("response", res)
                this.setState({users: res.data})
            })
            .catch(err => console.log(err))
    }
    render() {
        console.log("users", this.state.users, "jwt", localStorage.getItem("jwt"))
        return (
            <div>
                <h2>List of Users</h2>
                <ul>
                    {this.state.users.map(user => {
                        return <li key={user}>{user.username}</li>
                    })}
                </ul>
            </div>
        )
    }
}

export default Users;