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
            this.search(event.target.value);

        }  else {
            this.setState({
                searchTerm: event.target.value,
                users: []
            })
        }


    });

    async search(search) {

        const url = "/api/users/search/" + search;

        const response = await fetch(url);
        const body = await response.json();

        if (response.status !== 200) {
            this.setState({
                error: "Something went wrong"
            });
            throw Error(body.message);
        }

        console.log(body);

        this.setState({
            users: body.json()
        });

    }

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