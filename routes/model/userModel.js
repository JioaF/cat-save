const conn = require('../../config/database');
const { DataTypes } = require('sequelize');

const User = conn.define('user', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
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
}, {
    freezeTableName: true,
});

module.exports = User;