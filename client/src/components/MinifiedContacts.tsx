import React from 'react';
import classes from '../styles/components/MinifiedContacts.module.scss'
import Layout from "./Layout";
import {FaInstagram, FaPhoneAlt, FaTelegramPlane} from "react-icons/fa";
import useWindowSize from "../utils/hooks/useWindowSize";
import {BsFillGeoAltFill} from "react-icons/bs";
const MinifiedContacts = () => {
    const {width} = useWindowSize()

    return (
        <Layout>
            <div className={classes['MinifiedContacts']}>
                {width > 620 ?
                    <div className={classes['MinifiedContacts__address']}>
                        Г. Владивосток, ул. Комсомольская 9в
                    </div>
                    :
                    <div className={classes['MinifiedContacts__address']}>
                        <BsFillGeoAltFill/>
                    </div>
                }
                {width > 850 ?
                    <div className={classes['MinifiedContacts__links']}>
                        <div className={classes['MinifiedContacts__links-item']}
                             onClick={() => window.open('https://instagram.com/ar_market_vl', '_blank')}
                        >
                            <FaInstagram/> ar_market_vl
                        </div>
                        <div className={classes['MinifiedContacts__links-item']}
                             onClick={() => window.open('https://t.me/armarket05', '_blank')}
                        >
                            <FaTelegramPlane/> armarket05
                        </div>
                        <div className={classes['MinifiedContacts__links-item']}
                             onClick={() => window.open('tel:+79999999296', '_self')}
                        >
                            <FaPhoneAlt/> + 7 (999) 999-92-96
                        </div>
                    </div>
                    :
                    <div className={classes['MinifiedContacts__links']}>
                        <div className={classes['MinifiedContacts__links-item']}>
                            <FaInstagram/>
                        </div>
                        <div className={classes['MinifiedContacts__links-item']}>
                            <FaTelegramPlane/>
                        </div>
                        <div className={classes['MinifiedContacts__links-item']}>
                            <FaPhoneAlt/> + 7 (999) 999-92-96
                        </div>
                    </div>
                }
            </div>
        </Layout>
    );
};

export default MinifiedContacts;