const Router = require('express')
const router = new Router()
const sizeController = require('../controllers/SizeController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/',checkRole('Admin'), sizeController.create)
router.get('/', sizeController.getAll)
router.delete('/:id',checkRole('Admin'), sizeController.delete);
router.put('/:id',checkRole('Admin'), sizeController.update);

module.exports = router