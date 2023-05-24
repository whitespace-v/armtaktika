const {Item, ItemSize, ItemImage, Budget, Category} = require('../database/models')
const path = require('path')
const uuid = require('uuid')
const sequelize  = require('../database/database')

class ItemController {
    async create(req,res){
        try {
            const {name, price, purchase, weight, height, length, width, categoryId, typeId, brandId, description, variants} = req.body
            const {images} = req.files
            let imgName = uuid.v4() + '.png';
            const model = await Item.create({name, price, weight, purchase,
                height, length, width, categoryId, typeId, brandId, description,
                image: imgName, variants, oldPrice: 0
            }).then(images[0].mv(path.resolve(__dirname,'..', 'static', imgName)))
            for (let i = 0; i < images.length; i++) {
                imgName = uuid.v4() + '.png'
                await images[i].mv(path.resolve(__dirname,'..', 'static', imgName))
                await ItemImage.create({img: imgName, itemId: model.id})
            }
            let budget = await Budget.findAll()
            if (budget.length === 0) {
                await Budget.create({investment: 0, cash: 0, income: 0})
            }
            return res.json(model)
        } catch (e) {
            return res.json(e)
        }

    }
    async getAll(req,res){
        try {
            const {category, type, variants, brand, page, limit} = req.query
            let categoryId = Number(category)
            let typeId = Number(type)
            let brandId = Number(brand)
            const offset = page * limit - limit
            if (categoryId && typeId && variants && brandId) { //abcd
                const model = await Item.findAndCountAll(
                    {where: {
                            categoryId, typeId, brandId,
                            name: sequelize.where(sequelize.fn('LOWER', sequelize.col('variants')), 'LIKE', '%' + variants + '%')
                        }, offset, limit,
                        include: [{model: ItemSize, as: 'sizes'}, {model: ItemImage, as: 'images'}],
                        order: [['id', 'DESC'], ['sizes', 'id', 'ASC'],['images', 'id', 'ASC']],
                        distinct: true
                    }
                )
                return res.json(model)
            }
            if (categoryId && typeId && variants && !brandId) { //abc
                const model = await Item.findAndCountAll(
                    {where: {
                            categoryId, typeId,
                            name: sequelize.where(sequelize.fn('LOWER', sequelize.col('variants')), 'LIKE', '%' + variants + '%')
                        }, offset,limit,
                        include: [{model: ItemSize, as: 'sizes'}, {model: ItemImage, as: 'images'}],
                        order: [['id', 'DESC'], ['sizes', 'id', 'ASC'],['images', 'id', 'ASC']],
                        distinct: true
                    }
                )
                return res.json(model)
            }
            if (categoryId && !typeId && variants && brandId) { //acd
                const model = await Item.findAndCountAll(
                    {where: {
                            categoryId, brandId,
                            name: sequelize.where(sequelize.fn('LOWER', sequelize.col('variants')), 'LIKE', '%' + variants + '%')
                        }, offset, limit,
                        include: [{model: ItemSize, as: 'sizes'}, {model: ItemImage, as: 'images'}],
                        order: [['id', 'DESC'], ['sizes', 'id', 'ASC'], ['images', 'id', 'ASC']],
                        distinct: true
                    }
                )
                return res.json(model)
            }
            if (!categoryId && typeId && variants && brandId) { //bcd
                const model = await Item.findAndCountAll(
                    {where: {typeId, brandId,
                            name: sequelize.where(sequelize.fn('LOWER', sequelize.col('variants')), 'LIKE', '%' + variants + '%')
                        }, offset,limit,
                        include: [{model: ItemSize, as: 'sizes'}, {model: ItemImage, as: 'images'}],
                        order: [['id', 'DESC'], ['sizes', 'id', 'ASC'],['images', 'id', 'ASC']],
                        distinct: true
                    }
                )
                return res.json(model)
            }
            if (categoryId && typeId && !variants && brandId) { //abd
                const model = await Item.findAndCountAll(
                    {where: {
                            categoryId, typeId, brandId
                        }, offset,limit,
                        include: [{model: ItemSize, as: 'sizes'}, {model: ItemImage, as: 'images'}],
                        order: [['id', 'DESC'], ['sizes', 'id', 'ASC'],['images', 'id', 'ASC']],
                        distinct: true
                    }
                )
                return res.json(model)
            }
            if (categoryId && typeId && !variants && !brandId) { //ab
                const model = await Item.findAndCountAll(
                    {where: {
                            categoryId, typeId
                        }, offset,limit,
                        include: [{model: ItemSize, as: 'sizes'}, {model: ItemImage, as: 'images'}],
                        order: [['id', 'DESC'], ['sizes', 'id', 'ASC'],['images', 'id', 'ASC']],
                        distinct: true
                    }
                )
                return res.json(model)
            }
            if (categoryId && !typeId && variants && !brandId) { //ac
                const model = await Item.findAndCountAll(
                    {where: {
                            categoryId,
                            name: sequelize.where(sequelize.fn('LOWER', sequelize.col('variants')), 'LIKE', '%' + variants + '%')
                        }, offset,limit,
                        include: [{model: ItemSize, as: 'sizes'}, {model: ItemImage, as: 'images'}],
                        order: [['id', 'DESC'], ['sizes', 'id', 'ASC'],['images', 'id', 'ASC']],
                        distinct: true
                    }
                )
                return res.json(model)
            }
            if (categoryId && !typeId && !variants && brandId) { //ad
                const model = await Item.findAndCountAll(
                    {where: {
                            categoryId, brandId
                        }, offset,limit,
                        include: [{model: ItemSize, as: 'sizes'}, {model: ItemImage, as: 'images'}],
                        order: [['id', 'DESC'], ['sizes', 'id', 'ASC'],['images', 'id', 'ASC']],
                        distinct: true
                    }
                )
                return res.json(model)
            }
            if (!categoryId && typeId && variants && !brandId) { //bc
                const model = await Item.findAndCountAll(
                    {where: {
                            typeId,
                            name: sequelize.where(sequelize.fn('LOWER', sequelize.col('variants')), 'LIKE', '%' + variants + '%')
                        }, offset,limit,
                        include: [{model: ItemSize, as: 'sizes'}, {model: ItemImage, as: 'images'}],
                        order: [['id', 'DESC'], ['sizes', 'id', 'ASC'],['images', 'id', 'ASC']],
                        distinct: true
                    }
                )
                return res.json(model)
            }
            if (!categoryId && typeId && !variants && brandId) { //bd
                const  model = await Item.findAndCountAll(
                    {where: {
                            typeId, brandId
                        }, offset,limit,
                        include: [{model: ItemSize, as: 'sizes'}, {model: ItemImage, as: 'images'}],
                        order: [['id', 'DESC'], ['sizes', 'id', 'ASC'],['images', 'id', 'ASC']],
                        distinct: true
                    }
                )
                return res.json(model)
            }
            if (categoryId && !typeId && !variants && !brandId) { //a
                const model = await Item.findAndCountAll(
                    {where: {
                            categoryId
                        }, offset,limit,
                        include: [{model: ItemSize, as: 'sizes'}, {model: ItemImage, as: 'images'}],
                        order: [['id', 'DESC'], ['sizes', 'id', 'ASC'],['images', 'id', 'ASC']],
                        distinct: true
                    }
                )
                return res.json(model)
            }
            if (!categoryId && typeId && !variants && !brandId) { //b
                const model = await Item.findAndCountAll(
                    {where: {
                            typeId
                        }, offset,limit,
                        include: [{model: ItemSize, as: 'sizes'}, {model: ItemImage, as: 'images'}],
                        order: [['id', 'DESC'], ['sizes', 'id', 'ASC'],['images', 'id', 'ASC']],
                        distinct: true
                    }
                )
                return res.json(model)
            }
            if (!categoryId && !typeId && variants && !brandId) { //c
                const model = await Item.findAndCountAll(
                    {where: {
                            name: sequelize.where(sequelize.fn('LOWER', sequelize.col('variants')), 'LIKE', '%' + variants + '%')
                        }, offset,limit,
                        include: [{model: ItemSize, as: 'sizes'}, {model: ItemImage, as: 'images'}],
                        order: [['id', 'DESC'], ['sizes', 'id', 'ASC'],['images', 'id', 'ASC']],
                        distinct: true
                    }
                )
                return res.json(model)
            }
            if (!categoryId && !typeId && !variants && brandId) { //d
                const model = await Item.findAndCountAll(
                    {where: {
                            brandId
                        }, offset,limit,
                        include: [{model: ItemSize, as: 'sizes'}, {model: ItemImage, as: 'images'}],
                        order: [['id', 'DESC'], ['sizes', 'id', 'ASC'],['images', 'id', 'ASC']],
                        distinct: true
                    }
                )
                return res.json(model)
            }
            if (!categoryId && !typeId && !variants && !brandId) { //_
                const model = await Item.findAndCountAll(
                    {where: {},
                        offset,limit,
                        include: [{model: ItemSize, as: 'sizes'}, {model: ItemImage, as: 'images'}],
                        order: [['id', 'DESC'], ['sizes', 'id', 'ASC'],['images', 'id', 'ASC']],
                        distinct: true
                    }
                )
                return res.json(model)
            }
        } catch (e) {
            return res.json(e)
        }
    }
    async getOne(req,res){
        const {id} = req.params
        try {
            const model = await Item.findOne(
                {where: {id},
                    include: [{model: ItemSize, as: 'sizes'}, {model: ItemImage, as: 'images'}],
                    order: [
                        [sequelize.cast(sequelize.col('sizes.name'), 'INTEGER'), 'ASC'],
                        ['images', 'id', 'ASC']
                    ]}
            )
            return res.json(model)
        } catch (e) {
            const model = await Item.findOne(
                {where: {id},
                    include: [{model: ItemSize, as: 'sizes'}, {model: ItemImage, as: 'images'}],
                    order: [['images', 'id', 'ASC']]}
            )
            return res.json(model)
        }
    }
    async delete(req,res){
        try{
            const {id} = req.params;
            await Item.destroy({where: {id}})
            return res.json({message: "deleted"});
        } catch (e) {
            return res.json(e);
        }
    }
    async update(req,res){
        const {id} = req.params
        const {method} = req.body
        switch (method) {
            case 'price':
                try{
                    const {price} = req.body
                    await Item.findOne({where: {id}}).then(async d =>
                        await d.update({price})
                    )
                    return res.json({message: "updated"});
                } catch (e) {
                    return res.json(e);
                }
            case 'name':
                try{
                    const {name} = req.body
                    await Item.findOne({where: {id}}).then(async d =>
                        await d.update({name})
                    )
                    return res.json({message: "updated"});
                } catch (e) {
                    return res.json(e);
                }
            case 'description':
                try{
                    const {description} = req.body
                    await Item.findOne({where: {id}}).then(async d =>
                        await d.update({description})
                    )
                    return res.json({message: "updated"});
                } catch (e) {
                    return res.json(e);
                }
        }

    }
}

module.exports = new ItemController()