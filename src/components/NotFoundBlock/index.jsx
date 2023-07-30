import React from 'react';

import styles from "./NotFoundBlock.module.scss"

const NotFound = () => {
    return ( 
        <div className={styles.root}>
            <span>😕</span>
            <br/>
            <h1>Ничего не найдено</h1>
        </div>
     );
}
 
export default NotFound;