var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');

/* GET home page. */
async function fetchCatId() {
  const response = await fetch('https://cataas.com/api/cats?limit=5&skip=0');
  const data = await response.json();

  let catId = await data.map(cat => cat['_id']);
  return catId;
}

router.get('/', async function (req, res, next) {
  let authorized = req.session.authorized;
  res.render('index', {authorized: authorized, catId: await fetchCatId()});
});

module.exports = router;
