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
        const video = await model.video.findAll({ include: {model: model.content} })

        res.render('admin/video/viewVideo', {
            alert,
            video
            // name: req.session.user.name,
            // title: 'video Page'
        })
        // res.status(200).json('success')
    } catch (error) {
        req.flash('alertMessage', `${error.message}`)
        req.flash('alertStatus', 'danger')
        res.redirect('/video')
        
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

        res.render('admin/video/create', {
            content,
            // name: req.session.user.name,
            // title: 'video Page'
        })
    } catch (error) {
        req.flash('alertMessage', `${error.message}`)
        req.flash('alertStatus', 'danger')
        res.redirect('/video')
    }
}

controller.store = async function(req,res){
    try {
        if(req.file){
            let tmp_path= req.file.path;
            let originaExt = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1];
            let filename = req.file.filename + '.' + originaExt;
            let target_path = path.resolve(config.rootPath, `public/video/${filename}`)
    
            const src = fs.createReadStream(tmp_path)
            const dest = fs.createWriteStream(target_path)
    
            src.pipe(dest)
    
            src.on('end', async ()=>{
              try {
                const video = await model.video.create({
                    id_content: req.body.id_content,
                    video: filename
                })
    
                req.flash('alertMessage', "video Has Been Created")
                req.flash('alertStatus', "success")
          
                res.redirect('/video')
                
              } catch (error) {
                req.flash('alertMessage', `${error.message}`)
                req.flash('alertStatus', 'danger')
                res.redirect('/video')
              }
            })
          }else{
            const video = await model.video.create({
                id_content: req.body.id_content,
                video: filename
            })

        req.flash('alertMessage', "video Has Been Created")
        req.flash('alertStatus', "success")

        res.redirect('/video')
        }
    }catch (error) {
        req.flash('alertMessage', `${error.message}`)
        req.flash('alertStatus', 'danger')
        res.redirect('/video')
    }
}

controller.viewEdit = async function(req, res){
    try {
        const content = await model.content.findAll()
        const video = await model.video.findOne({
            where:{
                id: req.params.id
            },
            include: {model: model.content}
        })

        res.render('admin/video/edit', {
            video,
            content,
            // name: req.session.user.name,
            // title: 'video Page'
        })
    } catch (error) {
        req.flash('alertMessage', `${error.message}`)
        req.flash('alertStatus', 'danger')
        res.redirect('/video')
    }
}

controller.put = async function(req,res){
    try {
        if(req.file){
            let tmp_path= req.file.path;
            let originaExt = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1];
            let filename = req.file.filename + '.' + originaExt;
            let target_path = path.resolve(config.rootPath, `public/video/${filename}`)
    
            const src = fs.createReadStream(tmp_path)
            const dest = fs.createWriteStream(target_path)
    
            src.pipe(dest)
    
            src.on('end', async ()=>{
                try {
                    const video = await model.video.update({
                        id_content: req.body.id_content,
                        video: filename
                    },{
                        where:{
                                id: req.params.id
                            }
                    })
    
        
                    req.flash('alertMessage', "video Has Been Updated")
                    req.flash('alertStatus', "success")
              
                    res.redirect('/video')
                    // res.status(200).json(video)
                    
                  } catch (error) {
                    req.flash('alertMessage', `${error.message}`)
                    req.flash('alertStatus', 'danger')
                    res.redirect('/video')
                    // res.status(404).json({message: error.message})
                  }
                })
            }else{
                // const category = await model.category.findAll({
                //     where: {
                //         id: req.body.category
                //     }
                // })
                const video = await model.video.update({
                    id_content: req.body.id_content,
                    video: filename
                },{
                    where:{
                            id: req.params.id
                        }
                })

            req.flash('alertMessage', "video Has Been Updated")
            req.flash('alertStatus', "success")

            res.redirect('/video')
            }
          
    } catch (error) {
        req.flash('alertMessage', `${error.message}`)
        req.flash('alertStatus', 'danger')
        res.redirect('/video')
        // res.status(404).json({message: error.message})
    }
}

controller.delete = async function(req,res){
    try {
        await model.video.destroy({
            where:{
                id: req.params.id
            }
        })

        req.flash('alertMessage', "video Has Been Deleted")
        req.flash('alertStatus', "success")

        res.redirect('/video')
    } catch (error) {
        req.flash('alertMessage', `${error.message}`)
        req.flash('alertStatus', 'danger')
        res.redirect('/video')
    }
}

module.exports= controller

