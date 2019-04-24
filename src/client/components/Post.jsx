import React from "react";

class Post extends React.Component {

    constructor(props) {
        super(props);

    }


    render() {
        return (
            <div className="post">
                <p className="post-author">Author: _</p>
                <p className="post-date">Date: _</p>
                <p className="post-content">Content: _</p>
                <p className="post-image">_image_</p>
            </div>
        )

    }
}

export default Post;