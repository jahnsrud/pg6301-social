import React from "react";
import Timeline from "./Timeline";
import CreatePost from "./CreatePost";
import { Redirect } from "react-router-dom";

class Profile extends React.Component {

    constructor(props) {
        super(props);

        let id = new URLSearchParams(window.location.search).get("id");
        if (id === null) {
            id = this.props.userId;
            console.log("Id from props: " + id);

            if (id == null) {
                <Redirect to="/" push />
            }

        } else {
            // console.log("Null: " + id);
        }

        console.log("Profile: Looking for user: " + id)

        this.state = {
            id: id,
            name: "",
            birthday: "",
            location: "",
            friends: ["Someone", "Something", "Test"],
            error: ""
        };

        this.fetchUser = this.fetchUser.bind(this);

    }

    componentDidMount() {

        if (this.state.id === this.props.id) {
            console.log("My User");
        }

        this.fetchUser(this.state.id);

    }

s
    componentDidUpdate(prevProps, prevState) {
    // Typical usage (don't forget to compare props):
        if (this.state.id !== prevState.id) {
            this.fetchUser(this.state.id);
        }
    }


    async fetchUser(id) {

        console.log("Fetching user with id: " + id);

        const url = "/api/users/" + id;

        const response = await fetch(url);
        const body = await response.json();

        if (response.status !== 200) {
            this.setState({
                error: "Something went wrong"
            });
            throw Error(body.message);
        }

        this.setState({
            name: body.fullName,
            birthday: body.birthday,
            location: body.location,
            error: ""
        });

        console.log(body);

    }

    render() {

        return (

            <div>

                {
                    (this.state.error === null) &&  <p>Profile not found</p>
                }


                <img src="http://sg-fs.com/wp-content/uploads/2017/08/user-placeholder.png"/>
                <h1>{this.state.name}</h1>
                <p>{this.state.birthday}</p>
                <p>{this.state.location}</p>
                <div className="friends-section">
                    <h3>Friends</h3>
                    <p>Add/Remove Friend</p>
                    <ul>
                        <li>{this.state.friends}</li>
                        <li>:MORE:</li>
                    </ul>
                    <p>(Hidden on your own profile)</p>

                </div>

                <h2>TIMELINE_HERE</h2>

                <div>
                    <p>If signed in:</p>
                    <CreatePost/>
                </div>

                <Timeline posts={[]}/>

            </div>
        )

    }
}

export default Profile;