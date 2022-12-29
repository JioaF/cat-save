var {Sequelize} = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './config/cat_save.db'
});

module.exports = sequelize;