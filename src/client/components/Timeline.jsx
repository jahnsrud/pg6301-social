import React from "react";
import Post from "./Post";

class Timeline extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                {
                 (this.props.posts !== null) && this.props.posts.map((post, i) => {
                        return (
                            <Post author={post.author}
                              date={post.date}
                              content={post.content}
                              link={post.link}
                              key={post.id} />
                        )
                    })
                }


            </div>
        )

    }
}

export default Timeline;