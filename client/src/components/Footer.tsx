import React, {useEffect} from 'react';
import classes from '../styles/components/Footer.module.scss'
import Layout from "./Layout";
import logo from '../assets/logo.svg'
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../store/redux";
import {check} from "../store/actions/FetchingActions";
const Footer = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const {user} = useAppSelector(state => state.userReducer)

    useEffect(() => {
        dispatch(check())
    }, [])

    const logOut = async () => {
        localStorage.clear()
        await dispatch(check())
    }

    return (
        <div className={classes["Footer"]}>
            <Layout>
                <div className={classes["Footer__content"]}>
                    <div className={classes["Footer__content-nav"]}>
                        <div className={classes["Footer__content-nav-item"]}
                             onClick={() => navigate('/shop')}
                        >
                            Каталог
                        </div>
                        <div className={classes["Footer__content-nav-item"]}>
                            О нас
                        </div>
                        <div className={classes["Footer__content-nav-item"]}>
                            Контакты
                        </div>
                        <div className={classes["Footer__content-nav-item"]}>
                            Покупателям
                        </div>
                        {user ?
                            <div className={classes["Footer__content-nav-item"]}
                                 onClick={() => logOut()}
                            >
                                Выход
                            </div>:
                            <div className={classes["Footer__content-nav-item"]}
                                 onClick={() => navigate('/auth')}
                            >
                                Вход
                            </div>
                        }
                        {user ==='Admin' &&
                            <div className={classes["Footer__content-nav-item"]}
                                 onClick={() => navigate('/admin')}
                            >
                                Админ
                            </div>}
                    </div>
                    <div className={classes["Footer__content-links"]}>
                        <div className={classes["Footer__content-links-keys"]}>
                            <div className={classes["Footer__content-links-keys-item"]}>
                                Горячая линия
                            </div>
                            <div className={classes["Footer__content-links-keys-item"]}>
                                Служба поддержки
                            </div>
                            <div className={classes["Footer__content-links-keys-item"]}>
                                Компаниям
                            </div>
                            <div className={classes["Footer__content-links-keys-item"]}>
                                Задать вопрос в Telegram
                            </div>
                        </div>
                        <div className={classes["Footer__content-links-values"]}>
                            <div className={classes["Footer__content-links-values-item"]}>
                                +7 (999) 999 92-96
                            </div>
                            <div className={classes["Footer__content-links-values-item"]}>
                                support@armtaktika.ru
                            </div>
                            <div className={classes["Footer__content-links-values-item"]}>
                                info@armtaktika.ru
                            </div>
                            <div className={classes["Footer__content-links-values-item"]}>
                                @ar_militarym
                            </div>
                        </div>
                    </div>
                    <div className={classes["Footer__content-icon"]}>
                        <img src={logo} alt=""/>
                        <div className={classes["Footer__content-icon-address"]}>
                            г . Владивосток, ул. Комсомольская, 9в
                        </div>
                    </div>
                </div>
                <div className={classes["Footer__cp"]}>
                    <div className={classes["Footer__cp-item"]}
                         onClick={() => navigate('/policy')}
                    >
                        Политика конфиденциальности
                    </div>
                    <div className={classes["Footer__cp-info"]}>
                        ИП "Борисенко Никита Андреевич" ИНН: 254007082871 ОГРН: 322253600082896
                    </div>
                </div>
            </Layout>
        </div>
    );
};

export default Footer;