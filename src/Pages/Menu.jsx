import SkeletonPizzaBlock from "../components/SkeletonPizzaBlock";
import PizzaBlock from "../components/PizzaBlock";
import React from "react";
import Categories from "../components/Categories";
import Sort from "../components/Sort";

const Menu = ({
                items,
                pageIsLoading
              }) => {
  return (
      <>

        <div className="content__top">

          <Categories/>
          <Sort/>
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