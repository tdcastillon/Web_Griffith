const DataType = require('sequelize')
const sequelize = require('../init/sequelize')

const Category = sequelize.define('Category', {
    id: {
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    name: {
        type: DataType.STRING,
        allowNull: false,
        unique: true
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
    tableName: 'Category'
})

module.exports = Category

