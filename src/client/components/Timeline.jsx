import React from "react";
import Post from "./Post";

class Timeline extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            posts: [1, 2, 3, 4, 5]
        }

    }


    render() {
        return (
            <div>
                {
                    this.state.posts.map((option) => (
                        <Post author={"AUTHOR_EXAMPLE"} date={"00/00/0000"} content={"THIS_IS_CONTENT"} />
                    ))
                }

            </div>
        )

    }
}

export default Timeline;