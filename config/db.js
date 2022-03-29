const sequelize= require('sequelize')
const {username, database}= require('./index')

const db = new sequelize(database, username, '', {
    dialect: 'mysql'
})

db.sync({})

module.exports = db