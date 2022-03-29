const express = require('express')
const router = express.Router()
const controller = require("../app/controllers/index")
// const { isLoginAdmin } = require('../app/middleware/auth')

// router.use(isLoginAdmin)
router.get('/', controller.negara.index)
router.get('/add', controller.negara.viewAdd)
router.post('/add', controller.negara.store)
router.get('/edit/:id', controller.negara.viewEdit)
router.put('/edit/:id', controller.negara.put)
router.delete('/delete/:id', controller.negara.delete)

module.exports = router;