const Sequelize = require('sequelize')
const db = require('../../config/db')
const content = require('./content')

const video = db.define('video', {
    id_content:{
        type: Sequelize.INTEGER(3)
    },

    video:{
        type: Sequelize.STRING(100)
    }
    },
    
    {
        freezeTableName: true,
        timestamps: false
    }
)

content.hasMany(video,{
    foreignKey: 'id_content'
})
video.belongsTo(content,{
    foreignKey: 'id_content'
})

video.sync({})

module.exports= video