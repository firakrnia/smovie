const model= {}
// const player= require('./player')
const negara= require('./negara')
// const spec= require('./ca')
const content = require('./content')
const bank = require('./bank')
const payment = require('./payment')
const user = require('./user')
const category = require('./category')


// model.player= player
model.negara= negara
model.category=category
model.content= content
model.bank = bank
model.payment = payment
model.user = user
module.exports= model