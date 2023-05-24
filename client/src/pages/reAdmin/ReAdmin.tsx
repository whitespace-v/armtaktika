import React, {useEffect, useState} from 'react';
import classes from '../../styles/pages/ReAdmin/ReAdmin.module.scss'
import ReAdminGoods from "./Components/ReAdminGoods";
import ReAdminOrders from "./Components/ReAdminOrders";
import ReAdminPosting from "./Components/ReAdminPosting";
import ReAdminRequests from "./Components/ReAdminRequests";
import ReAdminAnalytics from "./Components/ReAdminAnalytics";
import ReAdminCompilations from "./Components/ReAdminCompilations";
import {useAppDispatch, useAppSelector} from "../../store/redux";
import {check} from "../../store/actions/FetchingActions";
import {useNavigate} from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const ReAdmin = () => {
    const dispatch = useAppDispatch()
    const {user} = useAppSelector(state => state.userReducer)
    const [current, setCurrent] = useState<number>(0)
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(check())
        if (user !== 'Admin') {
            navigate('/')
        }
    }, [])

    return (
        <div className={classes['ReAdmin']}>
            <Header/>
            <div className={classes['ReAdmin__header']}>
                {['Реестр товаров','Оприходывание','Продажи','Заявки','Аналитика','Подборки'].map((i,idx) =>
                    <div className={idx === current ? classes['ReAdmin__header-item'] + ' ' + classes['active']
                        : classes['ReAdmin__header-item']}
                         key={i}
                         onClick={() => setCurrent(idx)}
                    >
                        {i}
                    </div>
                )}
            </div>
            {current === 0 && <ReAdminGoods/>}
            {current === 1 && <ReAdminPosting/>}
            {current === 2 && <ReAdminOrders/>}
            {current === 3 && <ReAdminRequests/>}
            {current === 4 && <ReAdminAnalytics/>}
            {current === 5 && <ReAdminCompilations/>}
            <Footer/>
        </div>
    );
};

export default ReAdmin;