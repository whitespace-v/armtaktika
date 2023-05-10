import React, {useEffect, useRef, useState} from 'react';
import classes from '../../styles/pages/Admin/AdminItemList.module.scss'
import ItemList from '../../styles/components/ItemList.module.scss'
import {fetchItems} from "../../store/actions/FetchingActions";
import {useAppDispatch, useAppSelector} from "../../store/redux";
import AdminItem from "./AdminItem";
import {setItemPage} from "../../store/actions/SettingActions";

const AdminItemList = () => {
    const {items} = useAppSelector(state => state.itemReducer)
    const {curVariants, brand, type, category, page} = useAppSelector(state => state.filterReducer)
    const dispatch = useAppDispatch()

    //page logics
    const firstInView = useRef<HTMLInputElement>(null)
    const [pageCount, setPageCount] = useState<number>(0)
    const [startPage, setStartPage] = useState<number>(0)
    const [endPage, setEndPage] = useState<number>(5)

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
            <div className={classes['AdminItemList']} ref={firstInView}>
                Всего товаров: {items.count}
                {items.rows.map((i, idx) => <AdminItem item={i} key={idx}/>)}
            </div>
            {pageCount > 0 &&
                <div className={ItemList['ItemList__pages']}>
                    {Array.from(Array(pageCount).keys()).slice(startPage, endPage).map(i =>
                        <div onClick={() => switchPage(i + 1)} key={i}
                             className={
                                 page - 1 === i ? ItemList['ItemList__pages-item'] + ' ' +
                                     ItemList['current'] : ItemList['ItemList__pages-item']
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

export default AdminItemList;