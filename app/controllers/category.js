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
        const category = await model.category.findAll()

        console.log("alert >>")
        console.log(alert)

        res.render('admin/category/viewCategory', {
            category, 
            alert,
            name: req.session.user.name,
            title: 'Category Page'
        })
    } catch (error) {
        req.flash('alertMessage', `${error.message}`)
        req.flash('alertStatus', 'danger')
        res.redirect('/category')
    }
}

controller.viewAdd = async function(req, res){
    try {
        res.render('admin/category/create', {
            name: req.session.user.name,
            title: 'Category Page'
        })
    } catch (error) {
        req.flash('alertMessage', `${error.message}`)
        req.flash('alertStatus', 'danger')
        res.redirect('/category')
    }
}

controller.store = async function(req,res){
    try {
        await model.category.create({
            name: req.body.name
        })

        req.flash('alertMessage', "Category Has Been Created")
        req.flash('alertStatus', "success")

        res.redirect('/category')
    } catch (error) {
        req.flash('alertMessage', `${error.message}`)
        req.flash('alertStatus', 'danger')
        res.redirect('/category')
    }
}

controller.viewEdit = async function(req, res){
    try {
        const category = await model.category.findOne({
            where:{
                id: req.params.id
            }
        })

        res.render('admin/category/edit', {
            category,
            name: req.session.user.name,
            title: 'Category Page'
        })
    } catch (error) {
        req.flash('alertMessage', `${error.message}`)
        req.flash('alertStatus', 'danger')
        res.redirect('/category')
    }
}

controller.put = async function(req,res){
    try {
        await model.category.update({
            name: req.body.name
        },{
            where:{
                id: req.params.id
            }
        })

        req.flash('alertMessage', "Category Has Been Updated")
        req.flash('alertStatus', "success")

        res.redirect('/category')
    } catch (error) {
        req.flash('alertMessage', `${error.message}`)
        req.flash('alertStatus', 'danger')
        res.redirect('/category')
    }
}

controller.delete = async function(req,res){
    try {
        await model.category.destroy({
            where:{
                id: req.params.id
            }
        })

        req.flash('alertMessage', "Category Has Been Deleted")
        req.flash('alertStatus', "success")

        res.redirect('/category')
    } catch (error) {
        req.flash('alertMessage', `${error.message}`)
        req.flash('alertStatus', 'danger')
        res.redirect('/category')
    }
}

module.exports= controller

