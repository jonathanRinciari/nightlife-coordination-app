var express = require('express');
var router = express.Router();
var Yelp = require('yelp');
var User = require('../models/users')
var Venue = require('../models/venues.js');


/* GET home page. */
router.get('/', function(req, res, next) {
    if(req.user){
      User.findOne({username: req.user.username}).then( (user) => {
          if(user.lastSearch){
              //if user has a search history call function to get the data
          } else {
              //if user has no search history render page as normal 
          }
      })
    } else {
        //not a previous user so load as normal
        res.render('index', {title: 'express'})
    }
});

router.get('/search', function(req, res){
    
})


module.exports = router;
