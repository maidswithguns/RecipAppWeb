const initState = {
    userId: null,
    username: null,
    email: null,
    authError: null,
    token: null
}

export const authReducer = (state = initState, action) => {
    switch(action.type) {
        case 'LOGIN_ERROR':
            return {
                ...state,
                authError: 'Login failed'
            }
        case 'LOGIN_SUCCESS':
            console.log('login success')
            localStorage.setItem('username', action.result.username);
            localStorage.setItem('token', action.result.token);
            return {
                ...state,
                authError: null,
                userId: action.result.userId,
                username: action.result.username,
                email: action.result.email,
                token: action.result.token
            }
        case 'SIGNOUT_SUCCESS':
            console.log('signout success')
            localStorage.clear('username');
            localStorage.clear('token');
            return {
                ...state,
                authError: null,
                userId: null,
                username: null,
                email: null,
                token: null
            }
        case 'SIGNUP_SUCCESS':
            console.log('signUp success')
            localStorage.setItem('username', action.result.username);
            localStorage.setItem('token', action.result.token);
            return {
                ...state,
                authError: null,
                userId: action.result.userId,
                username: action.result.username,
                email: action.result.email,
                token: action.result.token
            }
        case 'USERNAME_REPEATED':
            return {
                ...state,
                authError: "That username is already taken."
            }
        case 'EMAIL_REPEATED':
            return {
                ...state,
                authError: "There is already a user that e-mail"
            }
        default:
            return state;
    }
}