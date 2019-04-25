import React from "react";
import { Link, Redirect } from "react-router-dom";
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

class Register extends React.Component {

    constructor(props) {
        super(props);

        if (this.props.userId === null) {

        }

        this.state = {
            userId: "",
            password: "",
            fullName: "",
            birthday: "",
            location: "",
            confirm: "",
            errorMsg: null
        };

    }

    onUserIdChange = (event) => {
        this.setState({ userId: event.target.value, errorMsg: null });
    };

    onPasswordChange = (event) => {
        this.setState({ password: event.target.value, errorMsg: null });
    };

    onFullNameChange = (event) => {
        this.setState({fullName: event.target.value
        })
    }

    onBirthdayChange = (event) => {
        this.setState({birthday: event.target.value
        })
    }

    onLocationChange = (event) => {
        this.setState({location: event.target.value
        })
    }


    onConfirmChange = (event) => {
        this.setState({ confirm: event.target.value, errorMsg: null });
    };

    // Heavily inspired by the following code:
    // https://github.com/arcuri82/web_development_and_api_design/blob/master/les08/authentication/src/client/signup.jsx

    doSignUp = async () => {
        const { userId, password, fullName, birthday, location, confirm } = this.state;

        if (confirm !== password) {
            this.setState({ errorMsg: "Passwords do not match" });
            return;
        }

        const url = "/api/register";

        const payload = {
            userId: userId,
            password: password,
            fullName: fullName,
            birthday: birthday,
            location: location};

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
            this.setState({ errorMsg: "Invalid username/password" });
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
        this.props.updateLoggedInUser(userId, fullName);
        this.props.history.push("/");
    };

    render() {

        if (this.props.userId !== null) {
            return <Redirect to="/"/>
        }

        let error = <div />;
        if (this.state.errorMsg !== null) {
            error = (
                <div>
                    <p className="info-message">{this.state.errorMsg}</p>
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
                    <h2>Register</h2>
                    <div>
                        <p className="input-heading">Username</p>
                        <input
                            type="text"
                            className="input-user-details"
                            placeholder="Username"
                            value={this.state.userId}
                            onChange={this.onUserIdChange}
                        />
                    </div>
                    <p className="input-heading">Name</p>
                    <input
                        type="text"
                        className="input-user-details"
                        placeholder="Full Name"
                        value={this.state.fullName}
                        onChange={this.onFullNameChange}
                    />
                    <p className="input-heading">Birthday</p>
                    <DayPickerInput
                        className="input-user-details"
                         />
                    <p className="input-heading">Location</p>
                    <input
                        type="text"
                        className="input-user-details"
                        placeholder="Location"
                        value={this.state.location}
                        onChange={this.onLocationChange}
                    />
                    <br />
                    <div>
                        <p className="input-heading">Password</p>
                        <input
                            type="password"
                            className="input-user-details"
                            placeholder="Password"
                            value={this.state.password}
                            onChange={this.onPasswordChange}
                        />
                    </div>
                    <div>
                        <p className="input-heading">Confirm Password</p>
                        <input
                            type="password"
                            className="input-user-details"
                            placeholder="Password"
                            value={this.state.confirm}
                            onChange={this.onConfirmChange}
                        />
                        {
                            validationMessage.length > 0 &&
                            <div className="info-message">{validationMessage}</div>
                        }

                    </div>
                    {error}
                    <br />
                    <div className="button button-primary" onClick={this.doSignUp}>
                        Sign Up
                    </div>
                </div>

                <div className="change-login-type-box">
                    <p>Already registered?</p>
                    <Link to={"/login"}>
                        <div className="button">Login</div>
                    </Link>
                </div>

            </div>
        );
    }
}

export default Register;