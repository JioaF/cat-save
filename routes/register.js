var express = require("express");
var router = express.Router();
var bcrypt = require("bcrypt");
var User = require("./model/userModel");

router.get("/", function (req, res) {
	res.render("register");
}).post("/", async function (req, res) {
	// TODO : add email credential
	let { email, password, repeat } = req.body;
	console.log(req.body)
	let saltRounds = 8;
	if (password == repeat) {
		await User.create({
			email: email,
			password: bcrypt.hashSync(password, saltRounds),
			date_created: new Date().toLocaleDateString(),
		});
		res.redirect("/login");
	} else {
		res.redirect("/register");
	}
});

module.exports = router;