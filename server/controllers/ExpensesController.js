const {Expenses, Budget} = require('../database/models')

class ExpensesController {
    async create(req,res){
        try{
            const {name, sum, comment} = req.body
            const model = await Expenses.create({name, sum, comment})
            await Budget.findOne({where: {id: 1}}).then(c =>
                c.update({cash: Number(c.cash) - Number(sum)})
            )
            return res.json(model)
        } catch (e) {
            return res.json(e)
        }
    }
    async getAll(req,res){
        try{
            const model = await Expenses.findAll({order: [['id', 'DESC']]})
            return res.json(model)
        } catch (e) {
            return res.json(e)
        }
    }
}

module.exports = new ExpensesController()