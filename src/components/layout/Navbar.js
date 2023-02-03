import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import SignedInLinks from "./SignedinLinks";
import SignedOutLinks from "./SignedoutLinks";

function Navbar(props) {
    const auth = props.auth;
    const links = auth.username ? <SignedInLinks /> : <SignedOutLinks />;
    return (
        <nav className="nav-wrapper teal lighten-2">
            <div className="container">
                <Link to='/' className="yellow-text text-lighten-4" style={{fontFamily: 'Kalam', fontSize: '36px'}}>Open Recipes</Link>
                { links }
            </div>
        </nav>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(Navbar)