import React, {useEffect, useState} from 'react';
import classes from '../../../styles/pages/creators/AdminItemCreator.module.scss'
import UIButton from "../../../UIKit/UIButton";
import UIInput from "../../../UIKit/UIInput";
import AdminItemImagesCreator from "./AdminItemImagesCreator";
import UITextArea from "../../../UIKit/UITextArea";
import {useAppDispatch, useAppSelector} from "../../../store/redux";
import {createBrand, createItem, createType, createVariant} from "../../../store/actions/CreatingActions";
import {fetchBrands, fetchItems, fetchTypes, fetchVariants} from "../../../store/actions/FetchingActions";
import {defaultBrand, defaultCategory} from "../../../utils/consts";
import {FaCheck, FaPlus, FaTimes} from "react-icons/fa";
import {checkVariant, setBrand, setType} from "../../../store/actions/SettingActions";
import {intoArray} from "../../../utils/intoArray";

const AdminItemCreator = ({setCreateItem}: {setCreateItem: (i: boolean) => void}) => {
    const dispatch = useAppDispatch()
    const {category, type, brand, curVariants, page, types, variants, brands} = useAppSelector(state => state.filterReducer)
    const [dataUri, setDataUri] = useState<any[]>([])
    const [images, setImages] = useState<FileList | null>(null)
    const [name, setName] = useState<string>('')
    const [price, setPrice] = useState<string>('')
    const [purchase, setPurchase] = useState<string>('')
    const [weight, setWeight] = useState<string>('')
    const [height, setHeight] = useState<string>('')
    const [length, setLength] = useState<string>('')
    const [width, setWidth] = useState<string>('')
    const [description, setDescription] = useState<string>('')

    const [typeCreation, setTypeCreation] = useState<boolean>(false)
    const [typeCreationValue, setTypeCreationValue] = useState<string>('')

    const [variantCreation, setVariantCreation] = useState<boolean>(false)
    const [variantCreationValue, setVariantCreationValue] = useState<string>('')

    const [brandCreation, setBrandCreation] = useState<boolean>(false)
    const [brandCreationValue, setBrandCreationValue] = useState<string>('')
    const createHandler = async () => {
        if (dataUri && name && price && weight && height && length
            && width && description && category && type && brand && curVariants && purchase){
            setCreateItem(false)
            await dispatch(createItem(
                dataUri, name, price, purchase, weight, height, length, width,
                description, category, type, brand, curVariants))
            await dispatch(fetchItems({
                curVariants: [], brand: defaultBrand,
                type: defaultBrand, category: defaultCategory,
                page: 1, limit: 999
            }))
            setImages(null)
            setDataUri([])
            setName('')
            setPrice('')
            setWeight('')
            setHeight('')
            setLength('')
            setWidth('')
            setDescription('')
            setPurchase('')
        } else {
            alert('не все поля')
        }
    }

    useEffect(() => {
        dispatch(fetchTypes(category))
        dispatch(fetchVariants(category))
        dispatch(fetchBrands(category))
    }, [category])

    return (
        <div className={classes['AdminItemCreator']}>
            <AdminItemImagesCreator set={setImages} get={images} uri={dataUri} setUri={setDataUri}/>
            <UIInput type={'string'} value={name} setValue={i => setName(i)}>Название</UIInput>
            <UIInput type={'string'} value={purchase} setValue={i => setPurchase(i)}>Стоимость покупки</UIInput>
            <UIInput type={'string'} value={price} setValue={i => setPrice(i)}>Цена</UIInput>
            <UIInput type={'string'} value={weight} setValue={i => setWeight(i)}>Вес</UIInput>
            <UIInput type={'string'} value={height} setValue={i => setHeight(i)}>Высота</UIInput>
            <UIInput type={'string'} value={length} setValue={i => setLength(i)}>Длина</UIInput>
            <UIInput type={'string'} value={width} setValue={i => setWidth(i)}>Ширина</UIInput>
            Описание:
            <UITextArea max={5000} value={description} setValue={i => setDescription(i)} />
            Тип:
            <div className={classes['AdminItemCreator__block']}>
                {types.map(i =>
                    <div onClick={() => dispatch(setType(i))}
                         key={i.id}
                         className={type.name === i.name ? classes['AdminItemCreator__block-item']
                             + ' ' + classes['active']:classes['AdminItemCreator__block-item']}
                    >
                        {i.name}
                    </div>
                )}
                {typeCreation ?
                    <div className={classes['AdminItemCreator__block-input']}>
                        <input type="text" value={typeCreationValue}
                               onChange={i => setTypeCreationValue(i.currentTarget.value)}
                        />
                        <div className={classes['AdminItemCreator__block-input-icon']}
                             onClick={async () => {
                                 setTypeCreation(false)
                                 await dispatch(createType(category, typeCreationValue))
                                 await dispatch(fetchTypes(category))
                                 setTypeCreationValue('')
                             }}
                        >
                            <FaPlus/>
                        </div>
                        <div className={classes['AdminItemCreator__block-input-icon']}
                             onClick={() => setTypeCreation(false)}
                        >
                            <FaTimes/>
                        </div>
                    </div>:
                    <div className={classes['AdminItemCreator__block-create']}
                         onClick={() => setTypeCreation(true)}
                    >
                        + Добавить тип
                    </div>
                }
            </div>
            Варианты:
            <div className={classes['AdminItemCreator__block']}>
                {variants.map(i =>
                    <div
                        key={i.id}
                        onClick={() => dispatch(checkVariant(i))}
                    >
                        {intoArray(curVariants, i) && <FaCheck/>}{i.name}
                    </div>
                )}
                {variantCreation ?
                    <div className={classes['AdminItemCreator__block-input']}>
                        <input type="text" value={variantCreationValue}
                               onChange={i => setVariantCreationValue(i.currentTarget.value)}
                        />
                        <div className={classes['AdminItemCreator__block-input-icon']}
                             onClick={async() => {
                                 await dispatch(createVariant(category, variantCreationValue.toLowerCase()))
                                 setVariantCreation(false)
                                 setVariantCreationValue('')
                                 await dispatch(fetchVariants(category))
                             }}
                        >
                            <FaPlus/>
                        </div>
                        <div className={classes['AdminItemCreator__block-input-icon']}
                             onClick={() => setVariantCreation(false)}
                        >
                            <FaTimes/>
                        </div>
                    </div>:
                    <div className={classes['AdminItemCreator__block-create']}
                         onClick={() => setVariantCreation(true)}
                    >
                        + Добавить вариант
                    </div>
                }
            </div>
            Бренд:
            <div className={classes['AdminItemCreator__block']}>
                {brands.map(i =>
                    <div onClick={() => dispatch(setBrand(i))}
                         className={brand.name === i.name ? classes['AdminItemCreator__block-item']
                             + ' ' + classes['active']:classes['AdminItemCreator__block-item']}
                         key={i.id}
                    >
                        {i.name}
                    </div>
                )}
                {brandCreation ?
                    <div className={classes['AdminItemCreator__block-input']}>
                        <input type="text" value={brandCreationValue}
                               onChange={i => setBrandCreationValue(i.currentTarget.value)}
                        />
                        <div className={classes['AdminItemCreator__block-input-icon']}
                             onClick={async() => {
                                 await dispatch(createBrand(category, brandCreationValue))
                                 setBrandCreation(false)
                                 setBrandCreationValue('')
                                 await dispatch(fetchBrands(category))
                             }}
                        >
                            <FaPlus/>
                        </div>
                        <div className={classes['AdminItemCreator__block-input-icon']}
                             onClick={() => setBrandCreation(false)}
                        >
                            <FaTimes/>
                        </div>
                    </div>:
                    <div className={classes['AdminItemCreator__block-create']}
                         onClick={() => setBrandCreation(true)}
                    >
                        + Добавить бренд
                    </div>
                }
            </div>
            <UIButton type={"wide"} onClick={() => createHandler()}>Добавить</UIButton>
        </div>
    )
};

export default AdminItemCreator;