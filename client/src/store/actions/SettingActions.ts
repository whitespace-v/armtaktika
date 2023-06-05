import {IBasketItem, IBrand, ICategory, IGSize, IItem, ISize, IType, IVariant} from "../../utils/models";
import {AppDispatch} from "../store";
import {filterSlice} from "../slices/FilterSlice";
import {userSlice} from "../slices/UserSlice";
import {itemSlice} from "../slices/ItemSlice";
import {orderSlice} from "../slices/OrderSlice";

export const setCategory = (i: ICategory) => (dispatch: AppDispatch) => {
    dispatch(filterSlice.actions.setCategory(i))
}
export const setType = (i: IType) => (dispatch: AppDispatch) => {
    dispatch(filterSlice.actions.setType(i))
}
export const checkVariant = (i: IVariant) => (dispatch: AppDispatch) => {
    dispatch(filterSlice.actions.checkVariant(i))
}
export const setBrand = (i: IBrand) => (dispatch: AppDispatch) => {
    dispatch(filterSlice.actions.setBrand(i))
}
export const setLoading = (i: boolean) => (dispatch: AppDispatch) => {
    dispatch(userSlice.actions.setLoading(i))
}
export const setSize = (i: any) => (dispatch: AppDispatch) => {
    dispatch(itemSlice.actions.setSize(i))
}
export const addToBasket = (item: IItem, size: IGSize, quantity: number) => (dispatch: AppDispatch) => {
    dispatch(itemSlice.actions.addToBasket({item, size, quantity}))
    dispatch(userSlice.actions.setSuccess('Товар добавлен в корзину'))
    setTimeout(() => dispatch(userSlice.actions.setSuccess('')), 4000)
}
export const removeFromBasket = (item: IBasketItem) => (dispatch: AppDispatch) => {
    dispatch(itemSlice.actions.removeFromBasket(item))
}
export const setSuccess = (i: string) => (dispatch: AppDispatch) => {
    dispatch(userSlice.actions.setSuccess(i))
    setTimeout(() => dispatch(userSlice.actions.setSuccess('')), 4000)
}
export const setCount = (item: IBasketItem, number: number) => (dispatch: AppDispatch) => {
    dispatch(itemSlice.actions.setCount({item, number}))
}
export const setItemPage = (page: number) => (dispatch: AppDispatch) => {
    dispatch(filterSlice.actions.setItemPage(page))
}

