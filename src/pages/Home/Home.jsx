import s from './Home.module.scss'

import React from "react";

import SkeletonPizzaBlock from "../../components/SkeletonPizzaBlock";
import PizzaBlock from "../../components/PizzaBlock";
import Categories from "../../components/Categories";
import Sort from "../../components/Sort";
import Search from "../../components/Search/Search";
import Paginate from "../../components/Paginate/Paginate";

import {setCategoryValue, setPageChosen} from '../../redux/slices/filterSlice'
import {useSelector, useDispatch} from "react-redux";
import {sendingAxiosPizza} from "../../redux/slices/pizzaSlice";


const Home = () => {
  const dispatch = useDispatch()
  const {categoryValue, sortValue, pageChosen} = useSelector((state) => state.filterSlice)
  const {items, status} = useSelector((state) => state.pizzaSlice)
  const [searchValue, setSearchValue] = React.useState('')
  const filteredItems = searchValue ? items.filter((item) => {
    return (
        item.name.toLowerCase().includes(searchValue.toLowerCase())
    )
  }) : items

  const onChangePage = (index) => {
    dispatch(setPageChosen(index))
  }


  React.useEffect(() => {
    (async () => {
      const category = categoryValue ? ('category=' + categoryValue) : ''
      const sortBy = '&sortBy=' + sortValue.sortProperty.replace('-', '')
      const sortOrder = '&order=' + (sortValue.sortProperty.includes('-') ? 'desc' : 'asc')


      dispatch(sendingAxiosPizza({category, sortBy, sortOrder, pageChosen}))

    })()

  }, [categoryValue, sortValue, pageChosen])


  return (
      <>
        <div className="content__top">

          <Categories
              categoryChoice={categoryValue}
              setCategoryChoice={(value) => dispatch(setCategoryValue(value))}
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
                      setSearchValue={setSearchValue}
                  />
                </div>
                <div className="content__items">
                  {(status === 'loading' ? [...Array(4)] : filteredItems)
                      .map((item, index) => {
                        return (
                            status === 'loading' ?
                                <SkeletonPizzaBlock key={index}/> :
                                <PizzaBlock
                                    pageIsLoading={status}
                                    key={item.id}
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