import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IBasketItem, IBranch, IDay, IGSize, IItem, IItems, ISize} from "../../utils/models";
import {defaultBranch, defaultItem, defaultSize} from "../../utils/consts";
import {indexOfItemInBasket, itemInBasket} from "../../utils/basketLogics";

interface IItemState{
    items: IItems
    item: IItem
    size: IGSize
    basket: IBasketItem[]
    branches: IBranch[]
    branch: IBranch
    days: IDay[]
}

const initialState: IItemState = {
    items: { count: 0, rows: [] },
    item: defaultItem,
    size: defaultSize,
    basket: [],
    branches: [],
    branch: defaultBranch,
    days: []
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
        fetchedBranches(state, action: PayloadAction<IBranch[]>){
            state.branches = action.payload
        },
        fetchedBranch(state, action: PayloadAction<IBranch>){
            state.branch = action.payload
        },
        fetchedDays(state, action: PayloadAction<IDay[]>){
            state.days = action.payload
        },
        setSize(state, action: PayloadAction<IGSize>){
            state.size = action.payload
        },
        addToBasket(state, action: PayloadAction<IBasketItem>){
            if (itemInBasket(state.basket, action.payload)){
                const index = indexOfItemInBasket(state.basket, action.payload)
                state.basket[index].quantity = state.basket[index].quantity + action.payload.quantity

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
            state.basket[index].quantity = action.payload.number
        }
    }
})

export default itemSlice.reducer