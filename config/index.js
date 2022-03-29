const dotenv = require('dotenv')
const path = require('path')
dotenv.config()

module.exports ={
    rootPath: path.resolve(__dirname, '..'),
    host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_USERNAME,
    database: process.env.DATABASE_NAME
}