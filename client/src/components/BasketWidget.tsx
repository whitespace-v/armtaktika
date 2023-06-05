import React from 'react';
import classes from '../styles/components/BasketWidget.module.scss'
import {useAppDispatch, useAppSelector} from "../store/redux";
import {API} from "../utils/consts";
import {useNavigate} from "react-router-dom";
import {MdOutlineOpenInBrowser, MdRemove} from "react-icons/md";
import {removeFromBasket} from "../store/actions/SettingActions";
import UIButton from "../UIKit/UIButton";
const BasketWidget = () => {
    const {basket} = useAppSelector(state => state.itemReducer)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    return (
        <div className={classes['BasketWidget']}>
            <div className={classes['BasketWidget__title']}>
                Корзина
            </div>
            <div className={classes['BasketWidget__items']}>
                {basket.map((i,idx) =>
                    <div className={classes['BasketWidget__items-item']} key={idx}>
                        <div className={classes['BasketWidget__items-item-navigation']}
                             onClick={() => navigate(`/item/${i.item.id}`)}
                        >
                            <div className={classes['BasketWidget__items-item-image']}
                                 style={{backgroundImage: `url(${API}/${i.item.image})`}}
                            />
                            <div className={classes['BasketWidget__items-item-name']}>
                                {i.item.name} {(i.size.name && i.size.name !== '0') && '(' + i.size.name} {(i.size.name && i.size.name !== '0') && 'размер)'}
                            </div>
                            <div className={classes['BasketWidget__items-item-navigation-layer']}>
                                <MdOutlineOpenInBrowser/>
                            </div>
                        </div>
                        <div className={classes['BasketWidget__items-item-']}>
                            {i.quantity} х {Number(i.item.price).toLocaleString('ru')} ₽
                        </div>
                        <div className={classes['BasketWidget__items-item-remove']}
                             onClick={() => dispatch(removeFromBasket(i))}>
                            <MdRemove/>
                        </div>
                    </div>
                )}
                <UIButton onClick={() => {navigate('/basket')}} type={'wide'}>К оформлению</UIButton>
            </div>

        </div>
    );
};

export default BasketWidget;