import React from "react";
import { NavLink } from "react-router-dom";

function SignedOutLinks() {
    return (
        <ul className="right">
            <li><NavLink to="/signin" className="yellow-text text-lighten-4">Log In</NavLink></li>
            <li><NavLink to="/signup" className="yellow-text text-lighten-4">Sign Up</NavLink></li>
        </ul>
    )
}

export default SignedOutLinks;