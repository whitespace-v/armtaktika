import React from 'react';
import classes from '../styles/components/Banner.module.scss'
import image from '../assets/main0.jpg'
import imageText from '../assets/bannerText.svg'
import Layout from "./Layout";
const Banner = () => {
    return (
        <div className={classes['Banner']}
             style={{backgroundImage: `url(${image})`}}
        >
            <Layout>
                <img src={imageText} alt=""/>
            </Layout>
        </div>
    );
};

export default Banner;