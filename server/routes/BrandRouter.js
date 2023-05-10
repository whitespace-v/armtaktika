const Router = require('express')
const router = new Router()
const brandController = require('../controllers/BrandController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('Admin'), brandController.create)
router.get('/', brandController.getAll)
router.delete('/:id',checkRole('Admin'), brandController.delete);

module.exports = router