import React from 'react';
//import logo from './logo.svg';
import{BrowserRouter as Router, Route} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import Nvbar from "./components/navbar.component";
import ExList from "./components/exercise-list.component";
import EditEx from "./components/edit-exercise.component";
import CreateEx from "./components/create-exercise.component";
import Createuser from "./components/create-user.component";
import Deleteuser from "./components/delete-user.component";
//import Homepage from "./components/homepage.component.js";


//import './App.css';

function App() {
  return (
    //if someone go to root url then / it will load EXList component
    <Router>
<div className= "container">
    <Nvbar /> 
    <br/>
    <Route path='/' exact component ={ExList}/>
    <Route path="/exercises" exact component = {ExList} /> 
    <Route path="/edit/:id" component = {EditEx} />
    <Route path="/create"exact component = {CreateEx} />
    <Route path="/user/create"exact component = {Createuser} />
    <Route path="/user/delete"exact component = {Deleteuser} />

</div>
    </Router>
  );
} 

export default App;
