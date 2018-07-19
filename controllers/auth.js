const express = require('express');
const router = express.Router();
const User = require('../models/users');
const bcrypt = require('bcrypt')

//first things first we need a log in view

// we are now gonna set up a basic login route
router.get('/', (req, res) => {

    res.render('auth/login.ejs', {
        message: req.session.message
    });

})

router.post('/login', (req, res) => { //a post route is the client sending a request to the server. you named a /login path.

  //find if user exists.
User.findOne({username: req.body.username}, (err, user) => {
//err, user is your callback. once you find this thing i want you to do this other thing.

  //if user found, compare the passwords.
  if(user){ //if we find the user

    if(bcrypt.compareSync(req.body.password, user.password)) { //and if we find the user.password is the hashed password
//then run this block of code.
      req.session.username = user.username; //assign the username to the session username. could be req.body.username
        req.session.loggedIn = true; //set our session once logged in.
        res.redirect('/articles') //and redirect to localhost:3000/articles.
  } else { //if user is found (nested)
    //but password is not matched.
    req.session.message = 'password is incorrect';  //action 1
    res.redirect('/auth') //action 2
  }
  } else {
  //if user not found, tell them username is incorrect.
  console.log('no username found');
  req.session.message = 'Username is incorrect';
    res.redirect('/auth')
  } //end of if user
});
});

  //req.session is available on every single request from the client
  //our session is availble in the following

// bcrypt.compareSync('the plan text password from the user', hashedPassword)
// bcryot.compareSync returns true or false

//
// //we can add any property you want to the session
// // and as soon as you do that it is saved to the store
//
//   req.session.username = req.body.username; //and keeping track of our user
//   res.redirect('/articles');
// })

//
router.post('/register', (req, res, next) => {

  // first we are going to hash the password
  const password = req.body.password;
  const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  // lets create an object for our db entry;
  const userDbEntry = {};
  userDbEntry.username = req.body.username;
  userDbEntry.password = passwordHash;
console.log(passwordHash);
  // lets put the password into the database
  User.create(userDbEntry, (err, user) => {
    console.log(user)

    // lets set up the session in here we can use the same code we created in the login
    req.session.username = user.username;
    req.session.loggedIn   = true;
    res.redirect('/authors')
  });

})

//log out
router.get('/logout', (req, res) =>{

  req.session.destroy((err) =>{
    if(err) {
      res.send('errpr destroying session')
    } else {
      res.redirect('/auth')
    }
  })
})

module.exports = router;
