import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IBrand, ICategory, IExpense, IType, IVariant} from "../../utils/models";
import {defaultBrand, defaultCategory, defaultType} from "../../utils/consts";
import {intoArray} from "../../utils/intoArray";

interface AnalyticsState {
    expenses: IExpense[]
}
const initialState: AnalyticsState ={
    expenses: []
}

export const analyticsSlice = createSlice({
    name: 'analytics',
    initialState,
    reducers: {
        fetchedExpenses(state, action: PayloadAction<IExpense[]>) {
            state.expenses = action.payload
        }
    }
})

export default analyticsSlice.reducer