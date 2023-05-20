const {Day, DayItem} = require('../database/models')

class DayController {
    async create(req,res){
        try {
            const {name, branchId} = req.body
            const model = await Day.create({name, branchId})
            return res.json(model)
        } catch (e) {
            return res.json(e)
        }

    }
    async getAll(req,res){
        try {
            const {branchId} = req.query
            const model = await Day.findAll({where: {branchId},
                include: [{model: DayItem, as: 'items'}],
            })
            return res.json(model)
        } catch (e) {
            return res.json(e)
        }

    }
    // async delete(req,res){
    //     try{
    //         const {dayItemId} = req.params;
    //         await DaysItem.destroy({where: {id}})
    //         return res.json({message: "deleted"});
    //     } catch (e) {
    //         return res.json(e);
    //     }
    // }
}

module.exports = new DayController()