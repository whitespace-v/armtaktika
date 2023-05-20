import {AppDispatch} from "../store";
import {userSlice} from "../slices/UserSlice";
import {$authHost, $host} from "../../utils/http";
import {filterSlice} from "../slices/FilterSlice";
import {ICategory, IType, IVariant} from "../../utils/models";
import {itemSlice} from "../slices/ItemSlice";
import {IBrand} from "../../utils/models";
import {orderSlice} from "../slices/OrderSlice";
import _ from "lodash";
import {analyticsSlice} from "../slices/AnalyticsSlice";

export const fetchCategories = () => async(dispatch: AppDispatch) => {
    try {
        const {data} = await $host.get('api/category')
        dispatch(filterSlice.actions.fetchedCategories(data))
    } catch (e) {
        dispatch(userSlice.actions.setError('Не получилось загрузить категории !'))
    }
}
export const fetchTypes = (category: ICategory) => async(dispatch: AppDispatch) => {
    try {
        const {data} = await $host.get('api/type', {params: {category}})
        dispatch(filterSlice.actions.fetchedTypes(data))
    } catch (e) {
        dispatch(userSlice.actions.setError('Не получилось загрузить типы !'))
    }
}
export const fetchVariants = (category: ICategory) => async(dispatch: AppDispatch) => {
    try {
        const {data} = await $host.get('api/variant', {params: {category}})
        dispatch(filterSlice.actions.fetchedVariants(data))
    } catch (e) {
        dispatch(userSlice.actions.setError('Не получилось загрузить варианты !'))
    }
}
export const fetchBranches = () => async(dispatch: AppDispatch) => {
    try {
        const {data} = await $host.get('api/branch', )
        dispatch(itemSlice.actions.fetchedBranches(data))
    } catch (e) {
        dispatch(userSlice.actions.setError('Не получилось загрузить варианты !'))
    }
}
export const fetchBranch = (id: number) => async(dispatch: AppDispatch) => {
    try {
        const {data} = await $host.get(`api/branch/${id}`)
        dispatch(itemSlice.actions.fetchedBranch(data))
    } catch (e) {
        dispatch(userSlice.actions.setError('Не получилось загрузить варианты !'))
    }
}
export const fetchDays = ({branchId}: {branchId: number}) => async(dispatch: AppDispatch) => {
    try {
        const {data} = await $authHost.get('api/day',{params: {branchId}} )
        dispatch(itemSlice.actions.fetchedDays(data))
    } catch (e) {
        dispatch(userSlice.actions.setError('Не получилось загрузить варианты !'))
    }
}
export const fetchBrands = (category: ICategory) => async(dispatch: AppDispatch) => {
    try {
        const {data} = await $host.get('api/brand', {params: {category}})
        dispatch(filterSlice.actions.fetchedBrands(data))
    } catch (e) {
        dispatch(userSlice.actions.setError('Не получилось загрузить бренды !'))
    }
}

export const fetchItems = ({curVariants, brand, type, category, page, limit}: {curVariants: IVariant[], brand:IBrand, type:IType, category: ICategory, page: number, limit: number}) => async(dispatch: AppDispatch) => {
    try {
        let variants = ''
        for (let i in _.orderBy(curVariants, ['id'],['asc'])){
            variants += (_.orderBy(curVariants, ['id'],['asc'])[i].name)
        }
        const {data} = await $host.get('api/item', {params: {variants, brand: brand.id, type: type.id, category: category.id, page, limit}})
        dispatch(itemSlice.actions.fetchedItems(data))
    } catch (e) {
        dispatch(userSlice.actions.setError('Не получилось загрузить товары !'))
    }
}
export const fetchItem = (id: string | undefined) => async(dispatch: AppDispatch) => {
    try {
        const {data} = await $host.get(`api/item/${id}`)
        dispatch(itemSlice.actions.fetchedItem(data))
    } catch (e) {
        dispatch(userSlice.actions.setError('Не получилось загрузить товар !'))
    }
}

export const CDEKAuth = () => async(dispatch: AppDispatch) => {
    try {
     await $host.post('/api/cdek/auth', {action: 'auth'}).then(
         res => console.log(res)
     )
    } catch (e) {
        dispatch(userSlice.actions.setError('Не получилось загрузить товар !'))
    }
}
export const fetchOrders = () => async(dispatch: AppDispatch) => {
    try {
        const {data} = await $authHost.get('api/order')
        dispatch(orderSlice.actions.fetchedOrders(data))
    } catch (e) {
        dispatch(userSlice.actions.setError('Не получилось загрузить товар !'))
    }
}
export const fetchExpenses = (branchId: number) => async(dispatch: AppDispatch) => {
    try {
        const {data} = await $authHost.get('api/expenses', {params: {branchId}})
        dispatch(analyticsSlice.actions.fetchedExpenses(data))
    } catch (e) {
        dispatch(userSlice.actions.setError('Не получилось загрузить товар !'))
    }
}
export const auth = ({method, phone, password} : {method: string, phone: string, password: string}) => async(dispatch: AppDispatch) => {
    try {
        if (method === 'Вход') {
            const {data} = await $host.post('api/user/signin', {phone, password})
            dispatch(userSlice.actions.userSuccess(data))
        } else {
            const {data} = await $host.post('api/user/signup', {phone, password})
            dispatch(userSlice.actions.userSuccess(data))
        }
    } catch (e) {
        if (e.response.status === 409) {
            alert('Номер телефона уже зарегестрирован !')
        }
        if (e.response.status === 500) {
            alert('Некорректные данные !')
        }
        dispatch(userSlice.actions.setError('Не получилось авторизироваться !'))
    }
}
export const check = () => (dispatch: AppDispatch) => {
    try {
        dispatch(userSlice.actions.userChecking())
    } catch (e) {
        dispatch(userSlice.actions.setError('Не получилось авторизироваться !'))
    }
}