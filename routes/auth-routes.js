const router = require('express').Router();
const passport = require('passport');
const User = require('../models/users');
const Venue = require('../models/venues');

// auth login
router.get('/login', (req, res) => {
    res.redirect('/auth/github');
});

// auth logout
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

// auth with github
router.get('/github', passport.authenticate('github', {
    scope: ['profile']
}));

// callback route for google to redirect to
// hand control to passport to use code to grab profile info
router.get('/github/redirect', passport.authenticate('github'), (req, res) => {
    res.redirect('/')
});

router.put('/history', (req, res) => {
    if(req.user){
     User.findOneAndUpdate({username: req.user.username}, {$set:{lastSearch: req.body.search}}, (err, doc) => {
        if(err) throw err;
     })
    } else {
        // console.log('not logged in')
    }
})

router.put('/going', (req, res) => {
    if(req.user){
      Venue.findOneAndUpdate(
          {_id: req.body.id, usersAttending: {$in: [req.user.username]}},
          {$inc: {attending: -1},
          $pull: {usersAttending: req.user.username}},
          {new: true},
          (err, venue) => {
            if(err) throw err;
            if(!venue){
              Venue.findOneAndUpdate({_id: req.body.id}, {$inc: {attending: 1}, $addToSet: {usersAttending: req.user.username}}, {new: true}, (err, venue) =>{
                if(err) throw err;
                res.send({venue: venue, going: true})
              })
          } else {
              res.send({venue: venue, going: false});
          }
     })
     
    } else {
        res.send({login: 'Sorry Please Login'})
    }
})

router.get('/user_data', function(req, res) {

            if (req.user === undefined) {
                // The user is not logged in
                res.json({});
            } else {
                res.json({
                    username: req.user
                });
            }
        });

module.exports = router;