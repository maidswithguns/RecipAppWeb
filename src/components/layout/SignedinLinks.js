import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { signOut } from "../../store/actions/authActions";

function SignedInLinks(props) {
    return (
        <ul className="right">
            <li><NavLink to="/create" className="yellow-text text-lighten-4" style={{fontWeight: '600'}}>New Recipe</NavLink></li>
            <li><a onClick={props.signOut} className="yellow-text text-lighten-4" style={{fontWeight: '600'}}>Log Out</a></li>
            <li><NavLink to="/" className='btn btn-floating pink lighen-1'>{props.auth.username.charAt(0)}</NavLink></li>
        </ul>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignedInLinks)