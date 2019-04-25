import React from "react";
import {Link, Redirect} from "react-router-dom";

class Login extends React.Component {

    constructor(props) {
        super(props);

        if (this.props.userId !== null) {
            <Redirect to="/" push/>
        }

        this.state = {
            userId: "",
            password: "",
            errorMsg: null
        };

        this.onUserIdChange = this.onUserIdChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);

    }

    onUserIdChange = (event) => {
        this.setState({userId: event.target.value});
    };

    onPasswordChange = (event) => {
        this.setState({password: event.target.value});
    };

    doLoginFromEnter = (event) => {

        event.preventDefault();

        this.doLogIn()
    };

    // Heavily inspired by the following code:
    // https://github.com/arcuri82/web_development_and_api_design/blob/master/les08/authentication/src/client/login.jsx

    doLogIn = async () => {
        const {userId, password} = this.state;

        const url = "/api/login";

        const payload = {userId: userId, password: password};

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
            this.setState({errorMsg: "Failed to connect to server: " + err});
            return;
        }

        if (response.status === 401) {
            this.setState({errorMsg: "Invalid username or password"});
            return;
        }

        if (response.status !== 204) {
            this.setState({
                errorMsg:
                    "Error when connecting to server: status code " + response.status
            });
            return;
        }

        this.setState({errorMsg: null});

        this.props.updateLoggedInUser(userId);
        this.props.history.push("/");
    };

    render() {

        if (this.props.userId !== null) {
            return <Redirect to="/"/>
        }

        let error = <div/>;
        if (this.state.errorMsg !== null) {
            error = (
                <div className="info-message">
                    <p>{this.state.errorMsg}</p>
                </div>
            );
        }

        return (
            <div>
                <div className="login-section">
                    <h2>Welcome back!</h2>
                    <div>
                        <p className="input-heading">Username</p>
                        <form onSubmit={this.doLoginFromEnter}>
                            <input
                                type="text"
                                className="input-user-details"
                                value={this.state.userId}
                                placeholder="Username"
                                onChange={this.onUserIdChange}
                            />
                        </form>

                    </div>
                    <div className="passwordSection">
                        <p className="input-heading">Password</p>
                        <form onSubmit={this.doLoginFromEnter}>
                            <input
                                type="password"
                                className="input-user-details"
                                value={this.state.password}
                                placeholder="Password"
                                onChange={this.onPasswordChange}
                            />
                        </form>

                    </div>
                    <br/>
                    <div onClick={this.doLogIn} className="button button-primary">Login</div>

                </div>

                {error}

                <div className="change-login-type-box">
                    <p>Not a member yet?</p>
                    <Link to={"/register"}>
                        <div className="button">Register</div>
                    </Link>
                </div>
            </div>
        )

    }
}

export default Login;