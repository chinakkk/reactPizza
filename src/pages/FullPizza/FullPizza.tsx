import {useParams} from "react-router-dom";
import {useEffect} from "react";
import axios from "axios";
import React from "react";

const FullPizza: React.FC = () => {
    const [pizzaItem, setPizzaItem] = React.useState<{
        name:string,
        imageUrl:string,
        price:number,
    }>()
    const {id} = useParams()

    useEffect(() => {

        (async () => {
            try {
                const {data} = await axios.get(`https://63da0275b28a3148f67cfe09.mockapi.io/items/${id}`)
                setPizzaItem(data)
            } catch (error) {
                console.log(error, 'Ошибка запроса пиццы')
            }

        })()


    }, [])

    if (!pizzaItem) return <>Loading...</>
    return (
        <div>
            <>
                <img
                    className="pizza-block__image"
                    src={pizzaItem.imageUrl}
                    alt="Pizza"
                />
                <h4 className="pizza-block__title">{pizzaItem.name}</h4>

                <div className="pizza-block__bottom">
                    <div className="pizza-block__price">от {pizzaItem.price} ₽</div>
                </div>
            </>


        </div>
    )
}
export default FullPizza;