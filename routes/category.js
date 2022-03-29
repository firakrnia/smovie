const express = require('express')
const router = express.Router()
const controller = require("../app/controllers/index")
// const { isLoginAdmin } = require('../app/middleware/auth')

// router.use(isLoginAdmin)
router.get('/', controller.category.index)
router.get('/add', controller.category.viewAdd)
router.post('/add', controller.category.store)
router.get('/edit/:id', controller.category.viewEdit)
router.put('/edit/:id', controller.category.put)
router.delete('/delete/:id', controller.category.delete)

module.exports = router;