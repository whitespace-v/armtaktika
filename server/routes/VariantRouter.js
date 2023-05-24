const Router = require('express')
const router = new Router()
const variantController = require('../controllers/VariantController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/',checkRole('Admin'), variantController.create)
router.get('/', variantController.getAll)
router.delete('/:id',checkRole('Admin'), variantController.delete);

module.exports = router