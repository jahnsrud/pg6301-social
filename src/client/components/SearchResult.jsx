import React from "react";
import {Link} from "react-router-dom";

const SearchResult = (props) => {

    console.log("SEARCH RESULT: " + props.user);


    function openLink() {

    }

    return (
        <Link to={"/profile?id=" + props.user.id}>

        <div onClick={props.clearInput} className="search-result-box">
            <p>{props.user.fullName}</p>
        </div>
        </Link>
    )
}

export default SearchResult