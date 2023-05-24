import React, {useEffect} from 'react';
import classes from '../styles/components/FilterBar.module.scss'
import {useAppDispatch, useAppSelector} from "../store/redux";
import {fetchCategories, fetchTypes, fetchVariants} from "../store/actions/FetchingActions";
import {checkVariant, setCategory, setType} from "../store/actions/SettingActions";
import {FaCheck} from "react-icons/fa";
import {intoArray} from "../utils/intoArray";

const FilterBar = () => {
    const {categories, category, types, type, variants, curVariants} = useAppSelector(state => state.filterReducer)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchCategories())
    }, [])

    useEffect(() => {
        dispatch(fetchTypes(category))
        dispatch(fetchVariants(category))
    }, [category])
    return (
        <div className={classes['FilterBar']}>
            <div className={classes['FilterBar-item']}>
                {categories.map(i =>
                    <div className={classes['FilterBar-item-filters']} key={i.id}>
                        <div onClick={() => dispatch(setCategory(i))}
                             className={category.name === i.name ? classes['FilterBar-item-filters-head']
                                 + ' ' + classes['active']:classes['FilterBar-item-filters-head']}
                        >
                            {i.name}
                        </div>
                        {types.length > 0 &&
                            <div className={classes['FilterBar-item-filters-types']}>
                                {types[0].categoryId === i.id && types.map(i =>
                                    <div key={i.id} onClick={() => dispatch(setType(i))}
                                         className={type.name === i.name ? classes['FilterBar-item-filters-types-item']
                                             + ' ' + classes['active']:classes['FilterBar-item-filters-types-item']}
                                    >
                                        {i.name}
                                    </div>
                                )}
                            </div>
                        }
                        {variants.length > 0 &&
                            <div className={classes['FilterBar-item-filters-variants']}>
                                {variants[0].categoryId === i.id && variants.map(i =>
                                    <div key={i.id} onClick={() => dispatch(checkVariant(i))}
                                         className={classes['FilterBar-item-filters-variants-item']}
                                    >
                                        <div className={classes['FilterBar-item-filters-variants-item-check']}>
                                            {intoArray(curVariants, i) ? <FaCheck/>: <span>&nbsp;</span>}
                                        </div>
                                        <div>
                                            {i.name}
                                        </div>
                                    </div>
                                )}
                            </div>
                        }
                    </div>
                )}
            </div>
        </div>
    );
};

export default FilterBar;