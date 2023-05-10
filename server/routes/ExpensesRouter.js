const Router = require('express')
const router = new Router()
const expensesController = require('../controllers/ExpensesController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/',checkRole('Admin'), expensesController.create)
router.get('/',checkRole('Admin'),expensesController.getAll)


module.exports = router