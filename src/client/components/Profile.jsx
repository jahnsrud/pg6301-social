import React from "react";
import Timeline from "./Timeline";
import CreatePost from "./CreatePost";

class Profile extends React.Component {

    constructor(props) {
        super(props);

    }


    render() {
        return (
            <div>
                <h1>Profile</h1>
                <img src="http://sg-fs.com/wp-content/uploads/2017/08/user-placeholder.png"/>
                <p>FULL NAME</p>
                <p>Date of Birth</p>
                <p>Location</p>
                <div>
                    <p>Friendship</p>
                    <p>Add/Remove Friend</p>
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