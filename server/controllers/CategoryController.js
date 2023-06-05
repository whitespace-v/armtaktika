const {Category} = require('../database/models')

class CategoryController {
    async create(req,res){
        try {
            const {name} = req.body
            const model = await Category.create({name})
            return res.json(model)
        } catch (e) {
            return res.json(e)
        }

    }
    async getAll(req,res){
        try {
            const model = await Category.findAll()
            return res.json(model)
        } catch (e) {
            return res.json(e)
        }

    }
    async delete(req,res){
        try{
            const {id} = req.params;
            await Category.destroy({where: {id}})
            return res.json({message: "deleted"});
        } catch (e) {
            return res.json(e);
        }
    }
}

module.exports = new CategoryController()