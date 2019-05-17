const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const logger = require('./middleware/logger');
const usermodel = require('./usermodel');
const Users = require('./templates/models/Users');



const app = express();

var urlencodedParser = bodyParser.urlencoded({extended: false});

/*
//Saving user to the local database 
var newUser = new usermodel.User({
    id: "Jaewon",
    password: "790075"
});
newUser.save(function(error){
    console.log("New user has been saved ");
    if(error){  console.log(error); }
});
*/
/*
// Find user from the local database
var finduser = mongoose.model('users', Users);
finduser.find({id: 'Jaewon'},function(error,fuser){  console.log(fuser);
});
*/

//Save user credential to database
app.post('/login', urlencodedParser, function(req,res){
    console.log(req.body);
    var newUser = new usermodel.User(req.body);
    newUser.save().then(item => {
        //res.send("user saved to database");
        //req.flash('message');
        res.redirect("/signin.html");
    }).catch(err => {
        res.status(400).send("Unable to save to database");
    });
  //  res.render('login-success', {data: req.body});
});

//Sign in logic
app.post('/signin', urlencodedParser, async(req,res) => {
    // check is id exist
    let userid = await usermodel.User.findOne({id: req.body.id});
    if(!userid){ return res.status(400).send('Invalid id please sign up');}
    else{
        //if ID does exist then check if password corresponding that id exist as well
        let userpass = await usermodel.User.findOne({id:req.body.id, password: req.body.password});
        
        if(!userpass){return res.status(400).send('Wrong password');}
        else{ res.redirect('/login-success.html');}
    }
    res.send(true);
    
});

//Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//set a static folder
app.use(express.static(path.join(__dirname, 'templates')));

//Initiate a html file to website manually
/*
app.get('/', (req, res) => { 
    res.sendFile(path.join(__dirname, 'templates', 'index.html'));
});
*/


app.use('/api/members', require('./routes/api/members'));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server started on PORT ' + PORT));