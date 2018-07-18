const express        = require('express');
const app            = express();
const bodyParser     = require('body-parser');
const methodOverride = require('method-override');
require('./db/db');

// Set up middleware
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended: false}));


const authorsController = require('./controllers/authors.js');
const articlesController = require('./controllers/articles.js');

// set up controller routes
app.use('/authors', authorsController);
app.use('/articles', articlesController);

app.get('/', (req, res) => {
  res.render('index.ejs');
});



app.listen(3000, () => {
  console.log('App is listening on port 3000');
});
