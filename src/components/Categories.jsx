import React from 'react';

const Categories = () => {
  const [activeIndex, setActiveIndex] = React.useState(0)
  const handleClickIndex = (index) => {
    setActiveIndex(index)
  }
  const categories = ["Все", "Мясные", "Вегетарианская", "Гриль", "Острые", "Закрытые"]
    return ( 
        <div className="categories">
        <ul>
        {categories.map((category, i) => 
          <li onClick={() => handleClickIndex(i)} className={activeIndex === i ? "active" : ""}>{category}</li>
        )}
        </ul>
      </div>

     );
}
 
export default Categories;