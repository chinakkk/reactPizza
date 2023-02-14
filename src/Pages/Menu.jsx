import SkeletonPizzaBlock from "../components/SkeletonPizzaBlock";
import PizzaBlock from "../components/PizzaBlock";
import React from "react";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import axios from "axios";

const Menu = () => {

  const [items, setItems] = React.useState([])
  const [pageIsLoading, setPageIsLoading] = React.useState(true)
  const [categoryChoice, setCategoryChoice] = React.useState(0)
  const [sortChoice, setSortChoice] = React.useState(
      {
        name: 'популярности(по возрастанию)',
        sortProperty: 'rating'
      }
  )


  React.useEffect(() => {
    (async () => {
      const category = categoryChoice ? ('category=' + categoryChoice) : ''
      const sortBy = '&sortBy=' + sortChoice.sortProperty.replace('-', '')
      const sortOrder = '&order=' + (sortChoice.sortProperty.includes('-') ? 'desc' : 'asc')


      setPageIsLoading(true)
      const {data} = await axios.get('https://63da0275b28a3148f67cfe09.mockapi.io/items?' +
          category + sortBy + sortOrder)

      setItems(data)
      setPageIsLoading(false)
    })()

  }, [categoryChoice, sortChoice])

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
        <h2 className="content__title">Все пиццы</h2>

        <div className="content__items">
          {(pageIsLoading ? [...Array(8)] : items)
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
      </>
  )
}
export default Menu;