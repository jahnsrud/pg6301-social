import React from "react";
import Post from "./Post";

class Timeline extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        if (this.props.posts !== null) {
            console.log(this.props.posts[0]);

            /* this.props.posts.forEach(test => {
                console.log(test);
            })*/

        }


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