import React, {useEffect, useState} from 'react';
import classes from '../styles/UIKit/UIInput.module.scss'
interface UIInputProps {
    children: React.ReactNode
    type: 'phone' | 'string'
    value: string
    setValue: (i: any) => void
}
const UIInput = (props: UIInputProps) => {
    const [active, setActive] = useState<boolean>(false);

    useEffect(() => {
        if (props.value && props.value.toString().length > 0) {
            setActive(true);
        } else {
            setActive(false);
        }
    }, [])

    const blurHandler = () => {
        if (props.value && props.value.toString().length > 0) {
            setActive(true);
        } else {
            setActive(false);
        }
    };
    return (
        <div className={classes['UIInput']}>
            <div className={active ? classes['UIInput__name-active'] : classes['UIInput__name-disabled']}>
                {props.children}
            </div>
            <input
                type="text"
                value={props.value}
                onChange={e => props.setValue(e.currentTarget.value)}
                onFocus={() => setActive(true)}
                onBlur={() => blurHandler()}
            />
        </div>
    );
};

export default UIInput;