import React from "react";
import { NavLink, Redirect } from "react-router-dom";
import Search from "./Search";

let profileStyles = {
    headerLink: "header-link",
    profileLink: "header-profile",
};

class Header extends React.Component {

    constructor(props) {
        super(props);

    }



    renderLoggedInLinks() {
        return(
            <div className="conditional-links">
                <NavLink to="/" className="header-link" activeClassName="is-active" exact={true}>Timeline</NavLink>
                <NavLink to="/chat" className="header-link" activeClassName="is-active" exact={true}>Chat</NavLink>
                <NavLink to="/profile" className={`${profileStyles.headerLink} ${profileStyles.profileLink}`} activeClassName="is-active" exact={true}>{this.props.userId.toLowerCase()}</NavLink>
                <p className="header-link" onClick={this.doLogout}>Sign Out</p>
            </div>
        )
    };

    renderUnregisteredLinks() {
        return(
            <div className="conditional-links">
                <NavLink to="/login" className="header-link" activeClassName="is-active" exact={true}>Login</NavLink>
                <NavLink to="/register" className="header-link" activeClassName="is-active" exact={true}>Register</NavLink>
            </div>
        )
    }

    // Sign out method inspired by
    // https://github.com/arcuri82/web_development_and_api_design/blob/master/les08/authentication/src/client/headerbar.jsx

    doLogout = async () => {
        const url = "/api/logout";

        let response;

        try {
            response = await fetch(url, { method: "post" });
        } catch (err) {
            alert("Failed to connect to server: " + err);
            return;
        }

        if (response.status !== 204) {
            alert("Error when connecting to server: status code " + response.status);
            return;
        }

        this.props.updateLoggedInUserId(null);
        this.props.history.push("/");
        <Redirect to="/" push />

    };

    render() {
        return (
            <div className="header">
                <NavLink to="/" className="header-logo" exact={true}>
                    <h1>Social.app</h1>
                </NavLink>
                {
                    (this.props.userId !== null) && this.renderLoggedInLinks()
                }
                {
                    (this.props.userId === null) && this.renderUnregisteredLinks()
                }

                <Search/>

            </div>
        )
    }
}

export default Header;