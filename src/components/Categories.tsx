import React, {FC} from "react";

type CategoriesProps = {
    setCategoryChoice: any;
    categoryChoice: number;
}

const Categories: FC<CategoriesProps> = ({setCategoryChoice, categoryChoice}) => {
    const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']
    return (
        <div className="categories">
            <ul>
                {categories.map((category, index) => {
                    return (
                        <li key={index}
                            onClick={() => setCategoryChoice(index)}
                            className={categoryChoice === index ? "active" : ''}>
                            {category}
                        </li>
                    )
                })}
            </ul>
        </div>

    )
}
export default Categories;