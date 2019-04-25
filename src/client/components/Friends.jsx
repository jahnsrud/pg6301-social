import React from "react";

const Friends = (props) => {

    return (
        <div>
            <ul>
                {
                    props.friends.map((friend, i) => {
                        return (<li key={i}>{friend}</li>)

                    })

                }
            </ul>
        </div>
    )
};

export default Friends;