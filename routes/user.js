const express = require('express')
const router = express.Router()
const controller = require("../app/controllers/index")

router.post('/register', controller.user.postRegister)
router.get('/login', controller.user.viewSignin)
router.post('/login', controller.user.postLogin)
router.get('/logout', controller.user.actionLogout)

module.exports = router;