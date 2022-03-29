const controller ={}
const dashboard = require('./dashboard')
const category = require('./category')
const specification = require ('./specification')
const product = require('./product')
const bank = require('./bank')
const payment = require('./payment')
const user = require('./user')

controller.dashboard = dashboard
controller.category = category
controller.specification = specification
controller.product = product
controller.bank = bank
controller.payment = payment
controller.user = user

module.exports= controller