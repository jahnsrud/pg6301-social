import React from "react";
import Link from "react-router-dom";

class Register extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            userId: "",
            password: "",
            confirm: "",
            errorMsg: null
        }

    }

    onUserIdChange = (event) => {
        this.setState({ userId: event.target.value, errorMsg: null });
    };

    onPasswordChange = (event) => {
        this.setState({ password: event.target.value, errorMsg: null });
    };

    onConfirmChange = (event) => {
        this.setState({ confirm: event.target.value, errorMsg: null });
    };

    // Heavily inspired by the following code:
    // https://github.com/arcuri82/web_development_and_api_design/blob/master/les08/authentication/src/client/signup.jsx

    doSignUp = async () => {
        const { userId, password, confirm } = this.state;

        if (confirm !== password) {
            this.setState({ errorMsg: "Passwords do not match" });
            return;
        }

        const url = "/api/signup";

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

        if (response.status === 400) {
            this.setState({ errorMsg: "Invalid userId/password" });
            return;
        }

        if (response.status !== 201) {
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

        let validationMessage = "";
        if (this.state.confirm !== this.state.password) {
            validationMessage = "Passwords doesn't match";
        }

        return (
            <div>
                <div className="login-section">
                    <div>
                        <p>Username</p>
                        <input
                            type="text"
                            placeholder="Username"
                            value={this.state.userId}
                            onChange={this.onUserIdChange}
                        />
                    </div>
                    <div>
                        <p>Password</p>
                        <input
                            type="password"
                            placeholder="Password"
                            value={this.state.password}
                            onChange={this.onPasswordChange}
                        />
                    </div>
                    <div>
                        <p>Confirm Password</p>
                        <input
                            type="password"
                            placeholder="Password"
                            value={this.state.confirm}
                            onChange={this.onConfirmChange}
                        />
                        {
                            validationMessage.length > 0 &&
                            <div className="validation-message">{validationMessage}</div>
                        }

                    </div>
                    {error}
                    <div className="button" onClick={this.doSignUp}>
                        Sign Up
                    </div>
                </div>
            </div>
        );
    }
}

export default Register;