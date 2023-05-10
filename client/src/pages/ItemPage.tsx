import React, {useEffect, useState} from 'react';
import classes from '../styles/pages/ItemPage.module.scss'
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../store/redux";
import {fetchItem} from "../store/actions/FetchingActions";
import Header from "../components/Header";
import Layout from "../components/Layout";
import UICounter from "../UIKit/UICounter";
import {API, defaultSize} from "../utils/consts";
import {addToBasket, setLoading, setSize} from "../store/actions/SettingActions";
import {ISize} from "../utils/models";
import UIButton from "../UIKit/UIButton";
import {MdArrowForwardIos, MdOutlineArrowBackIosNew} from "react-icons/md";
import MinifiedContacts from "../components/MinifiedContacts";
import Footer from "../components/Footer";
const ItemPage = () => {
    const dispatch = useAppDispatch()
    const {id} = useParams()
    const {item, size} = useAppSelector(state => state.itemReducer)
    const [count, setCount] = useState<number>(1)
    const [images, setImages] = useState<any[]>([])
    const [index, setIndex] = useState<number>(0)

    useEffect(() => {
        window.scroll(0, 0)
        dispatch(setLoading(true))
        dispatch(fetchItem(id))
        dispatch(setSize(defaultSize))
    }, [id])

    useEffect(() => {
        dispatch(setLoading(true))
        dispatch(setSize(defaultSize))
        setUnsized()
    }, [item])
    const setUnsized = async () => {
        if (item.sizes.length === 1 && Number(item.sizes[0].name) === 0){
            await dispatch(setSize(item.sizes[0]))
        }
    }

    useEffect(() => {
        setImages(item.images)
        dispatch(setLoading(false))
    }, [item])

    useEffect(() => {
        setCount(1)
    }, [size])


    const sizeHandler = (i: ISize) => {
        if (Number(i.quantity) > 0) {
            dispatch(setSize(i))
        }
    }
    const backHandler = () => {
        if (index > 0){
            setIndex(index - 1)
        } else {
            setIndex(images.length -1)
        }
    }

    const nextHandler = () => {
        if (index < images.length - 1){
            setIndex(index + 1)
        } else {
            setIndex(0)
        }
    }

    const basketHandler = () => {
        if(item.sizes.length > 0 && size.name || item.sizes.length === 0) {
            dispatch(addToBasket(item, size, count))
        } else {
            alert('Выберите размер !')
        }
    }


    return (
        <>
            <Header/>
            <Layout>
                <MinifiedContacts/>
                <div className={classes['ItemPage']}>
                    <div className={classes['ItemPage__media']}>
                        <div className={classes['ItemPage__media-image']}
                             style={{backgroundImage: `url(${API}${images[index]?.img})`}}>
                            <div className={classes['ItemPage__media-image-back']}
                                 onClick={() => backHandler()}
                            >
                                <MdOutlineArrowBackIosNew/>
                            </div>
                            <div className={classes['ItemPage__media-image-next']}
                                 onClick={() => nextHandler()}
                            >
                                <MdArrowForwardIos/>
                            </div>
                        </div>
                        <div className={classes['ItemPage__media-images']}>
                            {item.images.map((i, idx) =>
                                <div className={idx === index ?
                                    classes['ItemPage__media-images-item'] + ' ' + classes['active']:
                                    classes['ItemPage__media-images-item']
                                }
                                     style={{backgroundImage: `url(${API}${i.img})`}}
                                     onClick={() => setIndex(idx)}
                                     key={idx}
                                />
                            )}
                        </div>
                    </div>
                    <div className={classes['ItemPage__info']}>
                        <div className={classes['ItemPage__info-name']}>
                            {item.name}
                        </div>
                        <div className={classes['ItemPage__info-price']}>
                            {Number(item.price).toLocaleString('ru')} ₽
                        </div>
                        {!(item.sizes.length === 1 && item.sizes[0].name === '0') &&
                            item.sizes.length > 0 &&
                            <div className={classes['ItemPage__info-sizes']}>
                                {item.sizes.map(i =>
                                    <div className={i === size ? classes['ItemPage__info-sizes-item'] + ' ' + classes['selected']:
                                        Number(i.quantity) > 0 ?
                                            classes['ItemPage__info-sizes-item']:
                                            classes['ItemPage__info-sizes-item'] + ' ' + classes['unavailable']
                                    }
                                         key={i.id}
                                         onClick={() => sizeHandler(i)}
                                    >
                                        {i.name}
                                    </div>
                                )}
                            </div>

                        }
                        {item && item.sizes.length && item.sizes[0] && item.sizes[0].name ==='0' && item.sizes[0].quantity && Number(item.sizes[0].quantity) === 0 || item.sizes.length === 0 ?
                            <div>Нет в наличии</div>
                            :
                            <>
                                {(size.name || Number(item.sizes[0].name) === 0) && <span>В наличии: {size.quantity} шт.</span>}
                                <UICounter count={count} setCount={setCount} max={size.quantity}/>
                                <UIButton onClick={() => basketHandler()} type={'tight'}>Добавить в корзину</UIButton>
                            </>
                        }
                        <div className={classes['ItemPage__info-description']}>
                            {item.description}
                        </div>
                    </div>
                </div>
            </Layout>
            <Footer/>
        </>
    );
};

export default ItemPage;