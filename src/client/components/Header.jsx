import React from "react";
import {NavLink} from "react-router-dom";
import Search from "./Search";

const Header = () => {

    return (
        <div className="header">
            <NavLink to="/" className="header-logo" exact={true}>
                <h1>Social.app</h1>
            </NavLink>
            <NavLink to="/" className="header-link" activeClassName="is-active" exact={true}>Timeline</NavLink>
            <NavLink to="/profile" className="header-link" activeClassName="is-active" exact={true}>Profile</NavLink>
            <NavLink to="/chat" className="header-link" activeClassName="is-active" exact={true}>Chat</NavLink>
            <NavLink to="/login" className="header-link" activeClassName="is-active" exact={true}>Login</NavLink>
            <NavLink to="/register" className="header-link" activeClassName="is-active" exact={true}>Register</NavLink>
            <Search/>

        </div>
    )
}

export default Header;