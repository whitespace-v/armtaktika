const {Order, Budget, ItemSize, OrderItem} = require('../database/models')

class OrderController {
    async create(req,res){
        try {
            const {
               orderData, orderItems
            } = req.body

            const model = await Order.create({
                number:orderData.number, name:orderData.name, surname:orderData.surname,
                patronymic: orderData.patronymic, phone: orderData.phone, comment: orderData.comment,
                deliveryMethod: orderData.deliveryMethod, deliveryCity: orderData.deliveryCity,
                deliveryAddress: orderData.deliveryAddress, status: 'Открыт'
            }).then(async d => {
                    for (let i in orderItems){
                        await OrderItem.create({
                            orderId: d.id, itemId: orderItems[i].itemId, itemName: orderItems[i].itemName,
                            itemPrice: orderItems[i].itemPrice, itemSize: orderItems[i].itemSize,
                            itemQuantity: orderItems[i].itemQuantity
                        })
                    }
                }
            )
            return res.json(model)
        } catch (e) {
            return res.json(e)
        }

    }
    async getAll(req,res){
        try {
            const model = await Order.findAll({
                order: [['id', 'DESC']],
                include: [{model: OrderItem, as: 'items'}]
            })
            return res.json(model)
        } catch (e) {
            console.log(e)
            return res.json(e)
        }
    }
    async delete(req,res){
        try{
            const {id} = req.params;
            await Order.destroy({where: {id}})
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
            await Order.findOne({where: {id}}).then( async d => {
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
                        await ItemSize.findOne({where: {id: parsedJSON[i].sizeId}}).then( async d => {
                                await d.update({quantity: Number(d.quantity) - Number(d[i].quantity)})
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