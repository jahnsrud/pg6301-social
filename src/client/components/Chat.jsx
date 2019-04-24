import React from "react";
import Message from "./Message"

class Chat extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "Anonymous",
            message: "",
            messages: null,
        }

        this.sendMessage = this.sendMessage.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onTextChange = this.onTextChange.bind(this);

    }

    componentDidMount() {
        const CHAT_URL = "ws://" + window.location.host + "/chat_api"
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

    onNameChange = (event) => {
        this.setState({
            name: event.target.value
        });
    }

    onTextChange = (event) => {
        this.setState({
            message: event.target.value
        });
    }

    sendMessage() {
        const payload = JSON.stringify({
            author: this.state.name,
            message: this.state.message
        });

        this.socket.send(payload);

        this.setState({
            message: ""
        });
    }

    render() {

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
                <p>Name</p>
                <div>
                    <input
                    type="text"
                    placeholder="Name"
                    value={this.state.name}
                    onChange={this.onNameChange}/>

                    <input
                        type="text"
                        placeholder="Message"
                        onChange={this.onTextChange}
                        value={this.state.message}/>

                    <div className="button"
                         onClick={this.sendMessage}
                    disabled={this.state.message.length == 0}>Send</div>

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