import React from "react";
import Header from "../components/Header";
import ErrorPage from "../components/ErrorPage";
import Login from "../components/Login";
import Register from "../components/Register";
import Chat from "../components/Chat";
import App from "../App";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Profile from "../components/Profile";

class AppRouter extends React.Component {

    constructor() {
        super();
        this.state = {
            userId: null
        };
    }

    updateLoggedInUserId = (userId) => {
        this.setState({
            userId: userId
        });

        console.log(userId);
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                    <Header/>
                </div>

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
            </BrowserRouter>
        );
    }

}

export default AppRouter;