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
    if(req.user){
      User.findOne({username: req.user.username}).then( (user) => {
          if(user.lastSearch){
              yelp.search({term: 'bar', location: user.lastSearch, limit: 10})
                .then( (bars) => {
                    getBars(JSON.parse(bars)).then((result) => res.send(result))
                })
          } else {
              res.render('index', {title: 'Nightlife'}) 
          }
      })
    } else {
        //not a previous user so load as normal
       res.render('index', {title: 'Nightlife'})
    }
});

router.get('/search', function(req, res){
    if(req.user){
        User.findOneAndUpdate({username: req.user.username}, {$set: {lastSearch: '06776'}}, function(err, doc){
            if(err) throw err;
            console.log(doc)
        })
    }
    yelp.search({term: 'bar', location: '06510', limit: 5})
      .then(function (data) {
        getBars(JSON.parse(data)).then((result) => res.send(result))
})
.catch(function (err) {
    console.error(err);
});
})


module.exports = router;
