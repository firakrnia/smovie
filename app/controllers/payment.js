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
        const payment = await model.payment.findAll({
            include: {model: model.bank, thorough:{attributes:[]}}
        })

        console.log("alert >>")
        console.log(alert)

        res.render('admin/payment/viewPayment', {
            payment, 
            alert,
            name: req.session.user.name,
            title: 'Payment Page'
        })
    } catch (error) {
        req.flash('alertMessage', `${error.message}`)
        req.flash('alertStatus', 'danger')
        res.redirect('/payment')
    }
}

controller.viewAdd = async function(req, res){
    try {
        const bank = await model.bank.findAll()

        res.render('admin/payment/create', {
            bank,
            name: req.session.user.name,
            title: 'Payment Page'
        })
    } catch (error) {
        req.flash('alertMessage', `${error.message}`)
        req.flash('alertStatus', 'danger')
        res.redirect('/payment')
    }
}

controller.store = async function(req,res){
    try {
        const bank = await model.bank.findAll({
            where:{
                id: req.body.bank
            }
        })

        const payment = await model.payment.create({
            type: req.body.type       
        })

        const bankPayment = await payment.addBank(bank)

        req.flash('alertMessage', "Payment Has Been Created")
        req.flash('alertStatus', "success")

        res.redirect('/payment')
    } catch (error) {
        req.flash('alertMessage', `${error.message}`)
        req.flash('alertStatus', 'danger')
        res.redirect('/payment')
    }
}

controller.viewEdit = async function(req, res){
    try {
        const bank = await model.bank.findAll()

        const payment = await model.payment.findOne({
            where:{
                id: req.params.id
            },
            include: {
                model: model.bank,
                thorough:{
                    attributes:[]
                }
            }
        })

        res.render('admin/payment/edit', {
            payment, 
            bank,
            name: req.session.user.name,
            title: 'Payment Page'
        })
    } catch (error) {
        req.flash('alertMessage', `${error.message}`)
        req.flash('alertStatus', 'danger')
        res.redirect('/payment')
    }
}

controller.put = async function(req,res){
    try {
        await model.payment.update({
            name: req.body.name
        },{
            where:{
                id: req.params.id
            }
        })

        req.flash('alertMessage', "Payment Has Been Updated")
        req.flash('alertStatus', "success")

        res.redirect('/payment')
    } catch (error) {
        req.flash('alertMessage', `${error.message}`)
        req.flash('alertStatus', 'danger')
        res.redirect('/payment')
    }
}

controller.delete = async function(req,res){
    try {
        await model.payment.destroy({
            where:{
                id: req.params.id
            }
        })

        req.flash('alertMessage', "Payment Has Been Deleted")
        req.flash('alertStatus', "success")

        res.redirect('/payment')
    } catch (error) {
        req.flash('alertMessage', `${error.message}`)
        req.flash('alertStatus', 'danger')
        res.redirect('/payment')
    }
}

controller.updateStatus = async function(req, res){
    try {
        let paymentStatus = await model.payment.findOne({
            where:{
                id: req.params.id
            }
        })
        let updateStatus = paymentStatus.status === 'Y'?'N':'Y'

        const payment = await model.payment.update({
            status: updateStatus
        },{
            where:{
                id: req.params.id
            }
        })

        req.flash('alertMessage', "Status Has Been Updated")
        req.flash('alertStatus', "success")

        res.redirect('/payment')
    } catch (error) {
        req.flash('alertMessage', `${error.message}`)
        req.flash('alertStatus', 'danger')
        res.redirect('/payment')
    }
}

module.exports= controller

