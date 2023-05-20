import React, {useState} from 'react';
import classes from '../styles/components/Header.module.scss'
import Layout from "./Layout";
import logo from '../assets/logo.svg'
import {SlBag} from "react-icons/sl";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../store/redux";
import BasketWidget from "./BasketWidget";
import {check} from "../store/actions/FetchingActions";
import useWindowSize from "../utils/hooks/useWindowSize";
import {MdOutlineMenu} from "react-icons/md";
import {RxCross1} from "react-icons/rx";

const Header = () => {
    const navigate = useNavigate()
    const {basket} = useAppSelector(state => state.itemReducer)
    const {user} = useAppSelector(state => state.userReducer)
    const dispatch = useAppDispatch()
    const [widgetActive, setWidgetActive] = useState<boolean>(false)
    const {width} = useWindowSize()
    const [mobileHeader, setMobileHeader] = useState<boolean>(false)
    return (
        <Layout>
            <div className={classes['Header']}>
                <div className={classes['Header-content']}>
                    <div className={classes['Header-content__logo']} onClick={() => navigate('/')}>
                        {/*<div className={classes['Header-content__logo-image']}*/}
                        {/*     style={{backgroundImage: `url(${logo})`}}*/}
                        {/*/>*/}
                        <div className={classes['Header-content__logo-image']}>
                            <img src={logo} alt=""/>
                        </div>
                        {/*{(width > 1050 || width < 780) &&*/}
                        {/*    <div className={classes['Header-content__logo-text']}>*/}
                        {/*        <div className={classes['Header-content__logo-text-header']}>*/}
                        {/*            ARMARKET*/}
                        {/*        </div>*/}
                        {/*        <div className={classes['Header-content__logo-text-subheader']}>*/}
                        {/*            МАГАЗИН ТАКТИЧЕСКОЙ ОДЕЖДЫ ОБУВИ И СНАРЯЖЕНИЯ*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*}*/}

                    </div>
                    {width > 950 ?
                        <>
                            <div className={classes['Header-content__item']}
                                 onClick={() => navigate('/')}
                            >
                                Главная
                            </div>
                            <div className={classes['Header-content__item']}>
                                О нас
                            </div>
                            <div className={classes['Header-content__item']}>
                                Контакты
                            </div>
                            <div className={classes['Header-content__item']}
                                 onClick={() => navigate('/policy')}
                            >
                                Политика конфиденциальности
                            </div>
                            {user === 'Admin' &&
                                <div className={classes['Header-content__item']} onClick={() => navigate('/admin')}>
                                    Админ
                                </div>
                            }
                            {user ?
                                <div className={classes['Header-content__item']}
                                     onClick={async() => {
                                         localStorage.removeItem('token')
                                         await dispatch(check())
                                     }}
                                >
                                    Выход
                                </div> :
                                <div className={classes['Header-content__item']} onClick={() => navigate('/auth')}>
                                    Вход
                                </div>
                            }
                        </>
                        :
                        <div className={classes['Header-content__item-burger']} onClick={() => setMobileHeader(!mobileHeader)}>
                            {mobileHeader ? <RxCross1/> : <MdOutlineMenu/>}
                        </div>
                    }
                    {basket.length > 0 &&
                        <div className={classes['Header-content__item__basket']} onClick={() => setWidgetActive(!widgetActive)}>
                            <SlBag/>
                            <div className={classes['Header-content__item__basket-count']}>
                                {basket.length}
                            </div>
                        </div>
                    }
                </div>
            </div>
            {(basket.length > 0 && widgetActive) && <BasketWidget/>}
            {mobileHeader &&
                <div className={classes['MobileHeader']}>
                    <Layout>
                        <div className={classes['MobileHeader__nav']}>
                            <div className={classes['MobileHeader__nav-item']}
                                 onClick={() => {
                                     navigate('/')
                                     setMobileHeader(false)
                                 }}
                            >
                                Главная
                            </div>
                            <div className={classes['MobileHeader__nav-item']}
                                 onClick={() => {
                                     navigate('/about')
                                     setMobileHeader(false)
                                 }}
                            >
                                О нас
                            </div>
                            <div className={classes['MobileHeader__nav-item']}
                                 onClick={() => {
                                     navigate('/contacts')
                                     setMobileHeader(false)
                                 }}
                            >
                                Контакты
                            </div>
                            <div className={classes['MobileHeader__nav-item']}
                                 onClick={() => {
                                     navigate('/policy')
                                     setMobileHeader(false)
                                 }}
                            >
                                Политика конфиденциальности
                            </div>
                            {user === 'Admin' &&
                                <div className={classes['MobileHeader__nav-item']}
                                     onClick={() => {
                                         navigate('/admin')
                                         setMobileHeader(false)
                                     }}
                                >
                                   Админ-панель
                                </div>
                            }
                            {user ?
                                <div className={classes['MobileHeader__nav-item']}
                                     onClick={async() => {
                                         localStorage.removeItem('token')
                                         await dispatch(check())
                                     }}
                                >
                                    Выход
                                </div>
                                :
                                <div className={classes['MobileHeader__nav-item']}
                                     onClick={() => {
                                         navigate('/auth')
                                         setMobileHeader(false)
                                     }}
                                >
                                    Вход
                                </div>
                            }
                        </div>
                        <div className={classes['MobileHeader__contacts']}>
                            <div className={classes['MobileHeader__contacts-keys']}>
                                <div className={classes['MobileHeader__contacts-keys-item']}>
                                    Горячая линия:
                                </div>
                                <div className={classes['MobileHeader__contacts-keys-item']}>
                                    Служба поддержки:
                                </div>
                                <div className={classes['MobileHeader__contacts-keys-item']}>
                                    Компаниям
                                </div>
                                <div className={classes['MobileHeader__contacts-keys-item']}>
                                    Заказы и вопросы:
                                </div>
                            </div>
                            <div className={classes['MobileHeader__contacts-values']}>
                                <div className={classes['MobileHeader__contacts-values-item']}
                                     onClick={() => window.open('tel:+79999999296', '_self')}
                                >
                                    + 7 (999) 999 92-96
                                </div>
                                <div className={classes['MobileHeader__contacts-values-item']}
                                     onClick={() => window.open('mailto:support@armtaktika.ru', '_blank')}
                                >
                                    support@armtaktika.ru
                                </div>
                                <div className={classes['MobileHeader__contacts-values-item']}
                                     onClick={() => window.open('mailto:info@armtaktika.ru', '_blank')}
                                >
                                    info@armtaktika.ru
                                </div>
                                <div className={classes['MobileHeader__contacts-values-item']}
                                     onClick={() => window.open('mailto:orders@armtaktika.ru', '_blank')}
                                >
                                    orders@armtaktika.ru
                                </div>
                            </div>
                        </div>
                        <div className={classes['MobileHeader__footer']}>
                            <div className={classes['MobileHeader__footer-name']}>
                                г. Владивосток, ул. Комсомольская, 9в
                            </div>
                            <div className={classes['MobileHeader__footer-clock']}>
                                ПН-ПТ 11:00 - 20:00 <br/>
                                СБ-ВС 11:00 - 18:00
                            </div>
                        </div>
                    </Layout>
                </div>
            }
        </Layout>
    );
};

export default Header;