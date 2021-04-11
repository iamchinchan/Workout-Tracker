const rtr = require('express').Router();
let Exs = require('../models/exercise.model');
const router = require('./users');

rtr.route('/').get((req,res)=>{
  Exs.find()
  .then(exs => res.json(exs)) // it means we should keep unique schema's ,cant we just put voth users and exercises in 1 js file or in 1 model schema's
  .catch(err => res.status(400).json('Error: '+err));
});

rtr.route('/add').post((req,res)=>{
  const username = req.body.username;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);

  const newexs = new Exs({
    username,
    description,
    duration,
    date,
  });
 
  newexs.save()  
  .then(()=> res.json('Exercise added Successfully'))
  .catch(err=> res.status(400).json('Error: '+err));
});

//  /:id thi :id like a variable, object id created automatically by mongodb
rtr.route('/:id').get((req,res)=>{
  Exs.findById(req.params.id)
  .then(exss=>  res.json(exss))
  .catch(err => res.status(400).json('Error: '+err));
});

rtr.route('/:id').delete((req,res)=>{
  Exs.findByIdAndDelete(req.params.id)
  .then(()=> res.json('Exercise deleted successfully'))
  .catch(err=> res.status(400).json('Eroor: '+err));
});

rtr.route('/update/:id').post((req,res)=>{
  Exs.findById(req.params.id)
  .then(exss =>{
    exss.username = req.body.username;
    exss.description = req.body.description;
    exss.duration = Number(req.body.duration);
    exss.dtae = Date.parse(req.body.date);

    exss.save()
    .then(()=> res.json('Exercise updated successfully'))
    .catch(err=> res.status(400).json('Error: '+err));
  })
  .catch(err=> res.status(400).json('Error: '+err));
});

module.exports = rtr;