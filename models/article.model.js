const DataType = require('sequelize')
const sequelize = require('../init/sequelize')
const User = require('./user.model')
const Category = require('./category.model')

const Article = sequelize.define('Article', {
    id: {
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    title: {
        type: DataType.STRING,
        allowNull: false
    },
    subTitle: {
        type: DataType.STRING,
        allowNull: false
    },
    content: {
        type: DataType.TEXT,
        allowNull: false
    },
    author: {
        type: DataType.STRING,
        references: {
            model: 'User',
            key: 'username'
        }
    },
    category: {
        type: DataType.STRING,
        references: {
            model: 'Category',
            key: 'name'
        }
    },
    head_picture: {
        type: DataType.STRING,
        allowNull: true
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
    tableName: 'Article'
})

module.exports = Article