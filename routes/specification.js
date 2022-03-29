const express = require('express')
const router = express.Router()
const controller = require("../app/controllers/index")
// const { isLoginAdmin } = require('../app/middleware/auth')

// router.use(isLoginAdmin)
router.get('/', controller.specification.index)
router.get('/add', controller.specification.viewAdd)
router.post('/add', controller.specification.store)
router.get('/edit/:id', controller.specification.viewEdit)
router.put('/edit/:id', controller.specification.put)
router.delete('/delete/:id', controller.specification.delete)

module.exports = router;