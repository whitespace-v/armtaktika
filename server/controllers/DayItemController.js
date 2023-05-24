const {Expenses, Branch, DayItem, ItemSize} = require('../database/models')

class DayItemController {
    async create(req,res){
        try{
            const {item, size, price, quantity, dayId, branchId} = req.body
            const model = await DayItem.create({
                itemId: item.id,
                itemName: item.name,
                itemPrice: price,
                itemSizeName: size.name,
                itemSizeId: size.id,
                itemQuantity: quantity,
                dayId
            })
            await ItemSize.findOne({where: {id: size.id}}).then(s =>
                s.update({quantity: Number(s.quantity) - quantity})
            )
            await Branch.findOne({where: {id: branchId}}).then(b =>
                b.update({
                    cash: b.cash + item.price * quantity,
                    income: b.cash + item.price * quantity
                })
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
    async delete(req,res){
        try{
            const {id, branchId, sizeId, quantity} = req.body
            await DayItem.findOne({where: {id}}).then(async i => {
                    await Branch.findOne({where: {id: branchId}}).then(async b => {
                            b.update({
                                cash: Number(b.cash) - Number(i.itemPrice) * Number(i.itemQuantity),
                                income: Number(b.cash) - Number(i.itemPrice) * Number(i.itemQuantity)
                            })
                        }
                    )
                    await i.destroy()
                }
            )
            await ItemSize.findOne({where: {id: sizeId}}).then(s =>
                s.update({quantity: Number(s.quantity) + Number(quantity)})
            )
            return res.json('deleted')
        } catch (e) {
            return res.json(e)
        }
    }
}

module.exports = new DayItemController()