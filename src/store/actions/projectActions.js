import axios from 'axios';

export const createProject = (project) => {
    return (dispatch, getState) => {
      const profile = getState().auth;
        //make an async call to firebase
        axios.post('http://localhost:3001/blog', {...project, ...profile}).then(() => {
                dispatch({ type: 'CREATE_PROJECT', project });
            }).catch((err) => {
                dispatch({ type: 'CREATE_PROJECT_ERROR', err });
            })
    }
};

export const getProjects = () => {
  return (dispatch) => {
    return axios.get('http://localhost:3001/blogs')
      .then(response => {
        dispatch({
          type: 'GET_PROJECTS_SUCCESS',
          payload: response.data,
        });
        return response.data;
      })
      .catch(error => {
        dispatch({
          type: 'GET_PROJECTS_ERROR',
          payload: error,
        });
      });
  };
};

export const getProject = (id, token) => {
  return (dispatch) => {
    return axios.get('http://localhost:3001/blog/', {
      params: {
        id: id,
        token: token
      }
    })
      .then(response => {
        dispatch({
          type: 'GET_PROJECTS_SUCCESS',
          payload: response.data,
        });
        return response.data;
      })
      .catch(error => {
        dispatch({
          type: 'GET_PROJECTS_ERROR',
          payload: error,
        });
      });
  };
};

export const setProjectAuthNull = () => {
  return (dispatch) => {
    dispatch({type: ''})
  }
}