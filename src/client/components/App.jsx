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
        this.notifyWebSocket = this.notifyWebSocket.bind(this);
    }

    // Fetch inspired by
    // https://github.com/arcuri82/web_development_and_api_design/blob/master/les07/server_client_separated/frontend/src/client/home.jsx

    componentDidMount() {

        this.fetchPostsWithWebSockets();

    }

    async fetchPostsWithWebSockets() {
        const POSTS_URL = "ws://" + window.location.host + "/";
        console.log(POSTS_URL);

        this.socket = new WebSocket(POSTS_URL);

        this.socket.onmessage = (event => {

            const foundPosts = JSON.parse(event.data);
            console.log("FOUND: " + foundPosts);

            this.setState({
                posts: foundPosts

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

    notifyWebSocket() {

        const payload = JSON.stringify({
            message: "hello, world!"
        });
        this.socket.send(payload);

    }

    render() {

        return (
            <div>
                {
                    (this.props.userId === null) &&

                    <div>
                        <h2>Welcome to social.app</h2>
                        <p>Get started by signing in 😊</p>
                        <Link to={"/login"}>
                            <div className="button button-primary">Login</div>
                        </Link>
                        <br/>
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
                        <CreatePost author={this.props.userId} notifyWebSocket={this.notifyWebSocket}/>
                        {
                            this.state.posts !== null && <Timeline posts={this.state.posts}/>
                        }
                    </div>
                }

            </div>
        );
    }


}

export default App;