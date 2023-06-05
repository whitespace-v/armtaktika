import React from 'react';
import classes from "../styles/components/MinLayout.module.scss";

const MinLayout = ({children}: {children: React.ReactNode}) => {
    return (
        <div className={classes['MinLayout']}>
            {children}
        </div>
    );
};

export default MinLayout;