const Router = require('express')
const router = new Router()
const compilationController = require('../controllers/CompilationController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/',checkRole('Admin'), compilationController.create)
router.get('/',compilationController.getAll)
router.get('/:id',compilationController.getOne)
router.put('/:id',checkRole('Admin'),compilationController.update)
// router.delete('/:id',checkRole('Admin'), itemController.delete);

module.exports = router