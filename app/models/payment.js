const Sequelize = require('sequelize')
const db = require('../../config/db')
const bank = require('./bank')

const payment = db.define('payment', {
    type: {
        type: Sequelize.STRING(25),
        notNull: true,
      },

    status: {
        type: Sequelize.ENUM('Y', 'N'),
        defaultValue: 'Y'
    },
    },
    
    {
        freezeTableName: true,
        timestamps: true
    }
)

bank.belongsToMany(payment, { through: 'bank_payment' });
payment.belongsToMany(bank, { through: 'bank_payment'});

payment.sync({})

module.exports= payment