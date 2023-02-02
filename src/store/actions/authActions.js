import axios from "axios"

export const logIn = (credentials) => {
    return (dispatch) => {
        axios.post("https://blogapp-api-jbqb.onrender.com/login", credentials).then(response => {
            const result = response.data;
            dispatch({type: 'LOGIN_SUCCESS', result});
        }).catch((err) => {
            dispatch({type: 'LOGIN_ERROR', err});
        })
    }
}

export const signUp = (credentials) => {
    return (dispatch) => {
        axios.post("https://blogapp-api-jbqb.onrender.com/signup", credentials).then(response => {
            const result = response.data;
            if(typeof result === "string")
                dispatch({type: result})
            else
                dispatch({type: 'SIGNUP_SUCCESS', result});
        }).catch((err) => {
            dispatch({type: 'SIGNUP_ERROR', err});
        })
    }
}

export const signOut = () => {
    console.log("A");
    return (dispatch) => {
        dispatch({type: 'SIGNOUT_SUCCESS'})
    }
}

export const logInToken = (credentials) => {
    return (dispatch) => {
        axios.post("https://blogapp-api-jbqb.onrender.com/loginToken", credentials).then(response => {
            const result = response.data;
            dispatch({type: 'LOGIN_SUCCESS', result});
        }).catch((err) => {
            dispatch({type: 'LOGIN_ERROR', err});
        })
    }
}