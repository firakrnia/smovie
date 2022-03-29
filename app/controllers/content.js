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

        // const content = await model.content.findAll()
        const content = await model.content.findAll({ include: [{model: model.negara}, {model: model.category, through: {
            attributes: []
          }}] })

        res.render('admin/content/viewContent', {
            content, 
            alert
            // name: req.session.user.name,
            // title: 'content Page'
        })
    } catch (error) {
        req.flash('alertMessage', `${error.message}`)
        req.flash('alertStatus', 'danger')
        res.redirect('/content')
        
    }
}

controller.viewAdd = async function(req, res){
    try {
        const negara = await model.negara.findAll()
        const category = await model.category.findAll()

        res.render('admin/content/create', {
            category, 
            negara,
            // name: req.session.user.name,
            // title: 'content Page'
        })
    } catch (error) {
        req.flash('alertMessage', `${error.message}`)
        req.flash('alertStatus', 'danger')
        res.redirect('/content')
    }
}

controller.store = async function(req,res){
    try {
        if(req.file){
            let tmp_path= req.file.path;
            let originaExt = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1];
            let filename = req.file.filename + '.' + originaExt;
            let target_path = path.resolve(config.rootPath, `public/sampul/${filename}`)
    
            const src = fs.createReadStream(tmp_path)
            const dest = fs.createWriteStream(target_path)
    
            src.pipe(dest)
    
            src.on('end', async ()=>{
              try {
                const category = await model.category.findAll({
                    where: {
                        id: req.body.category
                    }
                })
                const content = await model.content.create({
                    nama: req.body.nama,
                    id_negara: req.body.id_negara,
                    sinopsis: req.body.sinopsis,
                    jenis: req.body.jenis,
                    tahun: req.body.tahun,
                    sampul_film: filename
                })

                const contentCategory = await content.addCategory(category)
    
                req.flash('alertMessage', "Content Has Been Created")
                req.flash('alertStatus', "success")
          
                res.redirect('/content')
                
              } catch (error) {
                req.flash('alertMessage', `${error.message}`)
                req.flash('alertStatus', 'danger')
                res.redirect('/content')
              }
            })
          }else{
            const category = await model.category.findAll({
                    where: {
                        id: req.body.category
                    }
                })
                const content = await model.content.create({
                    nama: req.body.nama,
                    id_negara: req.body.id_negara,
                    sinopsis: req.body.sinopsis,
                    jenis: req.body.jenis,
                    tahun: req.body.tahun
                })

                const contentCategory = await content.addCategory(category)
        req.flash('alertMessage', "content Has Been Created")
        req.flash('alertStatus', "success")

        res.redirect('/content')
        }
    }catch (error) {
        req.flash('alertMessage', `${error.message}`)
        req.flash('alertStatus', 'danger')
        res.redirect('/content')
    }
}

controller.viewEdit = async function(req, res){
    try {
        const category = await model.category.findAll()
        const negara = await model.negara.findAll()
        const content = await model.content.findOne({
            where:{
                id: req.params.id
            },
            include: [{model: model.negara}, {model: model.category, through: {
                attributes: []
              }}]
        })

        res.render('admin/content/edit', {
            content,
            category,
            negara,
            // name: req.session.user.name,
            // title: 'content Page'
        })
    } catch (error) {
        req.flash('alertMessage', `${error.message}`)
        req.flash('alertStatus', 'danger')
        res.redirect('/content')
    }
}

controller.put = async function(req,res){
    try {
        if(req.file){
            let tmp_path= req.file.path;
            let originaExt = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1];
            let filename = req.file.filename + '.' + originaExt;
            let target_path = path.resolve(config.rootPath, `public/sampul/${filename}`)
    
            const src = fs.createReadStream(tmp_path)
            const dest = fs.createWriteStream(target_path)
    
            src.pipe(dest)
    
            src.on('end', async ()=>{
                try {

                    // const category = await model.category.findAll({
                    //     where: {
                    //         id: req.body.category
                    //     }
                    // })
                    const content = await model.content.update({
                        nama: req.body.nama,
                        id_negara: req.body.id_negara,
                        sinopsis: req.body.sinopsis,
                        sampul_film: filename
                    },{
                        where:{
                            id: req.params.id
                        }
                    })
    
        
                    req.flash('alertMessage', "content Has Been Updated")
                    req.flash('alertStatus', "success")
              
                    res.redirect('/content')
                    // res.status(200).json(content)
                    
                  } catch (error) {
                    req.flash('alertMessage', `${error.message}`)
                    req.flash('alertStatus', 'danger')
                    res.redirect('/content')
                    // res.status(404).json({message: error.message})
                  }
                })
            }else{
                // const category = await model.category.findAll({
                //     where: {
                //         id: req.body.category
                //     }
                // })
                const content = await model.content.update({
                    nama: req.body.nama,
                    id_negara: req.body.id_negara,
                    sinopsis: req.body.sinopsis,
                },{
                    where:{
                        id: req.params.id
                    }
                })

            req.flash('alertMessage', "content Has Been Updated")
            req.flash('alertStatus', "success")

            res.redirect('/content')
            }
          
    } catch (error) {
        req.flash('alertMessage', `${error.message}`)
        req.flash('alertStatus', 'danger')
        res.redirect('/content')
        // res.status(404).json({message: error.message})
    }
}

controller.delete = async function(req,res){
    try {
        await model.content.destroy({
            where:{
                id: req.params.id
            }
        })

        req.flash('alertMessage', "content Has Been Deleted")
        req.flash('alertStatus', "success")

        res.redirect('/content')
    } catch (error) {
        req.flash('alertMessage', `${error.message}`)
        req.flash('alertStatus', 'danger')
        res.redirect('/content')
    }
}

controller.updateStatus = async function(req, res){
    try {
        let contentStatus = await model.content.findOne({
            where:{
                id: req.params.id
            }
        })
        let updateStatus = contentStatus.status === 'Y'?'N':'Y'

        const content = await model.content.update({
            status: updateStatus
        },{
            where:{
                id: req.params.id
            }
        })

        req.flash('alertMessage', "Status Has Been Updated")
        req.flash('alertStatus', "success")

        res.redirect('/content')
    } catch (error) {
        req.flash('alertMessage', `${error.message}`)
        req.flash('alertStatus', 'danger')
        res.redirect('/content')
    }
}

module.exports= controller

