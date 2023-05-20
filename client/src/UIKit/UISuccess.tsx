import React, {useState} from 'react';
import classes from '../styles/UIKit/UISuccess.module.scss'
import {FaTimes} from "react-icons/fa";
import {AnimatePresence, motion} from "framer-motion";
import useUpdateEffect from '../utils/hooks/useUpdateEffect';
import {useAppDispatch, useAppSelector} from "../store/redux";
import {setSuccess} from "../store/actions/SettingActions";
const UISuccess = () => {
    const {success} = useAppSelector(state => state.userReducer)
    const [state, setState] = useState<boolean>(false)

    useUpdateEffect(() => {
        if (success){
            setState(true)
            setTimeout(() => {
                setState(false)
            }, 3000)
        }
    }, [success])

    return (
        <AnimatePresence initial={false}>
            {state &&
                <motion.div className={classes['UISuccess']}
                            exit={{right: '-50%'}}
                            initial={{right: '-50%'}}
                            animate={{right: '1%'}}
                            transition={{duration: 1}}
                >
                    {success}
                </motion.div>
            }
        </AnimatePresence>
    );
};

export default UISuccess;