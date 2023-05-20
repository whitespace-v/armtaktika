import React, {useState} from 'react';
import classes from '../../styles/pages/ReAdmin/ReAdmin.module.scss'
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import ReAdminGoods from "./Components/ReAdminGoods";
import ReAdminOrders from "./Components/ReAdminOrders";
import ReAdminPosting from "./Components/ReAdminPosting";
import ReAdminRequests from "./Components/ReAdminRequests";
import ReAdminAnalytics from "./Components/ReAdminAnalytics";

const ReAdmin = () => {
    const [current, setCurrent] = useState<number>(0)
    return (
        <div className={classes['ReAdmin']}>
            <Header/>
            {/*<Layout>*/}
            <div className={classes['ReAdmin__header']}>
                {['Реестр товаров','Оприходывание','Продажи','Заявки','Аналитика'].map((i,idx) =>
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
            {/*</Layout>*/}
        </div>
    );
};

export default ReAdmin;