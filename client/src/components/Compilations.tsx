import React, {useEffect} from 'react';
import classes from '../styles/components/Compilations.module.scss'
import {useAppDispatch, useAppSelector} from "../store/redux";
import {fetchCompilations} from "../store/actions/FetchingActions";
import {API} from "../utils/consts";
import {useNavigate} from "react-router-dom";
const Compilations = () => {
    const dispatch = useAppDispatch()
    const {compilations} = useAppSelector(state => state.itemReducer)
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(fetchCompilations())
    }, [])

    return (
        <div className={classes['Compilations']}>
            {compilations.map(i =>
                <div className={classes['Compilations__item']}
                     onClick={() => navigate(`/compilation/${i.id}`)}
                     style={{backgroundImage: `url(${API}/${i.image})`}}
                >
                    <div className={classes['Compilations__item-title']}>
                        {i.name}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Compilations;