import React, {useEffect, useState} from 'react';
import classes from '../styles/components/Categories.module.scss'
import image1 from '../assets/categories/0.jpg'
import image2 from '../assets/categories/1.jpg'
import image3 from '../assets/categories/2.jpg'
import {useAppDispatch, useAppSelector} from "../store/redux";
import {fetchCategories} from "../store/actions/FetchingActions";
import {setCategory} from "../store/actions/SettingActions";

const Categories = () => {
    const dispatch = useAppDispatch()
    const {categories} = useAppSelector(state => state.filterReducer)
    const [array, setArray] = useState<any[]>()

    useEffect(() => {
        dispatch(fetchCategories())
    }, [])

    useEffect(() => {
        const arr = [image1, image2, image3]
        const arr1= categories.map(function (x,i) {
            return {category: x, image:  arr[i]}
        })
        setArray(arr1)
    }, [categories])

    return (
        <div className={classes['Categories']}>
            {array && array.map((i) =>
                <div className={classes['Categories__item']}
                     style={{backgroundImage: `url(${i.image})`}}
                     onClick={() => dispatch(setCategory(i.category))}
                >
                    <div className={classes['Categories__item-title']}>
                        {i.category.name}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Categories;