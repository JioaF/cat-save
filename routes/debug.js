var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');
require('dotenv').config();

async function fetchCatId() {
	const response = await fetch(`https://api.thecatapi.com/v1/images/search?limit=10&api_key=${process.env.API_KEY}`);
	const data = await response.json();
	return await data.map(cat => {
		let {id, url} = cat
		return { "id" : id, "url" : url }
	});
}

/* For debug purpose only */
router.get('/', async function (req, res, next) {

	res.json({
		"empty": "empty",
		"data": await fetchCatId()
	})
});

module.exports = router;
