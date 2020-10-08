
const http = require('http');
const express = require('express');
const app = express();
const cors = require('cors');
const hostname = 'localhost';
const port = 3001;
const mongoose = require('mongoose');
const todoRoutes = express.Router();

const bodyParser = require('body-parser');

app.use(cors());

var db = mongoose.connect('mongodb://localhost/events', {useNewUrlParser: true});

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
// define Schema
var eventSchema = mongoose.Schema({
  firstname : String,
  email : String,
  phone : Number,
  seats : Number,
  attentdee: String,
  currentdate:Date,

});

// compile schema to model
var user = mongoose.model('eventform', eventSchema, 'eventform');
app.post('/eventform', function (req, res) {

const firstname = req.body.firstname;
const email = req.body.email;
const phone = req.body.phone;
const seats = req.body.seats;
const attentdee = req.body.attentdee;
const currentdate = Date.now();



// a document instance
var events = new user({
  firstname   :firstname,
  email       :email,
  phone       : phone,
  seats       :seats,
  attentdee   :attentdee,
  currentdate :currentdate,
});

// save model to database
events.save(function (err, data) {
  if (err) {
    res.send({status:0,result:err})
  }else{
      res.send({status:1,result:data})
    }
}); 


});


app.get("/api",function(req,res){ 

  user.find({},function(err,data){  
             if(err){  
                 res.send(err);  
             }  
             else{
              res.json({data});       
              }  
         });  
 })

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});