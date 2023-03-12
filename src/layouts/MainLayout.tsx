import {Outlet} from "react-router-dom";
import Header from "../components/Header";
import {FC} from "react";

const MainLayout :FC= () => {
  return (
      <div>
        <div className="wrapper">
          <Header/>

          <div className="content">
            <div className="container">
              <Outlet/>
            </div>
          </div>

        </div>
      </div>
  )
}
export default MainLayout;  