import React, {useEffect} from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { signOut } from "../../store/actions/authActions";
import M from 'materialize-css';

function FloatingButton(props) {
    useEffect(() => {
        const elems = document.querySelectorAll('.fixed-action-btn');
        M.FloatingActionButton.init(elems, {
            direction: 'up',
            hoverEnabled: false
          });
      }, [props.auth]);

    function logoutButtons() {
        return (
            <div>
                <li>
                    <NavLink className="btn-floating aqua" to="/signup">
                        <i className="material-icons">person_add</i>
                    </NavLink>
                </li>
                <li>
                    <NavLink className="btn-floating aqua" to="/signin">
                        <i className="material-icons">login</i>
                    </NavLink>
                </li>
            </div>
        )
    }

    function loginButtons(props) {
        return (
            <div>
                <li>
                    <a className="btn-floating aqua" onClick={props.signOut}>
                        <i className="material-icons">logout</i>
                    </a>
                </li>
                <li>
                    <NavLink className="btn-floating aqua" to="/create">
                        <i className="material-icons">add</i>
                    </NavLink>
                </li>
            </div>
        )
    }

    return (
        <div className="fixed-action-btn">
            <a className="btn-floating btn-large white">
                <i className="large material-icons" style={{color: '#4db6ac'}}>menu</i>
            </a>
            <ul>
                {props.auth.username ? loginButtons(props) : logoutButtons()}
            </ul>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(FloatingButton)