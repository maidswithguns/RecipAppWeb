const initState = {
    projects: [],
    authProject: null
}

export const projectReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_PROJECT':
            return {...state,
            authProject: 'Success'};
        case 'CREATE_PROJECT_ERROR':
            console.log(action)
            return {...state,
            authProject: 'There was a error creating a recipe: ' + action.err.response.data};
        default:
            return {...state,
            authProject: null};
    }
}