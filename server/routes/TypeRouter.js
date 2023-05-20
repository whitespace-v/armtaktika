const Router = require('express')
const router = new Router()
const typeController = require('../controllers/TypeController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/',checkRole('Admin'), typeController.create)
router.get('/', typeController.getAll)
router.delete('/:id',checkRole('Admin'), typeController.delete);

module.exports = router