interface IModel{
    id: number
    name: string,
    createdAt: string,
    updatedAt: string
}
export interface ICategory extends IModel{
}
export interface IType extends IModel {categoryId: number}
export interface IVariant extends IType{}
export interface IBrand extends IType{}

export interface ISize extends IModel{
    itemId: number
    quantity: string
}
export interface IImage{
    id: number
    img: string,
    createdAt: string,
    updatedAt: string
    itemId: number
}

export interface IItem extends IModel {
    brandId: number
    categoryId: number
    description: string
    purchase: string
    height: string
    image: string
    itemBrandId: null
    itemCategoryId: null
    itemTypeId: null
    itemVariantId: null
    length: string
    price: string
    typeId: number
    variants: string
    weight: string
    width: string
    sizes: ISize[]
    images: IImage[]
}
export interface IItems {
    count: number, rows: IItem[]
}

export interface IBasketItem {
    item: IItem
    size: ISize
    count: number
}
export interface IOrder extends IModel{
    branch: string
    jsonItems: string
    order:               string
    items:               string
    sum:                 string
    name:                string
    surname:             string
    patronymic:          string
    phone:               string
    comment:             string
    delivery:            string
    deliveryCity:        string
    deliveryAddress:     string
    status:              string
}
export interface IOrders{
    count: number,
    rows: IOrder[]
}
export interface IjsonItems {
    purchase: string,
    price: string,
    sizeId: number,
    quantity: string
}
export interface IExpense extends IModel{
    name: string,
    sum: number,
    comment: string,
}
export interface IToken{
    id: number,
    login: string,
    role: string,
    iat: number,
    exp: number
}