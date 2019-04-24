import React from "react";
import Timeline from "./Timeline";
import CreatePost from "./CreatePost";

class Profile extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: "NAME_TEST",
            birthday: "BIRTHDAY_TEST",
            location: "LOCATION_TEST",
            friends: ["Someone", "Something", "Test"]
        };
        
        this.fetchUser = this.fetchUser.bind(this);

    }

    componentDidMount() {
        this.fetchUser("Markus");

    }

    async fetchUser(id) {

        console.log("Fetching user with id: " + id);

        const url = "/api/users/" + id;

        const response = await fetch(url);
        const body = await response.json();

        if (response.status !== 200) {
            throw Error(body.message);
        }

        console.log(body);

    }

    render() {
        return (
            <div>
                <h1>Profile</h1>
                <img src="http://sg-fs.com/wp-content/uploads/2017/08/user-placeholder.png"/>
                <p>{this.state.name}</p>
                <p>{this.state.birthday}</p>
                <p>{this.state.location}</p>
                <div>
                    <h3>Friends</h3>
                    <p>Add/Remove Friend</p>
                    <ul>
                        <li>{this.state.friends}</li>
                        <li>...</li>
                    </ul>
                    <p>(Hidden on your own profile)</p>

                </div>

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