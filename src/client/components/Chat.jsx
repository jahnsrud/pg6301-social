import React from "react";
import Message from "./Message"
import { Redirect } from "react-router-dom";

class Chat extends React.Component {
    constructor(props) {
        super(props);

        if (this.props.userId !== null) {
            <Redirect to="/" push />
        }

        this.state = {
            message: "",
            messages: null,
        };

        this.sendMessage = this.sendMessage.bind(this);
        this.onTextChange = this.onTextChange.bind(this);

    }

    componentDidMount() {
        this.configureWebSockets();
    }

    configureWebSockets() {
        const CHAT_URL = "ws://" + window.location.host + "/chat_api";
        console.log(CHAT_URL);

        this.socket = new WebSocket(CHAT_URL);

        this.socket.onmessage = (event => {
            const msgList = JSON.parse(event.data);

            this.setState(
                prev=> {
                    if (prev.messages === null) {
                        return {messages: msgList}
                    } else {
                        return {messages: [...prev.messages, ...msgList]};
                    }
                }
            )
        });
    }

    onTextChange = (event) => {
        this.setState({
            message: event.target.value
        });
    }

    sendMessageFromReturn = (event) => {
        event.preventDefault();

        this.sendMessage();

    }

    sendMessage() {
        const payload = JSON.stringify({
            author: this.props.userId,
            message: this.state.message
        });

        this.socket.send(payload);

        this.setState({
            message: ""
        });
    }

    render() {

        if (this.props.userId === null) {
            return <Redirect to="/"/>
        }

        let messages = <div></div>;

        if(this.state.messages !== null) {
            messages = <div>
                {this.state.messages.map(m =>
                    <Message key={"msg_key_" + m.id} author={m.author} message={m.message}/>
                )}
            </div>;
        }

        return (
            <div>
                <h1>Chat</h1>
                <p>My username: {this.props.userId}</p>
                <div>
                    <form onSubmit={this.sendMessageFromReturn}>
                    <input
                        type="text"
                        placeholder="Message"
                        className="input-chat-message"
                        onChange={this.onTextChange}
                        value={this.state.message}/>

                        <br/>
                    <div className="button button-primary"
                         onClick={this.sendMessage}
                    disabled={this.state.message.length == 0}>Send</div>
                    </form>

                </div>
                <div>
                    <h2>Messages</h2>
                    {messages}

                </div>
            </div>

        );
    }
}

export default Chat;