const controller={}
// const model = require('../models/index')


controller.index = async function(req,res){
    try {
        res.render('index')
    } catch (error) {
        console.log(error)
    }
}
// controller.index = async function(req,res){
//     try {
//         res.render('index', {
//             name: req.session.user.name,
//             title: 'Dashboard Page'
//         })
//     } catch (error) {
//         console.log(error)
//     }
// }


module.exports= controller

