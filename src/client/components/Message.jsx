import React from "react";
import {Link} from "react-router-dom";

class Message extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className="message">
                <Link to={"/profile"}>
                    <p className="message-author">{this.props.author}</p>
                </Link>
                <p className="message-content">{this.props.message}</p>

            </div>
        );
    }
}

export default Message;