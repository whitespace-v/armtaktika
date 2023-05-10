const {ItemSize, Budget} = require('../database/models')
const sequelize  = require('../database/database')
class SizeController {
    async create(req,res){
        try {
            const {itemId, name, quantity, purchase} = req.body
            const model = await ItemSize.create({itemId, name, quantity})
            await Budget.findOne({where: {id: 1}}).then(async d =>
                d.update({investment: d.investment + purchase * quantity})
            )
            return res.json(model)
        } catch (e) {
            return res.json(e)
        }

    }
    async getAll(req,res){
        try {
            const {itemId} = req.body
            const model = await ItemSize.findAll({
                where: {itemId},
                order: [[sequelize.cast(sequelize.col('name'), 'BIGINT'), 'DESC']]
            })
            return res.json(model)
        } catch (e) {
            return res.json(e)
        }
    }
    async delete(req,res){
        try{
            const {id} = req.params;
            const {quantity, purchase} = req.query
            await ItemSize.destroy({where: {id}})
            await Budget.findOne({where: {id: 1}}).then(async d =>
                d.update({investment: d.investment - purchase * quantity})
            )
            return res.json({message: "deleted"});
        } catch (e) {
            return res.json(e);
        }
    }
    async update(req,res) {
        try{
            const {id} = req.params;
            const {quantity, purchase} = req.body
            const d = await ItemSize.findOne({where: {id}})
            await d.update({quantity})
            await Budget.findOne({where: {id: 1}}).then(async d =>
                d.update({investment: d.investment + purchase * quantity})
            )
            return res.json({message: "updated"});
        } catch (e) {
            return res.json(e);
        }
    }
}

module.exports = new SizeController()