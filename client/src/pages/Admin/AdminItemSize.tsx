import React, {useState} from 'react';
import {IItem, ISize} from "../../utils/models";
import classes from "../../styles/pages/Admin/AdminItem.module.scss";
import UIInput from "../../UIKit/UIInput";
import UIInteraction from "../../UIKit/UIInteraction";
import {CgTrash} from "react-icons/cg";
import {useAppDispatch, useAppSelector} from "../../store/redux";
import {IoAdd} from "react-icons/io5";
// import {fetchBudget, fetchExpenses, fetchItems} from "../../store/actions/FetchingActions";
import {deleteSize} from "../../store/actions/DeletingActions";
import {updateSize} from "../../store/actions/UpdatingActions";

const AdminItemSize = ({size, item}: {size: ISize, item: IItem}) => {
    const [sizeUpdate, setSizeUpdate] = useState<boolean>(false)
    const [sizeUpdateValue, setSizeUpdateValue] = useState<string>('')
    const {curVariants, brand, type, category,page} = useAppSelector(state => state.filterReducer)
    const dispatch = useAppDispatch()
    // const sizeUpdateHandler = async (itemId: number) => {
    //     if (sizeUpdateValue) {
    //         await dispatch(updateSize(itemId, sizeUpdateValue, item.purchase))
    //         setSizeUpdate(false)
    //         setSizeUpdateValue('')
    //         await dispatch(fetchItems({curVariants, brand, type, category, page, limit: 15}))
    //         await dispatch(fetchBudget())
    //         await dispatch(fetchExpenses())
    //     } else {
    //         alert('заполните поле')
    //     }
    // }

    return (
        <div className={classes['AdminItem-items-item']} key={size.id}>
            <div className={Number(size.quantity) > 0 ?
                classes['AdminItem-sizes-items-item-name'] :
                classes['AdminItem-sizes-items-item-name'] + ' ' + classes['unavailable']}

            >
                {sizeUpdate ?
                    <div className={classes['size-update']}>
                        <UIInput type={'string'} value={sizeUpdateValue} setValue={setSizeUpdateValue}>{size.name} - {size.quantity} шт.</UIInput>
                        {/*<UIInteraction onClick={() => sizeUpdateHandler(size.id)}>*/}
                        {/*    <IoAdd/>*/}
                        {/*</UIInteraction>*/}
                    </div>
                    :
                    <div>
                        <div onClick={() => setSizeUpdate(true)}>{size.name} - {size.quantity}шт. </div>
                        {/*<UIInteraction onClick={async() => {*/}
                        {/*    await dispatch(deleteSize({id: size.id, quantity: size.quantity, purchase: item.purchase}))*/}
                        {/*    await dispatch(fetchItems({curVariants, brand, type, category, page, limit: 15}))*/}
                        {/*    await dispatch(fetchBudget())*/}
                        {/*    await dispatch(fetchExpenses())*/}
                        {/*}}>*/}
                        {/*    <CgTrash/>*/}
                        {/*</UIInteraction>*/}
                    </div>
                }
            </div>

        </div>
    );
};

export default AdminItemSize;