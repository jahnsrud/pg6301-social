import React from "react";

class CreatePost extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
           <div>
               <div className="create-status-container">
                   <input
                   type="text"
                   placeholder="What's on your mind?"
                   className="input-status-message"/>
                   <div className="button button-primary">Share</div>
               </div>
           </div>
        )

    }
}

export default CreatePost;