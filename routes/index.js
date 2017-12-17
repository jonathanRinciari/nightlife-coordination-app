var express = require('express');
var router = express.Router();
var Yelp = require('yelpv3');
var User = require('../models/users')
var Venue = require('../models/venues.js');
var getBars = require('../public/scripts/getBars')
require('dotenv').config();


// configure yelp search

const yelp = new Yelp({
    app_id: process.env.APP_ID,
    app_secret: process.env.APP_SECRET
})
    let tempLocation;
    
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index')
  // if(req.user){
  //   User.findOne({username: req.user.username}).then( (user) => {
  //     if(user.lastSearch){
  //       yelp.search({term: 'bar', location: user.lastSearch, limit: 10})
  //       .then( (bars) => {
  //       getBars(JSON.parse(bars)).then((result) => console.log('test'))
  //     })
  //       .catch((err) => console.log(err))
  //     } else {
  //       if(tempLocation){
  //         yelp.search({term: 'bar', location: tempLocation, limit: 10})
  //         .then( (bars) => {
  //         getBars(JSON.parse(bars)).then((result) => res.send(result))
  //       })
  //     } else {
  //       res.render('index') 
  //   }
  // }
  // }) 
  // } else {
  //       //not a previous user so load as normal
  //     res.render('index')
  //   }
});

router.get('/search', function(req, res){
    yelp.search({term: 'bar', location: req.query.search, limit: 5})
      .then(function (data) {
        getBars(JSON.parse(data)).then((result) => res.send(result))
})
      .catch((err) => console.log(err));

})


module.exports = router;
