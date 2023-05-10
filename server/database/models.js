const sequelize  = require('../database/database')
const {DataTypes} = require('sequelize')

//main entities
const User = sequelize.define('user', {
    id:                  {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    phone:               {type: DataTypes.STRING, allowNull: false, unique: true },
    password:            {type: DataTypes.STRING, allowNull: false},
    role:                {type: DataTypes.STRING, defaultValue: 'User'}
})

const Item = sequelize.define('item', {
    id:                  {type: DataTypes.INTEGER,   primaryKey: true, autoIncrement: true},
    categoryId:          {type: DataTypes.INTEGER,   allowNull: false },
    typeId:              {type: DataTypes.INTEGER,   allowNull: false },
    brandId:             {type: DataTypes.INTEGER,   allowNull: false },
    variants:            {type: DataTypes.STRING,    allowNull: false },
    name:                {type: DataTypes.STRING,    allowNull: false },
    price:               {type: DataTypes.STRING,    allowNull: false },
    purchase:            {type: DataTypes.STRING,    allowNull: false },
    weight:              {type: DataTypes.STRING,    allowNull: false },
    height:              {type: DataTypes.STRING,    allowNull: false },
    length:              {type: DataTypes.STRING,    allowNull: false },
    width:               {type: DataTypes.STRING,    allowNull: false },
    description:         {type: DataTypes.STRING,    allowNull: false },
    image:               {type: DataTypes.STRING,    allowNull: false },
})

const Review = sequelize.define('review', {
    id:                  {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    message:             {type: DataTypes.STRING,    allowNull: false },
    mark:                {type: DataTypes.STRING,    allowNull: false },
    date:                {type: DataTypes.STRING,    allowNull: false },
    approved:            {type: DataTypes.BOOLEAN,    allowNull: false, defaultValue: false },
})
const Budget = sequelize.define('budget', {
    id:                  {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    investment:          {type: DataTypes.INTEGER, allowNull: false },
    income:              {type: DataTypes.INTEGER, allowNull: false, },
    cash:                {type: DataTypes.INTEGER, allowNull: false, },
})
const Expenses = sequelize.define('expenses', {
    id:                  {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name:                {type: DataTypes.STRING, allowNull: false },
    sum:                 {type: DataTypes.INTEGER, allowNull: false, },
    comment:             {type: DataTypes.STRING, allowNull: false, },
})

const Orders = sequelize.define('orders', {
    id:                  {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    order:               {type: DataTypes.STRING, allowNull: false },
    items:               {type: DataTypes.STRING, allowNull: false },
    sum:                 {type: DataTypes.STRING, allowNull: false },
    name:                {type: DataTypes.STRING, allowNull: false },
    surname:             {type: DataTypes.STRING, allowNull: false },
    patronymic:          {type: DataTypes.STRING, allowNull: false },
    phone:               {type: DataTypes.STRING, allowNull: false },
    comment:             {type: DataTypes.STRING, allowNull: false },
    delivery:            {type: DataTypes.STRING, allowNull: false },
    deliveryCity:        {type: DataTypes.STRING, allowNull: true},
    deliveryAddress:     {type: DataTypes.STRING, allowNull: true },
    status:              {type: DataTypes.STRING, allowNull: false, defaultValue: 'Не завершен'},
    jsonItems:           {type: DataTypes.STRING, allowNull: false },
    branch:              {type: DataTypes.STRING, allowNull: false },
})

//helpers
const ItemImage = sequelize.define('item_image', {
    id:                  {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    img:                 {type: DataTypes.STRING,    allowNull: false}
})
const ItemSize = sequelize.define('item_size', {
    id:                  {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name:                {type: DataTypes.STRING,    allowNull: false},
    quantity:            {type: DataTypes.STRING,    allowNull: false},
})

//sorting entities
const Category = sequelize.define('item_category', {
    id:                  {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name:                {type: DataTypes.STRING,    allowNull: false }
})
const Type = sequelize.define('item_type', {
    id:                  {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name:                {type: DataTypes.STRING,    allowNull: false },
    categoryId:          {type: DataTypes.INTEGER,    allowNull: false },
})
const Variant = sequelize.define('item_variant', {
    id:                  {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name:                {type: DataTypes.STRING,    allowNull: false },
    categoryId:          {type: DataTypes.INTEGER,    allowNull: false },
})
const Brand = sequelize.define('item_brand', {
    id:                  {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name:                {type: DataTypes.STRING,    allowNull: false },
    categoryId:          {type: DataTypes.INTEGER,    allowNull: false },
})


//Merged sorting entities (for next relations):
const CategoryType = sequelize.define('category_type', {
    id:                   {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})
const CategoryVariant = sequelize.define('category_variant', {
    id:                   {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})
const CategoryBrand = sequelize.define('category_brand', {
    id:                   {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

//define relations between HELPERS and MAIN entities
Item.hasMany(ItemImage,{as: 'images'})
ItemImage.belongsTo(Item)

Item.hasMany(ItemSize,{as: 'sizes'})
ItemSize.belongsTo(Item)

//define relations between SORTING and MAIN entities:
Category.hasMany(Item)
Item.belongsTo(Category)

Variant.hasMany(Item)
Item.belongsTo(Variant)

Brand.hasMany(Item)
Item.belongsTo(Brand)

Type.hasMany(Item)
Item.belongsTo(Type)


//define relations between SORTING entities:
Category.belongsToMany(Variant,{through: CategoryVariant})

Category.belongsToMany(Type,{through: CategoryType})

Category.belongsToMany(Brand,{through: CategoryBrand})
Brand.belongsToMany(Category,{through: CategoryBrand})


//empty

//export
module.exports = {
    User, Item, Variant, Review, ItemImage, Category, Type, Brand, CategoryType, CategoryVariant, CategoryBrand,
    ItemSize, Expenses, Budget, Orders
}