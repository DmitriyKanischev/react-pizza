import React from 'react';

import styles from "../NotFoundBlock/NotFoundBlock.module.scss"

const ErrorBlock:React.FC = () => {
    return ( 
        <div className={styles.root}>
            <span>😕</span>
            <br/>
            <h1>Не удалось загрузить пиццы.</h1>
            <p>Попробуйте повторить попытку позже</p>
        </div>
     );
}
 
export default ErrorBlock;