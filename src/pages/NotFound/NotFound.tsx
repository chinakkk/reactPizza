import {Link} from "react-router-dom";
import s from './NotFound.module.scss'
import {FC} from "react";

const NotFound:FC = () => {
  return (
      <div className={s.content}>

        <h1>Страница не найдена
        </h1>

        <h3>К сожалению данной страницы не существует</h3>
        <Link to="/" className={`button button--black ${s.backBtn}`}>
          <span>Вернуться назад</span>
        </Link>
      </div>
  )
}
export default NotFound;

