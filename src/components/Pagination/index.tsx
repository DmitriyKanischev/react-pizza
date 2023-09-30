import React from 'react';
import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss'

type TPaginationProps = {
    onChangePage: (variable: number) => void
}

const Pagination:React.FC<TPaginationProps> = ({onChangePage}) => {       //    !!any type need change!!
    return ( 
        <ReactPaginate
            className={styles.root}
            breakLabel="..."
            nextLabel=">"
            onPageChange={e => onChangePage(e.selected + 1)}
            pageRangeDisplayed={4}
            pageCount={3}
            previousLabel="<"
            renderOnZeroPageCount={null}
        />

     );
}
 
export default Pagination;