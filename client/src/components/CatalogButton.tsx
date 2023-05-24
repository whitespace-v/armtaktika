import React from 'react';
import classes from '../styles/components/CatalogButton.module.scss'
import {BsArrowRight} from "react-icons/bs";
import image0 from "../assets/catalogButton0.jpg";
import image1 from "../assets/catalogButton1.jpg";
import {useNavigate} from "react-router-dom";

const CatalogButton = () => {
    const navigate = useNavigate()

    return (
        <div className={classes['CatalogButton']}>
            <div className={classes['CatalogButton__image']}
                 style={{backgroundImage: `url(${image0})`}}
            />
            <div className={classes['CatalogButton__image']}
                 style={{backgroundImage: `url(${image1})`}}
            />
            <div className={classes['CatalogButton__button']}
                 onClick={() => navigate('/shop')}
            >
                Каталог <BsArrowRight/>
            </div>
        </div>
    );
};

export default CatalogButton;