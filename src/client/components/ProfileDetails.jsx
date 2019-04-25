import React from "react";

const ProfileDetails = (props) => {

    return (
        <div>
            <p>{props.birthday}</p>
            <p>{props.location}</p>
        </div>
    )
};

export default ProfileDetails