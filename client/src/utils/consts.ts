import {IBrand, ICategory, IItem, ISize, IType} from "./models";

export const API = 'http://localhost:5000/'

export const defaultCategory:ICategory = {id: 0, name: '', createdAt: '', updatedAt: ''}
export const defaultType:IType = {id: 0, name: '', createdAt: '', updatedAt: '', categoryId: 0}
export const defaultBrand:IBrand = defaultType

export const defaultItem:IItem = {name: '', id: 0, createdAt: '', updatedAt: '', purchase: '',
    brandId: 0, categoryId: 0, description: '', height: '', image: '',
    itemBrandId: null, itemCategoryId: null, itemTypeId: null, itemVariantId: null,
    length: '', price: '', typeId: 0, sizes: [], images: [],
    variants: '', weight: '', width: '',
}
export const defaultSize:ISize = {id: 0, name: '', createdAt: '', updatedAt: '', quantity: '1', itemId: 0}
