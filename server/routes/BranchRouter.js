const Router = require('express')
const router = new Router()
const branchController = require('../controllers/BranchController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('Admin'), branchController.create)
router.get('/', branchController.getAll)
router.get('/:id', branchController.getOne)
// router.delete('/:id',checkRole('Admin'), branchController.delete);

module.exports = router