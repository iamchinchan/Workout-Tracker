const router = require('express').Router(); // need express router this is the route we are creating

let User = require ('../models/user.model'); //schema's  mongoose model that we created

// first route this is first end point that will handle the coming http get request on the /user url path
// so wherever root url which is local host 5000, then /users then if it is jus / at the end
//and it is the get request this is going to happen 
router.route('/').get((req,res)=>{
  //  mongoose method that it's going to get a list of all the users from the mongodb atlas database
  // find method returns a promise so results are returned in JSON format
  // get all users and then retuern something in jsoin format all the users that we got from database
  User.find() 
  .then(usrs => res.json(usrs))
  .catch(err => res.status(400).json('Error: '+ err));
});

// noe handle http post requests on the root/user/add url
router.route('/add').post((req,res)=>{
  const username = req.body.username;

  const newUser= new User({username});
 //mongoose save method to save the new user to the database
  newUser.save()
  .then(()=> res.json('User added successfully'))
  .catch(err => res.status(400).json('Error: '+err));
});

router.route('/:id').delete((req,res)=>{
  User.findByIdAndDelete(req.params.id)
  .then(()=> res.json('User deleted Successfully.'))
  .catch(err=> res.status(400).json('Error: '+err));
});

//stanrd thing for router files, just exporting the router
module.exports = router;
