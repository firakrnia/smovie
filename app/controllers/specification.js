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
        const specification = await model.spec.findAll()

        console.log("alert >>")
        console.log(alert)

        res.render('admin/specification/viewSpecification', {
            specification, 
            alert,
            name: req.session.user.name,
            title: 'Specification Page'
        })
    } catch (error) {
        req.flash('alertMessage', `${error.message}`)
        req.flash('alertStatus', 'danger')
        res.redirect('/specification')
    }
}

controller.viewAdd = async function(req, res){
    try {
        res.render('admin/specification/create', {
            name: req.session.user.name,
            title: 'Specification Page'
        })
    } catch (error) {
        req.flash('alertMessage', `${error.message}`)
        req.flash('alertStatus', 'danger')
        res.redirect('/specification')
    }
}

controller.store = async function(req,res){
    try {
        await model.spec.create({
            type: req.body.type,
            type_name: req.body.type_name,
            price: req.body.price
        })

        req.flash('alertMessage', "specification Has Been Created")
        req.flash('alertStatus', "success")

        res.redirect('/specification')
    } catch (error) {
        req.flash('alertMessage', `${error.message}`)
        req.flash('alertStatus', 'danger')
        res.redirect('/specification')
    }
}

controller.viewEdit = async function(req, res){
    try {
        const specification = await model.spec.findOne({
            where:{
                id: req.params.id
            }
        })

        res.render('admin/specification/edit', {
            specification,
            name: req.session.user.name,
            title: 'Specification Page'
        })
    } catch (error) {
        req.flash('alertMessage', `${error.message}`)
        req.flash('alertStatus', 'danger')
        res.redirect('/specification')
    }
}

controller.put = async function(req,res){
    try {
        await model.spec.update({
            type: req.body.type,
            type_name: req.body.type_name,
            price: req.body.price
        },{
            where:{
                id: req.params.id
            }
        })

        req.flash('alertMessage', "specification Has Been Updated")
        req.flash('alertStatus', "success")

        res.redirect('/specification')
    } catch (error) {
        req.flash('alertMessage', `${error.message}`)
        req.flash('alertStatus', 'danger')
        res.redirect('/specification')
    }
}

controller.delete = async function(req,res){
    try {
        await model.spec.destroy({
            where:{
                id: req.params.id
            }
        })

        req.flash('alertMessage', "specification Has Been Deleted")
        req.flash('alertStatus', "success")

        res.redirect('/specification')
    } catch (error) {
        req.flash('alertMessage', `${error.message}`)
        req.flash('alertStatus', 'danger')
        res.redirect('/specification')
    }
}

module.exports= controller

