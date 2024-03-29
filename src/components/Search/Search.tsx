import styles from './Search.module.scss'
import React, {ChangeEvent, FC} from "react";
import debounce from 'lodash.debounce'


type SearchProps = {
    searchValue: string;
    setSearchValue: (value: string) => void;
}

const Search: FC<SearchProps> = ({searchValue, setSearchValue}) => {


    const [localSearchValue, setLocalSearchValue] = React.useState<string>('')

    const inputRef = React.useRef<HTMLInputElement>(null)
    const onClickClear = () => {
        setLocalSearchValue('')
        setSearchValue('')
        inputRef.current?.focus()
    }

    const debounceSearchValue = React.useCallback(
        debounce((str) => {
            setSearchValue(str)
        }, 500), []
    )

    const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
        setLocalSearchValue(event.target.value)
        debounceSearchValue(event.target.value)
    }

    return (
        <div className={styles.root}>
            <svg className={styles.iconSearch} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="30px"
                 height="30px">
                <path
                    d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z"/>
            </svg>
            <input ref={inputRef}
                   value={localSearchValue}
                   onChange={(event) => onChangeInput(event)}
                   className={styles.input}
                   placeholder={'Поиск...'}/>

            {searchValue &&
                <svg onClick={onClickClear}
                     className={styles.iconClose}
                     xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 50 50" width="50px" height="50px">
                  <path
                      d="M 25 2 C 12.309534 2 2 12.309534 2 25 C 2 37.690466 12.309534 48 25 48 C 37.690466 48 48 37.690466 48 25 C 48 12.309534 37.690466 2 25 2 z M 25 4 C 36.609534 4 46 13.390466 46 25 C 46 36.609534 36.609534 46 25 46 C 13.390466 46 4 36.609534 4 25 C 4 13.390466 13.390466 4 25 4 z M 32.990234 15.986328 A 1.0001 1.0001 0 0 0 32.292969 16.292969 L 25 23.585938 L 17.707031 16.292969 A 1.0001 1.0001 0 0 0 16.990234 15.990234 A 1.0001 1.0001 0 0 0 16.292969 17.707031 L 23.585938 25 L 16.292969 32.292969 A 1.0001 1.0001 0 1 0 17.707031 33.707031 L 25 26.414062 L 32.292969 33.707031 A 1.0001 1.0001 0 1 0 33.707031 32.292969 L 26.414062 25 L 33.707031 17.707031 A 1.0001 1.0001 0 0 0 32.990234 15.986328 z"/>
                </svg>}

        </div>
    )
}
export default Search;