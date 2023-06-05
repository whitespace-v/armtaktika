const {Branch} = require('../database/models')
const sequelize  = require('../database/database')
class BranchController {
    async create(req,res){
        try {
            const {name} = req.body
            const model = await Branch.create(
                {name, investment: 0, income: 0, cash: 0, profit: 0}
            )
            return res.json(model)
        } catch (e) {
            return res.json(e)
        }

    }
    async getAll(req,res){
        try {
            const model = await Branch.findAll()
            return res.json(model)
        } catch (e) {
            return res.json(e)
        }
    }
    async getOne(req,res){
        try {
            const {id} = req.params
            const model = await Branch.findOne({where: {id}})
            return res.json(model)
        } catch (e) {
            return res.json(e)
        }
    }
}

module.exports = new BranchController()