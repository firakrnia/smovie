const Sequelize = require('sequelize')
const db = require('../../config/db')

const user = db.define('user', {
    email: {
        type: Sequelize.STRING(25),
        notNull: true,
        validate:{
            isEmail: true
        }
      },
    name: {
        type: Sequelize.STRING(25),
        notNull: true
      },
    password: {
        type: Sequelize.STRING
      },
    role: {
        type: Sequelize.ENUM('admin', 'user'),
        defaultValue: 'admin'
      },
    status: {
        type: Sequelize.ENUM('Y', 'N'),
        defaultValue: 'Y'
      },
    phone_number: {
        type: Sequelize.STRING(25),
        notNull: true
      },
    }, 
    {
        freezeTableName: true,
        timestamps: true
    }
)

user.sync({})

module.exports= user