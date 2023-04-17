import React, {useEffect, useState} from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import SignedInLinks from "./SignedinLinks";
import SignedOutLinks from "./SignedoutLinks";
import FloatingButton from "./FloatingButton";

function Navbar(props) {

    const [width, setWidth] = useState(window.innerWidth);

    function handleWindowSizeChange() {
        setWidth(window.innerWidth);
    }
    useEffect(() => {
          window.addEventListener('resize', handleWindowSizeChange);
          return () => {
              window.removeEventListener('resize', handleWindowSizeChange);
          }
      }, []);

    const auth = props.auth;
    const links = auth.username ? <SignedInLinks /> : <SignedOutLinks />;
    
    return (
        <nav className="nav-wrapper teal lighten-2">
            <div className="container">
                <Link to='/' className="yellow-text text-lighten-4" style={{fontFamily: 'Kalam', fontSize: '36px'}}>Open Recipes</Link>
                { width > 600 ? links : <FloatingButton /> }
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