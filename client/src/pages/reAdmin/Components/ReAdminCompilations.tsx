import React, {useEffect, useState} from 'react';
import classes from '../../../styles/pages/ReAdmin/Components/ReAdminCompilations.module.scss'
import Layout from "../../../components/Layout";
import {useAppDispatch, useAppSelector} from "../../../store/redux";
import {createCompilation} from "../../../store/actions/CreatingActions";
import {fetchCompilations} from "../../../store/actions/FetchingActions";
import {API} from "../../../utils/consts";
import {FaTimes} from "react-icons/fa";
import {addToCompilation} from "../../../store/actions/UpdatingActions";
const ReAdminCompilations = () => {
    const dispatch = useAppDispatch()
    const {compilations, items} = useAppSelector(state => state.itemReducer)

    const [create, setCreate] = useState<boolean>(false)
    const [image, setImage] = useState<FileList | null>(null)
    const [compilationName, setCompilationName] = useState<string>('')
    const [addItem, setAddItem] = useState<number>(0)

    useEffect(() => {
        dispatch(fetchCompilations())
    }, [])

    const createHandler = async () => {
        if (image && compilationName) {
            setCreate(false)
            await dispatch(createCompilation({image: image[0], name: compilationName}))
            setImage(null)
            setCompilationName('')
            await dispatch(fetchCompilations())
        } else{
            alert('Заполните все поля')
        }
    }
    const addToCompilationHandler = async (id: number) => {
        await dispatch(addToCompilation({itemId: id, compilationId: addItem}))
        setAddItem(0)
        await dispatch(fetchCompilations())
    }
    return (
        <div className={classes['ReAdminCompilations']}>
            <Layout>
                {create ?
                    <div className={classes['ReAdminCompilations__create-container']}>
                        <div className={classes['ReAdminCompilations__create-container-item']}>
                            Название подборки
                            <input type="text" value={compilationName}
                                   onChange={i => setCompilationName(i.currentTarget.value)}
                            />
                        </div>
                        <div className={classes['ReAdminCompilations__create-container-item']}>
                            <input type="file" onChange={e => setImage(e.currentTarget.files)}/>
                        </div>
                        <div className={classes['ReAdminCompilations__create-container-buttons']}>
                            <div className={classes['ReAdminCompilations__create-container-buttons-item']}
                                 onClick={() => setCreate(false)}
                            >
                                Отменить
                            </div>
                            <div className={classes['ReAdminCompilations__create-container-buttons-item']}
                                 onClick={() => createHandler()}
                            >
                                Добавить
                            </div>
                        </div>
                    </div> :
                    <div className={classes['ReAdminCompilations__create-button']}
                         onClick={() => setCreate(true)}
                    >
                        + Добавить подборку
                    </div>
                }
                <div className={classes['ReAdminCompilations-container']}>
                    {compilations.map(i =>
                        <div className={classes['ReAdminCompilations-container-item']}>
                            <div className={classes['ReAdminCompilations-container-item-name']}>
                                {i.name}
                            </div>
                            <div className={classes['ReAdminCompilations-container-item-image']}
                                 style={{backgroundImage: `url(${API}/${i.image})`}}
                            />
                            {i.items.map(i =>
                                <div>{i.name}</div>
                            )}
                            {!addItem && <div className={classes['ReAdminCompilations-container-item-add']}
                                              onClick={() => setAddItem(i.id)}
                            >
                                + Добавить
                            </div>
                            }
                        </div>
                    )}
                </div>
                {addItem &&
                    <div className={classes['ReAdminCompilations-addList']}>
                        <div className={classes['ReAdminCompilations-addList-cross']}
                             onClick={() => setAddItem(0)}
                        >
                            <FaTimes/>
                        </div>
                        <div className={classes['ReAdminCompilations-addList-container']}>
                            {items.rows.map(i =>
                                <div key={i.id}
                                     onClick={() => addToCompilationHandler(i.id)}
                                >
                                    {i.name}
                                </div>
                            )}
                        </div>
                    </div>
                }
            </Layout>
        </div>
    );
};

export default ReAdminCompilations;