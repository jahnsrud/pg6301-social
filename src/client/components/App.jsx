import React from 'react';
import Timeline from "./Timeline";
import CreatePost from "./CreatePost";
import {Link} from "react-router-dom";

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: []
        };

        this.fetchPostsWithWebSockets = this.fetchPostsWithWebSockets.bind(this);
    }

    componentDidMount() {

        this.fetchPostsWithWebSockets();

    }

    // Fetch inspired by
    // https://github.com/arcuri82/web_development_and_api_design/blob/master/les07/server_client_separated/frontend/src/client/home.jsx

    async fetchPostsWithWebSockets() {
        const POSTS_URL = "ws://" + window.location.host + "/";
        console.log(POSTS_URL);

        this.socket = new WebSocket(POSTS_URL);

        this.socket.onmessage = (event => {

            const posts = JSON.parse(event.data);
            console.log("Parsed Posts: " + posts);

            this.setState({
                posts: posts

            });
                /* prev=> {
                    if (prev.messages === null) {
                        return {messages: msgList}
                    } else {
                        return {messages: [...prev.messages, ...msgList]};
                    }
                }
            )*/
        });
    }



    render() {

        return (
            <div>
                {
                    (this.props.userId === null) &&

                    <div>
                        <h2>Welcome to social.app</h2>
                        <p>Get started by signing in or register.</p>
                        <Link to={"/login"}>
                            <div className="button button-primary">Login</div>
                        </Link>
                        <br />
                        <Link to={"/register"}>
                            <div className="button button-primary">Register</div>
                        </Link>

                        <h3>Why register?</h3>
                        <p>You can show cool posts like these:</p>
                        {
                            this.state.posts !== null && <Timeline posts={this.state.posts}/>
                        }
                    </div>
                }
                {
                    (this.props.userId !== null) &&

                    <div>
                        <CreatePost author={this.props.userId}/>
                        {
                            this.state.posts !== null && <Timeline posts={this.state.posts}/>
                        }
                    </div>
                }

            </div>
        );
    }
fk


}

export default App;