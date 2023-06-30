const { DataTypes } = require('sequelize');
const db = require("../db");

const User = db.define('users', {
    id: { 
        type: DataTypes.STRING, 
        allowNull: false,
        primaryKey: true
    },
    firstName: { 
        type: DataTypes.STRING, 
        allowNull: false
    },
    lastName: { 
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING, 
        allowNull: false 
    },
    password: { 
        type: DataTypes.STRING, 
        allowNull: false 
    }
});

module.exports = User;
