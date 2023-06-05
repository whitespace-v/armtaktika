const {Budget} = require('../database/models')

class BudgetController {
    async getOne(req,res){
        try{
            const model = await Budget.findOne({where: {id: 1}})
            return res.json(model)
        } catch (e) {
            return res.json(e)
        }
    }
}

module.exports = new BudgetController()