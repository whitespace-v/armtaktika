import React, {useState} from 'react';
import classes from '../styles/UIKit/UIReInput.module.scss'
const UIReInput = ({defaultValue, setData}: {defaultValue: string, setData: (i:string) => void}) => {
    const [value, setValue] = useState<string>(defaultValue)

    const inputHandler = (i: string) => {
        setValue(i)
        setData(i)
    }

    return (
        <input
            type="text"
            className={classes['UIReInput']}
            value={value}
            onChange={i => inputHandler(i.currentTarget.value)}
        />
    )
};

export default UIReInput;