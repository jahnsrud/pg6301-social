import React from "react";
import {Link} from "react-router-dom";

const SearchResult = (props) => {

    function openLink() {
    }

    return (
        <Link to={"/profile"}>

        <div onClick={openLink} className="search-result-box">
            <p>{props.name}</p>
        </div>
        </Link>
    )
}

export default SearchResult