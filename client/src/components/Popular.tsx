import React, {useEffect} from 'react';
import classes from '../styles/components/Popular.module.scss'
import { Swiper, SwiperSlide } from "swiper/react";
import {useAppDispatch, useAppSelector} from "../store/redux";
import Item from "./Item";
import {fetchCompilation} from "../store/actions/FetchingActions";
import Layout from "./Layout";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {Navigation, Pagination} from "swiper";
import {useNavigate} from "react-router-dom";
const Popular = () => {
    const {compilation} = useAppSelector(state => state.itemReducer)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchCompilation('1'))
    }, [])

    return (
        <div className={classes['Popular']}>
            <div className={classes['Popular__title']}>
                ПОПУЛЯРНОЕ
            </div>
            <Layout>
                <div className={classes['Popular__container']}>
                    <Swiper
                        pagination={{
                            type: "progressbar",
                        }}
                        slidesPerView={4}
                        navigation={true}
                        modules={[Pagination, Navigation]}
                        className="mySwiper"
                        breakpoints={{
                            300: {slidesPerView: 1},
                            650:  {slidesPerView: 2},
                            1000: {slidesPerView: 3},
                            1300: {slidesPerView: 4}
                    }}
                    >
                        {compilation.items.map(i =>
                            <SwiperSlide>
                                    <Item item={i}/>
                            </SwiperSlide>
                        )}
                    </Swiper>
                </div>
            </Layout>
        </div>
    );
};

export default Popular;