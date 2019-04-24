import React from "react";

class Search extends React.Component {

    constructor(props) {
        super(props);
        this.searchUsers = this.searchUsers.bind(this);
    }


    searchUsers = ((event) => {
        console.log(event)

        event.preventDefault()

    })

    render() {
        return (
            <div className="search-container">
                <form onSubmit={this.searchUsers}>
                <input
                    type="text"
                    placeholder="🔍 Search..."
                    className="search-input"
                />
                </form>
            </div>
        )

    }
}

export default Search;