import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IBrand, ICategory, IType, IVariant} from "../../utils/models";
import {defaultBrand, defaultCategory, defaultType} from "../../utils/consts";
import {intoArray} from "../../utils/intoArray";

interface FilterState {
    categories: ICategory[]
    category: ICategory
    types: IType[]
    type: IType
    variants: IVariant[],
    curVariants: IVariant[],
    brands: IBrand[],
    brand: IBrand,
    page: number
}
const initialState: FilterState ={
    categories: [],
    category: defaultCategory,
    types: [],
    type: defaultType,
    variants: [],
    curVariants: [],
    brands: [],
    brand: defaultBrand,
    page: 1
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        fetchedCategories(state, action: PayloadAction<ICategory[]>){
            state.categories = action.payload
        },
        setCategory(state, action: PayloadAction<ICategory>){
            state.category = action.payload
            state.brand = defaultBrand
            state.type = defaultType
            state.curVariants = []
        },
        fetchedTypes(state, action: PayloadAction<IType[]>){
            state.types = action.payload
        },
        fetchedBrands(state, action: PayloadAction<IBrand[]>){
            state.brands = action.payload
        },
        setBrand(state, action: PayloadAction<IBrand>){
            state.brand = action.payload
        },
        setType(state, action: PayloadAction<IType>){
            state.type = action.payload
        },
        fetchedVariants(state, action: PayloadAction<IVariant[]>){
            state.variants = action.payload
        },
        checkVariant(state, action: PayloadAction<IVariant>){
          if (state.curVariants.length && intoArray(state.curVariants, action.payload)){
              state.curVariants = state.curVariants.filter(x => x.name !== action.payload.name)
          } else {
              state.curVariants = [...state.curVariants, action.payload]
          }
        },
        setItemPage(state, action: PayloadAction<number>){
            state.page = action.payload
        },

    }
})

export default filterSlice.reducer