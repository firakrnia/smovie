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
        const bank = await model.bank.findAll()

        console.log("alert >>")
        console.log(alert)

        res.render('admin/bank/viewBank', {
            bank, 
            alert, 
            name: req.session.user.name,
            title: 'Bank Page'
        })
    } catch (error) {
        req.flash('alertMessage', `${error.message}`)
        req.flash('alertStatus', 'danger')
        res.redirect('/bank')
    }
}

controller.viewAdd = async function(req, res){
    try {
        res.render('admin/bank/create', {
            name: req.session.user.name,
            title: 'Bank Page'
        })
    } catch (error) {
        req.flash('alertMessage', `${error.message}`)
        req.flash('alertStatus', 'danger')
        res.redirect('/bank')
    }
}

controller.store = async function(req,res){
    try {
        await model.bank.create({
            name: req.body.name,
            bank_name: req.body.bank_name,
            norek: req.body.norek
        })

        req.flash('alertMessage', "Bank Has Been Created")
        req.flash('alertStatus', "success")

        res.redirect('/bank')
    } catch (error) {
        req.flash('alertMessage', `${error.message}`)
        req.flash('alertStatus', 'danger')
        res.redirect('/bank')
    }
}

controller.viewEdit = async function(req, res){
    try {
        const bank = await model.bank.findOne({
            where:{
                id: req.params.id
            }
        })

        res.render('admin/bank/edit', {
            bank,
            name: req.session.user.name,
            title: 'Bank Page'
        })
    } catch (error) {
        req.flash('alertMessage', `${error.message}`)
        req.flash('alertStatus', 'danger')
        res.redirect('/bank')
    }
}

controller.put = async function(req,res){
    try {
        await model.bank.update({
            name: req.body.name,
            bank_name: req.body.bank_name,
            norek: req.body.norek
        },{
            where:{
                id: req.params.id
            }
        })

        req.flash('alertMessage', "Bank Has Been Updated")
        req.flash('alertStatus', "success")

        res.redirect('/bank')
    } catch (error) {
        req.flash('alertMessage', `${error.message}`)
        req.flash('alertStatus', 'danger')
        res.redirect('/bank')
    }
}

controller.delete = async function(req,res){
    try {
        await model.bank.destroy({
            where:{
                id: req.params.id
            }
        })

        req.flash('alertMessage', "Bank Has Been Deleted")
        req.flash('alertStatus', "success")

        res.redirect('/bank')
    } catch (error) {
        req.flash('alertMessage', `${error.message}`)
        req.flash('alertStatus', 'danger')
        res.redirect('/bank')
    }
}

module.exports= controller

