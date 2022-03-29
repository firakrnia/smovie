const Sequelize = require('sequelize')
const db = require('../../config/db')

const category = db.define('category', {
    nama: {
        type: Sequelize.STRING,
        notNull: true,
      }
    },
    
    {
        freezeTableName: true,
        timestamps: false
    }
)

category.sync({})

module.exports= category