var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var Schema = mongoose.Schema;

var Account = new Schema({
    "username": String,
    "active": Boolean,
    "password": String,
    "Profile_Name" : String,
    "Age_Range": String,
    "location": String,
    "Gender": String,
   	"Ethnicity": String,
    "longitude": {"type" : "number"},
    "latitude": {"type" : "number"},
    "Education": String,
    "Major":String,
    "Address": String,
    "Beer_Wine": String,
    "Sports_Art": String,
    "Cooking_DineOut": String
}, {collection: 'accounts'});

//'accounts' references the collection in Mongodb
//Account references the schema created above

Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', Account);
//module.exports = db;