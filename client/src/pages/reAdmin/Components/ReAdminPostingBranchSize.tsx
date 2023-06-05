import React, {useState} from 'react';
import {ISize} from "../../../utils/models";
import classes from '../../../styles/pages/ReAdmin/Components/ReAdminPostingBranchSize.module.scss'
import {FaTimes} from "react-icons/fa";
import {useAppDispatch} from "../../../store/redux";
import {updateSize} from "../../../store/actions/UpdatingActions";
import {fetchItems} from "../../../store/actions/FetchingActions";
import {defaultBrand, defaultCategory} from "../../../utils/consts";
const ReAdminPostingBranchSize = ({size, purchase, branchId}: {size: ISize, purchase: string, branchId:number}) => {
    const dispatch = useAppDispatch()
    const [edit, setEdit] = useState<boolean>(false)
    const [sizeName, setSizeName] = useState<string>(size.name)
    const [quantity, setQuantity] = useState<string>(size.quantity)

    const clickHandler = async () => {
        const invest = (Number(quantity) - Number(size.quantity)) * Number(purchase)
        setEdit(false)
        await dispatch(updateSize({
            id: size.id,
            name: sizeName,
            quantity,
            invest,
            branchId
        }))
        await dispatch(fetchItems({curVariants: [], brand: defaultBrand, type: defaultBrand, category: defaultCategory, page: 1, limit: 999}))
    }

    return (
        <div className={classes['ReAdminPostingBranchSize']}>

            <div className={classes['ReAdminPostingBranchSize__item']}
                 onClick={() => setEdit(true)}
            >
                {size.name} - {size.quantity}
            </div>
            {edit &&
                <div className={classes['ReAdminPostingBranchSize__edit']}
                >
                    <div className={classes['ReAdminPostingBranchSize__edit-cross']}
                         onClick={() => setEdit(false)}
                    >
                        <FaTimes/>
                    </div>
                    <div className={classes['ReAdminPostingBranchSize__edit-item']}>
                        <div className={classes['ReAdminPostingBranchSize__edit-item-inputs']}>
                            Размер
                            <input type="text" value={sizeName} onChange={e => setSizeName(e.currentTarget.value)}/>
                            Количество
                            <input type="text"  value={quantity} onChange={e => setQuantity(e.currentTarget.value)}/>
                        </div>
                        <div className={classes['ReAdminPostingBranchSize__edit-item-button']}
                             onClick={() => clickHandler()}
                        >
                            Отправить
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default ReAdminPostingBranchSize;