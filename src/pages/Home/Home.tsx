import s from './Home.module.scss'

import React, {FC} from "react";

import SkeletonPizzaBlock from "../../components/SkeletonPizzaBlock";
import PizzaBlock from "../../components/PizzaBlock";
import Categories from "../../components/Categories";
import Sort from "../../components/Sort";
import Search from "../../components/Search/Search";
import Paginate from "../../components/Paginate/Paginate";

import {pizzaItemType, sendingAxiosPizza} from "../../redux/slices/pizzaSlice";
import {filterSelector, setCategoryValue, setPageChosen, setSearchValue} from '../../redux/slices/filterSlice'
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../../redux/store";

const Home:FC = () => {

  const dispatch = useAppDispatch()
  const {categoryValue, sortValue, pageChosen} = useSelector(filterSelector)
  const {searchValue} = useSelector((state:RootState) => state.filterSlice)
  const {items, status} = useSelector((state:RootState) => state.pizzaSlice)
  const filteredItems = searchValue ? items.filter((item:pizzaItemType) => {
    return (
        item.name.toLowerCase().includes(searchValue.toLowerCase())
    )
  }) : items

  const onChangePage = (index:number) => {
    dispatch(setPageChosen(index))
  }


  React.useEffect(() => {
    (async () => {
      const category:string = categoryValue ? ('category=' + categoryValue) : ''
      const sortBy:string = '&sortBy=' + sortValue.sortProperty.replace('-', '')
      const sortOrder:string = '&order=' + (sortValue.sortProperty.includes('-') ? 'desc' : 'asc')


      dispatch(sendingAxiosPizza({category, sortBy, sortOrder, pageChosen:String(pageChosen)}))

    })()

  }, [categoryValue, sortValue, pageChosen])


  return (
      <>
        <div className="content__top">

          <Categories
              categoryChoice={categoryValue}
              setCategoryChoice={(value:number) => dispatch(setCategoryValue(value))}
          />
          <Sort/>
        </div>
        {
          status === 'error' ?
              <div className="container container__error">
                <div className="content content__error">
                  <h2>Ошибка</h2>
                  <p>
                    При загрузке страницы произошла ошибка.<br/>
                    Пожалуйста, попробуйте снова чуть позже.
                  </p>
                </div>
              </div>
              : <>
                <div className={s.search}>
                  <h2 className="content__title">Все пиццы</h2>
                  <Search
                      searchValue={searchValue}
                      setSearchValue={(value:string) => dispatch(setSearchValue(value))}
                  />
                </div>
                <div className="content__items">
                  {(status === 'loading' ? [...Array(4)] : filteredItems)
                      .map((item:pizzaItemType, index:number) => {
                        return (
                            status === 'loading' ?
                                <SkeletonPizzaBlock key={index}/> :
                                <PizzaBlock
                                    key={item.id}
                                    status={status}
                                    {...item}
                                />
                        )
                      })}
                </div>
                <Paginate
                    setPageChosen={onChangePage}
                /></>
        }
      </>
  )
}
export default Home;