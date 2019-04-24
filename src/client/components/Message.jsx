import React from "react";

class Message extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className="message">
                <p className="message-author">{this.props.author}</p>
                <p className="message-content">{this.props.message}</p>

            </div>
        );
    }
}

export default Message;