var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var userSchema = new Schema({
    email : {type: String , required:true},
    password : {type: String , required:true},
    

});

userSchema.methods.encryptPassword = function(password){
    return bcrypt.genSaltSync(password,bcrypt.genSaltSync(5),null);
}

userSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password,this.password);
}

var user = mongoose.model('userSchema',userSchema);
module.exports = user;