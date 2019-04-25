import React from "react";
import { Link } from "react-router-dom";

const Friends = (props) => {

    return (
        <div>
            {
                props.friends.map((friend, i) => {
                    return (
                        <Link to={"/profile?id=" + friend}>
                        <p key={i}>
                            👤 {friend}
                        </p>
                        </Link>
                            )


                })

                }
        </div>
    )
};

export default Friends;