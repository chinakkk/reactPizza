import './App.css';
import './scss/app.scss'

import React from "react";
import axios from "axios";
import {Routes, Route} from "react-router-dom";

import Header from "./components/Header";
import Categories from "./components/Categories";
import Sort from "./components/Sort";
import Menu from "./Pages/Menu";
import Cart from "./Pages/Cart";
import NotFound from "./Pages/NotFound/NotFound";


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

      // <Routes>
      <div className="wrapper">
        <Header/>
        <div className="content">
          <div className="container">
            <Routes>
              <Route path={'/'} element={
                <Menu
                    items={items}
                    pageIsLoading={pageIsLoading}
                />
              }/>
              <Route path={'/cart'} element={<Cart/>}/>
              <Route path={'*'} element={<NotFound/>}/>
            </Routes>


          </div>
        </div>
      </div>
      // </Routes>

  );
}

export default App;
