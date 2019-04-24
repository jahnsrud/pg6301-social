import React from "react";
import {Link} from "react-router-dom";

class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            userId: "",
            password: "",
            errorMsg: null
        }

        this.onUserIdChange = this.onUserIdChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);

    }

    onUserIdChange = (event) => {
        this.setState({ userId: event.target.value });
    };

    onPasswordChange = (event) => {
        this.setState({ password: event.target.value });
    };

    doLogIn = async () => {
        const { userId, password } = this.state;

        const url = "/api/login";

        const payload = { userId: userId, password: password };

        let response;

        try {
            response = await fetch(url, {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });
        } catch (err) {
            this.setState({ errorMsg: "Failed to connect to server: " + err });
            return;
        }

        if (response.status === 401) {
            this.setState({ errorMsg: "Invalid userId/password" });
            return;
        }

        if (response.status !== 204) {
            this.setState({
                errorMsg:
                    "Error when connecting to server: status code " + response.status
            });
            return;
        }

        this.setState({ errorMsg: null });

        this.props.updateLoggedInUserId(userId);
        this.props.history.push("/");
    };

    render() {
        let error = <div />;
        if (this.state.errorMsg !== null) {
            error = (
                <div className="errorMsg">
                    <p>{this.state.errorMsg}</p>
                </div>
            );
        }

        return (
            <div>
                <div className="loginSection">
                    <div>
                        <p>Username</p>
                    <input
                        type="text"
                        value={this.state.userId}
                        placeholder="Username"
                        onChange={this.onUserIdChange}
                        />

                    </div>
                    <div className="passwordSection">
                        <p>Password</p>
                        <input
                            type="password"
                            value={this.state.password}
                            placeholder="Password"
                            onChange={this.onPasswordChange}
                        />

                    </div>
                </div>

                {error}

                <div onClick={this.doLogIn} className="btn">Log in!</div>
                <p>Not a member yet?</p>
                <Link to={"/register"}>Register</Link>

            </div>
        )

    }
}

export default Login;