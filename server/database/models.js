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
    oldPrice:            {type: DataTypes.STRING,    allowNull: false },
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
const Expense = sequelize.define('expense', {
    id:                  {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name:                {type: DataTypes.STRING, allowNull: false },
    sum:                 {type: DataTypes.INTEGER, allowNull: false, },
    date:                {type: DataTypes.STRING, allowNull: false, },
    branchId:            {type: DataTypes.INTEGER, allowNull: false, },
})

const Order = sequelize.define('order', {
    id:                  {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    number:               {type: DataTypes.STRING, allowNull: false },
    name:                {type: DataTypes.STRING, allowNull: false },
    surname:             {type: DataTypes.STRING, allowNull: false },
    patronymic:          {type: DataTypes.STRING, allowNull: false },
    phone:               {type: DataTypes.STRING, allowNull: false },
    comment:             {type: DataTypes.STRING, allowNull: false },
    deliveryMethod:      {type: DataTypes.STRING, allowNull: false },
    deliveryCity:        {type: DataTypes.STRING, allowNull: true },
    deliveryAddress:     {type: DataTypes.STRING, allowNull: true },
    status:              {type: DataTypes.STRING, allowNull: false },
})

const Day = sequelize.define('day', {
    id:                  {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name:                {type: DataTypes.STRING, allowNull: false },
    branchId:            {type: DataTypes.INTEGER, allowNull: false },
})

const Branch  = sequelize.define('branch', {
    id:                  {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name:                {type: DataTypes.STRING,  allowNull: false },
    investment:          {type: DataTypes.INTEGER, allowNull: false },
    profit:              {type: DataTypes.INTEGER, allowNull: false },
    income:              {type: DataTypes.INTEGER, allowNull: false },
    cash:                {type: DataTypes.INTEGER, allowNull: false, },
})

//helpers
const ItemImage = sequelize.define('item_image', {
    id:                  {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    img:                 {type: DataTypes.STRING,    allowNull: false}
})
const CompilationImage = sequelize.define('compilation_image', {
    id:                  {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    img:                 {type: DataTypes.STRING,    allowNull: false}
})
const ItemSize = sequelize.define('item_size', {
    id:                  {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name:                {type: DataTypes.STRING,    allowNull: false},
    quantity:            {type: DataTypes.STRING,    allowNull: false},
    branchName:          {type: DataTypes.STRING,    allowNull: false},
})
const DayItem = sequelize.define('day_item', {
    id:                  {type: DataTypes.INTEGER,   primaryKey: true, autoIncrement: true},
    itemId:              {type: DataTypes.STRING,    allowNull: false },
    itemName:            {type: DataTypes.STRING,    allowNull: false },
    itemPrice:           {type: DataTypes.STRING,    allowNull: false },
    itemSizeName:        {type: DataTypes.STRING,    allowNull: false },
    itemSizeId:          {type: DataTypes.INTEGER,   allowNull: false },
    itemQuantity:        {type: DataTypes.STRING,    allowNull: false },
    itemPurchase:        {type: DataTypes.STRING,    allowNull: true },
})

const OrderItem = sequelize.define('order_item', {
    id:                  {type: DataTypes.INTEGER,   primaryKey: true, autoIncrement: true},
    itemId:              {type: DataTypes.STRING,    allowNull: false },
    itemName:            {type: DataTypes.STRING,    allowNull: false },
    itemPrice:           {type: DataTypes.STRING,    allowNull: false },
    itemSize:            {type: DataTypes.STRING,    allowNull: false },
    itemQuantity:        {type: DataTypes.STRING,    allowNull: false },
})

//sorting entities
const Compilation = sequelize.define('item_compilation', {
    id:                  {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name:                {type: DataTypes.STRING,    allowNull: false },
    image:               {type: DataTypes.STRING,    allowNull: false }
})
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

Branch.hasMany(ItemSize, {as: 'branches'})
ItemSize.belongsTo(Branch)

Day.hasMany(DayItem,{as: 'items'})
DayItem.belongsTo(Day)

Order.hasMany(OrderItem,{as: 'items'})
OrderItem.belongsTo(Order)

Compilation.hasMany(CompilationImage,{as: 'images'})
CompilationImage.belongsTo(Compilation)

//define relations between SORTING and MAIN entities:
Compilation.hasMany(Item)
Item.belongsTo(Compilation)

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
    ItemSize, Expense, Order,OrderItem, Branch, Day, DayItem, Compilation, CompilationImage
}