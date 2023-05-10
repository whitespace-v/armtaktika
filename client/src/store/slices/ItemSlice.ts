import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IBasketItem, IItem, IItems, ISize} from "../../utils/models";
import {defaultItem, defaultSize} from "../../utils/consts";
import {indexOfItemInBasket, itemInBasket} from "../../utils/basketLogics";

interface IItemState{
    items: IItems
    item: IItem
    size: ISize
    basket: IBasketItem[]

}

const initialState: IItemState = {
    items: { count: 0, rows: [] },
    item: defaultItem,
    size: defaultSize,
    basket: [],
}

export const itemSlice = createSlice({
    name: 'item',
    initialState,
    reducers: {
        fetchedItems(state, action: PayloadAction<IItems>){
            state.items = action.payload
        },
        fetchedItem(state, action: PayloadAction<IItem>){
            state.item = action.payload
        },
        setSize(state, action: PayloadAction<ISize>){
            state.size = action.payload
        },
        addToBasket(state, action: PayloadAction<IBasketItem>){
            if (itemInBasket(state.basket, action.payload)){
                const index = indexOfItemInBasket(state.basket, action.payload)
                state.basket[index].count = state.basket[index].count + action.payload.count

            } else {
                state.basket = [...state.basket, action.payload]
            }
        },
        removeFromBasket(state, action:PayloadAction<IBasketItem>){
            const index = indexOfItemInBasket(state.basket, action.payload)
            state.basket.splice(index, 1)
        },
        setCount(state, action: PayloadAction<{ item: IBasketItem, number: number }>){
            const index = indexOfItemInBasket(state.basket, action.payload.item)
            state.basket[index].count = action.payload.number
        }
    }
})

export default itemSlice.reducer