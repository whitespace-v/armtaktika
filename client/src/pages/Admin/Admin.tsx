import React, {useEffect} from 'react';
import classes from '../../styles/pages/Admin/Admin.module.scss'
import AdminSortControl from "./AdminSortControl";
import Layout from "../../components/Layout";
import AdminItemList from "./AdminItemList";
import Header from "../../components/Header";
import AdminOrderList from "./AdminOrderList";
import AdminAnalytics from "./AdminAnalytics";
import {useAppSelector} from "../../store/redux";
import {useNavigate} from "react-router-dom";
const Admin = () => {
    const navigate = useNavigate()
    const {user} = useAppSelector(state => state.userReducer)

    useEffect(() => {
        if (user !== 'Admin') {
            navigate('/')
        }
    }, [user])

    return (
        <Layout>
            <Header/>
            <div className={classes['Admin']}>
                <AdminSortControl/>
                <AdminItemList/>
                <AdminOrderList/>
                <AdminAnalytics/>
            </div>
        </Layout>
    );
};

export default Admin;