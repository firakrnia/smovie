const express = require('express')
const router = express.Router()
const controller = require("../app/controllers/index")
const { isLoginAdmin } = require('../app/middleware/auth')

router.use(isLoginAdmin)
router.get('/',controller.dashboard.index);

module.exports = router;