import React from 'react';
import classes from '../styles/components/About.module.scss'
import {API} from "../utils/consts";
import about from '../assets/about.jpg'
import logoletter from '../assets/logoletter.svg'
const About = () => {
    return (
        <div className={classes['About']}>
            <div className={classes['About__title']}>
                О НАС
            </div>
            <div className={classes['About__container']}>
                <div className={classes['About__container-text']}>
                    <img src={logoletter} alt=""/>
                    <div className={classes['About__container-text-p']}>
                        Компания АРМаркет совсем недавно на рынке, но уже зарекомендовала
                        себя продукцией высочайшего качества по доступным ценам,
                        ведь мы лично контролируем производство каждой позиции,
                        представленной в нашем магазине на фабриках поставщиков.
                        <br/><br/>
                        В нашем магазине мы собрали для вас широкий ассортимент снаряжения,
                        обуви, одежды и экипировки
                        для каждого охотника, рыбака, страйкболиста, солдата, военного,
                        а также сотрудника структур.
                        <br/><br/>
                        Мы делаем упор на сервис и качество нашей продукции, обратившись к нам
                        вы получите грамотную консультацию по продуктам, а также поможем вам с выбором
                        подходящей модели и размера для вас.
                    </div>
                </div>
                <div className={classes['About__container-image']}
                     style={{backgroundImage: `url(${about})`}}
                />
            </div>
        </div>
    );
};

export default About;