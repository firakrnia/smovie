const controller ={}
const dashboard = require('./dashboard')
const category = require('./category')
const specification = require ('./specification')
const product = require('./product')
const bank = require('./bank')
const payment = require('./payment')
const user = require('./user')
const negara = require('./negara')

controller.dashboard = dashboard
controller.category = category
controller.specification = specification
controller.product = product
controller.bank = bank
controller.payment = payment
controller.user = user
controller.negara = negara

module.exports= controller