const {Compilation, CompilationImage, Item, ItemSize} = require('../database/models')
const uuid = require("uuid");
const path = require("path");

class CompilationController {
    async create(req, res){
        try{
            const {name} = req.body
            const {image} = req.files
            const imgName = uuid.v4() + '.png';
            const model = await Compilation.create({name, image: imgName}).then(async d => {
                await CompilationImage.create({img: imgName, compilationId: d.id})
                await image.mv(path.resolve(__dirname,'..', 'static', imgName))
            })
            return res.json(model)
        } catch (e) {
            return res.json(e)
        }

    }
    async getAll(req,res){
        try{
            const model = await Compilation.findAll({
                include: [{model: Item, as: 'items'}]
            })
            return res.json(model)
        } catch (e) {
            return res.json(e)
        }
    }
    async getOne(req,res){
        try{
            const {id} = req.params
            const model = await Compilation.findOne({
                where: {id},
                include: [{model: Item, as: 'items'}]
            })
            return res.json(model)
        } catch (e) {
            return res.json(e)
        }
    }
    async update(req,res){
        try{
            const {id} = req.params;
            const {itemId} = req.body
            const model = await Item.findOne({where: {id: itemId}})
            await model.update({itemCompilationId: id})
            return res.json({message: "updated"});
        } catch (e) {
            return res.json(e);
        }
    }
}

module.exports = new CompilationController()