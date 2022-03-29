const Sequelize = require('sequelize')
const db = require('../../config/db')

const bank = db.define('bank', {
    name: {
        type: Sequelize.STRING(25),
        notNull: true
      },
    bank_name: {
        type: Sequelize.STRING(25),
        notNull: true
      },
    norek: {
        type: Sequelize.STRING(25),
        notNull: true
      },
    }, 
    {
        freezeTableName: true,
        timestamps: false
    }
)

bank.sync({})

module.exports= bank