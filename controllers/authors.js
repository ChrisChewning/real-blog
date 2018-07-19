const express = require('express');
const router  = express.Router();
const Author  = require('../models/authors');
const Article = require('../models/articles');

// INDEX
router.get('/', async (req, res, err) => {
  try {
    console.log('hits index route')
    const foundAuthors = await Author.find();
    res.render('authors/index.ejs', {
      authors: foundAuthors,
    });

  } catch (err){
    res.send(err, ' error for index route')
  }
});



// NEW
router.get('/new', (req, res) => {
  res.render('authors/new.ejs');
});

// SHOW
router.get('/:id', async (req, res) => {
  try {
console.log('hits the show page');
const foundAuthor = await Author.findById(req.params.id);
res.render('authors/show.ejs', {
  author: foundAuthor,
});
  }  catch (err) {
  res.send(err, ' error for show route');
  }
  });



// EDIT
router.get('/:id/edit', async (req, res) => {
  try {
    console.log('hits the edit page')
    const foundAuthor = await Author.findById(req.params.id);
    res.render('authors/edit.ejs', {
      author: foundAuthor,
    });
  }  catch (err) {
    res.send(err, ' error for edit route');
  }
  });



// PUT = UPDATE
router.put('/:id', async (req, res) => {
try {
  console.log('hits the update page');
  const updatedAuthor = await Author.findByIdAndUpdate(req.params.id, req.body, {new: true});
  res.redirect('/authors')
}
catch (err) {
  res.send(err, ' error for update route');
}
});




//   Author.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedAuthor)=> {
//     console.log(updatedAuthor, ' this is updatedAuthor');
//     res.redirect('/authors');
//   });
// });

// CREATE
router.post ('/', async (req, res) => {
  try {
  console.log(' hits the post route');
  const newAuthor = await Author.create(req.body);

  res.redirect('/authors');
} catch (err){
  res.send(err, ' not creating a post');
}
});


// DELETE AN AUTHOR DELETE THE ASSOCIATED ARTICLES
router.delete('/:id', async (req, res) => {
  try {
    console.log('hits the delete in index')
    const deletedAuthor = await
    Author.findByIdAndRemove(req.params.id);

    const articleIds = [];
    for(let i = 0; i < deletedAuthor.articles.length; i++){
      articleIds.push(deletedAuthor.articles[i].id);
    }
    await Article.remove({
      _id: { $in: articleIds}
    });
      res.redirect('/authors')

  } catch (err) {
    console.log(err, ' not deleting');
    res.send(err, ' not deleting');
  }
  });



module.exports = router;
