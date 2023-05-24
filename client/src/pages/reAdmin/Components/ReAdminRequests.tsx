import React, {useEffect} from 'react';
import classes from '../../../styles/pages/ReAdmin/Components/ReAdminRequests.module.scss'
import {useAppDispatch, useAppSelector} from "../../../store/redux";
import {fetchOrders} from "../../../store/actions/FetchingActions";
import Layout from "../../../components/Layout";
import {useNavigate} from "react-router-dom";
import ReAdminRequestsUser from "./ReAdminRequestsUser";
const ReAdminRequests = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const {orders} = useAppSelector(state => state.orderReducer)

    useEffect(() => {
        dispatch(fetchOrders())
    }, [])

    return (
        <div className={classes['ReAdminRequests']}>
            <Layout>
                <div className={classes['ReAdminRequests__items']}>
                    {orders.map((i, idx) =>
                        <div className={classes['ReAdminRequests__items-item']} key={idx}>
                            <div className={classes['ReAdminRequests__items-item-title']}>
                                {i.number}
                            </div>
                            <div className={classes['ReAdminRequests__items-item-order']}>
                                {i.items.map((i, idx) =>
                                    <div className={classes['ReAdminRequests__items-item-order-item']}
                                         key={idx}
                                         onClick={() => navigate(`/item/${i.itemId}`)}
                                    >
                                        {i.itemName} [{i.itemSize}] - {i.itemQuantity} шт. - {i.itemPrice} ₽
                                    </div>
                                )}
                            </div>
                            <ReAdminRequestsUser item={i}/>
                        </div>
                    )}
                </div>
            </Layout>
        </div>
    );
};

export default ReAdminRequests;