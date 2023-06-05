const Router = require('express')
const router = new Router()
const itemController = require('../controllers/ItemController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/',checkRole('Admin'), itemController.create)
router.get('/',itemController.getAll)
router.get('/:id',itemController.getOne)
router.put('/:id',checkRole('Admin'),itemController.update)
router.delete('/:id',checkRole('Admin'), itemController.delete);

module.exports = router