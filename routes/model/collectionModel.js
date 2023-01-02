const conn = require('../../config/database');
const { DataTypes } = require('sequelize');
const User = require('./userModel');

const Collection = conn.define('Collection', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: true,
        autoIncrement: true
    },
    imgId: {
        type: DataTypes.STRING,
        allowNull: true,
    }
})
Collection.belongsTo(User, {
    foreignKey: "user_collection",
    targetKey: "id",
    constraints: false
});
module.exports = Collection