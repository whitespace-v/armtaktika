import React, {useEffect} from 'react';
import classes from '../styles/components/BrandBar.module.scss'
import {useAppDispatch, useAppSelector} from "../store/redux";
import {fetchBrands} from "../store/actions/FetchingActions";
import {setBrand} from "../store/actions/SettingActions";
const BrandBar = () => {
    const {brands, brand, category} = useAppSelector(state => state.filterReducer)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchBrands(category))
    }, [category])

    return (
        <div className={classes['BrandBar']}>
            <div className={classes['BrandBar__container']}>
                {brands.map(i =>
                    <div key={i.id} onClick={() => dispatch(setBrand(i))}
                         className={brand.name === i.name ? classes['BrandBar__container-item'] + ' ' + classes['active']:
                             classes['BrandBar__container-item']
                         }
                    >
                        {i.name}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BrandBar;