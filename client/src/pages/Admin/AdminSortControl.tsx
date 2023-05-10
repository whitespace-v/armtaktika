import React, {useEffect, useState} from 'react';
import classes from '../../styles/pages/Admin/AdminSortControl.module.scss'
import UIButton from "../../UIKit/UIButton";
import UIInput from "../../UIKit/UIInput";
import {FaCheck, FaTimes} from "react-icons/fa";
import UIInteraction from "../../UIKit/UIInteraction";
import {useAppDispatch, useAppSelector} from "../../store/redux";
import {fetchBrands, fetchCategories, fetchTypes, fetchVariants} from "../../store/actions/FetchingActions";
import {setCategory} from "../../store/actions/SettingActions";
import {createBrand, createCategory, createType, createVariant} from "../../store/actions/CreatingActions";
import FilterBar from "../../components/FilterBar";
import BrandBar from "../../components/BrandBar";
const AdminSortControl = () => {
    const [categoryCreation, setCategoryCreation] = useState<boolean>(false)
    const [categoryCreationValue, setCategoryCreationValue] = useState<string>('')

    const [typeCreation, setTypeCreation] = useState<boolean>(false)
    const [typeCreationValue, setTypeCreationValue] = useState<string>('')

    const [variantCreation, setVariantCreation] = useState<boolean>(false)
    const [variantCreationValue, setVariantCreationValue] = useState<string>('')

    const [brandCreation, setBrandCreation] = useState<boolean>(false)
    const [brandCreationValue, setBrandCreationValue] = useState<string>('')

    const {categories, category, types} = useAppSelector(state => state.filterReducer)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchCategories())
    }, [])

    useEffect(() => {
        dispatch(fetchTypes(category))
    }, [category])
    return (
        <div className={classes['AdminSortControl']}>
            <div className={classes['AdminSortControl-filter']}>
                <FilterBar/>
                <BrandBar/>
            </div>
            <div className={classes['AdminSortControl-controllers']}>
                {!categoryCreation &&
                    <UIButton type={'tight'} onClick={() => setCategoryCreation(true)}>
                        Добавить Категорию
                    </UIButton>
                }
                {categoryCreation &&
                    <div className={classes['AdminSortControl__active-box']}>
                        <UIInput type={'string'} value={categoryCreationValue} setValue={i => setCategoryCreationValue(i)}>
                            Название категории
                        </UIInput>
                        <UIInteraction onClick={async() => {
                            await dispatch(createCategory(categoryCreationValue))
                            setCategoryCreation(false)
                            setCategoryCreationValue('')
                            await dispatch(fetchCategories())
                        }}><FaCheck/></UIInteraction>
                        <UIInteraction onClick={() => setCategoryCreation(false)}><FaTimes/></UIInteraction>
                    </div>
                }
                {!typeCreation &&
                    <UIButton type={'tight'} onClick={() => setTypeCreation(true)}>
                        Добавить тип
                    </UIButton>
                }
                {typeCreation &&
                    <div className={classes['AdminSortControl__active-box']}>
                        <UIInput type={'string'} value={typeCreationValue} setValue={i => setTypeCreationValue(i)}>
                            Название типа
                        </UIInput>
                        <UIInteraction onClick={async() => {
                            await dispatch(createType(category, typeCreationValue))
                            setTypeCreation(false)
                            setTypeCreationValue('')
                            await dispatch(fetchTypes(category))
                        }}><FaCheck/></UIInteraction>
                        <UIInteraction onClick={() => setTypeCreation(false)}><FaTimes/></UIInteraction>
                    </div>
                }
                {!variantCreation &&
                    <UIButton type={'tight'} onClick={() => setVariantCreation(true)}>
                        Добавить вариант
                    </UIButton>
                }
                {variantCreation &&
                    <div className={classes['AdminSortControl__active-box']}>
                        <UIInput type={'string'} value={variantCreationValue} setValue={i => setVariantCreationValue(i)}>
                            Название варианта
                        </UIInput>
                        <UIInteraction onClick={async() => {
                            await dispatch(createVariant(category, variantCreationValue.toLowerCase()))
                            setVariantCreation(false)
                            setVariantCreationValue('')
                            await dispatch(fetchVariants(category))
                        }}><FaCheck/></UIInteraction>
                        <UIInteraction onClick={() => setVariantCreation(false)}><FaTimes/></UIInteraction>
                    </div>
                }
                {!brandCreation &&
                    <UIButton type={'tight'} onClick={() => setBrandCreation(true)}>
                        Добавить бренд
                    </UIButton>
                }
                {brandCreation &&
                    <div className={classes['AdminSortControl__active-box']}>
                        <UIInput type={'string'} value={brandCreationValue} setValue={i => setBrandCreationValue(i)}>
                            Название бренда
                        </UIInput>
                        <UIInteraction onClick={async() => {
                            await dispatch(createBrand(category, brandCreationValue))
                            setBrandCreation(false)
                            setBrandCreationValue('')
                            await dispatch(fetchBrands(category))
                        }}><FaCheck/></UIInteraction>
                        <UIInteraction onClick={() => setBrandCreation(false)}><FaTimes/></UIInteraction>
                    </div>
                }
            </div>
        </div>
    );
};

export default AdminSortControl;