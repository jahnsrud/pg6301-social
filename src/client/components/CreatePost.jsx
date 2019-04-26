import React from "react";

class CreatePost extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            content: "",
            link: ""
        };

        this.submitPost = this.submitPost.bind(this);
        this.didTypeMessage = this.didTypeMessage.bind(this);
        this.didTypeLink = this.didTypeLink.bind(this);

    }

    didTypeMessage = (event) => {
        this.setState({content: event.target.value});
    };

    didTypeLink = (event) => {
        this.setState({link: event.target.value});
    };

    submitPost = async (content, author, link) => {
        const url = "/api/posts";

        author = this.props.author;
        content = this.state.content;
        link = this.state.link;

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

        this.setState({
            content: "",
            author: "",
            link: ""
        });

        this.props.notifyWebSocket();

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

                    <input
                        type="text"
                        placeholder="🔗 Add Link..."
                        className="input-link"
                        value={this.state.link}
                        onChange={this.didTypeLink}/>

                    <div onClick={this.submitPost} className="button button-primary">Share</div>
                </div>
            </div>
        )

    }
}

export default CreatePost;