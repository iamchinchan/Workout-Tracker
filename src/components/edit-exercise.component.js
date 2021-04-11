import React,{Component} from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";


export default class EditEx extends Component{
  constructor(props){
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);


    this.state = {
      username: '',
      description :'',
      duration:0,
      date : new Date(),
      users : []
    }
  }

componentDidMount(){
  axios.get('http://localhost:5000/exercises/'+this.props.match.params.id)
  .then(res=>{
    this.setState({
      username : res.data.username,
      description : res.data.description,
      duration : res.data.duration,
      date : new Date(res.data.date)
    })
  })
  .catch(function(error){
    console.log(error);
  })
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
      //for every element in an arrau
     // username: response.data[0].username
      })
   }
 })
}

  onChangeUsername(e){
    this.setState({username: e.target.value});
  }
  onChangeDescription(e){
    this.setState({description: e.target.value});
  }
  onChangeDuration(e){
    this.setState({duration: e.target.value});
  }
  onChangeDate(date){
    this.setState({date:date});
  }
onSubmit(e){
  e.preventDefault();

  const exercise={
    username: this.state.username,
    description : this.state.description,
    duration : this.state.duration,
    date : this.state.date,
  };

  console.log(exercise);

  
  axios.post('http://localhost:5000/exercises/update/'+this.props.match.params.id,exercise)
  .then(res => console.log(res.data));


  window.location = '/'; //go to the home page after submitting the exercise

}
  render(){
    return( 
      <div>
        <h3>Edit Exercise Log</h3>
        <form onSubmit={this.onSubmit}>
          <div className ="form-group">
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
            <label>
              Description: 
            </label>
            <input type="text" required className="form-control"
            value={this.state.description}
            onChange={this.onChangeDescription}
            /> 
         </div>
         <div className="form-group">
              <label>Duration (in minutes): </label>
              <input
              type="text"
              className="form-control"
              value={this.state.duration}
              onChange={this.onChangeDuration}
              />
         </div>
         <div className="form-group">
              <label>Date: </label>
              <div>
                <DatePicker  //component directly from react packages  in npm
                selected={this.state.date}
                onChange = {this.onChangeDate}
                />
              </div>
         </div>
         <div className="form-group">
              <input type="submit"
              value="Edit Exercise"
              className="btn btn-primary"
              />
         </div>
        </form>
      </div>
      )
  }
}