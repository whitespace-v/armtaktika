import React from 'react';
import {IItem} from "../utils/models";
import classes from '../styles/components/Item.module.scss'
import {API} from "../utils/consts";
import {useNavigate} from "react-router-dom";
const Item = ({item}: {item: IItem}) => {
    const navigate = useNavigate()

    return (
        <div className={classes['Item']}
             onClick={() => navigate(`/item/${item.id}`)}
        >
            <div className={classes['Item__image']}
                 style={{backgroundImage: `url(${API}/${item.image})`}}
            />
            <div className={classes['Item__title']}>
                {item.name}
            </div>
            <div className={classes['Item__price']}>
                {item.price} ₽
            </div>
        </div>
    );
};

export default Item;