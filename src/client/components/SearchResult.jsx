import React from "react";

const SearchResult = (props) => {

    function openLink() {
        prompt("Næmmen halla")
    }

    return (
        <div onClick={openLink} className="search-result-box">
            <p>{props.name}</p>
        </div>
    )
}

export default SearchResult