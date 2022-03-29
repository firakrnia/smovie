const express = require('express')
const router = express.Router()
const controller = require("../app/controllers/index")
const multer = require('multer')
const os = require('os')
const { isLoginAdmin } = require('../app/middleware/auth')

router.use(isLoginAdmin)
router.get('/', controller.product.index)
router.get('/add',  controller.product.viewAdd)
router.post('/add', multer({dest:os.tmpdir()}).single('image'), controller.product.store)
router.get('/edit/:id', controller.product.viewEdit)
router.put('/edit/:id', multer({dest:os.tmpdir()}).single('image'), controller.product.put)
router.delete('/delete/:id', controller.product.delete)
router.put('/status/:id', controller.product.updateStatus)

module.exports = router;