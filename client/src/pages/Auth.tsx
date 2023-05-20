import React, {useEffect, useState} from 'react';
import classes from '../styles/pages/Auth.module.scss'
import Header from "../components/Header";
import Footer from "../components/Footer";
import UIInput from "../UIKit/UIInput";
import UIButton from "../UIKit/UIButton";
import {useAppDispatch, useAppSelector} from "../store/redux";
import {auth} from "../store/actions/FetchingActions";
import {useNavigate} from "react-router-dom";
const Auth = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const {user} = useAppSelector(state => state.userReducer)

    const [phone, setPhone] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [method, setMethod] = useState<string>('Вход')

    const authHandler = () => {
        if (phone && password) {
            dispatch(auth({method, phone, password}))
        } else {
            alert('Заполните поля')
        }
    }

    useEffect(() => {
        setPhone('')
        setPassword('')
    }, [method])

    useEffect(() => {
        if (user) {
            navigate('/')
        }
    }, [user])

    return (
        <>
            <Header/>
            <div className={classes['Auth']}>
                <div className={classes['Auth__container']}>
                    <div className={classes['Auth__container-title']}>
                        {['Вход','Регистрация'].map(i =>
                            <div key={i} className={i === method ? classes['Auth__container-title-item']
                                + ' ' + classes['current'] : classes['Auth__container-title-item']}
                                 onClick={() => setMethod(i)}
                            >
                                {i}
                            </div>
                        )}

                    </div>
                    <UIInput type={'phone'} value={phone} setValue={setPhone}>Номер телефона</UIInput>
                    <UIInput type={'phone'} value={password} setValue={setPassword}>Пароль</UIInput>

                    <UIButton type={'wide'} onClick={() => authHandler()}>
                        {method === 'Вход' ? 'Войти': 'Зарегистрироваться'}
                    </UIButton>

                </div>
            </div>
            <Footer/>
        </>
    );
};

export default Auth;