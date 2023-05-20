import React, {useEffect, useRef, useState} from 'react';
import classes from '../../styles/pages/Admin/AdminOrderList.module.scss'
import {useAppDispatch, useAppSelector} from "../../store/redux";
// import {fetchBudget, fetchExpenses, fetchOrders} from "../../store/actions/FetchingActions";
import {updateOrderStatus} from "../../store/actions/UpdatingActions";
import ItemList from "../../styles/components/ItemList.module.scss";
// import {setOrderPage} from "../../store/actions/SettingActions";
const AdminOrderList = () => {
    const dispatch = useAppDispatch()
    const {orders} = useAppSelector(state => state.orderReducer)
    const [branchValue, setBranchValue] = useState<string>('')
    //page logics
    const firstInView = useRef<HTMLInputElement>(null)

    // useEffect(() => {
    //     dispatch(fetchOrders())
    // },[])


    return (
        <div className={classes['AdminOrderList']} ref={firstInView}>
            {/*Всего заказов: {orders.count}*/}
            {/*{orders.rows.map(i =>*/}
            {/*    <div className={classes['AdminOrderList__item']} key={i.id}>*/}
            {/*        <div className={classes['AdminOrderList__item-id']}>*/}
            {/*            {i.id}*/}
            {/*        </div>*/}
            {/*        <div className={classes['AdminOrderList__item-phone']}>*/}
            {/*            №{i.order}*/}
            {/*        </div>*/}
            {/*        <div className={classes['AdminOrderList__item-order']}>*/}
            {/*            {i.items}*/}
            {/*        </div>*/}
            {/*        <div className={classes['AdminOrderList__item-price']}>*/}
            {/*            {Number(i.sum).toLocaleString('ru')} ₽*/}
            {/*        </div>*/}
            {/*        <div className={classes['AdminOrderList__item-costumer']}>*/}
            {/*            <div className={classes['AdminOrderList__item-costumer-name']}>*/}
            {/*                {i.name}*/}
            {/*            </div>*/}
            {/*            <div className={classes['AdminOrderList__item-costumer-name']}>*/}
            {/*                {i.surname}*/}
            {/*            </div>*/}
            {/*            <div className={classes['AdminOrderList__item-costumer-name']}>*/}
            {/*                {i.patronymic}*/}
            {/*            </div>*/}
            {/*            <div className={classes['AdminOrderList__item-costumer-name']}>*/}
            {/*                {i.phone}*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*        <div className={classes['AdminOrderList__item-delivery']}>*/}
            {/*            <div className={classes['AdminOrderList__item-delivery-title']}>*/}
            {/*                {i.delivery}*/}
            {/*            </div>*/}
            {/*            <div className={classes['AdminOrderList__item-delivery']}>*/}
            {/*                {i.deliveryCity}*/}
            {/*            </div>*/}
            {/*            <div className={classes['AdminOrderList__item-delivery']}>*/}
            {/*                {i.deliveryAddress}*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*        <div className={classes['AdminOrderList__item-status']}>*/}
            {/*            <div className={classes['AdminOrderList__item-status-current']}*/}
            {/*                 onClick={ async () => {*/}
            {/*                     await dispatch(updateOrderStatus({id: i.id, json: i.jsonItems, branch: branchValue}))*/}
            {/*                     setBranchValue('')*/}
            {/*                     await dispatch(fetchOrders())*/}
            {/*                     await dispatch(fetchBudget())*/}
            {/*                     await dispatch(fetchExpenses())*/}
            {/*                 }}*/}
            {/*            >*/}
            {/*                {i.status} ({i.branch})*/}
            {/*            </div>*/}
            {/*            <div className={classes['AdminOrderList__item-status-selector']}>*/}
            {/*                {['Сайт', 'Владивосток'].map(i =>*/}
            {/*                    <div onClick={() => setBranchValue(i)} key={i}*/}
            {/*                         className={i === branchValue ?*/}
            {/*                             classes['AdminOrderList__item-status-selector-item'] + ' ' + classes['active'] :*/}
            {/*                             classes['AdminOrderList__item-status-selector-item']*/}
            {/*                         }*/}
            {/*                    >*/}
            {/*                        {i}*/}
            {/*                    </div>*/}
            {/*                )}*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*)}*/}
        </div>
    );
};

export default AdminOrderList;