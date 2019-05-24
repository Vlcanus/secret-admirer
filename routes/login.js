const express = require('express');
const bodyParser = require('body-parser');
const user = require('../db/user');

const router = express.Router();
var urlencodedParser = bodyParser.urlencoded({extended: false});

//Sign Up
router.post('/login', urlencodedParser, function(req,res){
    console.log(req.body);
    var newUser = new user.User(req.body);
    newUser.save().then(item => {
        res.redirect('/signin.html');
    }).catch(err => {
        res.status(400).send("Unable to save to database");
    });
});

//Sign in logic
router.post('/signin', urlencodedParser, async(req,res) => {
    // check is id exist
    let userid = await user.User.findOne({id: req.body.id});
    if (!userid) {
        res.status(400).send('Invalid id please sign up');
    } else {
        let userpass = await user.User.findOne({
            id: req.body.id,
            password: req.body.password
        });
        if (!userpass) {
            return res.status(400).send('Wrong password');
        }
        res.redirect('/login-success.html');
    }
});

module.exports = router;
