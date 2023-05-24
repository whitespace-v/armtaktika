import {AppDispatch} from "../store";
import {userSlice} from "../slices/UserSlice";
import {$authHost, $host} from "../../utils/http";
import {itemSlice} from "../slices/ItemSlice";

export const updateSize = (id: number, value: string, purchase: string) => async(dispatch: AppDispatch) => {
    dispatch(userSlice.actions.startAction())
    try {
        await $authHost({method:'PUT', url:`api/size/${id}`, data: {quantity: value, purchase}})
        dispatch(userSlice.actions.setSuccess('Размер успешно обновлен !'))
    } catch (e) {
        dispatch(userSlice.actions.setError('Не получилось обновить размер !'))
    }
}
export const updateOrderStatus = ({id, json, branch}: {id: number, json: string, branch: string}) => async(dispatch: AppDispatch) => {
    dispatch(userSlice.actions.startAction())
    try {
        await $authHost({method:'PUT', url:`api/order/${id}`, data: {json, branch}})
        dispatch(userSlice.actions.setSuccess('Размер успешно добавлен !'))
    } catch (e) {
        dispatch(userSlice.actions.setError('Не получилось добавить размер !'))
    }
}
export const updatePrice = (id: number, value: string) => async(dispatch: AppDispatch) => {
    dispatch(userSlice.actions.startAction())
    try {
        await $authHost({method:'PUT', url:`api/item/${id}`, data: {price: value, method: 'price'}})
        dispatch(userSlice.actions.setSuccess('Цена товара успешно обновлена !'))
    } catch (e) {
        dispatch(userSlice.actions.setError('Не получилось обновить цену товара !'))
    }
}
export const updateName = ({id, name}: {id: number, name: string}) => async(dispatch: AppDispatch) => {
    dispatch(userSlice.actions.startAction())
    try {
        await $authHost({method:'PUT', url:`api/item/${id}`, data: {name, method: 'name'}})
        dispatch(userSlice.actions.setSuccess('Название успешно изменено !'))
    } catch (e) {
        dispatch(userSlice.actions.setError('Не получилось изменить название !'))
    }
}
export const updateDescription = ({id, description}: {id: number, description: string}) => async(dispatch: AppDispatch) => {
    dispatch(userSlice.actions.startAction())
    try {
        await $authHost({method:'PUT', url:`api/item/${id}`, data: {description, method: 'description'}})
        dispatch(userSlice.actions.setSuccess('Описание успешно изменено !'))
    } catch (e) {
        dispatch(userSlice.actions.setError('Не получилось изменить описание !'))
    }
}
export const addToCompilation = ({compilationId, itemId}: {compilationId: number, itemId:number}) => async(dispatch: AppDispatch) => {
    dispatch(userSlice.actions.startAction())
    try {
        await $authHost({method:'PUT', url:`api/compilation/${compilationId}`,data: {itemId}})
        dispatch(userSlice.actions.setSuccess('Товар добавлен в подборку !'))
    } catch (e) {
        dispatch(userSlice.actions.setError('Не получилось изменить описание !'))
    }
}

