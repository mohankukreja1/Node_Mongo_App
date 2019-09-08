var passport = require('passport');
var User = require('../models/user');
var LocalStrategy = require('passport-local').Strategy;



passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use('local-signup',new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  function(req,email, password, done) {
    
    User.findOne({ 'email': email }, function(err, user) {
        //console.log(user);
        if (err) { throw err; }
        if (user) {
            console.log(user);
          return done(null, false, { message: 'User Already Exist' });
        }
        var newUser = new User();
        newUser.email = email;
        newUser.password = newUser.encryptPassword(password);
        newUser.save(function(err,result){
            if(err){
                 throw err;
            }
            return done(null,newUser);
        })
        //return done(null, user);
      });
  }
));