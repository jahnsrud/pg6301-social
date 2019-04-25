import React from "react";
import {Link} from "react-router-dom";

class Post extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div className="post">
                <Link to={"/profile?id=" + this.props.author}>
                    <p className="post-author">👤 {this.props.author}</p>
                </Link>

                <p className="post-date">{this.props.dateCreated}</p>
                <p className="post-content">{this.props.content}</p>

                {
                    (this.props.link !== null && this.props.link.length) > 0 && (
                        <a href={this.props.link} target="_blank">
                            <p className="post-attachment">🔗 {this.props.link}</p>
                        </a>
                    )
                }


            </div>
        )

    }
}

export default Post;