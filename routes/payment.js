const express = require('express')
const router = express.Router()
const controller = require("../app/controllers/index")
const { isLoginAdmin } = require('../app/middleware/auth')

router.use(isLoginAdmin)
router.get('/', controller.payment.index)
router.get('/add', controller.payment.viewAdd)
router.post('/add', controller.payment.store)
router.get('/edit/:id', controller.payment.viewEdit)
router.put('/edit/:id', controller.payment.put)
router.delete('/delete/:id', controller.payment.delete)
router.put('/status/:id', controller.payment.updateStatus)

module.exports = router;