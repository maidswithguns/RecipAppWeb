import React from "react"
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { logIn } from "../../store/actions/authActions";
import { Navigate } from 'react-router-dom'

function SignIn(props) {
    const { register, handleSubmit } = useForm()

    const onSubmit = data => {
        props.logIn(data);
    }

    const {authError} = props;

    if (props.auth.username) 
        return <Navigate to='/' /> 

    return (
        <div className="container">
            <form onSubmit={handleSubmit(onSubmit)} className="white">
                <h5 className="grey-text text-darken-3">Log In</h5>
                <div className="input-field col s12">
                    <label htmlFor="username brown-text">Username Or Email</label>
                    <input
                        type="text"
                        id="username"
                        {...register('username')} />
                </div>
                <div className="input-field col s12">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        {...register('password')} />
                </div>
                <div className="input-field">
                    <button className="btn pink lighten-1 z-depth-0">Login</button>
                    <div className="red-text center">
                        { authError ? <p>{authError}</p> : null }
                    </div>
                </div>
            </form>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        authError: state.auth.authError,
        auth: state.auth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logIn: (creds) => dispatch(logIn(creds))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)