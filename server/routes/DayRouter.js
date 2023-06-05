const Router = require('express')
const router = new Router()
const dayController = require('../controllers/DayController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/',checkRole('Admin'), dayController.create)
router.get('/',checkRole('Admin'),dayController.getAll)
// router.delete('/:id',checkRole('Admin'), dayController.delete);

module.exports = router