var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var auth = require('../routes/auth');
var router = express.Router();
var query = Account.find({});

router.get('/', function (req, res) {
    res.render('index', { user : req.user });
});

router.get('/register', function(req, res) {
    res.render('register', { });
});

//curl -H "Content-Type: application/json" -X POST -d '{"username":"reganhsu", "password":"ugh"}' http://localhost:3000/register
router.post('/register', function(req, res) {
    Account.register(new Account({ username : req.body.username, active : req.body.active, Profile_Name : req.body.Profile_Name, Age_Range : req.body.Age_Range, location : req.body.location, Gender : req.body.Gender, Ethnicity : req.body.Ethnicity, longitude : req.body.longitude, latitude : req.body.latitude, Education : req.body.Education, Major : req.body.Major, Address : req.body.Address, Beer_Wine : req.body.Beer_Wine, Sports_Art : req.body.Sports_Art, Cooking_DineOut : req.body.Cooking_DineOut}), req.body.password, function(err, account) {
        
        console.log(req.body.username);
        console.log(req.body.password);
        console.log(req.body.Profile_Name);

        if (err) {
        	return res.send("Sorry.  That username already exists.  Try again!");
          //return res.render("register", {info: "Sorry. That username already exists. Try again."});
        }

        passport.authenticate('local')(req, res, function () {
            res.redirect('/');
        });
    });
});

//curl -d '{"username":"hsuregan5", "password": "ugh"}' -H 'Content-type: application/json' http://localhost:3000/login1
//THIS ONE
router.post('/login1', passport.authenticate('local'), auth.login);

//Logout function
router.post('/logout', function(req, res){
	console.log(req);
  var username = req.body.username;
	console.log(username);

	Account.findOne({"username": username}, function(err, doc){
   	 	doc['active'] = false;
   	 	doc.save();
      res.sendStatus(200);
  });

	//res.logout();
})

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});


//Return all the users that are registered on terminal, finding ways to send to iphone
//router.post('/display_all', function(req,res){
Account.find({}, function(err, users) {
  if (err) throw err;

  // object of all the users
  console.log(users);
  });
//});


var ulongitude = 0;
var ulatitude = 0;
var login_user = "";

//Try Some Matching information by matching the username
router.post('/matching', function(req,res){
console.log("Lets do some matching ...");
Account.find({ username: req.body.username }, function(err, users) {
  if (err) throw err;
  
  ulongitude = users[0].longitude;
  ulatitude = users[0].latitude;
  login_user = users[0].username;
  console.log(ulongitude);
  console.log(ulatitude);

  //Sending information to Matching
  router.post('/Matching', function(req,res){
  Account.find({ latitude : {$lt : ulatitude + 1},
                 latitude : {$gt : ulatitude - 1},
                 longitude : {$lt : ulongitude + 1},
                 longitude : {$gt : ulongitude - 1},
                 username: {$ne: login_user}}, //gte for greater and equal to
  function(error, users){  
  if(error){res.send(error);}
  else{res.send(users);}
  //Displaying all the information
  console.log(users);
  });
});
});
});

//Using the latitude and longitude to find users
router.get('/Matching', function(req,res){
console.log("Lets find some people ...");

  Account.find({ latitude : {$lt : ulatitude + 1},
                 latitude : {$gt : ulatitude - 1},
                 longitude : {$lt : ulongitude + 1},
                 longitude : {$gt : ulongitude - 1},
                 username: {$ne: login_user}}, 
  function(error, users){  
  if(error){res.send(error);}
  else{res.send(users);}
  //Displaying all the information
  console.log(users);
  });
});

//Remove users
/*Account.findOneAndRemove({ username: 'Seb' }, function(err) {
  if (err) throw err;

  // we have deleted the user
  console.log('User deleted!');
});*/


module.exports = router;
