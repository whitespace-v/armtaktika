import React, {useState} from 'react';
import classes from '../../../styles/pages/creators/AdminItemCreator.module.scss'
import UIButton from "../../../UIKit/UIButton";
import UIInput from "../../../UIKit/UIInput";
import AdminItemImagesCreator from "./AdminItemImagesCreator";
import UITextArea from "../../../UIKit/UITextArea";
import {useAppDispatch, useAppSelector} from "../../../store/redux";
import {createItem} from "../../../store/actions/CreatingActions";
import {fetchItems} from "../../../store/actions/FetchingActions";

const AdminItemCreator = () => {
    const dispatch = useAppDispatch()
    const [mode, setMode] = useState<boolean>()
    const {category, type, brand, curVariants, page} = useAppSelector(state => state.filterReducer)

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
    const createHandler = async () => {
        if (dataUri && name && price && weight && height && length
            && width && description && category && type && brand && curVariants && purchase){
            setMode(false)
            await dispatch(createItem(
                dataUri, name, price, purchase, weight, height, length, width,
                description, category, type, brand, curVariants))
            await dispatch(fetchItems({curVariants, brand, type, category, page}))
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

    return mode ?
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
            <UIButton type={"wide"} onClick={() => createHandler()}>Добавить</UIButton>
        </div>
        :
        <UIButton type={'wide'} onClick={() => setMode(true)}>Добавить товар</UIButton>
};

export default AdminItemCreator;