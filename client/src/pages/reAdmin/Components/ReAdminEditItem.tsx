import React, {useState} from 'react';
import {IItem} from "../../../utils/models";
import classes from '../../../styles/pages/ReAdmin/Components/ReAdminEditItem.module.scss'
import {FaTimes} from "react-icons/fa";
import {API, defaultItem} from "../../../utils/consts";
import UIReInput from "../../../UIKit/UIReInput";
const ReAdminEditItem = ({item, setEditItem}: {item: IItem, setEditItem: (i: IItem) => void}) => {
    const [editName, setEditName] = useState<string>('')
    const [editPrice, setEditPrice] = useState<string>('')

    return (
        <div className={classes['ReAdminEditItem']}>
            <div className={classes['ReAdminEditItem__cross']} onClick={() => setEditItem(defaultItem)}>
                <FaTimes/>
            </div>
            <div className={classes['ReAdminEditItem__container']}>
                <div className={classes['ReAdminEditItem__container-name']}>
                    <div className={classes['ReAdminEditItem__container-name-title']}>
                        Название
                    </div>
                    <div className={classes['ReAdminEditItem__container-name-data']}>
                        <UIReInput defaultValue={item.name} setData={setEditName}/>
                    </div>
                </div>
                <div className={classes['ReAdminEditItem__container-price']}>
                    <div className={classes['ReAdminEditItem__container-price-title']}>
                        Цена
                    </div>
                    <div className={classes['ReAdminEditItem__container-price-data']}>
                        <UIReInput defaultValue={item.price} setData={setEditPrice}/> ₽
                    </div>
                </div>
                <div className={classes['ReAdminEditItem__container-images']}>
                    Фотографии
                    <div className={classes['ReAdminEditItem__container-images-current']}>
                        {item.images.map(i =>
                            <div className={classes['ReAdminEditItem__container-images-current-item']}
                                 style={{backgroundImage: `url(${API}/${i.img})`}}
                                 key={i.id}
                            >
                                <div className={classes['ReAdminEditItem__container-images-current-item-cross']}

                                >
                                    <FaTimes/>
                                </div>
                            </div>
                        )}
                        <div className={classes['ReAdminEditItem__container-images-dropzone']}>
                            Добавить
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ReAdminEditItem;