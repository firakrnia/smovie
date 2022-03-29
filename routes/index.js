const router = {}
const dashboard = require('./dashboard')
const category = require('./category')
const specification = require('./specification')
const product = require('./product')
const bank = require('./bank')
const payment = require('./payment')
const user = require('./user')

router.dashboard = dashboard
router.category = category
router.specification = specification
router.product = product
router.bank = bank
router.payment = payment
router.user = user

module.exports = router;
