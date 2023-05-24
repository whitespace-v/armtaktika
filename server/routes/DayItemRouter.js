const Router = require('express')
const router = new Router()
const dayItemController = require('../controllers/DayItemController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/',checkRole('Admin'), dayItemController.create)
router.get('/',checkRole('Admin'), dayItemController.getAll)
router.delete('/',checkRole('Admin'), dayItemController.delete);

module.exports = router