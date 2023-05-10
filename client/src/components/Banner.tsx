import React, {useState} from 'react';
import classes from '../styles/components/Banner.module.scss'
import image0 from '../assets/slider/logo.png'
import image1 from '../assets/slider/de007c97-cae2-4d29-a6aa-22d7e4a3f69d.jpg'
import image2 from '../assets/slider/de007c97-cae2-4d29-a6aa-22d7e4a3f69d.jpg'
import {AnimatePresence, motion} from "framer-motion";
import {bannerVariants} from "../assets/utils/animations";
import { wrap } from "popmotion"
import {MdArrowForwardIos, MdOutlineArrowBackIosNew} from "react-icons/md";
const Banner = () => {
    const images = [image2, image0, image1]
    const [[page, direction], setPage] = useState([0, 0]);
    const imageIndex = wrap(0, images.length, page);
    const swipeConfidenceThreshold = 10000;
    const swipePower = (offset: number, velocity: number) => {
        return Math.abs(offset) * velocity;
    };
    const paginate = (newDirection: number) => {
        setPage([page + newDirection, newDirection]);
    };
    return (
        <div className={classes['Banner']}>
            <div className={classes['Banner__back']} onClick={() => paginate(-1)}
            >
                <MdOutlineArrowBackIosNew/>
            </div>
            <AnimatePresence initial={false} custom={direction}>
                <motion.div
                    className={classes['Banner__image']}
                    key={images[imageIndex]}
                    style={{backgroundImage: `url(${images[imageIndex]})`}}
                    custom={direction}
                    variants={bannerVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2 }
                    }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={1}
                    onDragEnd={(e, { offset, velocity }) => {
                        const swipe = swipePower(offset.x, velocity.x);
                        if (swipe < -swipeConfidenceThreshold) {
                            paginate(1);
                        } else if (swipe > swipeConfidenceThreshold) {
                            paginate(-1);
                        }
                    }}
                >

                </motion.div>
            </AnimatePresence>
            <div className={classes['Banner__next']}
                 onClick={() => paginate(1)}
            >
                <MdArrowForwardIos/>
            </div>
        </div>
    );
};

export default Banner;