import React from "react";
import SearchResult from "./SearchResult";

class Search extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            users: [],
            searchTerm: ""
        }

        this.searchUsers = this.searchUsers.bind(this);

    }


    searchUsers = ((event) => {
        console.log(event);

        event.preventDefault();

        if (event.target.value.length > 0) {
            this.setState({
                searchTerm: event.target.value,
                users: ["Markus", "Håvard", "Sondre", "Gullik"]
            })

        }  else {
            this.setState({
                searchTerm: event.target.value,
                users: []
            })
        }


    });

    render() {
        return (
            <div className="search-container">
                <form onSubmit={this.searchUsers}>
                <input
                    type="text"
                    placeholder="🔍 Search..."
                    className="input-search"
                    onChange={this.searchUsers}
                />
                </form>
                <div className="search-results">
                {
                    this.state.users.map((option) => (
                        <SearchResult name={option}/>
                    ))

                }
                </div>

            </div>
        )

    }
}

export default Search;