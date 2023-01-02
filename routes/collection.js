const express = require('express');
const router = express.Router()
const Collection = require('./model/collectionModel');

router.get('/', function (req, res) {
    res.render('collection')
}).get('/add/', function (req, res) {
	let imgId = '';
	if (req.query.id) {
		imgId = req.query.id;
		Collection.create();
	} else {
		res.status = 400;
		res.send('The url requiring an id!')
	}
})

module.exports = router;