import React from 'react';
import Timeline from "./Timeline";
import CreatePost from "./CreatePost";

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            welcomeMessage: ""
        }

        this.fetchAllPosts = this.fetchAllPosts.bind(this);
    }

    componentDidMount() {

        this.fetchAllPosts();
        this.fetchWelcomeMessage()
            .then(res => this.setState({welcomeMessage: res.express}))
            .catch(err => console.log(err));
    }

    // Fetch inspired by
    // https://github.com/arcuri82/web_development_and_api_design/blob/master/les07/server_client_separated/frontend/src/client/home.jsx

    async fetchAllPosts() {
        const url = "/api/all-posts";
        let response;
        let payload;

        try {
            response = await fetch(url);
            payload = await response.json();
        } catch (err) {
            //Network error: eg, wrong URL, no internet, etc.
            this.setState({
                error: "ERROR when retrieving list of posts: " + err,
                posts: []
            });
            return;
        }

        if (response.status === 200) {
            this.setState({
                error: null,
                posts: payload
            });
        } else {
            this.setState({
                error: "Issue with HTTP connection: status code " + response.status,
                posts: []
            });
        }
    }

    fetchWelcomeMessage = async () => {
        const response = await fetch("/api/welcome");
        const body = await response.json();

        if (response.status !== 200) {
            throw Error(body.message);
        }


        return body;

    };

    render() {
        return (
            <div>

                {
                    (this.props.userId === null) && <p>Not signed in!</p>
                }
                <CreatePost/>
                {
                    this.state.posts !== null && <Timeline posts={this.state.posts}/>
                }
                <p>Server says: {this.state.welcomeMessage}</p>

            </div>
        );
    }
fk


}

export default App;