import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IItems, IOrder, IOrders} from "../../utils/models";

interface IItemState{
    orders: IOrders,
    page: number
}

const initialState: IItemState = {
    orders: {count: 0, rows: []},
    page: 1
}

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        fetchedOrders(state, action: PayloadAction<IOrders>) {
            state.orders = action.payload
        },
        setOrderPage(state, action: PayloadAction<number>){
            state.page = action.payload
        },
    }
})

export default orderSlice.reducer