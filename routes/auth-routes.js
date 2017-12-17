const router = require('express').Router();
const passport = require('passport');
const User = require('../models/users');
const Venue = require('../models/venues');

// auth login
router.get('/login', (req, res) => {
    res.send('loging')
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
    res.send(req.user);
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
    // Venue.findOneAndUpdate({_id: req.body.id}, {$inc: {attending: 1}, $push: {usersAttending: req.user.username}}, {new: true}, (err, data) => {
    //     if(err) throw err;
    //     res.send(data)
    
    
      Venue.findOneAndUpdate(
          {_id: req.body.id, usersAttending: {$in: [req.user.username]}},
          {$inc: {attending: -1},
          $pull: {usersAttending: req.user.username}},
          {new: true},
          (err, data) => {
        
            if(err) throw err;
            if(!data){
              Venue.findOneAndUpdate({_id: req.body.id}, {$inc: {attending: 1}, $addToSet: {usersAttending: req.user.username}}, {new: true}, (err, data) =>{
                    res.send(data)
                    
                  })
              } else {
                  res.send(data);
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