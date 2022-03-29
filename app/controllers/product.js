const controller={}
const model = require('../models/index')
const path = require('path')
const fs = require('fs')
const config = require('../../config/index')

controller.index = async function(req,res,next){
    try {
        const alertMessage = req.flash('alertMessage')
        const alertStatus = req.flash('alertStatus')

        const alert = {
            message: alertMessage,
            status: alertStatus
        }

        const product = await model.product.findAll({ include: [{model: model.category}, {model: model.spec, through: {
            attributes: []
          }}] })

        console.log("alert >>")
        console.log(alert)

        res.render('admin/product/viewProduct', {
            product, 
            alert,
            name: req.session.user.name,
            title: 'Product Page'
        })
    } catch (error) {
        req.flash('alertMessage', `${error.message}`)
        req.flash('alertStatus', 'danger')
        res.redirect('/product')
        
    }
}

controller.viewAdd = async function(req, res){
    try {
        const category = await model.category.findAll()
        const specification = await model.spec.findAll()

        res.render('admin/product/create', {
            category, 
            specification,
            name: req.session.user.name,
            title: 'Product Page'
        })
    } catch (error) {
        req.flash('alertMessage', `${error.message}`)
        req.flash('alertStatus', 'danger')
        res.redirect('/product')
    }
}

controller.store = async function(req,res){
    try {
        if(req.file){
            let tmp_path= req.file.path;
            let originaExt = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1];
            let filename = req.file.filename + '.' + originaExt;
            let target_path = path.resolve(config.rootPath, `public/uploads/products/${filename}`)
    
            const src = fs.createReadStream(tmp_path)
            const dest = fs.createWriteStream(target_path)
    
            src.pipe(dest)
    
            src.on('end', async ()=>{
              try {
                const specification = await model.spec.findAll({
                    where: {
                        id: req.body.specification
                    }
                })
                const product = await model.product.create({
                    name: req.body.name,
                    id_category: req.body.id_category,
                    thumbnail:filename
                })

                const productSpec = await product.addSpecification(specification)
    
                req.flash('alertMessage', "Product Has Been Created")
                req.flash('alertStatus', "success")
          
                res.redirect('/product')
                
              } catch (error) {
                req.flash('alertMessage', `${error.message}`)
                req.flash('alertStatus', 'danger')
                res.redirect('/product')
              }
            })
          }else{
            const specification = await model.spec.findAll({
                where: {
                    id: req.body.specification
                }
            })
            const product = await model.product.create({
                name: req.body.name,
                id_category: req.body.id_category
            })

            productSpec = await product.addSpecification(specification)

        req.flash('alertMessage', "product Has Been Created")
        req.flash('alertStatus', "success")

        res.redirect('/product')
        }
    }catch (error) {
        req.flash('alertMessage', `${error.message}`)
        req.flash('alertStatus', 'danger')
        res.redirect('/product')
    }
}

controller.viewEdit = async function(req, res){
    try {
        const category = await model.category.findAll()
        const specification = await model.spec.findAll()
        const product = await model.product.findOne({
            where:{
                id: req.params.id
            },
            include: [{model: model.category}, {model: model.spec, through: {
                attributes: []
              }}]
        })

        res.render('admin/product/edit', {
            product,
            category,
            specification,
            name: req.session.user.name,
            title: 'Product Page'
        })
    } catch (error) {
        req.flash('alertMessage', `${error.message}`)
        req.flash('alertStatus', 'danger')
        res.redirect('/product')
    }
}

controller.put = async function(req,res){
    try {
        if(req.file){
            let tmp_path= req.file.path;
            let originaExt = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1];
            let filename = req.file.filename + '.' + originaExt;
            let target_path = path.resolve(config.rootPath, `public/uploads/products/${filename}`)
    
            const src = fs.createReadStream(tmp_path)
            const dest = fs.createWriteStream(target_path)
    
            src.pipe(dest)
    
            src.on('end', async ()=>{
                try {

                    const specification = await model.spec.findAll({
                        where: {
                            id: req.body.specification
                        }
                    })
                    const product = await model.product.update({
                        name: req.body.name,
                        id_category: req.body.id_category,
                        thumbnail:filename
                    },{
                        where:{
                            id: req.params.id
                        }
                    })
    
        
                    req.flash('alertMessage', "Product Has Been Updated")
                    req.flash('alertStatus', "success")
              
                    res.redirect('/product')
                    // res.status(200).json(product)
                    
                  } catch (error) {
                    req.flash('alertMessage', `${error.message}`)
                    req.flash('alertStatus', 'danger')
                    res.redirect('/product')
                    // res.status(404).json({message: error.message})
                  }
                })
            }else{
                const product = await model.product.update({
                    name: req.body.name,
                    id_category: req.body.id_category
                },{
                    where:{
                        id: req.params.id
                    }
                })

            req.flash('alertMessage', "product Has Been Updated")
            req.flash('alertStatus', "success")

            res.redirect('/product')
            }
          
    } catch (error) {
        req.flash('alertMessage', `${error.message}`)
        req.flash('alertStatus', 'danger')
        res.redirect('/product')
        // res.status(404).json({message: error.message})
    }
}

controller.delete = async function(req,res){
    try {
        await model.product.destroy({
            where:{
                id: req.params.id
            }
        })

        req.flash('alertMessage', "Product Has Been Deleted")
        req.flash('alertStatus', "success")

        res.redirect('/product')
    } catch (error) {
        req.flash('alertMessage', `${error.message}`)
        req.flash('alertStatus', 'danger')
        res.redirect('/product')
    }
}

controller.updateStatus = async function(req, res){
    try {
        let productStatus = await model.product.findOne({
            where:{
                id: req.params.id
            }
        })
        let updateStatus = productStatus.status === 'Y'?'N':'Y'

        const product = await model.product.update({
            status: updateStatus
        },{
            where:{
                id: req.params.id
            }
        })

        req.flash('alertMessage', "Status Has Been Updated")
        req.flash('alertStatus', "success")

        res.redirect('/product')
    } catch (error) {
        req.flash('alertMessage', `${error.message}`)
        req.flash('alertStatus', 'danger')
        res.redirect('/product')
    }
}

module.exports= controller

