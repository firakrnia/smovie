const Sequelize = require('sequelize')
const db = require('../../config/db')

const negara = db.define('negara', {
    nama: {
        type: Sequelize.STRING(25),
        notNull: true
      },
    }, 
    {
        freezeTableName: true,
        timestamps: false
    }
)

negara.sync({})

module.exports= negara