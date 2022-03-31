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

        // const content = await model.content.findOne({
        //     where:{
        //         id: req.params.id
        //     }
        // })
        const casting = await model.casting.findAll({ include: {model: model.content} })

        res.render('admin/casting/viewCast', {
            alert,
            casting
            // name: req.session.user.name,
            // title: 'casting Page'
        })
        // res.status(200).json('success')
    } catch (error) {
        req.flash('alertMessage', `${error.message}`)
        req.flash('alertStatus', 'danger')
        res.redirect('/casting')
        
    }
}

controller.viewAdd = async function(req, res){
    try {
        const content = await model.content.findAll()
        // const content = await model.content.findOne({
        //     where:{
        //         id: req.params.id
        //     }
        // })

        res.render('admin/casting/create', {
            content,
            // name: req.session.user.name,
            // title: 'casting Page'
        })
    } catch (error) {
        req.flash('alertMessage', `${error.message}`)
        req.flash('alertStatus', 'danger')
        res.redirect('/casting')
    }
}

controller.store = async function(req,res){
    try {
        if(req.file){
            let tmp_path= req.file.path;
            let originaExt = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1];
            let filename = req.file.filename + '.' + originaExt;
            let target_path = path.resolve(config.rootPath, `public/cast/${filename}`)
    
            const src = fs.createReadStream(tmp_path)
            const dest = fs.createWriteStream(target_path)
    
            src.pipe(dest)
    
            src.on('end', async ()=>{
              try {
                const casting = await model.casting.create({
                    nama: req.body.nama,
                    id_content: req.body.id_content,
                    foto: filename
                })
    
                req.flash('alertMessage', "casting Has Been Created")
                req.flash('alertStatus', "success")
          
                res.redirect('/casting')
                
              } catch (error) {
                req.flash('alertMessage', `${error.message}`)
                req.flash('alertStatus', 'danger')
                res.redirect('/casting')
              }
            })
          }else{
            const casting = await model.casting.create({
                nama: req.body.nama,
                id_content: req.body.id_content
            })

        req.flash('alertMessage', "casting Has Been Created")
        req.flash('alertStatus', "success")

        res.redirect('/casting')
        }
    }catch (error) {
        req.flash('alertMessage', `${error.message}`)
        req.flash('alertStatus', 'danger')
        res.redirect('/casting')
    }
}

controller.viewEdit = async function(req, res){
    try {
        const content = await model.content.findAll()
        const casting = await model.casting.findOne({
            where:{
                id: req.params.id
            },
            include: {model: model.content}
        })

        res.render('admin/casting/edit', {
            casting,
            content,
            // name: req.session.user.name,
            // title: 'casting Page'
        })
    } catch (error) {
        req.flash('alertMessage', `${error.message}`)
        req.flash('alertStatus', 'danger')
        res.redirect('/casting')
    }
}

controller.put = async function(req,res){
    try {
        if(req.file){
            let tmp_path= req.file.path;
            let originaExt = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1];
            let filename = req.file.filename + '.' + originaExt;
            let target_path = path.resolve(config.rootPath, `public/cast/${filename}`)
    
            const src = fs.createReadStream(tmp_path)
            const dest = fs.createWriteStream(target_path)
    
            src.pipe(dest)
    
            src.on('end', async ()=>{
                try {
                    const casting = await model.casting.update({
                        nama: req.body.nama,
                        id_content: req.body.id_content,
                        foto: filename
                    },{
                        where:{
                                id: req.params.id
                            }
                    })
    
        
                    req.flash('alertMessage', "casting Has Been Updated")
                    req.flash('alertStatus', "success")
              
                    res.redirect('/casting')
                    // res.status(200).json(casting)
                    
                  } catch (error) {
                    req.flash('alertMessage', `${error.message}`)
                    req.flash('alertStatus', 'danger')
                    res.redirect('/casting')
                    // res.status(404).json({message: error.message})
                  }
                })
            }else{
                // const category = await model.category.findAll({
                //     where: {
                //         id: req.body.category
                //     }
                // })
                const casting = await model.casting.update({
                    nama: req.body.nama,
                    id_content: req.body.id_content
                },{
                    where:{
                            id: req.params.id
                        }
                })

            req.flash('alertMessage', "casting Has Been Updated")
            req.flash('alertStatus', "success")

            res.redirect('/casting')
            }
          
    } catch (error) {
        req.flash('alertMessage', `${error.message}`)
        req.flash('alertStatus', 'danger')
        res.redirect('/casting')
        // res.status(404).json({message: error.message})
    }
}

controller.delete = async function(req,res){
    try {
        await model.casting.destroy({
            where:{
                id: req.params.id
            }
        })

        req.flash('alertMessage', "casting Has Been Deleted")
        req.flash('alertStatus', "success")

        res.redirect('/casting')
    } catch (error) {
        req.flash('alertMessage', `${error.message}`)
        req.flash('alertStatus', 'danger')
        res.redirect('/casting')
    }
}

module.exports= controller

