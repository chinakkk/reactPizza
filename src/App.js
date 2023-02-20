import './App.css';
import './scss/app.scss'

import React from "react";
import {Routes, Route} from "react-router-dom";

import Header from "./components/Header";
import Menu from "./pages/Menu/Menu";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound/NotFound";

import { useSelector, useDispatch } from 'react-redux';


export const Context = React.createContext()

function App() {
  const [cartItems, setCartItems] = React.useState([
    {
      "id": 0,
      "imageUrl": "https://dodopizza.azureedge.net/static/Img/Products/f035c7f46c0844069722f2bb3ee9f113_584x584.jpeg",
      "name": "Пепперони Фреш с перцем",
      "types": [0, 1],
      "sizes": [26, 30, 40],
      "price": 803,
      "category": 0,
      "rating": 4
    },
    {
      "id": 1,
      "imageUrl": "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/2ffc31bb-132c-4c99-b894-53f7107a1441.jpg",
      "name": "Сырная",
      "types": [0],
      "sizes": [26, 40],
      "price": 245,
      "category": 1,
      "rating": 6
    }, {
      "id": 2,
      "imageUrl": "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/6652fec1-04df-49d8-8744-232f1032c44b.jpg",
      "name": "Цыпленок барбекю",
      "types": [0],
      "sizes": [26, 40],
      "price": 295,
      "category": 1,
      "rating": 4
    },
    {
      "id": 3,
      "imageUrl": "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/af553bf5-3887-4501-b88e-8f0f55229429.jpg",
      "name": "Кисло-сладкий цыпленок",
      "types": [1],
      "sizes": [26, 30, 40],
      "price": 275,
      "category": 2,
      "rating": 2
    }
  ])
  return (



        <div className="wrapper">
          <Context.Provider value={{cartItems, setCartItems}}>

          <Header/>
          <div className="content">
            <div className="container">
              <Routes>
                <Route path={'/'} element={
                  <Menu/>
                }/>
                <Route path={'/cart'} element={<Cart
                />}/>
                <Route path={'*'} element={<NotFound/>}/>
              </Routes>


            </div>
          </div>
          </Context.Provider>

        </div>


  );
}

export default App;
