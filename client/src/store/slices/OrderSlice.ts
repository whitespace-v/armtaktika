import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IItems, IOrder, IOrders} from "../../utils/models";

interface IItemState{
    orders: IOrder[],
}

const initialState: IItemState = {
    orders: [],
}

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        fetchedOrders(state, action: PayloadAction<IOrder[]>) {
            state.orders = action.payload
        },
    }
})

export default orderSlice.reducer