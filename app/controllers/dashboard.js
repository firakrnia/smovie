const controller={}
// const model = require('../models/index')


controller.index = async function(req,res){
    try {
        res.render('index', {
            name: req.session.user.name,
            title: 'Dashboard Page'
        })
    } catch (error) {
        console.log(err)
    }
}


module.exports= controller

