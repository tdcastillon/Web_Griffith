const DataType = require('sequelize')
const sequelize = require('../init/sequelize')

const User = sequelize.define('User', {
    id: {
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    email: {
        type: DataType.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataType.STRING,
        allowNull: false
    },
    username: {
        type: DataType.STRING,
        allowNull: false,
        unique: true
    },
    isAdministrator: {
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    createdAt: {
        type: DataType.DATE,
        allowNull: false,
        defaultValue: DataType.NOW
    },
    updatedAt: {
        type: DataType.DATE,
        allowNull: false,
        defaultValue: DataType.NOW
    }
}, {
    timestamps: true,
    tableName: 'User'
})

module.exports = User;