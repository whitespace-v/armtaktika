import React from 'react';
import classes from '../../../styles/pages/ReAdmin/Components/ReAdminCreateItem.module.scss'
import {FaTimes} from "react-icons/fa";
import AdminItemCreator from "../../Admin/Creators/AdminItemCreator";
const ReAdminCreateItem = ({setCreateItem}: {setCreateItem: (i: boolean) => void}) => {
    return (
        <div className={classes['ReAdminCreateItem']}>
            <div className={classes['ReAdminCreateItem__cross']}
                 onClick={() => setCreateItem(false)}
            >
                <FaTimes/>
            </div>
            <div className={classes['ReAdminCreateItem__container']}>
                <AdminItemCreator setCreateItem={setCreateItem}/>
            </div>
        </div>
    );
};

export default ReAdminCreateItem;