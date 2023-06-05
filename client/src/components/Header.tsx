import React, {useState} from 'react';
import classes from '../styles/components/Header.module.scss'
import logo from '../assets/logomin.svg'
import Layout from "./Layout";
import {SlBag} from "react-icons/sl";
import {useAppSelector} from "../store/redux";
import BasketWidget from "./BasketWidget";
import {useNavigate} from "react-router-dom";
import {RxCross1} from "react-icons/rx";
import {MdOutlineMenu} from "react-icons/md";
import useWindowSize from "../utils/hooks/useWindowSize";
import ModalNav from "./ModalNav";
const Header = () => {
    const {basket} = useAppSelector(state => state.itemReducer)
    const [widget, setWidget] = useState<boolean>(false)
    const [modalNav, setModalNav] = useState<boolean>(false)
    const navigate = useNavigate()
    const {width} = useWindowSize()

    return (
        <div className={classes['Header']}>
            {width > 850 ?
                <div className={classes['Header__nav']}>
                    <div className={classes['Header__nav-item']}
                         onClick={() => navigate('/shop')}
                    >
                        Каталог
                    </div>
                    <div className={classes['Header__nav-item']}>
                        О нас
                    </div>
                    <div className={classes['Header__nav-item']}>
                        Контакты
                    </div>
                    <div className={classes['Header__nav-item']}>
                        Оплата и доставка
                    </div>
                </div>
                :
                <div className={classes['Header-burger']} onClick={() => setModalNav(!modalNav)}>
                    {modalNav ? <RxCross1/> : <MdOutlineMenu/>}
                </div>
            }
            <div className={classes['Header__logo']}>
                <img src={logo} alt=""
                     onClick={() => {
                         window.scroll(0,0)
                         navigate('/')
                     }}
                />
            </div>
            <div className={classes['Header__basket']}>
                <div className={classes['Header__basket-icon']}
                     onClick={() => setWidget(!widget)}
                >
                    <SlBag/>
                    <div className={classes['Header__basket-count']}>
                        {basket.length}
                    </div>
                </div>
                {(basket.length > 0 && widget) && <BasketWidget/>}
                <ModalNav active={modalNav} setActive={setModalNav}/>
            </div>
        </div>
    );
};

export default Header;