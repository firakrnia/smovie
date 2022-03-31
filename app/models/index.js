const model= {}
const casting= require('./casting')
const negara= require('./negara')
const content = require('./content')
const user = require('./user')
const category = require('./category')
const video = require('./video')


model.casting= casting
model.negara= negara
model.category=category
model.content= content
model.user = user
model.video = video
module.exports= model