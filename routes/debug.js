var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');

async function fetchCatId() {
	const response = await fetch('https://cataas.com/api/cats?limit=5&skip=0');
	const data = await response.json();
	
	let catId = data.map(cat => cat['_id']);
	return catId;
}

/* For debug purpose only */
router.get('/', async function (req, res, next) {
	let limit = 5
	const response = await fetch('https://cataas.com/api/cats?limit=10&skip=0')
	
	console.log(await fetchCatId())
	res.json({
		"empty": "empty",
		"data": fetchCatId()
	})
});

module.exports = router;
