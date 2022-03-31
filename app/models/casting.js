const Sequelize = require('sequelize')
const db = require('../../config/db')
const content = require('./content')

const casting = db.define('casting', {
    nama: {
        type: Sequelize.STRING(25),
        notNull: true,
      },
    
    id_content:{
        type: Sequelize.INTEGER(3)
    },

    foto:{
        type: Sequelize.STRING(100)
    }
    },
    
    {
        freezeTableName: true,
        timestamps: false
    }
)

content.hasMany(casting,{
    foreignKey: 'id_content'
})
casting.belongsTo(content,{
    foreignKey: 'id_content'
})

casting.sync({})

module.exports= casting