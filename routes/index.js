const express = require('express');
const router = express.Router();
const login = 'admin';
const password = '123';

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
});
/* first param in render is a tempalte, here index.pug. Second parameter is an object which pass all params we need to our tempalte. We can pass no limit params that they could be array, variables, string, int. Here's 'Express' string as a title variable. */

router.get('/login', (req, res) => {
  res.render('login', { title: 'Logowanie' });
});

router.post('/login', (req, res) => {
  const body = req.body;

  if (body.login === login && body.password === password) {
    req.session.admin = 1;
    res.redirect('/admin')
  } else {
    res.redirect('/login')
  }
});


module.exports = router;
