import React from "react";

class Search extends React.Component {

    constructor(props) {
        super(props);
        this.searchUsers = this.searchUsers.bind(this);
    }


    searchUsers = ((event) => {
        console.log(event);

        event.preventDefault();

        prompt("This is not available. Yet.");

    })

    render() {
        return (
            <div className="search-container">
                <form onSubmit={this.searchUsers}>
                <input
                    type="text"
                    placeholder="🔍 Search..."
                    className="input-search"
                />
                </form>
            </div>
        )

    }
}

export default Search;