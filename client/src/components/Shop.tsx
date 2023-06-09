import React, {useState} from 'react';
import classes from '../styles/components/Shop.module.scss'
import MinLayout from "./MinLayout";
import FilterBar from "./FilterBar";
import BrandBar from "./BrandBar";
import ItemList from "./ItemList";
import {useAppSelector} from "../store/redux";
import useWindowSize from "../utils/hooks/useWindowSize";
import {GoSettings} from "react-icons/go";
import {RxCross1} from "react-icons/rx";
import Layout from "./Layout";
const Shop = () => {
    const {category, type, brand, curVariants} = useAppSelector(state => state.filterReducer)
    const [filters, setFilters] = useState<boolean>(false)

    const {width} = useWindowSize()
    return (
        <div className={classes['Shop']}>
            <MinLayout>
                {width > 1200 &&
                    <div className={classes['Shop__filters']}>
                        <FilterBar/>
                        <BrandBar/>
                    </div>
                }
                <div className={classes['Shop__main']}>
                    <Layout>
                        {(width < 1200 && filters) &&
                            <div className={classes['Shop__modalFilters']}>
                                <div className={classes['Shop__modalFilters-content']}>
                                    <div className={classes['Shop__modalFilters-content-title']}>
                                        Фильтры
                                        <div className={classes['Shop__modalFilters-content-title-cross']}
                                             onClick={() => setFilters(false)}>
                                            <RxCross1/>
                                        </div>
                                    </div>
                                    <FilterBar/>
                                    <BrandBar/>
                                </div>
                            </div>
                        }
                        {(width < 1200) &&
                            <div className={classes['Shop__main-filters']}
                                 onClick={() => setFilters(true)}
                            >
                                <GoSettings/> Фильтры
                            </div>
                        }
                        <div className={classes['Shop__main-header']}>
                            {category.name}{type.name && ' - '+type.name}{curVariants.map(i => ' - '+i.name)}{brand.name && ' - '+brand.name}
                        </div>
                    </Layout>
                    <ItemList/>
                </div>
            </MinLayout>
        </div>
    );
};

export default Shop;