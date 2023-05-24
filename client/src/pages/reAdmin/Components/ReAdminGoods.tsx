import React, {useEffect, useState} from 'react';
import classes from '../../../styles/pages/ReAdmin/Components/ReAdminGoods.module.scss'
import {useAppDispatch, useAppSelector} from "../../../store/redux";
import {fetchCategories, fetchItems} from "../../../store/actions/FetchingActions";
import {defaultBrand, defaultCategory, defaultItem} from "../../../utils/consts";
import ReAdminEditItem from "./ReAdminEditItem";
import {IItem} from "../../../utils/models";
import ReAdminCreateItem from "./ReAdminCreateItem";
import Layout from "../../../components/Layout";
import {FaPlus, FaTimes} from "react-icons/fa";
import {createCategory} from "../../../store/actions/CreatingActions";
import _ from "lodash";
import {setCategory} from "../../../store/actions/SettingActions";
const ReAdminGoods = () => {
    const {categories, category, types, type, variants, curVariants} = useAppSelector(state => state.filterReducer)
    const {items} = useAppSelector(state => state.itemReducer)
    const dispatch = useAppDispatch()
    const [editItem, setEditItem] = useState<IItem>(defaultItem)
    const [createItem, setCreateItem] = useState<boolean>(false)
    const [categoryCreation, setCategoryCreation] = useState<boolean>(false)
    const [categoryCreationValue, setCategoryCreationValue] = useState<string>('')

    useEffect(() => {
        dispatch(fetchCategories())
        dispatch(fetchItems({curVariants: [], brand: defaultBrand, type: defaultBrand, category: defaultCategory, page: 1, limit: 999}))
    }, [])

    return (
        <div className={classes['ReAdminGoods']}>
            <Layout>
                <div className={classes['ReAdminGoods__categories']}>
                    {categoryCreation ?
                        <div className={classes['ReAdminGoods__categories-create']}>
                            <input type="text" value={categoryCreationValue}
                                   onChange={i => setCategoryCreationValue(i.currentTarget.value)}
                            />
                            <div className={classes['ReAdminGoods__categories-create-icon']}
                                 onClick={async () => {
                                     setCategoryCreation(false)
                                     await dispatch(createCategory(categoryCreationValue))
                                     setCategoryCreationValue('')
                                     await dispatch(fetchCategories())
                                 }}
                            >
                                <FaPlus/>
                            </div>
                            <div className={classes['ReAdminGoods__categories-create-icon']}
                                 onClick={() => setCategoryCreation(false)}
                            >
                                <FaTimes/>
                            </div>
                        </div>:
                        <div className={classes['ReAdminGoods__categories-create']}
                             onClick={() => setCategoryCreation(true)}
                        >
                            + Добавить категорию
                        </div>
                    }

                    <div  className={classes['ReAdminGoods__categories-section']}>
                        {categories.length>0 && categories.map(i =>
                            <div className={classes['ReAdminGoods__categories-section-item']} key={i.id}>
                                <div className={classes['ReAdminGoods__categories-section-item-name']}>
                                    {i.name}
                                </div>
                                <div className={classes['ReAdminGoods__categories-section-item-list']}>
                                    {_.filter(items.rows, o => o["categoryId"] === i.id).map(i =>
                                        <div className={classes['ReAdminGoods__categories-section-item-list-item']}
                                             key={i.id}
                                             onClick={() => setEditItem(i)}
                                        >
                                            <div className={classes['ReAdminGoods__categories-section-item-list-item-name']}>
                                                {i.name}
                                            </div>
                                            <div className={classes['ReAdminGoods__categories-section-item-list-item-price']}>
                                                {i.price} ₽
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className={classes['ReAdminGoods__categories-section-item-create']}
                                     onClick={() => {
                                         setCreateItem(true)
                                         dispatch(setCategory(i))
                                     }}
                                >
                                    + Добавить позицию
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </Layout>

            {createItem && <ReAdminCreateItem setCreateItem={setCreateItem}/>}
            {editItem.id != 0 && <ReAdminEditItem item={editItem} setEditItem={setEditItem}/>}
        </div>
    );
};

export default ReAdminGoods;