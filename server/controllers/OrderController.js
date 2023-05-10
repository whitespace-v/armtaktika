const {Orders, Budget, ItemSize} = require('../database/models')

class OrderController {
    async create(req,res){
        try {
            const {order, sum, name, surname, patronymic, phone,
                comment, delivery, deliveryCity, deliveryAddress, items, jsonItems} = req.body
            const model = await Orders.create({order, sum, name, surname, patronymic, phone,
                comment, delivery, deliveryCity, deliveryAddress, items, jsonItems: JSON.stringify(jsonItems),
                branch: 'Cайт'})
            return res.json(model)
        } catch (e) {
            return res.json(e)
        }

    }
    async getAll(req,res){
        try {
            const {page} = req.query
            const limit = 15
            const offset = page * limit - limit
            const model = await Orders.findAndCountAll({
                offset, limit,
                distinct: true,
                order:[['id', 'DESC']]
            })
            return res.json(model)
        } catch (e) {
            return res.json(e)
        }
    }
    async delete(req,res){
        try{
            const {id} = req.params;
            await Orders.destroy({where: {id}})
            return res.json({message: "deleted"});
        } catch (e) {
            return res.json(e);
        }
    }
    async update(req,res) {
        try{
            const {id} = req.params;
            const {json, branch} = req.body;
            const parsedJSON = JSON.parse(json)
            await Orders.findOne({where: {id}}).then( async d => {
                if (d.status === 'Не завершен') {
                    await d.update({status: 'Завершен', branch})
                    await Budget.findOne({where: {id: 1}})
                        .then(async b => {
                                let cash = b.cash
                                let income = b.income
                                for (let i in parsedJSON) {
                                    cash += Number(parsedJSON[i].price) * Number(parsedJSON[i].quantity)
                                    income += Number(parsedJSON[i].purchase) * Number(parsedJSON[i].quantity)
                                }
                                await b.update({cash, income})
                            }
                        )
                    for (let i in parsedJSON) {
                        await ItemSize.findOne({where: {id: parsedJSON[i].sizeId}}).then( async item => {
                                await item.update({quantity: Number(item.quantity) - Number(parsedJSON[i].quantity)})
                            }
                        )

                    }

                } else{
                    await d.update({status: 'Не завершен'})
                    await Budget.findOne({where: {id: 1}})
                        .then(async b => {
                                let cash = b.cash
                                let income = b.income
                                for (let i in parsedJSON) {
                                    cash -= Number(parsedJSON[i].price) * Number(parsedJSON[i].quantity)
                                    income -= Number(parsedJSON[i].purchase) * Number(parsedJSON[i].quantity)
                                }
                                await b.update({cash, income})
                            }
                        )
                    for (let i in parsedJSON) {
                        await ItemSize.findOne({where: {id: parsedJSON[i].sizeId}}).then( async item => {
                                await item.update({quantity: Number(item.quantity) + Number(parsedJSON[i].quantity)})
                            }
                        )

                    }
                }
            })
            return res.json({message: "updated"});
        } catch (e) {
            return res.json(e);
        }
    }
}

module.exports = new OrderController()