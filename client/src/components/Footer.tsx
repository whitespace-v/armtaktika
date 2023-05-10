import React from 'react';
import classes from '../styles/components/Footer.module.scss'
import Layout from "./Layout";
import logo from '../assets/logo.svg'
import {BsInstagram } from "react-icons/bs";
import {SlSocialVkontakte} from "react-icons/sl";
import {ImWhatsapp} from "react-icons/im";
import {FaTelegramPlane} from "react-icons/fa";
import {useNavigate} from "react-router-dom";
const Footer = () => {
    const navigate = useNavigate()
    return (
        <div className={classes['Footer']}>
            <Layout>
                <div className={classes['Footer-content']}>
                    <div className={classes['Footer-content-logo']}>
                        <div className={classes['Footer-content-logo-image']}>
                            <img src={logo} alt=""/>
                        </div>
                        <div className={classes['Footer-content-logo-links']}>
                            <div className={classes['Footer-content-logo-links-item']}
                                 onClick={() => window.open('https://wa.me/+79999999296', '_blank')}
                            >
                                <ImWhatsapp/>
                            </div>
                            <div className={classes['Footer-content-logo-links-item']}
                                 onClick={() => window.open('https://t.me/armarket05', '_blank')}
                            >
                                <FaTelegramPlane/>
                            </div>
                            <div className={classes['Footer-content-logo-links-item']}
                                 onClick={() => window.open('https://instagram.com/ar_market_vl', '_blank')}
                            >
                                <BsInstagram/>
                            </div>
                            <div className={classes['Footer-content-logo-links-item']}
                                 onClick={() => window.open('https://vk.com/ar_militarym', '_blank')}
                            >
                                <SlSocialVkontakte/>
                            </div>
                        </div>
                        <div className={classes['Footer-content-logo-address']}>
                            г. Владивосток, ул. Комсомольская, 9в
                        </div>
                    </div>
                    <div className={classes['Footer-content-nav']}>
                        <div className={classes['Footer-content-nav-item']}
                             onClick={() => navigate('/')}
                        >
                            Главная
                        </div>
                        <div className={classes['Footer-content-nav-item']}>
                            О нас
                        </div>
                        <div className={classes['Footer-content-nav-item']}>
                            Контакты
                        </div>
                        <div className={classes['Footer-content-nav-item']}
                             onClick={() => navigate('/policy')}
                        >
                            Политика конфиденциальности
                        </div>

                    </div>
                    <div className={classes['Footer-content-contacts']}>
                        <div className={classes['Footer-content-contacts-names']}>
                            <div className={classes['Footer-content-contacts-names-item']}>
                                Горячая линия:
                            </div>
                            <div className={classes['Footer-content-contacts-names-item']}>
                                Служба поддержки:
                            </div>
                            <div className={classes['Footer-content-contacts-names-item']}>
                                Компаниям:
                            </div>
                            <div className={classes['Footer-content-contacts-names-item']}>
                                Помощь в Telegram:
                            </div>
                        </div>
                        <div className={classes['Footer-content-contacts-values']}>
                            <div className={classes['Footer-content-contacts-values-item']}
                                 onClick={() => window.open('tel:+79999999296', '_self')}
                            >
                                + 7 (999) 999-92-96
                            </div>
                            <div className={classes['Footer-content-contacts-values-item']}
                                 onClick={() => window.open('mailto:support@armtaktika.ru', '_self')}
                            >
                                support@armtaktika.ru
                            </div>
                            <div className={classes['Footer-content-contacts-values-item']}
                                 onClick={() => window.open('mailto:info@armtaktika.ru', '_self')}
                            >
                                info@armtaktika.ru
                            </div>
                            <div className={classes['Footer-content-contacts-values-item']}
                                 onClick={() => window.open('https://t.me/ar_militarym', '_blank')}
                            >
                                @ar_militarym
                            </div>
                        </div>
                    </div>
                </div>
                <div className={classes['Footer-company']}>
                    ИП "Борисенко Никита Андреевич" ИНН: 254007082871 ОГРН: 322253600082896
                </div>
            </Layout>
        </div>
    );
};

export default Footer;