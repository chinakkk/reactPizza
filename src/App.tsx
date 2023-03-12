import './App.css';
import './scss/app.scss'

import React from "react";
import {Routes, Route} from "react-router-dom";

import Home from "./pages/Home/Home";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound/NotFound";
import FullPizza from "./pages/FullPizza/FullPizza";
import MainLayout from "./layouts/MainLayout";
import Header from "./components/Header";

function App() {
  return (
      <div>
        <Routes>
          <Route path={'/'} element={<MainLayout/>}>
            <Route path={''} element={<Home/>}/>
            <Route path={'cart'} element={<Cart/>}/>
            <Route path={'pizza/:id'} element={<FullPizza/>}/>
            <Route path={'*'} element={<NotFound/>}/>
          </Route>
        </Routes>
      </div>



  );
}

export default App;
