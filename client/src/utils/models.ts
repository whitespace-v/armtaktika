interface IModel{
    id: number
    name: string,
    createdAt: string,
    updatedAt: string
}
export interface ICategory extends IModel{
}
export interface IType extends IModel {
    categoryId: number
}
export interface IVariant extends IType{}
export interface IBrand extends IType{}

export interface ISize extends IModel{
    itemId: number
    quantity: string
    branchId: number
    branchName: string
}

export interface IGSize{
    name: string
    items: ISize[]
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

export interface ICompilation extends IModel{
    image: string
    compilationId: number
    items: IItem[]
}
export interface IBasketItem {
    item: IItem
    size: IGSize
    quantity: number
}
export interface IOrders{
    count: number,
    rows: IOrder[]
}
export interface IExpense extends IModel{
    sum:                 number
    date:                string
    branchId:            number
}
export interface IToken{
    id: number,
    login: string,
    role: string,
    iat: number,
    exp: number
}
export interface IBranch extends IModel{
    investment: number
    cash: number,
    income: number,
    profit: number
}
export interface IDayItem extends IModel {
    itemId:             string,
    itemName:           string,
    itemPrice:          string,
    itemSizeName:       string,
    itemSizeId:         number,
    itemQuantity:       string,
}
export interface IDay extends IModel{
    name: string, branchId: string,
    items: IDayItem[]
}

export interface IOrder {
    number: string
    name: string
    surname: string
    patronymic: string
    phone: string
    comment: string
    deliveryMethod: string
    deliveryCity: string
    deliveryAddress: string
    status: string
    items: IOrderItem[]
}

export interface IOrderItem {
    itemId: number
    itemName: string
    itemPrice: string
    itemSize: string
    itemQuantity: number
}