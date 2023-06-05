import React, {useEffect, useState} from 'react';
import classes from '../styles/pages/ItemPage.module.scss'
import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../store/redux";
import {fetchBranches, fetchItem} from "../store/actions/FetchingActions";
import Layout from "../components/Layout";
import UICounter from "../UIKit/UICounter";
import {API, defaultSize} from "../utils/consts";
import {addToBasket, setLoading, setSize} from "../store/actions/SettingActions";
import {IGSize, ISize} from "../utils/models";
import UIButton from "../UIKit/UIButton";
import {MdArrowForwardIos, MdOutlineArrowBackIosNew} from "react-icons/md";
import Footer from "../components/Footer";
import {groupBranches} from "../utils/groupBranches";
import {quantityInAllBranches} from "../utils/basketLogics";
import Header from "../components/Header";

const ItemPage = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const {id} = useParams()
    const {item, size, branches} = useAppSelector(state => state.itemReducer)
    const [count, setCount] = useState<number>(1)
    const [images, setImages] = useState<any[]>([])
    const [imgIndex, setImgIndex] = useState<number>(0)

    useEffect(() => {
        window.scroll(0, 0)
        dispatch(setLoading(true))
        dispatch(fetchItem(id))
        dispatch(setSize(defaultSize))
        dispatch(fetchBranches())
    }, [id])

    useEffect(() => {
        document.title = `ARMARKET | ${item.name}`
        dispatch(setLoading(true))
        setUnsized()
    }, [item])

    useEffect(() => {
        setImages(item.images)
        dispatch(setLoading(false))
    }, [item])

    useEffect(() => {
        setCount(1)
    }, [size])

    const setUnsized = async () => {
        if (item.sizes.length === 1 && Number(item.sizes[0].name) === 0){
            let b = groupBranches(item.sizes)
            await dispatch(setSize(b[0]))
        }
    }
    const backHandler = () => {
        if (imgIndex > 0){
            setImgIndex(imgIndex - 1)
        } else {
            setImgIndex(images.length -1)
        }
    }
    const sizeHandler = (i: IGSize) => {
        if (quantityInAllBranches(i) > 0) {
            dispatch(setSize(i))
        }
    }
    const nextHandler = () => {
        if (imgIndex < images.length - 1){
            setImgIndex(imgIndex + 1)
        } else {
            setImgIndex(0)
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
                <div className={classes['goBack']}>
                    <UIButton onClick={() => navigate(-1)} type={'tight'}>Назад</UIButton>
                </div>
                <div className={classes['ItemPage']}>
                    <div className={classes['ItemPage__media']}>
                        <div className={classes['ItemPage__media-image']}
                             style={{backgroundImage: `url(${API}${images[imgIndex]?.img})`}}>
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
                                <div className={idx === imgIndex ? classes['ItemPage__media-images-item'] +
                                    ' ' + classes['active']: classes['ItemPage__media-images-item']}
                                     style={{backgroundImage: `url(${API}${i.img})`}}
                                     onClick={() => setImgIndex(idx)}
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
                        <div className={classes['ItemPage__info-sizes']}>
                            {groupBranches(item.sizes).map((i:any) =>
                                <div>
                                    <div onClick={() => sizeHandler(i)}
                                         className={i.name === size.name ?
                                             classes['ItemPage__info-sizes-item'] + ' ' + classes['selected'] :
                                             quantityInAllBranches(i) > 0 ?
                                                 classes['ItemPage__info-sizes-item']:
                                                 classes['ItemPage__info-sizes-item'] + ' ' + classes['unavailable']
                                         }
                                    >
                                        {i.name}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div>
                            {size.items &&
                                <div>
                                    {size.items.map((i, idx) =>
                                        <div key={idx}>
                                            В наличии {i.branchName}: {i.quantity}
                                        </div>
                                    )}
                                </div>
                            }
                        </div>
                        <UICounter count={count} setCount={setCount} max={quantityInAllBranches(size)}/>
                        <UIButton onClick={() => basketHandler()} type={'tight'}>Добавить в корзину</UIButton>
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