const router = {}
const dashboard = require('./dashboard')
const category = require('./category')
const user = require('./user')
const negara = require('./negara')
const content = require('./content')
const casting = require('./casting')
const video = require('./video')

router.dashboard = dashboard
router.category = category
router.user = user
router.negara = negara
router.content = content
router.casting = casting
router.video = video

module.exports = router;
