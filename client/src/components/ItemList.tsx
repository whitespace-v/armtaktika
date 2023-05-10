import React, {useEffect, useRef, useState} from 'react';
import classes from '../styles/components/ItemList.module.scss'
import {useAppDispatch, useAppSelector} from "../store/redux";
import {fetchItems} from "../store/actions/FetchingActions";
import {API} from "../utils/consts";
import {useNavigate} from "react-router-dom";
import {setItemPage} from "../store/actions/SettingActions";

const ItemList = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const {items} = useAppSelector(state => state.itemReducer)
    const {curVariants, brand, type, category, page} = useAppSelector(state => state.filterReducer)

    const [pageCount, setPageCount] = useState<number>(0)
    const [startPage, setStartPage] = useState<number>(0)
    const [endPage, setEndPage] = useState<number>(5)

    const firstInView = useRef<HTMLInputElement>(null)

    useEffect(() => {
        dispatch(fetchItems({curVariants, brand, type, category, page}))
    }, [curVariants, brand, type, category, page])

    useEffect(() => {
        firstInView.current && firstInView.current.scrollIntoView({behavior: 'smooth', block: 'start',})
        dispatch(setItemPage(1))
        setPageCount(0)
        setStartPage(0)
        setEndPage(5)
    }, [curVariants, brand, type, category])

    useEffect(() => {
        setPageCount(Math.ceil(items.count / 15)) // 15 -> limit
    }, [items])

    const switchPage = async(page: number) => {
        dispatch(setItemPage(page))
        firstInView.current && firstInView.current.scrollIntoView({behavior: 'smooth', block: 'start',})
        if (page === 1){
            setStartPage(0)
        } else if (page > 1){
            setStartPage(page - 2)
        }
        if (page === pageCount) {
            setEndPage(pageCount)
        } else if (page === pageCount - 1 || page === pageCount - 2 || page === pageCount - 3) {
            setEndPage(pageCount)
        } else {
            setEndPage(page + 3)
        }
    }
    return (
        <>
            <div className={classes['ItemList']} ref={firstInView}>
                {items.rows.map(i =>
                    <div className={classes['ItemList__item']} key={i.id} onClick={() => navigate(`/item/${i.id}`)}>
                        <div className={classes['ItemList__item-corner-top']}/>
                        <div className={classes['ItemList__item-corner-bottom']}/>
                        <div className={classes['ItemList__item-image']} style={{backgroundImage: `url(${API}/${i.image})`}}/>
                        <div className={classes['ItemList__item-name']}>
                            {i.name}
                        </div>
                        <div className={classes['ItemList__item-price']}>
                            {Number(i.price).toLocaleString('ru')} ₽
                        </div>
                    </div>
                )}
            </div>
            {pageCount > 0 &&
                <div className={classes['ItemList__pages']}>
                    {Array.from(Array(pageCount).keys()).slice(startPage, endPage).map(i =>
                        <div onClick={() => switchPage(i + 1)} key={i}
                             className={
                                 page - 1 === i ? classes['ItemList__pages-item'] + ' ' +
                                     classes['current'] : classes['ItemList__pages-item']
                             }
                        >
                            {i + 1}
                        </div>
                    )}
                </div>
            }
        </>
    );
};

export default ItemList;