import React from "react";
import {Link} from "react-router-dom";

class Post extends React.Component {

    constructor(props) {
        super(props);

    }


    render() {
        return (
            <div className="post">
                <Link to={"/profile"}>
                    <p className="post-author">Author: {this.props.author}</p>
                </Link>

                <p className="post-date">Date: {this.props.date}</p>
                <p className="post-content">{this.props.content}</p>

                {
                    this.props.link.length > 0 && <p className="post-image">{this.props.link}</p>
                }


            </div>
        )

    }
}

export default Post;