const Router = require('express')
const router = new Router()
const budgetController = require('../controllers/BudgetController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.get('/', checkRole('Admin'), budgetController.getOne)

module.exports = router