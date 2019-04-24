import React from "react";
import Timeline from "./Timeline";

class Profile extends React.Component {

    render() {
        return (
            <div>
                <h1>Profile</h1>
                <p>IMG</p>
                <p>FULL NAME</p>
                <p>Date of Birth</p>
                <p>Location</p>
                <div>
                    <p>Friendship</p>
                    <p>Add/Remove Friend</p>
                    <p>(Hidden on your own profile)</p>

                </div>

                <Timeline/>
            </div>
        )

    }
}

export default Profile;