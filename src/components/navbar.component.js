import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class Nvbar extends Component{
  
  render(){
    return (
      <nav className= "navbar navbar-dark bg-dark navbar-expand-lg">
        
        <Link  className="navbar-brand">Workout Tracker</Link>
        <div className = "collapse navbar-collapse">
          <ul className ="navbar-nav mr-auto">
            <li className="navbar-item">
              <Link to="/exercises" className="nav-link">Exercises</Link>
            </li>
            <li className="navbar-item">
              <Link to = "/create" className= "nav-link">Create Exercise Log</Link>
            </li>
            <li className="navbar-item">
              <Link to='/user/create/' className = "nav-link">Create User</Link>
            </li>
              <li className="navbar-item">
              <Link to='/user/delete/' className = "nav-link">Delete User</Link>
            </li>
          </ul>
        </div>
      </nav>// navbar from bootstarp documenation
      )
  }
}
