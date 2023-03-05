import {Outlet} from "react-router-dom";
import Header from "../components/Header";

const MainLayout = () => {
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