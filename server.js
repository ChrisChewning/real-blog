const express        = require('express');
const app            = express();
const bodyParser     = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');
require('./db/db');


//set up our session. this is an object with a lot of properties.
//the minimum you have to do is set up a secret, which is .
//resave is a property on our session that says
app.use(session({
  secret: 'this is a random secret string that you make up',
  resave: false, //only save when the session object has been modified.
  saveUninitialized: false //useful for login sessins. we only want to save when we modify the session. Always use this. It reduces server storage and complies with laws.
}))


// Set up middleware
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended: false}));

//Require your controllers
const usersController = require('./controllers/auth.js')
const authorsController = require('./controllers/authors.js');
const articlesController = require('./controllers/articles.js');


// set up controller routes
app.use('/auth', usersController);
app.use('/authors', authorsController);
app.use('/articles', articlesController);


//CUSTOM MIDDLEWARE TO CHECK session
//hint: look at the request objects for information about where it is coming from.

// app.use((req, res, next) => {
//   //cehck to see if they are loggedIn//calling next will send them to the route they were going to.
//   //so on of your controllers
//   next()
// })




app.get('/', (req, res) => {
  res.render('index.ejs');
});



app.listen(3000, () => {
  console.log('App is listening on port 3000');
});
