import React, {useEffect} from 'react';
import classes from '../styles/pages/Compilation.module.scss'
import {useAppDispatch, useAppSelector} from "../store/redux";
import {fetchCompilation} from "../store/actions/FetchingActions";
import {useParams} from "react-router-dom";
import Header from "../components/Header";
import Item from "../components/Item";
import Layout from "../components/Layout";
import Footer from "../components/Footer";
const Compilation = () => {
    const {id} = useParams()
    const dispatch = useAppDispatch()
    const {compilation} = useAppSelector(state => state.itemReducer)

    useEffect(() => {
        dispatch(fetchCompilation(id))
        window.scroll(0,0)
    }, [])

    return (
        <div className={classes['Compilation']}>
            <Header/>
            <div className={classes['Compilation__title']}>
                <div className={classes['Compilation__title-line']}/>
                <div className={classes['Compilation__title-text']}>
                    {compilation.name}
                </div>
                <div className={classes['Compilation__title-line']}/>
            </div>
            <Layout>
                <div className={classes['Compilation__items']}>
                    {compilation.items.map(i =>
                        <Item item={i}/>
                    )}
                </div>
            </Layout>
            <Footer/>
        </div>
    );
};

export default Compilation;