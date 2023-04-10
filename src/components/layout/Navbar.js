import React, {useEffect, useState} from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import SignedInLinks from "./SignedinLinks";
import SignedOutLinks from "./SignedoutLinks";
import M from 'materialize-css';

function Navbar(props) {

    const [width, setWidth] = useState(window.innerWidth);

    function handleWindowSizeChange() {
        setWidth(window.innerWidth);

        const elems = document.querySelectorAll('.fixed-action-btn');
        M.FloatingActionButton.init(elems, {
            direction: 'up',
            hoverEnabled: false
          });
    }
    useEffect(() => {
          window.addEventListener('resize', handleWindowSizeChange);
          return () => {
              window.removeEventListener('resize', handleWindowSizeChange);
          }
      }, []);

    const auth = props.auth;
    const links = auth.username ? <SignedInLinks /> : <SignedOutLinks />;

    function logoutButtons() {
        return (
            <div>
                <li>
                    <a className="btn-floating blue">
                        <i className="material-icons">person_add</i>
                    </a>
                </li>
                <li>
                    <a className="btn-floating green">
                        <i className="material-icons">logout</i>
                    </a>
                </li>
            </div>
        )
    }

    function loginButtons() {
        return (
            <div>
                <li>
                    <a className="btn-floating green">
                        <i className="material-icons">login</i>
                    </a>
                </li>
                <li>
                    <a className="btn-floating red">
                        <i className="material-icons">add</i>
                    </a>
                </li>
            </div>
        )
    }

    function floatingButton() {
        return (
        <div className="fixed-action-btn">
            <a className="btn-floating btn-large red">
                <i className="large material-icons">menu</i>
            </a>
            <ul>
                {auth.username ? loginButtons() : logoutButtons()}
            </ul>
        </div>
        )
    }
    
    return (
        <nav className="nav-wrapper teal lighten-2">
            <div className="container">
                <Link to='/' className="yellow-text text-lighten-4" style={{fontFamily: 'Kalam', fontSize: '36px'}}>Open Recipes</Link>
                { width > 600 ? links : floatingButton() }
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