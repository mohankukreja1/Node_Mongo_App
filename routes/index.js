var express = require('express');
var router = express.Router();
var product = require('../models/product');
var passport = require('passport');

var csrf = require('csurf');

var csrfProtect = csrf();
router.use(csrfProtect);

/* GET home page. */
router.get('/', function(req, res, next) {
  var items = product.find(function(err,result){
    console.log(result);
    var arr = [];
    for(var i=0;i<result.length;i++){
      var obj = {};
      obj.title = result[i]._doc.title;
      obj.price = result[i]._doc.price;
      obj.imagePath = result[i]._doc.imagePath;
      obj.description = result[i]._doc.description;
      arr.push(obj);
    }
    var finalarr = [];
    for(var i=0 ;i<arr.length;i+=3 ){
      finalarr.push(arr.slice(i,i+3));
    }
    console.log(finalarr);
    res.render('shop/index', { title: 'Express', product : finalarr });
  });
  //console.log(items);
});

router.get('/user/signup', function(req,res,next){
    res.render('user/signup', {csrfToken : req.csrfToken()});
})

router.get('/user/signin', function(req,res,next){
  res.render('user/signin', {csrfToken : req.csrfToken()});
})
router.post('/user/signin',  passport.authenticate('local-signin', { successRedirect: '/user/profile',
  failureRedirect: '/user/signin',
  failureFlash: true })
)


router.post('/user/signup',  passport.authenticate('local-signup', { successRedirect: '/user/profile',
  failureRedirect: '/user/signup',
  failureFlash: true })
)

router.get('/user/profile',function(req,res,next){
  res.render('user/profile');
})

module.exports = router;
