const Router = require('express')
const router = new Router()
const CDEKController = require('../controllers/CDEKController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/auth', CDEKController.post)

module.exports = router