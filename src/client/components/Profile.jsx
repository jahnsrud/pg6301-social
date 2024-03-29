import React from "react";
import Timeline from "./Timeline";
import CreatePost from "./CreatePost";
import ProfileDetails from "./ProfileDetails";
import Friends from "./Friends";
import {Link, Redirect} from "react-router-dom";

class Profile extends React.Component {

    constructor(props) {
        super(props);

        let id = new URLSearchParams(window.location.search).get("id");
        if (id === null) {
            id = this.props.userId;
            console.log("Id from props: " + id);

            if (id == null) {
                <Redirect to="/" push/>
            }

        } else {
            // console.log("Null: " + id);
        }

        console.log("Profile: Looking for user: " + id);

        this.state = {
            id: id,
            name: "",
            birthday: "",
            location: "",
            friends: ["Person 1", "Person 2", "Person 3"],
            posts: [],
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

        return <div>

            {
                (this.state.error === null) && <p>Profile not found</p>
            }

            <img alt="Profile Image" className="profile-image" src="profile-image-file"/>
            <h1>{this.state.name}</h1>
            <p>@{this.state.id}</p>

            {
                (this.props.userId !== null) && <div>

                    <ProfileDetails birthday={this.state.birthday} location={this.state.location}/>

                    <button className="button button-primary">+ Friend</button>
                    <button className="button">- Friend</button>
                    <br/>
                    <br/>
                    <br/>

                    <div className="friends-section">

                        <h3>Friends ({this.state.friends.length})</h3>
                        <Friends friends={this.state.friends}/>

                    </div>

                    <h2>Posts ({this.state.posts.length})</h2>

                    <div>
                        {
                            (this.state.id === this.props.userId) && <CreatePost/>
                        }

                    </div>

                    {
                        this.state.posts.length > 0 && <Timeline posts={this.state.posts}/>
                    }
                    {
                        this.state.posts.length === 0 && <p>No posts added</p>
                    }


                </div>
            }

            {
                (this.props.userId == null) &&
                <Link to="/login"><p className="info-message">Login to see more</p></Link>
            }


        </div>

    }
}

export default Profile;