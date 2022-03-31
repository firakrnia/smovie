const controller ={}
const dashboard = require('./dashboard')
const category = require('./category')
const user = require('./user')
const negara = require('./negara')
const content = require('./content')
const casting = require('./casting')
const video = require('./video')

controller.dashboard = dashboard
controller.category = category
controller.user = user
controller.negara = negara
controller.content = content
controller.casting = casting
controller.video = video

module.exports= controller