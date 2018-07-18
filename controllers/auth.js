const express = require('express');
const router = express.Router();
const User = require('../models/users') //require our user model.

router.get('/', (req, res) => {

res.render('auth/login.ejs', {
  message: req.session.message  //this matches up with the articles.js /get route
})
});


router.post('/login', (req, res) => {
  //req.session is available on every single request from the client.
  //our session is available in the following
  console.log(req.session);

//you can add any propery you want to the session.
//and as soon as you do that it's saved.
  req.session.loggedIn = true;
  req.session.username = req.body.username;
  res.redirect('/articles');
});


//logging out or destroying the session.

router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if(err){
      res.send('error destroying sessino');
    } else {
      res.redirect('/auth');
    }
  })
})



module.exports = router;
