import {IBranch, IBrand, ICategory, IGSize, IItem, IType} from "./models";

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
export const defaultSize:IGSize = {name: '', items: []}
export const defaultBranch:IBranch = {investment: 0, income: 0, cash: 0, name: '', id: 0, createdAt: '', updatedAt: ''}