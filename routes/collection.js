const express = require('express');
const router = express.Router();
const Collection = require('./model/collectionModel');
const fetch = require('node-fetch');
const fs = require('fs');

async function savedImage(arrId) {
	let url = 'https://api.thecatapi.com/v1/images'

	return Promise.all(arrId.map(async (cat) => {
		let res = await fetch(`${url}/${cat['imgId']}`);
		let dataJson = await res.json();
		let data = await dataJson['url'];
		let path = await data.split('/');
		let filename = await path.pop();
		return {
			path: path.join('/'),
			filename: filename
		};
	}));
}

router.get('/', async function (req, res) {
	let userId = req.session.userId || 0;
	let result = await Collection.findAll({
		attributes: ['imgId'],
		where: {
			user_collection: userId
		}
	});
	res.render('collection', { data: await savedImage(result) })
}).get('/add/', async function (req, res) {
	let imageId = '';
	if (req.query.id) {
		imageId = req.query.id;
	} else {
		res.status = 400;
		res.send('The url requiring an id!')
	}
	await Collection.create({
		imgId: imageId,
		user_collection: req.session.userId
	});
	res.redirect('/collection')
})

module.exports = router;