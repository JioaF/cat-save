var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var User = require('./model/userModel');


/* For debug purpose only */
router.get('/', async function (req, res, next) {
  let key = 'password';
  let user = await User.findAll({
    attributes: ['username','password']
  })
  let pass = 'user2'
  let user2 = user.find(user => {
    return user['username'] == 'user2' && bcrypt.compareSync(pass, user['password']);
  })
  res.send({
    dir: __dirname,
    user: user2
  });
});

module.exports = router;
