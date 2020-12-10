import React, { Component } from 'react';
import './App.css';
import { Switch } from 'react-router-dom';

import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Private from './pages/Private';

import AnonRoute from './components/AnonRoute';
import PrivateRoute from './components/PrivateRoute';

import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import MusicianList from './pages/MusicianList.js'
import ProjectList from './pages/ProjectList'
import ProjectDetail from './pages/ProjectDetail'
import EditProfile from './pages/EditProfile'
import EditProject from './pages/EditProject'
import AddProject from './pages/AddProject'





class App extends Component {
  render() {
    return (
      <div className="container">
        <Navbar />

        <Switch>

          <AnonRoute exact path="/wusic" component={Landing} />
          {/* Landing page中有signup和login */}

          <PrivateRoute exact path="/wusic/dashboard" component={Dashboard} />
          {/* Dashboard中有ProjectCard */}
          <PrivateRoute exact path="/wusic/musicians/:userId" component={Profile} />
          <PrivateRoute exact path="/wusic/musicians" component={MusicianList} />
          <PrivateRoute exact path="/wusic/projects" component={ProjectList} />
          <PrivateRoute exact path="/wusic/projects/:projectId" component={ProjectDetail} />
          <PrivateRoute exact path="/wusic/edit-profile" component={EditProfile} />
          <PrivateRoute exact path="/wusic/edit-project/:projectId" component={EditProject} />
          <PrivateRoute exact path="/wusic/add-project" component={AddProject} />


          <AnonRoute exact path="/signup" component={Signup} />
          <AnonRoute exact path="/login" component={Login} />

          <PrivateRoute exact path="/private" component={Private} />
        </Switch>
      </div>
    );
  }
}

export default App;
