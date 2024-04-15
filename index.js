const express = require('express');
const app = express();
const sequelize = require('./init/sequelize');
const bodyParser = require('body-parser');
const session = require('./init/session');
const Article = require('./models/article.model');
const Category = require('./models/category.model');
const User = require('./models/user.model');


const auth = require('./functions/auth')
const category = require('./functions/category')
const post = require('./functions/post')

app.set('view engine', 'ejs');
app.use(session);
app.use(express.static(__dirname + '/public'));

// render pages

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

// pages that you'll be rendering without authentification

app.get('/', async (req, res) => {
  // only ten articles and order is descending
  let articles = await Article.findAll({
    limit: 10,
    order: [['createdAt', 'DESC']]
  })
  {
    (req.session.user) ? res.render('pages/home_connected', { user: req.session.user, articles: articles }) : res.render('pages/home', { articles })
  }
})

app.get('/signin', (req, res) => {
    res.render('pages/signin')
})

app.get('/signup', (req, res) => {
  res.render('pages/signup')
})

app.get('/articles', async (req, res) => {
  let articles = await Article.findAll()
  let user = null
  if (req.session.user) {
    user = req.session.user
  }
  res.render('pages/articles', { articles, user })
})

// pages that you'll be rendering with authentification

app.get('/create_article', (req, res) => {
  if (req.session.user) {
    if (req.session.user.isAdministrator) {
      res.render('pages/create_article', { user: req.session.user })
    }
  } else {
    res.redirect('/')
  }
})

// pages linked to the admin part

app.get('/admin', (req, res) => {
  if (req.session.user) {
    if (req.session.user.isAdministrator) {
      res.render('pages/admin/admin_panel', { user: req.session.user })
    }
  } else {
    res.redirect('/')
  }
})

app.get('/admin/see_articles', async (req, res) => {

  let articles = await Article.findAll()

  if (req.session.user) {
    if (req.session.user.isAdministrator) {
      res.render('pages/admin/see_articles', { user: req.session.user, articles })
    }
  } else {
    res.redirect('/')
  }
})

app.get('/admin/see_users', async (req, res) => {

  let users = await User.findAll()

  if (req.session.user) {
    if (req.session.user.isAdministrator) {
      res.render('pages/admin/see_users', { user: req.session.user, users })
    }
  } else {
    res.redirect('/')
  }
})

// routes linked to posts

app.get('/article/:id', async (req, res) => {
  let article = await Article.findByPk(Number(req.params.id))
  let user = null;
  if (req.session.user) {
    user = req.session.user
  }
  res.render('pages/article', { article, user })
})

app.get('/article/edit/:id', async (req, res) => {
  let article = await Article.findByPk(Number(req.params.id))

  let category = await Category.findOne({
    where: {
      name: article.category
    }
  })

  res.render('pages/edit_article', { article, category })
})

// routes profile

app.get('/profile', (req, res) => {
  if (req.session.user) {
    res.render('pages/profile', { user: req.session.user })
  } else {
    res.redirect('/')
  }
})

// routes for connection

app.use('/', auth);

// routes that handles category

app.use('/category', category);

// routes that handles posts

app.use('/post', post);

// Handle all routes with a 404 error page
app.use('*', (req, res) => {
  res.status(404).send('Page not found');
});

app.use(async (req, res, next) => {
  res.locals.user = req.user;
  res.locals.isAuthenticated = req.isAuthenticated();

  if (req.isAuthenticated()) {
    res.locals.user = req.user;
  }
  next();
});

sequelize.sync().then(() => {
  console.log('Database synced');
  // Start the server
  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});