import React, {useEffect, useState} from 'react';
import classes from '../../../styles/pages/ReAdmin/Components/ReAdminOrdersDayItem.module.scss'
import {IItem, ISize} from "../../../utils/models";
import {FaPlus} from "react-icons/fa";
import {useAppDispatch} from "../../../store/redux";
import {addToDay} from "../../../store/actions/CreatingActions";
import {fetchDays, fetchItems} from "../../../store/actions/FetchingActions";
import {defaultBrand, defaultCategory} from "../../../utils/consts";

const ReAdminOrdersDayItem = ({item, size, dayId, branchId}: {item: IItem, size: ISize, dayId: number, branchId: number}) => {
    const dispatch = useAppDispatch()
    const [opened, setOpened] = useState<boolean>(false)

    const [price, setPrice] = useState<string>(item.price)
    const [quantity, setQuantity] = useState<string>('1')

    const addHandler = async () => {
        await dispatch(addToDay({item, size, price, purchase: item.purchase, quantity, dayId, branchId}))
        setOpened(false)
        await dispatch(fetchDays({branchId}))
        dispatch(fetchItems({curVariants: [], brand: defaultBrand, type: defaultBrand, category: defaultCategory, page: 1, limit: 999}))
    }


    return (
        <div className={classes['ReAdminOrdersDayItem']}>
            <div className={opened ? classes['ReAdminOrdersDayItem-item'] + ' ' + classes['active'] :
                classes['ReAdminOrdersDayItem-item']
            }
                 onClick={() => setOpened(!opened)}
            >
                {item.name} - [ {size.name} р ] - {size.quantity} шт.
            </div>
            {opened &&
                <div className={classes['ReAdminOrdersDayItem-item-opened']}>
                    <div className={classes['ReAdminOrdersDayItem-item-opened-input']}>
                        Цена продажи единицы товара
                        <input type="text"
                               value={price}
                               onChange={i => setPrice(i.currentTarget.value)}
                        />
                    </div>
                    <div className={classes['ReAdminOrdersDayItem-item-opened-input']}>
                        Количество (max = {size.quantity})
                        <input type="text" value={quantity} onChange={i => setQuantity(i.currentTarget.value)}/>
                    </div>
                    <div className={classes['ReAdminOrdersDayItem-item-opened-button']}
                         onClick={() => addHandler()}
                    >
                        <FaPlus/> Добавить позицию
                    </div>
                </div>
            }
        </div>
    );
};

export default ReAdminOrdersDayItem;