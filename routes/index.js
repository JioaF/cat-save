var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  let authorized = req.session.authorized;
  res.render('index', {authorized: authorized});
});

module.exports = router;
