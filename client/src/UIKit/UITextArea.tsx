import React, {useEffect, useRef} from 'react';
import classes from '../styles/UIKit/UITextArea.module.scss'

interface IUITextArea{
    setValue: (i: string) => void,
    value: string
    max: number
}
const UITextArea = (props: IUITextArea) => {
    const textareaRef = useRef<any>(null);

    useEffect(() => {
        textareaRef.current.style.height = "200px";
        const scrollHeight = textareaRef.current.scrollHeight;
        textareaRef.current.style.height = scrollHeight + "px";
    }, [props.value]);

    return(
        <div className={classes['UITextArea']}>
            <textarea value={props.value} onChange={e => props.setValue(e.currentTarget.value)}
                      ref={textareaRef}
                      maxLength={props.max}
            />
            {props.value.length > 0 &&
                <div className={classes['UITextArea-max']}>Осталось: {props.value.length} / {props.max}</div>
            }
        </div>
    )
};

export default UITextArea;