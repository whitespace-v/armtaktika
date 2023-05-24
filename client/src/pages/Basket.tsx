import React, {useEffect, useState} from 'react';
import classes from '../styles/pages/Basket.module.scss'
import {useAppDispatch, useAppSelector} from "../store/redux";
import UICounter from "../UIKit/UICounter";
import {removeFromBasket, setCount} from "../store/actions/SettingActions";
import {API} from "../utils/consts";
import UIButton from "../UIKit/UIButton";
import MinLayout from "../components/MinLayout";
import UIInput from "../UIKit/UIInput";
import UITextArea from "../UIKit/UITextArea";
import {FaArrowLeft} from "react-icons/fa";
import {basketSum, quantityInAllBranches} from "../utils/basketLogics";
import Footer from "../components/Footer";
import {useNavigate} from "react-router-dom";
import {createOrder} from "../store/actions/CreatingActions";
import {IOrder, IOrderItem} from "../utils/models";
import useWindowSize from "../utils/hooks/useWindowSize";
import Header from "../components/Header";

const Basket = () => {
    const {basket} = useAppSelector(state => state.itemReducer)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const dateNow = new Date(Date.now()).toLocaleString().split(',')[0]
    const [name, setName] = useState<string>('')
    const [surname, setSurname] = useState<string>('')
    const [patronymic, setPatronymic] = useState<string>('')
    const [number, setNumber] = useState<string>('')

    const [comment, setComment] = useState<string>('')
    const [delivery, setDelivery] = useState<string>('Самовывоз')
    const [deliveryCity, setDeliveryCity] = useState<string>('')
    const [deliveryAddress, setDeliveryAddress] = useState<string>('')
    const [payment, setPayment] = useState<boolean>(false)
    const [order, setOrder] = useState<string>(`${Math.floor(Math.random()*100000)}-${dateNow}`)

    const {width} = useWindowSize()

    useEffect(() => {
        // dispatch(CDEKAuth())
        window.scroll(0,0)
        document.title = `ARMARKET | Корзина`
    }, [])

    useEffect(() => {
        if (basket.length < 1) {
            navigate('/')
        }
    }, [basket])

    const setPaymentHandler = () => {
        if (name && surname && patronymic && number) {
            setPayment(true)
        } else {
            alert('Заполните все поля !')
        }
    }

    const submitPaymentHandler = async () => {
        const orderData = {
            number: order,
            name,
            surname,
            patronymic,
            phone: number,
            comment,
            deliveryMethod: delivery,
            deliveryCity,
            deliveryAddress,
            status: 'Открыт',
            items: []
        }
        let orderItems: IOrderItem[] = []
        for (let i in basket) {
            orderItems.push({
                itemId: basket[i].item.id,
                itemName: basket[i].item.name,
                itemPrice: basket[i].item.price,
                itemSize: basket[i].size.name,
                itemQuantity:  basket[i].quantity
            })
        }
        await dispatch(createOrder({orderData, orderItems }))
        navigate('/')
    }

    return (
        <>
            <Header/>
            <MinLayout>
                <div className={classes['Basket']}>
                    <div className={classes['Basket-title']}>
                        Корзина
                    </div>
                    <div className={classes['Basket-container']}>
                        {width > 850 ?
                            <div className={classes['Basket-container-items']}>
                                {basket.map(i =>
                                    <div className={classes['Basket-container-items-i']} key={i.item.id}>
                                        <div className={classes['Basket-container-items-i-image']}
                                             style={{backgroundImage: `url(${API}${i.item.image})`}}
                                        />
                                        <div className={classes['Basket-container-items-i-info']}>
                                            <div className={classes['Basket-container-items-i-info-name']}>
                                                {i.item.name}
                                            </div>
                                            {(i.size.name && i.size.name !== '0') &&
                                                <div className={classes['Basket-container-items-i-info-size']}>
                                                    Размер: <b>{i.size.name}</b>
                                                </div>
                                            }
                                            <div className={classes['Basket-container-items-i-info-price']}>
                                                {Number(i.item.price).toLocaleString()} ₽
                                            </div>
                                            {/*{i.size.name && <span>(В наличии: {i.size.quantity} шт.)</span>}*/}
                                            <UICounter count={i.quantity} setCount={n => dispatch(setCount(i, n))} max={quantityInAllBranches(i.size)}/>
                                        </div>
                                        <div className={classes['Basket-container-items-i-end']}>
                                            <div className={classes['Basket-container-items-i-info-sum']}>
                                                {(i.quantity * Number(i.item.price)).toLocaleString('ru')} ₽
                                            </div>
                                            <UIButton onClick={() => dispatch(removeFromBasket(i))} type={'tight'}>Удалить</UIButton>
                                        </div>
                                    </div>
                                )}
                            </div>
                            :
                            <div className={classes['Basket-container-items']}>
                                {basket.map(i =>
                                    <div className={classes['Basket-container-items-i-min']} key={i.item.id}>
                                        <div className={classes['Basket-container-items-i-min-info']}>
                                            <div className={classes['Basket-container-items-i-min-info-image']}
                                                 style={{backgroundImage: `url(${API}${i.item.image})`}}
                                            />
                                            <div className={classes['Basket-container-items-i-min-info-content']}>
                                                <div className={classes['Basket-container-items-i-min-info-content-info']}>
                                                    <div className={classes['Basket-container-items-i-min-info-content-info-name']}>
                                                        {i.item.name}
                                                    </div>
                                                    {(i.size.name && i.size.name !== '0') &&
                                                        <div className={classes['Basket-container-items-i-min-info-content-info-size']}>
                                                            Размер: <b>{i.size.name}</b>
                                                        </div>
                                                    }
                                                    <div className={classes['Basket-container-items-i-min-info-content-info-price']}>
                                                        {Number(i.item.price).toLocaleString()} ₽
                                                    </div>
                                                </div>
                                                <div className={classes['Basket-container-items-i-min-info-content-info-buttons']}>
                                                    <UICounter count={i.quantity} setCount={n => dispatch(setCount(i, n))} max={quantityInAllBranches(i.size)}/>
                                                    <UIButton onClick={() => dispatch(removeFromBasket(i))} type={'tight'}>Удалить</UIButton>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={classes['Basket-container-items-i-min-sum']}>
                                            {(i.quantity * Number(i.item.price)).toLocaleString('ru')} ₽
                                        </div>
                                    </div>
                                )}
                            </div>
                        }

                        <div className={classes['Basket-container-order']}>
                            <div className={classes['Basket-container-order-title']}>
                                Оформление заказа
                            </div>
                            {payment ?
                                <div className={classes['Basket-container-order-payment']}>
                                    <div className={classes['Basket-container-order-payment-title']}>
                                        <div className={classes['Basket-container-order-payment-title-back']}
                                             onClick={() => setPayment(false)}
                                        >
                                            <FaArrowLeft/>
                                        </div>
                                        <div className={classes['Basket-container-order-payment-title-text']}>
                                            Заказ <b>№ {order}</b>
                                        </div>
                                    </div>
                                    <div className={classes['Basket-container-order-payment-data']}>
                                        <div className={classes['Basket-container-order-payment-data-subtitle']}>
                                          Интернет-эквайринг временно недоступен, пожалуйста выполните оплату следующим образом:
                                        </div>
                                        <div className={classes['Basket-container-order-payment-data-subtitle']}>
                                            Выполните перевод: <b>{basketSum(basket)} ₽</b>  по реквизитам:
                                        </div>
                                        <div className={classes['Basket-container-order-payment-data-card']}>
                                            Сбербанк: <b>2202 2010 7665 7747</b>
                                        </div>
                                        <div className={classes['Basket-container-order-payment-data-card']}>
                                            Получатель: <b>Никита Андреевич Б.</b>
                                        </div>
                                        <div className={classes['Basket-container-order-payment-data-comment']}>
                                            Пожалуйста, укажите в комментарии к платежу ваш номер заказа.
                                        </div>
                                        <div className={classes['Basket-container-order-payment-data-support']}>
                                            Телефон горячей линии: +7 (999) 999-92-96
                                        </div>
                                        <div className={classes['Basket-container-order-payment-data-support']}>
                                            Служба поддержки: support@armtaktika.ru
                                        </div>
                                        <UIButton onClick={() => submitPaymentHandler()} type={"wide"}>Я оплатил</UIButton>
                                    </div>
                                </div>
                                :
                                <>
                                    <div className={classes['Basket-container-order-inputs']}>
                                        <UIInput type={'string'} value={name} setValue={setName}>Имя</UIInput>
                                        <UIInput type={'string'} value={surname} setValue={setSurname}>Фамилия</UIInput>
                                        <UIInput type={'string'} value={patronymic} setValue={setPatronymic}>Отчество</UIInput>
                                        <UIInput type={'phone'} value={number} setValue={setNumber}>Номер телефона</UIInput>
                                        Комментарий:
                                        <UITextArea value={comment} setValue={i => setComment(i)} max={250}/>
                                    </div>

                                    <div className={classes['Basket-container-order-delivery']}>
                                        <div className={classes['Basket-container-order-delivery-title']}>
                                            Способ доставки
                                        </div>
                                        <div className={classes['Basket-container-order-delivery-options']}>
                                            {['Самовывоз', 'Доставка'].map(i =>
                                                <div onClick={() => setDelivery(i)} key={i}
                                                     className={i === delivery ?
                                                         classes['Basket-container-order-delivery-options-item'] + ' ' + classes['active']
                                                         : classes['Basket-container-order-delivery-options-item']}
                                                >
                                                    {i}
                                                </div>
                                            )}
                                        </div>
                                        {delivery === 'Доставка' &&
                                            <div className={classes['Basket-container-order-delivery-data']}>
                                                <div className={classes['Basket-container-order-delivery-data-title']}>
                                                    * Доставка осуществляется компанией СДЕК. Оплата доставки - при получении
                                                </div>
                                                <UIInput type={'string'} value={deliveryCity} setValue={setDeliveryCity}>Город</UIInput>
                                                <UIInput type={'string'} value={deliveryAddress} setValue={setDeliveryAddress}>Адрес</UIInput>
                                            </div>
                                        }
                                        <div className={classes['Basket-container-order-go-to-payment']}>
                                            <UIButton onClick={() => setPaymentHandler()} type={'wide'}>Перейти к оплате</UIButton>
                                        </div>
                                    </div>
                                </>
                            }
                        </div>
                    </div>
                </div>
            </MinLayout>
            <Footer/>
        </>
    );
};

export default Basket;