
import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Profile() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogout = () => {
        //logic here
        setIsLoggedIn(false);
    }

    if (!isLoggedIn) {

        return (
            <div>
                <h1>My Profile</h1>
                <p><Link to='/Login'>You must login first!</Link></p>
                <p><Link to='NewAccount'>Dont have an account? Create one here!</Link></p>
            </div>
        )
    }

    return (
        <div>
            <h1>Your Profile!</h1>
            <p>Profile Information</p>
            {/* Profile Info */}
            {/* Your Posts */}
            {/* Your messages */}
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}