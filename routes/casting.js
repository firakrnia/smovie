const express = require('express')
const router = express.Router()
const controller = require("../app/controllers/index")
const multer = require('multer')
const os = require('os')
// const { isLoginAdmin } = require('../app/middleware/auth')

// router.use(isLoginAdmin)
// router.get('/:content.id/casting', controller.casting.index)
// router.get('/:id_content/casting/add',  controller.casting.viewAdd)
// router.post('/:id_content/casting/add', multer({dest:os.tmpdir()}).single('image'), controller.casting.store)
// router.get('/edit/:id_content/casting/:id', controller.casting.viewEdit)
// router.put('/edit/:id', multer({dest:os.tmpdir()}).single('image'), controller.casting.put)
// router.delete('/:id_content/casting/delete/:id', controller.casting.delete)

router.get('/', controller.casting.index)
router.get('/add',  controller.casting.viewAdd)
router.post('/add', multer({dest:os.tmpdir()}).single('foto'), controller.casting.store)
router.get('/edit/:id', controller.casting.viewEdit)
router.put('/edit/:id', multer({dest:os.tmpdir()}).single('foto'), controller.casting.put)
router.delete('/delete/:id', controller.casting.delete)

module.exports = router;