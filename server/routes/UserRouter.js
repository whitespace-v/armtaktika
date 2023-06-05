const Router = require('express')
const router = new Router()
const UserController = require('../controllers/UserController')
const authMiddleware = require('../middleware/authMiddleware')

//router - controller
router.post('/signup', UserController.registration) //sign up
router.post('/signin', UserController.login) //sign in
router.get('/check', authMiddleware, UserController.check )  //check auth status

module.exports = router