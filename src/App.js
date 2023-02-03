import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import Dashboard from './components/dashboard/Dashboard';
import Navbar from './components/layout/Navbar';
import CreateProject from './components/projects/CreateProject';
import ProjectDetails from './components/projects/ProjectDetails';
import { logInToken } from './store/actions/authActions';

function App(props) {
  useEffect(() => {
    const user = {
      username: localStorage.getItem('username'),
      token: localStorage.getItem('token')
    }
    if(user.username)
      props.logInToken(user)
  }, [])

    return (
      <HashRouter>
      <div className='App'>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Dashboard />} />
          <Route path='/blog/:id' element={<ProjectDetails />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/create' element={<CreateProject />} />
          <Route path='*' element={<Dashboard />} />
        </Routes>
      </div>
      </HashRouter>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logInToken: (creds) => dispatch(logInToken(creds))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)