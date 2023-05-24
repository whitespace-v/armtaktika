import {combineReducers, configureStore} from "@reduxjs/toolkit";
import userReducer from './slices/UserSlice'
import filterReducer from './slices/FilterSlice'
import itemReducer from './slices/ItemSlice'
import orderReducer from './slices/OrderSlice'
import budgetReducer from './slices/AnalyticsSlice'

const reducer = combineReducers({
    userReducer, filterReducer, itemReducer, orderReducer, budgetReducer
})

export const setupStore = () => configureStore({reducer})
export type RootState = ReturnType<typeof reducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']