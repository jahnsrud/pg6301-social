import React from "react";
import Post from "./Post";
import moment from "moment/moment";

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
                              dateCreated={moment(post.dateCreated).format('MM/DD/YYYY h:mm')}
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