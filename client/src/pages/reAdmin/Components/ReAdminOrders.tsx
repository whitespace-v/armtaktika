import React, {useEffect, useState} from 'react';
import classes from '../../../styles/pages/ReAdmin/Components/ReAdminOrders.module.scss'
import {useAppDispatch, useAppSelector} from "../../../store/redux";
import {fetchBranches, fetchDays, fetchItems} from "../../../store/actions/FetchingActions";
import {defaultBrand, defaultCategory} from "../../../utils/consts";
import _ from "lodash";
import ReAdminPostingSizeCreator from "./ReAdminPostingSizeCreator";
import Layout from "../../../components/Layout";
import UIButton from "../../../UIKit/UIButton";
import {FaPlus, FaTimes} from "react-icons/fa";
import UIInput from "../../../UIKit/UIInput";
import UIReInput from "../../../UIKit/UIReInput";
import UIInteraction from "../../../UIKit/UIInteraction";
import {createDay} from "../../../store/actions/CreatingActions";
import ReAdminOrdersDay from "./ReAdminOrdersDay";
const ReAdminOrders = () => {
    const {branches, days} = useAppSelector(state => state.itemReducer)
    const dispatch = useAppDispatch()
    const [branchId, setBranchId] = useState<number>(1)
    const [dayCreation, setDayCreation] = useState<boolean>(false)
    const [dayName, setDayName] = useState<string>('')

    useEffect(() => {
        let today = new Date()
        setDayName(today.toJSON().slice(0,10).split('-').reverse().join('.'))
        dispatch(fetchBranches())
        dispatch(fetchItems({curVariants: [], brand: defaultBrand, type: defaultBrand, category: defaultCategory, page: 1, limit: 999}))
        dispatch(fetchDays({branchId}))
    },[branchId])
    const createDayHandler = async() => {
        await dispatch(createDay({name: dayName, branchId}))
        setDayCreation(false)
        await dispatch(fetchDays({branchId}))

    }
    return (
        <div className={classes['ReAdminOrders']}>
            <div className={classes['ReAdminOrders__header']}>
                {branches.length > 0 && branches.map((i, idx) =>
                    <div className={branchId === i.id ? classes['ReAdminOrders__header-item'] + ' ' + classes['active'] :
                        classes['ReAdminOrders__header-item']} key={idx}
                         onClick={() => setBranchId(i.id)}
                    >
                        {i.name}
                    </div>
                )}
            </div>
            <Layout>
                <div className={classes['ReAdminOrders__branch']}>
                    <div className={classes['ReAdminOrders__branch-createDay']}>
                        { dayCreation ?
                            <div className={classes['ReAdminOrders__branch-createDay-content']}>
                                <UIInput type={'string'} value={dayName} setValue={setDayName}>Дата</UIInput>
                                <UIInteraction onClick={() => createDayHandler()}><FaPlus/></UIInteraction>
                                <UIInteraction onClick={() => setDayCreation(false)}><FaTimes/></UIInteraction>
                            </div>
                            :
                            <div className={classes['ReAdminOrders__branch-createDay-button']}>
                                <UIButton onClick={() => setDayCreation(true)} type={'tight'}>Добавить день</UIButton>
                            </div>

                        }
                    </div>
                    <div className={classes['ReAdminOrders__branch-days']}>
                        {_.filter(days, o => Number(o['branchId']) === branchId).map(d =>
                            <div key={d.id}>
                                <ReAdminOrdersDay day={d} branchId={branchId}/>
                            </div>

                        )}
                    </div>
                </div>
            </Layout>
        </div>
    );
};

export default ReAdminOrders;