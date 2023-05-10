const Router = require('express')
const router = new Router()
const categoryController = require('../controllers/CategoryController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/',checkRole('Admin'), categoryController.create)
router.get('/',categoryController.getAll)
router.delete('/:id',checkRole('Admin'), categoryController.delete);

module.exports = router