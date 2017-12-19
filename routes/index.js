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

    
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index')
});

router.get('/search', function(req, res){
  if(req.query.search){
    yelp.search({term: 'bar', location: req.query.search, limit: 5})
      .then(function (data) {
        getBars(JSON.parse(data)).then((result) => res.send(result))
})
      .catch((err) => console.log(err));
  } else {
    yelp.search({term: 'bar', location: req.query.hist, limit: 5})
      .then(function (data) {
        getBars(JSON.parse(data)).then((result) => res.send(result))
})
      .catch((err) => console.log(err));
  }
})


module.exports = router;
