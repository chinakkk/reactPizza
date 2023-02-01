import './App.css';
import './scss/app.scss'
import React from "react";
import Header from "./components/Header";
import Categories from "./components/Categories";
import Sort from "./components/Sort";
import PizzaBlock from "./components/PizzaBlock";
import axios from "axios";
import SkeletonPizzaBlock from "./components/SkeletonPizzaBlock";

function App() {

  const [items, setItems] = React.useState([])
  const [pageIsLoading, setPageIsLoading] = React.useState(true)

  React.useEffect(() => {

    (async () => {

      const {data} = await axios.get('https://63da0275b28a3148f67cfe09.mockapi.io/items')
      setItems(data)
      setPageIsLoading(false)
    })()

  }, [])

  return (
      <div className="wrapper">
        <Header/>
        <div className="content">
          <div className="container">
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
          </div>
        </div>
      </div>
  );
}

export default App;
