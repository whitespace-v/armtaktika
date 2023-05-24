const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const {User} = require('../database/models')
const jwt = require('jsonwebtoken')

const generateJWT = (id, phone, role) => jwt.sign(
    {id, phone, role}, process.env.JWT_KEY, {expiresIn: '999999h'}
)

class UserController {
    async registration(req, res, next) {
        const {phone, password} = req.body
        if (!phone || !password) {
            return next(ApiError.badRequest('Некорректные данные!'))
        }

        const candidate = await User.findOne({where: {phone}})

        if (candidate) {
            return next(ApiError.conflict('Этот номер телефона уже зарегестрирован!'))
        }

        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({phone, role: 'User', password: hashPassword})
        const token = generateJWT(user.id, user.phone, user.role)
        return res.json({token})
    }

    async login(req, res, next) {
        const {phone, password} = req.body
        const user = await User.findOne({where: {phone}})
        if (!user) {
            return next(ApiError.internal('Пользователь не найден!'))
        }

        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword){
            return next(ApiError.internal('Указан неверный пароль!'))
        }
        const token = generateJWT(user.id, user.phone, user.role)
        return res.json({token})
    }

    async check(req, res, next) {
        const token = generateJWT(req.user.id, req.user.phone, req.user.role)
        return res.json({token})
    }
}

module.exports = new UserController()