import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IBrand, ICategory, IExpense, IType, IVariant} from "../../utils/models";
import {defaultBrand, defaultCategory, defaultType} from "../../utils/consts";
import {intoArray} from "../../utils/intoArray";

interface BudgetState {
    investment: number
    cash: number,
    income: number,
    expenses: IExpense[]
}
const initialState: BudgetState ={
    investment: 0,
    cash: 0,
    income: 0,
    expenses: []
}

export const budgetSlice = createSlice({
    name: 'budget',
    initialState,
    reducers: {
        fetchedBudget(state, action: PayloadAction<{cash: number, investment: number, income: number }>) {
            state.cash = action.payload.cash
            state.investment = action.payload.investment
            state.income = action.payload.income
        },
        fetchedExpenses(state, action: PayloadAction<IExpense[]>) {
            state.expenses = action.payload
        }
    }
})

export default budgetSlice.reducer