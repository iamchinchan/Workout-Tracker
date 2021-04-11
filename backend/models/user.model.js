const mongoose = require('mongoose');//we require mongoose

const Schema = mongoose.Schema; //all schemas are mainly same

const userSchema = new Schema({ //userSchema is a variable (name) for schema
  username:{ //only field  name
    //validations
    type: String,
    required: true,
    unique: true,
    trim :true, // trim whitespaces
    minlength:3 //atleat 3 char long
  },
}, {
  timestamps:true, // auto create field for when data row whatever is created
});

const User = mongoose.model('User',userSchema); //User can be anything just a name we are gona use
module.exports = User; //just export the User variable of userSchema Schema 