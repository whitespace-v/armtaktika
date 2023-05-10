import {AppDispatch} from "../store";
import {userSlice} from "../slices/UserSlice";
import {$authHost, $host} from "../../utils/http";
import {IBrand, ICategory, ISize, IType, IVariant} from "../../utils/models";
import {uriToFile} from "../../utils/uriToFile";
import imageCompression from 'browser-image-compression';
import _ from "lodash";

export const createCategory = (name: string) => async(dispatch: AppDispatch) => {
    dispatch(userSlice.actions.startAction())
    try {
        await $authHost.post('api/category', {name})
        dispatch(userSlice.actions.setSuccess('Категория успешно добавлена !'))
    } catch (e) {
        dispatch(userSlice.actions.setError('Не получилось добавить категорию !'))
    }
}
export const createType = (category: ICategory, name: string) => async(dispatch: AppDispatch) => {
    dispatch(userSlice.actions.startAction())
    try {
        await $authHost.post('api/type', {category, name})
        dispatch(userSlice.actions.setSuccess('Тип успешно добавлен !'))
    } catch (e) {
        dispatch(userSlice.actions.setError('Не получилось добавить тип !'))
    }
}
export const createVariant = (category: ICategory, name: string) => async(dispatch: AppDispatch) => {
    dispatch(userSlice.actions.startAction())
    try {
        await $authHost.post('api/variant', {category, name})
        dispatch(userSlice.actions.setSuccess('Вариант успешно добавлен !'))
    } catch (e) {
        dispatch(userSlice.actions.setError('Не получилось добавить вариант !'))
    }
}
export const createBrand = (category: ICategory, name: string) => async(dispatch: AppDispatch) => {
    dispatch(userSlice.actions.startAction())
    try {
        await $authHost.post('api/brand', {category, name})
        dispatch(userSlice.actions.setSuccess('Бренд успешно добавлен !'))
    } catch (e) {
        dispatch(userSlice.actions.setError('Не получилось добавить бренд !'))
    }
}
export const addSize = (itemId: number, name: string, quantity: string, purchase: string) => async(dispatch: AppDispatch) => {
    dispatch(userSlice.actions.startAction())
    try {
        await $authHost.post('api/size', {itemId, name, quantity, purchase})
        dispatch(userSlice.actions.setSuccess('Размер успешно добавлен !'))
    } catch (e) {
        dispatch(userSlice.actions.setError('Не получилось добавить размер !'))
    }
}

export const createItem = (uri: any, name: string, price: string, purchase: string,
                           weight: string, height: string, length: string, width: string, description: string,
                           category: ICategory, type: IType, brand: IBrand, curVariants: IVariant[]
) => async(dispatch: AppDispatch) => {
    dispatch(userSlice.actions.startAction())
    try {
        const formData = new FormData()
        for (let i = 0; i < uri.length; i++){
            let file = uriToFile(uri[i].uri, i.toString().concat('.png'))
            let f = await imageCompression(file, {maxSizeMB: 1, maxWidthOrHeight: 1920, useWebWorker: true})
            formData.append('images', f)
        }
        formData.append('name', name)
        formData.append('purchase', purchase)
        formData.append('price', price)
        formData.append('weight', weight)
        formData.append('height', height)
        formData.append('length', length)
        formData.append('width', width)
        formData.append('categoryId', category.id.toString())
        formData.append('typeId', type.id.toString())
        formData.append('brandId', brand.id.toString())
        formData.append('description', description)
        let variants = ''
        for (let i in _.orderBy(curVariants, ['id'],['asc'])){
            variants += (_.orderBy(curVariants, ['id'],['asc'])[i].name)
        }
        formData.append('variants', variants)
        await $authHost.post('api/item', formData)
        dispatch(userSlice.actions.setSuccess('Товар успешно добавлен !'))
    } catch (e) {
        dispatch(userSlice.actions.setError('Не получилось добавить товар !'))
    }
}
export const submitPayment = (data: any) => async(dispatch: AppDispatch) => {
    dispatch(userSlice.actions.startAction())
    try {
        await $host.post('api/order', data)
        dispatch(userSlice.actions.setSuccess('Заказ успешно оформлен !'))
    } catch (e) {
        dispatch(userSlice.actions.setError('Не получилось оформить заказ !'))
    }
}
export const createExpense = (data: any) => async(dispatch: AppDispatch) => {
    dispatch(userSlice.actions.startAction())
    try {
        await $authHost.post('api/expenses', data)
        dispatch(userSlice.actions.setSuccess('Расход добавлен !'))
    } catch (e) {
        dispatch(userSlice.actions.setError('Не получилось добавить расход !'))
    }
}




