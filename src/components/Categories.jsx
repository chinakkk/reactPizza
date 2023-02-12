import React from "react";

const Categories = () => {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']
  const [typeIndex, setTypeIndex] = React.useState(0)
  return (
      <div className="categories">
        <ul>
          {categories.map((category, index) => {
            return (
                <li key={index}
                    onClick={() => setTypeIndex(index)}
                    className={typeIndex === index ? "active" : ''}>
                  {category}
                </li>
            )
          })}
        </ul>
      </div>

  )
}
export default Categories;