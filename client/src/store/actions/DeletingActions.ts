import {AppDispatch} from "../store";
import {userSlice} from "../slices/UserSlice";
import {$authHost, $host} from "../../utils/http";
import {ISize} from "../../utils/models";

export const deleteItem = (id: number) => async(dispatch: AppDispatch) => {
    dispatch(userSlice.actions.startAction())
    try {
        await $authHost.delete(`api/item/${id}`)
        dispatch(userSlice.actions.setSuccess('Товар успешно удален !'))
    } catch (e) {
        dispatch(userSlice.actions.setError('Не получилось удалить товар !'))
    }
}
export const deleteSize = ({id, quantity, purchase }: {id: number, quantity: string, purchase: string }) => async(dispatch: AppDispatch) => {
    dispatch(userSlice.actions.startAction())
    try {
        await $authHost.delete(`api/size/${id}`, {params: {quantity, purchase}})
        dispatch(userSlice.actions.setSuccess('Размер успешно удален!'))
    } catch (e) {
        dispatch(userSlice.actions.setError('Не получилось удалить размер !'))
    }
}