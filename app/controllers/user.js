const controller={}
const model = require('../models/index')
const bcrypt = require("bcryptjs")
const getUser = async obj => {
    return await model.user.findOne({
        where: obj
    });
};

controller.postRegister = async function (req, res) {
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    try {
        let user = await model.user.create({
            email: req.body.email,
            name: req.body.name,
            password: hashPassword,
            phone_number: req.body.phone_number
        })
        res.status(200).json({
            success: true,
            message: "Success",
            data: user
        })

    } catch (error) {
        res.status(404).json({
            message: error.message
        });
    }
}

controller.viewSignin = async function(req,res,next){
    try {
        const alertMessage = req.flash('alertMessage')
        const alertStatus = req.flash('alertStatus')

        const alert = {
            message: alertMessage,
            status: alertStatus
        }

        if (req.session.user === null || req.session.user === undefined) {
          res.render('admin/user/viewsignin', {
            alert,
            title : 'Login Page'
          })
        } else {
          res.redirect('/')
        }
    } catch (error) {
        req.flash('alertMessage', `${error.message}`)
        req.flash('alertStatus', 'danger')
        res.redirect('/user')
    }
}

controller.postLogin = async function (req, res) {
    try {
    const { email, password } = req.body
    const admin = await getUser({ email: email })

    if (admin) {
      if (admin.status === 'Y') {
        const checkPassword = await bcrypt.compare(password, admin.password)
        if (checkPassword) {
          req.session.user = {
            id: admin.id,
            email: admin.email,
            status: admin.status,
            name: admin.name
          }
          res.redirect('/')
        } else {
          req.flash('alertMessage', `Kata sandi yang anda inputkan salah`)
          req.flash('alertStatus', 'danger')
          res.redirect('/login')
        }
      } else {
        req.flash('alertMessage', `Mohon maaf status anda belum aktif`)
        req.flash('alertStatus', 'danger')
        res.redirect('/login')
      }

    } else {
      req.flash('alertMessage', `Email yang anda inputkan salah`)
      req.flash('alertStatus', 'danger')
      res.redirect('/login')
    }

    } catch (err) {
      req.flash('alertMessage', `${err.message}`)
      req.flash('alertStatus', 'danger')
      res.redirect('/')
    }

}

controller.actionLogout  = async function (req, res){
  req.session.destroy();
  res.redirect('/login')
}





module.exports= controller

