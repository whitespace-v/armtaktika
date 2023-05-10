import React, {useEffect, useRef, useState} from 'react';
import classes from '../../styles/pages/Admin/AdminOrderList.module.scss'
import {useAppDispatch, useAppSelector} from "../../store/redux";
import {fetchBudget, fetchExpenses, fetchOrders} from "../../store/actions/FetchingActions";
import {updateOrderStatus} from "../../store/actions/UpdatingActions";
import ItemList from "../../styles/components/ItemList.module.scss";
import {setOrderPage} from "../../store/actions/SettingActions";
const AdminOrderList = () => {
    const dispatch = useAppDispatch()
    const {orders, page} = useAppSelector(state => state.orderReducer)
    const [branchValue, setBranchValue] = useState<string>('')
    //page logics
    const firstInView = useRef<HTMLInputElement>(null)
    const [pageCount, setPageCount] = useState<number>(0)
    const [startPage, setStartPage] = useState<number>(0)
    const [endPage, setEndPage] = useState<number>(5)

    useEffect(() => {
        dispatch(fetchOrders(page))
    },[page])

    useEffect(() => {
        setPageCount(Math.ceil(orders.count / 15)) // 15 -> limit
    }, [orders])

    const switchPage = async(page: number) => {
        dispatch(setOrderPage(page))
        firstInView.current && firstInView.current.scrollIntoView({behavior: 'smooth', block: 'start',})
        if (page === 1){
            setStartPage(0)
        } else if (page > 1){
            setStartPage(page - 2)
        }
        if (page === pageCount) {
            setEndPage(pageCount)
        } else if (page === pageCount - 1 || page === pageCount - 2 || page === pageCount - 3) {
            setEndPage(pageCount)
        } else {
            setEndPage(page + 3)
        }
    }
    return (
        <div className={classes['AdminOrderList']} ref={firstInView}>
            Всего заказов: {orders.count}
            {orders.rows.map(i =>
                <div className={classes['AdminOrderList__item']} key={i.id}>
                    <div className={classes['AdminOrderList__item-id']}>
                        {i.id}
                    </div>
                    <div className={classes['AdminOrderList__item-phone']}>
                        №{i.order}
                    </div>
                    <div className={classes['AdminOrderList__item-order']}>
                        {i.items}
                    </div>
                    <div className={classes['AdminOrderList__item-price']}>
                        {Number(i.sum).toLocaleString('ru')} ₽
                    </div>
                    <div className={classes['AdminOrderList__item-costumer']}>
                        <div className={classes['AdminOrderList__item-costumer-name']}>
                            {i.name}
                        </div>
                        <div className={classes['AdminOrderList__item-costumer-name']}>
                            {i.surname}
                        </div>
                        <div className={classes['AdminOrderList__item-costumer-name']}>
                            {i.patronymic}
                        </div>
                        <div className={classes['AdminOrderList__item-costumer-name']}>
                            {i.phone}
                        </div>
                    </div>
                    <div className={classes['AdminOrderList__item-delivery']}>
                        <div className={classes['AdminOrderList__item-delivery-title']}>
                            {i.delivery}
                        </div>
                        <div className={classes['AdminOrderList__item-delivery']}>
                            {i.deliveryCity}
                        </div>
                        <div className={classes['AdminOrderList__item-delivery']}>
                            {i.deliveryAddress}
                        </div>
                    </div>
                    <div className={classes['AdminOrderList__item-status']}>
                        <div className={classes['AdminOrderList__item-status-current']}
                             onClick={ async () => {
                                 await dispatch(updateOrderStatus({id: i.id, json: i.jsonItems, branch: branchValue}))
                                 setBranchValue('')
                                 await dispatch(fetchOrders(page))
                                 await dispatch(fetchBudget())
                                 await dispatch(fetchExpenses())
                             }}
                        >
                            {i.status} ({i.branch})
                        </div>
                        <div className={classes['AdminOrderList__item-status-selector']}>
                            {['Сайт', 'Владивосток'].map(i =>
                                <div onClick={() => setBranchValue(i)} key={i}
                                     className={i === branchValue ?
                                         classes['AdminOrderList__item-status-selector-item'] + ' ' + classes['active'] :
                                         classes['AdminOrderList__item-status-selector-item']
                                }
                                >
                                    {i}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
            {pageCount > 0 &&
                <div className={ItemList['ItemList__pages']}>
                    {Array.from(Array(pageCount).keys()).slice(startPage, endPage).map(i =>
                        <div onClick={() => switchPage(i + 1)} key={i}
                             className={
                                 page - 1 === i ? ItemList['ItemList__pages-item'] + ' ' +
                                     ItemList['current'] : ItemList['ItemList__pages-item']
                             }
                        >
                            {i + 1}
                        </div>
                    )}
                </div>
            }
        </div>
    );
};

export default AdminOrderList;