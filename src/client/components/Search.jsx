import React from "react";
import SearchResult from "./SearchResult";

class Search extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            users: []
        }

        this.searchUsers = this.searchUsers.bind(this);

    }


    searchUsers = ((event) => {
        console.log(event);

        event.preventDefault();

        this.setState({
            users: ["Markus", "Håvard", "Sondre", "Gullik"]
        })

    })

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
                {
                    this.state.users.map((option) => (
                        <SearchResult name={option}/>
                    ))

                }

            </div>
        )

    }
}

export default Search;