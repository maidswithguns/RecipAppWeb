import React, { useState } from "react"
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { signUp } from "../../store/actions/authActions";
import { Navigate } from 'react-router-dom'

function SignUp(props) {
    const { register, handleSubmit } = useForm();
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = data => {
        setIsLoading(true);
        props.signUp(data);
    }

    const {authError} = props;
    if(authError)
        setIsLoading(false);

    if (props.auth.username) 
        return <Navigate to='/' /> 

    return (
        <div className="container">
            <form onSubmit={handleSubmit(onSubmit)} className="white">
                <h5 className="grey-text text-darken-3">Sign Up</h5>
                <div className="input-field col s12">
                    <input
                        type="text"
                        id="username"
                        {...register('username')}
                        required />
                    <label htmlFor="username">Username</label>
                </div>
                <div className="input-field col s12">
                    <input
                        type="email"
                        id="email"
                        {...register('email')}
                        required/>
                    <label htmlFor="username">Email</label>
                </div>
                <div className="input-field col s12">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        {...register('password')}
                        required />
                </div>
                <div className="input-field">
                    <button className="btn pink lighten-1 z-depth-0">Sign Up</button>
                    <div className="red-text center">
                        { authError ? <p>{authError}</p> : null }
                    </div>
                </div>
                {isLoading ? <div className="preloader-wrapper big active">
                    <div className="spinner-layer spinner-blue-only">
                    <div className="circle-clipper left">
                        <div className="circle"></div>
                    </div><div className="gap-patch">
                        <div className="circle"></div>
                    </div><div className="circle-clipper right">
                        <div className="circle"></div>
                    </div>
                    </div>
                </div> : null}
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
        signUp: (creds) => dispatch(signUp(creds))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)