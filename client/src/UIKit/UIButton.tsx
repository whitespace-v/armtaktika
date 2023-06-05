import React from 'react';
import classes from '../styles/UIKit/UIButton.module.scss'
const UIButton = (
    {children, type, onClick}: {children: React.ReactNode, type: 'wide' | 'tight', onClick: () => void }
) => {
    return (
        <div className={classes['UIButton'] + ' ' + classes[type]} onClick={onClick}>
            {children}
        </div>
    );
};

export default UIButton;