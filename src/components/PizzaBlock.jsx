import React from "react";
import SkeletonPizzaBlock from "./SkeletonPizzaBlock";
import {addToCart, cartSelector, cartSelectorFindById} from "../redux/slices/cartSlice";
import {useSelector, useDispatch} from "react-redux";
import {Link} from "react-router-dom";

const PizzaBlock = ({
                      id,
                      imageUrl,
                      name,
                      types,
                      sizes,
                      price,
                      category,
                      rating,
                      status = 'success'
                    }) => {
  const dispatch = useDispatch()
  const findedPizza = useSelector(cartSelectorFindById(id))

  const [pizzaType, setPizzaType] = React.useState(types[0])
  const [pizzaSize, setPizzaSize] = React.useState(sizes[0])

  const onClickAddPizza = () => {
    dispatch(addToCart({id, name, price, imageUrl}))
  }
  return (
      <Link to={`/pizza/${id}`}>
        <div className="pizza-block-wrapper">
          <div className="pizza-block">
            {status !== 'loading' ? (
                <>
                  <img
                      className="pizza-block__image"
                      src={imageUrl}
                      alt="Pizza"
                  />
                  <h4 className="pizza-block__title">{name}</h4>
                  <div className="pizza-block__selector">
                    <ul>
                      {types.map((type) => {
                        return (
                            <li key={type}
                                onClick={() => setPizzaType(type)}
                                className={pizzaType === type ? 'active' : ''}>
                              {type === 0 ? 'тонкое' : 'традиционное'}
                            </li>
                        )
                      })}
                    </ul>
                    <ul>
                      {sizes.map((size) => {
                        return (
                            <li
                                key={size}
                                onClick={() => setPizzaSize(size)}
                                className={pizzaSize === size ? 'active' : ''}>
                              {size} см.
                            </li>
                        )
                      })}
                    </ul>
                  </div>
                  <div className="pizza-block__bottom">
                    <div className="pizza-block__price">от {price} ₽</div>
                    <div onClick={onClickAddPizza} className="button button--outline button--add">
                      <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                            d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                            fill="white"
                        />
                      </svg>
                      <span>Добавить</span>
                      {findedPizza && <i>{findedPizza.count}</i>}
                    </div>
                  </div>
                </>
            ) : (<SkeletonPizzaBlock/>)}


          </div>
        </div>

      </Link>

  )
}
export default PizzaBlock;