var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');
require('dotenv').config();

/* GET home page. */
async function fetchCat() {
  const response = await fetch(`https://api.thecatapi.com/v1/images/search?limit=4&api_key=${process.env.API_KEY}`);
  const data = await response.json();
  return await data.map(cat => {
    let { id, url } = cat
    return { "id": id, "url": url }
  });
}

router.get('/', async function (req, res, next) {
  let authorized = req.session.authorized;
  res.render('index', {authorized: authorized, cats: await fetchCat()});
});

module.exports = router;
