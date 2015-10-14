var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var auth = require('../routes/auth');
var router = express.Router();


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
router.post('/display_all', function(req,res){
Account.find({}, function(err, users) {
  if (err) throw err;

  // object of all the users
  console.log(users);
  });
});

//Return all the user information after login
router.post('/user', function(req,res){
console.log("This is the info of the logged in user ...");
Account.find({ username: req.body.username }, function(err, users) {
  if (err) throw err;
  // object of all the users
  console.log(users);
  });
});

//Try Some Matching information by matching the username
router.post('/match', function(req,res){
console.log("Lets do some matching ...");
Account.find({ username: req.body.username }, function(err, users) {
  if (err) throw err;
  //pass users object to RawData
  var longitude = users[0].longitude;
  var latitude = users[0].latitude;
  console.log(longitude);
  console.log(latitude);

  });
});



//Remove users
/*Account.findOneAndRemove({ username: 'clementc' }, function(err) {
  if (err) throw err;

  // we have deleted the user
  console.log('User deleted!');
});*/


module.exports = router;