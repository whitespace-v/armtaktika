import React, {useEffect, useState} from 'react';
import classes from '../../../styles/pages/ReAdmin/Components/ReAdminOrdersDay.module.scss'
import {IDay} from "../../../utils/models";
import {FaMinus, FaPlus, FaTimes} from "react-icons/fa";
import {useAppDispatch, useAppSelector} from "../../../store/redux";
import _ from "lodash";
import ReAdminOrdersDayItem from "./ReAdminOrdersDayItem";
import {deleteFromDay} from "../../../store/actions/DeletingActions";
import {fetchDays} from "../../../store/actions/FetchingActions";
import {useNavigate} from "react-router-dom";
const ReAdminOrdersDay = ({day, branchId}: {day: IDay, branchId: number}) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [itemCreation, setItemCreation] = useState<boolean>(false)
    const {items} = useAppSelector(state => state.itemReducer)
    const [daySum, setDaySum] = useState<number>(0)
    const deleteFromDayHandler = async({dayItemId, sizeId, quantity}:{dayItemId: number, sizeId: number, quantity: string}) => {
        await dispatch(deleteFromDay({id: dayItemId, branchId, sizeId, quantity}))
        await dispatch(fetchDays({branchId}))
    }
    useEffect(() => {
        countDaySum()
    }, [day])

    const countDaySum = () => {
        let t = 0
        for (let i=0; i < day.items.length; i++){
            t += Number(day.items[i].itemPrice) * Number(day.items[i].itemQuantity)
        }
        setDaySum(t)
    }

    return (
        <div className={classes['ReAdminOrdersDay']}>
            <div className={classes['ReAdminOrdersDay__header']}>
                <div className={classes['ReAdminOrdersDay__header-title']}>
                    {day.name} - Σ {daySum}
                </div>
                <div className={classes['ReAdminOrdersDay__header-add']}>
                    {itemCreation ?
                        <div className={classes['ReAdminOrdersDay__header-add-content']}>
                            <div className={classes['ReAdminOrdersDay__header-add-content-cross']}
                                 onClick={() => setItemCreation(false)}
                            >
                                <FaTimes/>
                            </div>
                            <div className={classes['ReAdminOrdersDay__header-add-content-container']}>
                                {items.rows.map(i =>
                                    <div key={i.id}>
                                        {_.filter(i.sizes, o => o["branchId"] === branchId && Number(o['quantity']) > 0).map(s =>
                                            <div key={s.id}>
                                                <ReAdminOrdersDayItem branchId={branchId} item={i} size={s} dayId={day.id}/>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div> :
                        <div className={classes['ReAdminOrdersDay__header-add-button']}
                             onClick={() => setItemCreation(true)}
                        >
                            <FaPlus/> Добавить позицию
                        </div>
                    }
                </div>
            </div>
            <div className={classes['ReAdminOrdersDay__content']}>
                {day.items.map(i =>
                    <div className={classes['ReAdminOrdersDay__content-item']} key={i.id}>
                        <div className={classes['ReAdminOrdersDay__content-item-name']}
                             onClick={() => navigate(`/item/${i.id}`)}
                        >
                            {i.itemName} [{i.itemSizeName}] - {i.itemQuantity} шт. - {i.itemPrice}р.
                        </div>
                        <div className={classes['ReAdminOrdersDay__content-item-delete']}
                             onClick={() => deleteFromDayHandler(
                                 {
                                     dayItemId: i.id, sizeId: i.itemSizeId,
                                     quantity: i.itemQuantity
                                 })}
                        >
                            <FaMinus/>
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
};

export default ReAdminOrdersDay;