import React from 'react';
import classes from '../styles/components/ModalNav.module.scss'
import image from '../assets/bannerText.svg'
import {useNavigate} from "react-router-dom";
const ModalNav = ({active, setActive}: {active: boolean, setActive: (i: boolean) => void}) => {
    const navigate = useNavigate()
    const navigateHandler = (path: string) => {
        navigate(path)
        setActive(false)
    }

    return (
        <>
            {active &&
                <div className={classes['ModalNav']}>
                    <div className={classes['ModalNav__nav']}>
                        <div className={classes['ModalNav__nav-item']}
                             onClick={() => navigateHandler('/shop')}
                        >
                            Каталог
                        </div>
                        <div className={classes['ModalNav__nav-item']}>
                            О нас
                        </div>
                        <div className={classes['ModalNav__nav-item']}>
                            Контакты
                        </div>
                        <div className={classes['ModalNav__nav-item']}>
                            Оплата и доставка
                        </div>
                    </div>
                    <div className={classes['ModalNav__contacts']}>
                        <div className={classes['ModalNav__contacts-keys']}>
                            <div className={classes['ModalNav__contacts-keys-item']}>
                                Горячая линия
                            </div>
                            <div className={classes['ModalNav__contacts-keys-item']}>
                                Служба поддержки
                            </div>
                            <div className={classes['ModalNav__contacts-keys-item']}>
                                Компаниям
                            </div>
                            <div className={classes['ModalNav__contacts-keys-item']}>
                                Задать вопрос в Telegram
                            </div>
                        </div>
                        <div className={classes['ModalNav__contacts-values']}>
                            <div className={classes['ModalNav__contacts-values-item']}>
                                +7 (999) 999 92-96
                            </div>
                            <div className={classes['ModalNav__contacts-values-item']}>
                                support@armtaktika.ru
                            </div>
                            <div className={classes['ModalNav__contacts-values-item']}>
                                info@armtaktika.ru
                            </div>
                            <div className={classes['ModalNav__contacts-values-item']}>
                                @ar_militarym
                            </div>
                        </div>
                    </div>
                    <div className={classes['ModalNav__logo']}>
                        <img src={image} alt=""/>
                    </div>
                </div>
            }
        </>
    );
};

export default ModalNav;