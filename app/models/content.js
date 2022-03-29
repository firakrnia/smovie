const Sequelize = require('sequelize')
const db = require('../../config/db')
const category = require('./category')
const negara = require('./negara')

const content = db.define('content', {
    nama: {
        type: Sequelize.STRING(25),
        notNull: true,
      },
    
    id_negara:{
        type: Sequelize.INTEGER(3)
    },
    sinopsis: {
        type: Sequelize.STRING(25),
        notNull: true,
      },

    jenis: {
        type: Sequelize.ENUM('film', 'drama'),
        defaultValue: 'film'
    },

    tahun:{
        type: Sequelize.STRING(5)
    },

    sampul_film:{
        type: Sequelize.STRING(100)
    }
    },
    
    {
        freezeTableName: true,
        timestamps: false
    }
)

negara.hasMany(content,{
    foreignKey: 'id_negara'
})
content.negara(category,{
    foreignKey: 'id_negara'
})
  
category.belongsToMany(content, { through: 'film_kategori' });
content.belongsToMany(category, { through: 'film_kategori'});

content.sync({})

module.exports= content