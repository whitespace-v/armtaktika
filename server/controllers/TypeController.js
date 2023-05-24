const {Type} = require('../database/models')

class TypeController {
    async create(req, res){
        try{
            const {category, name} = req.body
            const model = await Type.create({categoryId: category.id, name})
            return res.json(model)
        } catch (e) {
            return res.json(e)
        }

    }
    async getAll(req,res){
        try{
            const {category} = req.query
            const model = await Type.findAll({where: {categoryId: category.id}})
            return res.json(model)
        } catch (e) {
            return res.json(e)
        }
    }
    async delete(req,res){
        try{
            const {id} = req.params;
            await Type.destroy({where: {id}})
            return res.json({message: "deleted"});
        } catch (e) {
            return res.json(e);
        }
    }
}

module.exports = new TypeController()