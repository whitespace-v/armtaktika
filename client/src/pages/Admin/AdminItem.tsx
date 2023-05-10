import React, {useState} from 'react';
import classes from "../../styles/pages/Admin/AdminItem.module.scss";
import {API} from "../../utils/consts";
import UIInput from "../../UIKit/UIInput";
import UIInteraction from "../../UIKit/UIInteraction";
import {IoAdd, IoClose, IoResize} from "react-icons/io5";
import {addSize} from "../../store/actions/CreatingActions";
import {CgSize, CgTrash} from "react-icons/cg";
import {IItem} from "../../utils/models";
import {useAppDispatch, useAppSelector} from "../../store/redux";
import AdminItemSize from "./AdminItemSize";
import {fetchBudget, fetchExpenses, fetchItems} from "../../store/actions/FetchingActions";
import {updateDescription, updateName, updatePrice} from "../../store/actions/UpdatingActions";
import {deleteItem} from "../../store/actions/DeletingActions";
import {FaTimes} from "react-icons/fa";
import UITextArea from "../../UIKit/UITextArea";

const AdminItem = ({item}: {item: IItem}) => {
    const {curVariants, brand, type, category,page} = useAppSelector(state => state.filterReducer)
    const [sizeCreation, setSizeCreation] = useState<boolean>(false)
    const [size, setSize] = useState<string>('')
    const [priceUpdate, setPriceUpdate] = useState<boolean>(false)
    const [priceUpdateValue, setPriceUpdateValue] = useState<string>('')
    const [minimized, setMinimized] = useState<boolean>(true)
    const [quantity, setQuantity] = useState<string>('')

    const [updateItemName, setUpdateItemName] = useState<boolean>(false)
    const [updateItemNameValue, setUpdateItemNameValue] = useState<string>('')
    const [updateItemDescription, setUpdateItemDescription] = useState<boolean>(false)
    const [updateItemDescriptionValue, setUpdateItemDescriptionValue] = useState<string>('')

    const dispatch = useAppDispatch()

    const sizeHandler = async(itemId: number, purchase: string) => {
        if (size && quantity) {
            await dispatch(addSize(itemId, size, quantity, purchase))
            setSizeCreation(false)
            setSize('')
            setQuantity('')
            await dispatch(fetchItems({curVariants, brand, type, category, page}))
            await dispatch(fetchBudget())
            await dispatch(fetchExpenses())
        } else {
            alert('пустое поле')
        }
    }
    const updateNameHandler = async () => {
        if (updateItemNameValue) {
            await dispatch(updateName({id: item.id, name: updateItemNameValue}))
            setUpdateItemName(false)
            setUpdateItemNameValue('')
            await dispatch(fetchItems({curVariants, brand, type, category, page}))
        } else{
            alert('Заполните поле !')
        }
    }
    const updateDescriptionHandler = async () => {
        if (updateItemDescriptionValue) {
            await dispatch(updateDescription({id: item.id, description: updateItemDescriptionValue}))
            setUpdateItemDescription(false)
            setUpdateItemDescriptionValue('')
            await dispatch(fetchItems({curVariants, brand, type, category, page}))
        } else{
            alert('Заполните поле !')
        }
    }

    return (
        <div key={item.id} className={classes['AdminItem']}>
            {minimized ?
                <div style={{backgroundImage: `url(${API}/${item.image})`}}
                     className={classes['AdminItem-image']}
                />
                :
                <div className={classes['AdminItem-images']}>
                    {item.images.map(m =>
                        <div style={{backgroundImage: `url(${API}/${m.img})`}}
                             className={classes['AdminItem-images-item']} key={m.id}
                        />
                    )}
                </div>
            }
            <div className={classes['AdminItem-name']}>
                {updateItemName ?
                    <div className={classes['AdminItem-name-update']}>
                        <UIInput type={'string'} value={updateItemNameValue} setValue={setUpdateItemNameValue}>
                            Название
                        </UIInput>
                        <UIInteraction onClick={() => updateNameHandler()}><IoAdd/></UIInteraction>
                        <UIInteraction onClick={() => setUpdateItemName(false)}><FaTimes/></UIInteraction>
                    </div>
                    :
                    <div className={classes['AdminItem-name-title']}
                         onClick={() => setUpdateItemName(true)}
                    >
                        {item.name}
                    </div>
                }
                {!minimized &&
                    <div className={classes['AdminItem-name-description']}>
                        {updateItemDescription ?
                            <div className={classes['AdminItem-name-description-update']}>
                                <UITextArea max={5000} value={updateItemDescriptionValue} setValue={setUpdateItemDescriptionValue}/>
                                <UIInteraction onClick={() => updateDescriptionHandler()}><IoAdd/></UIInteraction>
                                <UIInteraction onClick={() => setUpdateItemDescription(false)}><FaTimes/></UIInteraction>
                            </div>
                            :
                            <div className={classes['AdminItem-name-description-name']}
                                 onClick={() => setUpdateItemDescription(true)}
                            >
                                {item.description}
                            </div>
                        }
                    </div>
                }
            </div>
            <div className={classes['AdminItem-price']}>
                <div className={classes['AdminItem-price-title']}>
                    Себестоимость:
                </div>
                <div className={classes['AdminItem-price-value']}>
                    <span>{item.purchase}</span> ₽
                </div>
            </div>
            {priceUpdate ?
                <div>
                    <UIInput type={'string'} value={priceUpdateValue} setValue={setPriceUpdateValue}>{item.price}</UIInput>
                    <UIInteraction onClick={async () => {
                        await dispatch(updatePrice(item.id, priceUpdateValue))
                        setPriceUpdateValue('')
                        setPriceUpdate(false)
                        await dispatch(fetchItems({curVariants, brand, type, category, page}))
                    }}>
                        <IoAdd/>
                    </UIInteraction>
                </div>
                :
                <div className={classes['AdminItem-price']}>
                    <div className={classes['AdminItem-price-title']}>
                        Цена:
                    </div>
                    <div className={classes['AdminItem-price-value']} onClick={() => setPriceUpdate(true)}>
                        <span>{item.price}</span> ₽
                    </div>
                </div>
            }
            <div className={classes['AdminItem-dimensions']}>
                <div className={classes['AdminItem-dimensions-title']}>
                    Вес (грамм), Д х В х Ш (мм)
                </div>
                <div className={classes['AdminItem-dimensions-value']}>
                    <span>{item.weight}</span>, <span>{item.length}</span>x<span>{item.height}</span>x<span>{item.width}</span>
                </div>
            </div>
            {!minimized &&
                <>
                    {sizeCreation ?
                        <div className={classes['AdminItem-creation']}>
                            <div className={classes['AdminItem-creation-inputs']}>
                                <UIInput type={'string'} value={size} setValue={setSize}>Размер</UIInput>
                                <UIInput type={'string'} value={quantity} setValue={setQuantity}>Количество</UIInput>
                            </div>
                            <UIInteraction onClick={() => sizeHandler(item.id, item.purchase)}><IoAdd/></UIInteraction>
                            <UIInteraction onClick={() => setSizeCreation(false)}><IoClose/></UIInteraction>
                        </div>
                        :
                        <div className={classes['AdminItem-sizes']}>
                            <div className={classes['AdminItem-sizes-items']}>
                                {item.sizes.map((s, idx) =>
                                    <AdminItemSize size={s} item={item} key={idx}/>
                                )}
                            </div>
                        </div>
                    }
                </>
            }
            <div className={classes['AdminItem-controllers']}>
                <UIInteraction onClick={() => setMinimized(!minimized)}><IoResize/></UIInteraction>
                {!minimized &&
                    <UIInteraction onClick={() => setSizeCreation(true)}><CgSize/></UIInteraction>
                }
                {!minimized &&
                    <UIInteraction onClick={async() => {
                        await dispatch(deleteItem(item.id))
                        await dispatch(fetchItems({curVariants, brand, type, category, page}))
                        await dispatch(fetchBudget())
                        await dispatch(fetchExpenses())
                    }}>
                        <CgTrash/>
                    </UIInteraction>
                }
            </div>

        </div>
    );
};

export default AdminItem;