import React,{Component} from 'react';
import axios from 'axios';
//var ObjectId = require('mongodb').ObjectID;

export default class Deleteuser extends Component{
  constructor(props){
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);

    
    this.onSubmit = this.onSubmit.bind(this);


    this.state = {
      exercises:[],
      usercomp:[],
      username:'',
     // id : '',
      users : [],
     // keyid:ObjectId('')
    }
  }

  
componentDidMount(){
  /*
  this.setState({
  users :['test user'],
  username: 'test user'
  })
  */
 axios.get('http://localhost:5000/users/')
 .then(response => {
   if (response.data.length >0){
    this.setState({
      users : response.data.map(usr => usr.username), 
      //data will be an array and we are gonna map the array which will allow us to return something
      //for every element in an array
      usercomp: response.data,
      username : response.data[0].username
    //  id: response.data[0]._id
      });
   }
  // console.log(this.state.usname);
 })
 axios.get('http://localhost:5000/exercises/')
 .then(response => {
   this.setState({ 
     exercises : response.data,
   });
 })
}


  onChangeUsername(e){
   
        this.setState({username: e.target.value,
          //  usercomp : this.state.usercomp.filter(el => el.username === this.state.username)
        });
  
     // console.log(this.state.usname);

      
      //id : e.target.value._id
    //console.log(this.state.username);
    //console.log(this.state.id);

  }


  onSubmit(e){
    e.preventDefault();
  
    //const keyid=this.state.username._id;
    //console.log(_.filter(data, { state: 'New York' }));
  
      this.state.usercomp = this.state.usercomp.filter(el => el.username === this.state.username);
      this.state.exercises = this.state.exercises.filter(el => el.username === this.state.username);
    //this.setState({usercomp : })

    //return data.filter(data => data.state == "New York" && count === 2);
   //this.setState({usercomp : _.matches(this.state.usercomp,{username:this.state.username}) })
 /*this.setState({exercises : this.state.exercises.filter(el => el._id !== id)})*/
     console.log(this.state.usercomp[0]._id);
    //const keyid = this.state.users.filter(el => el.username === this.state.username);
    
    axios.delete('http://localhost:5000/users/'+this.state.usercomp[0]._id)
    .then(res => {
      var num =0;
      console.log(res.data);
      axios.get('http://localhost:5000/users/')
      .then(response => {
        num = response.data.length;
      if (num >0){
        this.setState({
      users : response.data.map(usr => usr.username), 
      //data will be an array and we are gonna map the array which will allow us to return something
      //for every element in an array
      usercomp: response.data,
      username : response.data[0].username
    //  id: response.data[0]._id
      });
      /*
      if(num===0){
        window.location = '/user/delete/';
      }
      */
   }
  // console.log(this.state.usname);
 })
    })

    // deletion for exercise list
 this.state.exercises.map(function(ex)
 {
   return(
  axios.delete('http://localhost:5000/exercises/'+ex._id)
  .then(response => {
    
  this.setState({ 
    exercises : response.data,
    });
    
 })
   )
 })
  
/*
this.state.users.map(function(usr)
                {
                  return <option
                  key={usr} value={usr}>
                    {usr}
                  </option>;
                }
                )
*/






    /*
    this.setState({
      users : this.state.users.filter(el => el !== this.state.username),

      //username:users[0]
      //username: this.state.users[0]
    })*/
   // window.location = '/';
   window.location = '/user/delete/';
  }

  render(){
    return( 
      <div>
        <h3>Delete User</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <select ref="userInput" required className="form-control" 
            value={this.state.username}
             onChange={this.onChangeUsername}>
              {
                this.state.users.map(function(usr)
                {
                  return <option
                  key={usr} value={usr}>
                    {usr}
                  </option>;
                }
                )
              }
            </select>
          </div>
          <div className="form-group">
            <input type="submit"
            value="Delete User"
            className="btn btn-danger"
            />
          </div>
        </form>
      </div>
      )
  }
}