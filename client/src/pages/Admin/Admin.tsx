import React from 'react';
import classes from '../../styles/pages/Admin/Admin.module.scss'
import AdminSortControl from "./AdminSortControl";
import Layout from "../../components/Layout";
import AdminItemCreator from "./Creators/AdminItemCreator";
import AdminItemList from "./AdminItemList";
import Header from "../../components/Header";
import AdminOrderList from "./AdminOrderList";
import AdminAnalytics from "./AdminAnalytics";
const Admin = () => {

    return (
        <Layout>
            <Header/>
            <div className={classes['Admin']}>
                <AdminSortControl/>
                <AdminItemCreator/>
                <AdminItemList/>
                <AdminOrderList/>
                <AdminAnalytics/>
            </div>
        </Layout>
    );
};

export default Admin;