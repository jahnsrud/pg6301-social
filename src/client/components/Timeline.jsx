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
                <h2>Timeline</h2>
                {
                    this.state.posts.map((option) => (
                        <Post />
                    ))
                }

            </div>
        )

    }
}

export default Timeline;