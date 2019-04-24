import React from "react";

class Post extends React.Component {

    constructor(props) {
        super(props);

    }


    render() {
        return (
            <div className="post">
                <h3>[POST]</h3>
                <p className="post-author">Author: _</p>
                <p>Date: _</p>
                <p>Time: _</p>
                <p className="post-content">Content: _</p>
                <p>_image_</p>
            </div>
        )

    }
}

export default Post;