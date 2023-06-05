import React from 'react';
import classes from '../styles/UIKit/UIInteraction.module.scss'
const UIInteraction = ({children, onClick}: {children: React.ReactNode, onClick: () => void}) => {
    return (
        <div className={classes['UIInteraction']} onClick={onClick}>
            {children}
        </div>
    );
};

export default UIInteraction;