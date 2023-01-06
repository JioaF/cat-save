const conn = require('../../config/database');
const { DataTypes } = require('sequelize');

const User = conn.define('User', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    date_created: {
        type: DataTypes.TEXT,
    }
});

module.exports = User;