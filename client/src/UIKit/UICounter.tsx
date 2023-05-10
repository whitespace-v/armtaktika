import React, {useEffect, useState} from 'react';
import classes from '../styles/UIKit/UICounter.module.scss'
import useDebounce from "../utils/hooks/useDebounce";
interface IUICounter{
    count: number
    setCount: (i: number) => void;
    max: string
}
const UICounter = (props: IUICounter) => {
    const increaseHandler = () => {
        if (props.count < Number(props.max)) {
            props.setCount(props.count + 1)
        }
    }
    const decreaseHandler = () => {
        if (props.count > 0 && props.count != 1) {
            props.setCount(props.count - 1)
        }
    }
    const editHandler = (i: string) => {
        if (i.match(/\d{1,2}(:[0-5]\d)?/) && Number(i) > 0) {
            props.setCount(Number(i))
        }
        if (i.length === 0) {
            props.setCount(0)
        }
    }

    const setDefaultValue = () => {
        if (props.count === 0) {
            props.setCount(1)
        }
    }

    return (
        <div className={classes['UICounter']}>
            <div className={classes['UICounter__decrease']} onClick={() => decreaseHandler()}>
                -
            </div>
            <input type="text" maxLength={2} onBlur={() => setDefaultValue()} value={props.count} onChange={(e) => editHandler(e.currentTarget.value)}/>
            <div className={classes['UICounter__increase']} onClick={() => increaseHandler()}>
                +
            </div>
        </div>
    );
};

export default UICounter;