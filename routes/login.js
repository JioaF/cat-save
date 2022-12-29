var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var User = require('./model/userModel');


let error = false;
let errMsg = '';
router.get('/', function (req, res) {
    res.render('login', {error: error, message: errMsg});
}).post('/', async function (req, res) {
    // TODO : change the login credential with an email later on
    let { username, password } = req.body;
    let findUser = await User.findAll({
        attributes: ['username', 'password']
    })
    let result = findUser.find(user =>{
        return user['username'] == username
        && bcrypt.compareSync(password, user['password'])
    })
    if (result) {
        req.session.authorized = true;
        res.redirect('/');
    } else {
        error = true;
        errMsg = 'User has not been registered!'
        res.redirect('/login');
    }
})

module.exports = router;