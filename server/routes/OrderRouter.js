const Router = require('express')
const router = new Router()
const orderController = require('../controllers/OrderController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', orderController.create)
router.get('/',checkRole('Admin'),orderController.getAll)
router.delete('/:id',checkRole('Admin'), orderController.delete);
router.put('/:id',checkRole('Admin'), orderController.update);

module.exports = router