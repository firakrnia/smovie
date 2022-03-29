const express = require('express')
const router = express.Router()
const controller = require("../app/controllers/index")
// const { isLoginAdmin } = require('../app/middleware/auth')

// router.use(isLoginAdmin)
router.get('/', controller.bank.index)
router.get('/add', controller.bank.viewAdd)
router.post('/add', controller.bank.store)
router.get('/edit/:id', controller.bank.viewEdit)
router.put('/edit/:id', controller.bank.put)
router.delete('/delete/:id', controller.bank.delete)

module.exports = router;