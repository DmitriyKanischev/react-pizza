import React from 'react';
// @ts-ignore
import debounce from 'lodash.debounce'; // in 2023 lib have only old types, not working in new React
import { useDispatch } from 'react-redux';

import styles from './Search.module.scss'
import { setSearchInput } from '../../redux/slices/filterSlice';

const Search: React.FC = () => {
    const dispatch = useDispatch()
    const [localValue, setLocalValue] = React.useState('')
    const inputRef = React.useRef<HTMLInputElement>(null)

    const onClickClear = () => {
        setLocalValue('')
        dispatch(setSearchInput(''))
        inputRef.current?.focus()
    }

    const updateSearchInput = React.useCallback(
        debounce((str: string) => {
            dispatch(setSearchInput(str))
        }, 300),
        []
    )

    const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLocalValue(event.target.value)
        updateSearchInput(event.target.value)
    }


    return ( 
        <div className={styles.root}>
            <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 24 24" fill="none">
            <path d="M14.9536 14.9458L21 21M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>

            <input ref={inputRef} onChange={onChangeInput} value={localValue} className={styles.input} placeholder='Поиск пиццы' />
            
            {localValue && (<svg onClick={() => onClickClear()} className={styles.close} xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" height="200" id="Layer_1" viewBox="0 0 200 200" width="200">
            <path d="M114,100l49-49a9.9,9.9,0,0,0-14-14L100,86,51,37A9.9,9.9,0,0,0,37,51l49,49L37,149a9.9,9.9,0,0,0,14,14l49-49,49,49a9.9,9.9,0,0,0,14-14Z"/>
            </svg>)}
        </div>
     );
}
 
export default Search;