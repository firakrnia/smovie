const express = require('express')
const router = express.Router()
const controller = require("../app/controllers/index")
const multer = require('multer')
const os = require('os')
// const { isLoginAdmin } = require('../app/middleware/auth')

// router.use(isLoginAdmin)
router.get('/', controller.content.index)
router.get('/add',  controller.content.viewAdd)
router.post('/add', multer({dest:os.tmpdir()}).single('image'), controller.content.store)
router.get('/edit/:id', controller.content.viewEdit)
router.put('/edit/:id', multer({dest:os.tmpdir()}).single('image'), controller.content.put)
router.delete('/delete/:id', controller.content.delete)

module.exports = router;