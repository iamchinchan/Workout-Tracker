const express = require('express');
const cors= require('cors');  
const mongoose= require('mongoose');

require ('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

//middlewares
app.use(cors());
app.use(express.json());

const uri= process.env.ATLAS_URI;
// uri == where our database is stored in mongodb atlas
try{ 
mongoose.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log(" Mongoose is connected"),);
}
catch(e){
  console.log("could not connect");
}
//usenewurlparser == used as mongodb nodejs driver rewrote the tool it uses to parse mongodb connection strings
// usecreateindex == used for=>it's to deal with mongodb deprecating the insure index function.
// to deal with the updatews in mongodb
// remember to set the env variable ATLAS_URI
const connection = mongoose.connection;
connection.on("error",(err) => console.log(`connection errr ${err}`));
connection.once('open',() => {
  console.log("Mongodb database connection established successfully");
}) //once the connection is open

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');
 
//replace
//app.use('/', routes);
//with
//app.use(app.router);
//routes.initialize(app);
app.use('/exercises', exercisesRouter);  
app.use('/users', usersRouter);


app.listen(port,() => {
  console.log(`server is running on port: ${port}`);
});
 