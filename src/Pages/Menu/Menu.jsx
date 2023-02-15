import SkeletonPizzaBlock from "../../components/SkeletonPizzaBlock";
import PizzaBlock from "../../components/PizzaBlock";
import React from "react";
import Categories from "../../components/Categories";
import Sort from "../../components/Sort";
import axios from "axios";
import Search from "../../components/Search/Search";
import s from './Menu.module.scss'
import Paginate from "../../components/Paginate/Paginate";

const Menu = () => {
  const [sortChoice, setSortChoice] = React.useState(
      {
        name: 'популярности(по возрастанию)',
        sortProperty: 'rating'
      }
  )
  const [items, setItems] = React.useState([])
  const [pageIsLoading, setPageIsLoading] = React.useState(true)
  const [categoryChoice, setCategoryChoice] = React.useState(0)
  const [searchValue, setSearchValue] = React.useState('')
  const [pageChosen, setPageChosen] = React.useState(0)

  const filteredItems = searchValue ? items.filter((item) => {
    return (
        item.name.toLowerCase().includes(searchValue.toLowerCase())
    )
  }) : items

  React.useEffect(() => {
    (async () => {
      const category = categoryChoice ? ('category=' + categoryChoice) : ''
      const sortBy = '&sortBy=' + sortChoice.sortProperty.replace('-', '')
      const sortOrder = '&order=' + (sortChoice.sortProperty.includes('-') ? 'desc' : 'asc')


      setPageIsLoading(true)
      const {data} = await axios.get(`https://63da0275b28a3148f67cfe09.mockapi.io/items?page=${pageChosen + 1}&limit=4&` +
          category + sortBy + sortOrder)

      setItems(data)
      setPageIsLoading(false)
    })()

  }, [categoryChoice, sortChoice, pageChosen])


  return (
      <>

        <div className="content__top">

          <Categories
              categoryChoice={categoryChoice}
              setCategoryChoice={setCategoryChoice}
          />
          <Sort
              sortChoice={sortChoice}
              setSortChoice={setSortChoice}
          />
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
            setPageChosen={setPageChosen}
        />


      </>
  )
}
export default Menu;