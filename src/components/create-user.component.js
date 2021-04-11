import React,{Component} from 'react';
import axios from 'axios';


export default class Createuser extends Component{
  constructor(props){
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    
    this.onSubmit = this.onSubmit.bind(this);


    this.state = {
      username: '',
      users:[],
     
    }
  }
componentDidMount() {
  axios.get('http://localhost:5000/users/')
 .then(response => {
   if (response.data.length >0){
    this.setState({
      users : response.data, 
      //data will be an array and we are gonna map the array which will allow us to return something
      //for every element in an array
    //  id: response.data[0]._id
      });
   }
  // console.log(this.state.usname);
 })
}

  onChangeUsername(e){
    this.setState({username: e.target.value});
  }


  onSubmit(e){
    e.preventDefault();
  
  var flag = false;
  var ussr =this.state.username;
  this.state.users.map(function(usr){


    if(ussr===usr.username)
      {flag = true;}

  })  
  if(flag===false)
{
    const user={
      username: this.state.username,
    };
  
    console.log(user);
    
    axios.post('http://localhost:5000/users/add',user)
    .then(res => console.log(res.data));


    this.setState({
      username:''
    })
  }
  else if(flag===true){
    alert("Username already exists, Try a different username");
  }
  }

  render(){
    return( 
      <div>
        <h3>Create New User</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <input type="text"
            required
            className="form-control"
            value={this.state.username}
            onChange = {this.onChangeUsername}
            />
          </div>
          <div className="form-group">
            <input type="submit"
            value="Create New User"
            className="btn btn-primary"
            />
          </div>
        </form>
      </div>
      )
  }
}