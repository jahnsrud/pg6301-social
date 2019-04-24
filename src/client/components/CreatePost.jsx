import React from "react";

class CreatePost extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
          content: "",
          author: "",
          link: ""
        };

        this.submitPost = this.submitPost.bind(this);
        this.didTypeMessage = this.didTypeMessage.bind(this);

    }

    didTypeMessage = (event) => {
        this.setState({ content: event.target.value });
    };

    submitPost = async (content, author, link) => {
        const url = "/posts";

        // TODO: Fix
        content = this.state.content;
        author = "COMING_SOON";
        link = "";

        const payload = {content, author, link};

        let response;

        try {
            response = await fetch(url, {
                method: "post",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
        } catch (err) {
            return false;
        }
        return response.status === 201;
    };

    render() {
        return (
           <div>
               <div className="create-status-container">
                   <input
                   type="text"
                   placeholder="What's on your mind?"
                   className="input-status-message"
                   value={this.state.content}
                   onChange={this.didTypeMessage}/>
                   <div onClick={this.submitPost} className="button button-primary">Share</div>
               </div>
           </div>
        )

    }
}

export default CreatePost;