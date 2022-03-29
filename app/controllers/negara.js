const controller={}
const model = require('../models/index')


controller.index = async function(req,res,next){
    try {
        const alertMessage = req.flash('alertMessage')
        const alertStatus = req.flash('alertStatus')

        const alert = {
            message: alertMessage,
            status: alertStatus
        }
        const negara = await model.negara.findAll()

        console.log("alert >>")
        console.log(alert)

        res.render('admin/negara/viewNegara', {
            negara, 
            alert
            // name: req.session.user.name,
            // title: 'negara Page'
        })
    } catch (error) {
        req.flash('alertMessage', `${error.message}`)
        req.flash('alertStatus', 'danger')
        res.redirect('/negara')
    }
}

controller.viewAdd = async function(req, res){
    try {
        res.render('admin/negara/create', {
            // name: req.session.user.name,
            // title: 'negara Page'
        })
    } catch (error) {
        req.flash('alertMessage', `${error.message}`)
        req.flash('alertStatus', 'danger')
        res.redirect('/negara')
    }
}

controller.store = async function(req,res){
    try {
        await model.negara.create({
            nama: req.body.nama
        })

        req.flash('alertMessage', "Negara Has Been Created")
        req.flash('alertStatus', "success")

        res.redirect('/negara')
    } catch (error) {
        req.flash('alertMessage', `${error.message}`)
        req.flash('alertStatus', 'danger')
        res.redirect('/negara')
    }
}

controller.viewEdit = async function(req, res){
    try {
        const negara = await model.negara.findOne({
            where:{
                id: req.params.id
            }
        })

        res.render('admin/negara/edit', {
            negara,
            // name: req.session.user.name,
            // title: 'negara Page'
        })
    } catch (error) {
        req.flash('alertMessage', `${error.message}`)
        req.flash('alertStatus', 'danger')
        res.redirect('/negara')
    }
}

controller.put = async function(req,res){
    try {
        await model.negara.update({
            nama: req.body.nama
        },{
            where:{
                id: req.params.id
            }
        })

        req.flash('alertMessage', "Negara Has Been Updated")
        req.flash('alertStatus', "success")

        res.redirect('/negara')
    } catch (error) {
        req.flash('alertMessage', `${error.message}`)
        req.flash('alertStatus', 'danger')
        res.redirect('/negara')
    }
}

controller.delete = async function(req,res){
    try {
        await model.negara.destroy({
            where:{
                id: req.params.id
            }
        })

        req.flash('alertMessage', "Negara Has Been Deleted")
        req.flash('alertStatus', "success")

        res.redirect('/negara')
    } catch (error) {
        req.flash('alertMessage', `${error.message}`)
        req.flash('alertStatus', 'danger')
        res.redirect('/negara')
    }
}

module.exports= controller

