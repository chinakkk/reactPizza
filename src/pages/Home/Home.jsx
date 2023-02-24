import s from './Home.module.scss'

import axios from "axios";
import React from "react";

import SkeletonPizzaBlock from "../../components/SkeletonPizzaBlock";
import PizzaBlock from "../../components/PizzaBlock";
import Categories from "../../components/Categories";
import Sort from "../../components/Sort";
import Search from "../../components/Search/Search";
import Paginate from "../../components/Paginate/Paginate";

import {setCategoryValue, setPageChosen} from '../../redux/slices/filterSlice'
import {useSelector, useDispatch} from "react-redux";


const Home = () => {
  const dispatch = useDispatch()
  const {categoryValue, sortValue, pageChosen} = useSelector((state) => state.filterSlice)

  const [items, setItems] = React.useState([])
  const [pageIsLoading, setPageIsLoading] = React.useState(true)
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


      setPageIsLoading(true)
      const {data} = await axios.get(`https://63da0275b28a3148f67cfe09.mockapi.io/items?page=${pageChosen + 1}&limit=4&` +
          category + sortBy + sortOrder)

      setItems(data)
      setPageIsLoading(false)
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
        <div className={s.search}>
          <h2 className="content__title">Все пиццы</h2>
          <Search
              searchValue={searchValue}
              setSearchValue={setSearchValue}

          />
        </div>
        <div className="content__items">
          {(pageIsLoading ? [...Array(4)] : filteredItems)
              .map((item, index) => {
                return (
                    pageIsLoading ?
                        <SkeletonPizzaBlock key={index}/> :
                        <PizzaBlock
                            pageIsLoading={pageIsLoading}
                            key={item.id}
                            {...item}
                        />
                )
              })}
        </div>
        <Paginate
            setPageChosen={onChangePage}
        />


      </>
  )
}
export default Home;