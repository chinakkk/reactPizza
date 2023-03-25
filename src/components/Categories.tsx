import React, {FC, memo} from "react";
import useWhyDidYouUpdate from 'ahooks/lib/useWhyDidYouUpdate';

type CategoriesProps = {
    setCategoryChoice: (value: number) => void;
    categoryChoice: number;
}

const Categories: FC<CategoriesProps> = memo(({setCategoryChoice, categoryChoice}) => {
    useWhyDidYouUpdate('Categories',{setCategoryChoice, categoryChoice})
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
})
export default Categories;