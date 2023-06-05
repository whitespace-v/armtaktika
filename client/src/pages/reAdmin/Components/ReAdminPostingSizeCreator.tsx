import React, {useEffect, useState} from 'react';
import classes from '../../../styles/pages/ReAdmin/Components/ReAdminPostingSizeCreator.module.scss'
import {addSize} from "../../../store/actions/CreatingActions";
import {useAppDispatch, useAppSelector} from "../../../store/redux";
import {fetchBranches, fetchItems} from "../../../store/actions/FetchingActions";
import {defaultBrand, defaultCategory} from "../../../utils/consts";
import {current} from "@reduxjs/toolkit";
import _ from "lodash";

const ReAdminPostingSizeCreator = ({itemId, branchId, purchase}: {itemId: number, branchId: number, purchase: string}) => {
    const dispatch = useAppDispatch()
    const {branches} = useAppSelector(state => state.itemReducer)
    const [sizeCreation, setSizeCreation] = useState<boolean>(false)
    const [name, setName] = useState<string>('')
    const [quantity, setQuantity] = useState<string>('')
    const [branchName, setBranchName] = useState<string>('')

    useEffect(() => {
        let s = _.find(branches, b => b.id === branchId)
        s && setBranchName(s.name)
    }, [branchId])
    const createHandler = async () => {
        setSizeCreation(false)
        await dispatch(addSize({branchId, branchName, itemId, name, purchase, quantity}))
        setName('')
        setQuantity('')
        await dispatch(fetchItems({curVariants: [], brand: defaultBrand, type: defaultBrand, category: defaultCategory, page: 1, limit: 999}))
    }

    return (
        <>
            {sizeCreation ?
                <div className={classes['ReAdminPostingSizeCreator__modal']}>
                    <div className={classes['ReAdminPostingSizeCreator__modal-container']}>
                        Размер ("0" - безразмерность)
                        <input type="text" value={name} onChange={i => setName(i.currentTarget.value)}/>
                        Количество
                        <input type="text" value={quantity} onChange={i => setQuantity(i.currentTarget.value)}/>
                        <div className={classes['ReAdminPostingSizeCreator__modal-container-buttons']}>
                            <div onClick={() => setSizeCreation(false)}>
                                Отмена
                            </div>
                            <div onClick={() => createHandler()}>
                                Добавить
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div className={classes['ReAdminPostingSizeCreator']} onClick={() => setSizeCreation(true)}>
                    +
                </div>
            }
        </>
    );
};

export default ReAdminPostingSizeCreator;