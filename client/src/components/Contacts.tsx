import React from 'react';
import classes from '../styles/components/Contacts.module.scss'
import Layout from "./Layout";
const Contacts = () => {
    return (
        <div className={classes['Contacts']}>
            <Layout>
                <div className={classes['Contacts__title']}>
                    КОНТАКТЫ
                </div>
                <div className={classes['Contacts__plates']}>
                    <div className={classes['Contacts__plates-item']}>
                        <div className={classes['Contacts__plates-item-title']}>
                            ВЛАДИВОСТОК
                        </div>
                        <div className={classes['Contacts__plates-item-contacts']}>
                            <div className={classes['Contacts__plates-item-contacts-keys']}>
                                <div className={classes['Contacts__plates-item-contacts-keys-item']}>
                                    ТЕЛЕФОН
                                </div>
                                <div className={classes['Contacts__plates-item-contacts-keys-item']}>
                                    TELEGRAM КАНАЛ
                                </div>
                                <div className={classes['Contacts__plates-item-contacts-keys-item']}>
                                    ПОМОЩЬ В TELEGRAM
                                </div>
                                <div className={classes['Contacts__plates-item-contacts-keys-item']}>
                                    КОМПАНИЯМ
                                </div>
                                <div className={classes['Contacts__plates-item-contacts-keys-item']}>
                                    СЛУЖБА ПОДДЕРЖКИ
                                </div>
                                <div className={classes['Contacts__plates-item-contacts-keys-item']}>
                                    INSTAGRAM*
                                </div>
                                <div className={classes['Contacts__plates-item-contacts-keys-item']}>
                                    АДРЕС
                                </div>
                            </div>
                            <div className={classes['Contacts__plates-item-contacts-values']}>
                                <div className={classes['Contacts__plates-item-contacts-values-item']}>
                                    + 7 (999) 999-92-96
                                </div>
                                <div className={classes['Contacts__plates-item-contacts-values-item']}>
                                    @armarket05
                                </div>
                                <div className={classes['Contacts__plates-item-contacts-values-item']}>
                                    @ar_militarym
                                </div>
                                <div className={classes['Contacts__plates-item-contacts-values-item']}>
                                    info@armtaktika.ru
                                </div>
                                <div className={classes['Contacts__plates-item-contacts-values-item']}>
                                    support@armtaktika.ru
                                </div>
                                <div className={classes['Contacts__plates-item-contacts-values-item']}>
                                    @ar_market_vl
                                </div>
                                <div className={classes['Contacts__plates-item-contacts-values-item']}>
                                    ул. Комсомольская, 9в
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </div>
    );
};

export default Contacts;