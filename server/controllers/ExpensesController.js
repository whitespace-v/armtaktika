const {Expense, Branch} = require('../database/models')

class ExpensesController {
    async create(req,res){
        try{
            const {branchId, expenseSum, expenseName, expenseDate} = req.body
            const model = await Expense.create({
                branchId,
                sum: expenseSum,
                name: expenseName,
                date: expenseDate
            })
            await Branch.findOne({where: {id: branchId}}).then(async b => {
                    b.update({cash: Number(b.cash) - Number(expenseSum)})
                }
            )
            return res.json(model)
        } catch (e) {
            return res.json(e)
        }
    }
    async getAll(req,res){
        try{
            const {branchId} = req.query
            const model = await Expense.findAll({where: {branchId}, order: [['id', 'DESC']]})
            return res.json(model)
        } catch (e) {
            return res.json(e)
        }
    }
}

module.exports = new ExpensesController()