import React from "react";
import Header from "../components/Header";
import ErrorPage from "../components/ErrorPage";
import Login from "../components/Login";
import Register from "../components/Register";
import Chat from "../components/Chat";
import App from "../components/App";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Profile from "../components/Profile";

class AppRouter extends React.Component {

    constructor() {
        super();
        this.state = {
            userId: null
        };
    }

    componentDidMount() {
        this.updateLogin();
    }

    updateLoggedInUserId = (userId) => {
        this.setState({
            userId: userId
        });

        console.log(userId);
    }

    updateLogin = async () => {
        const response = await fetch('/api/user', {
            method: 'GET',
            credentials: 'include',
        });

        if(response.status === 200){
            const payload = await response.json();
            this.updateLoggedInUserId(payload.userId)
        }
    };

    render() {
        return (
            <BrowserRouter>
                <div>
                    <Header
                        userId={this.state.userId}
                        updateLoggedInUserId={this.updateLoggedInUserId}/>
                </div>
                <div className="content-wrapper">

                <Switch>
                    <Route path="/" component={App} exact={true}/>
                    <Route path="/login" component={() =>
                        <Login userId={this.state.userId}
                               updateLoggedInUserId={this.updateLoggedInUserId}/>}
                               exact={true}/>
                    <Route path="/register" component={() =>
                        <Register userId={this.state.userId}
                                  updateLoggedInUserId={this.updateLoggedInUserId}/>}
                                  exact={true}/>
                    <Route path="/chat" component={Chat} exact={true}/>
                    <Route path="/profile" component={Profile} exact={true}/>
                    <Route component={ErrorPage}/>
                </Switch>
                </div>
            </BrowserRouter>
        );
    }

}

export default AppRouter;