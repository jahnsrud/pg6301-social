import React from "react";

class Post extends React.Component {

    constructor(props) {
        super(props);

    }


    render() {
        return (
            <div className="post">
                <p className="post-author">Author: {this.props.author}</p>
                <p className="post-date">Date: {this.props.date}</p>
                <p className="post-content">{this.props.content}</p>
                <p className="post-image">_image_</p>
            </div>
        )

    }
}

export default Post;