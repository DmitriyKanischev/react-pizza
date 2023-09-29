import React from 'react';

type TCategories = {
  value: number;
  onClickCategory: any  //    !!any type need change!!
}

const Categories: React.FC<TCategories> = ({value, onClickCategory}) => {
  const categories = ["Все", "Мясные", "Вегетарианская", "Гриль", "Острые", "Закрытые"]
  
    return ( 
        <div className="categories">
        <ul>
        {categories.map((category, i) => 
          <li key={i} onClick={() => onClickCategory(i)} className={value === i ? "active" : ""}>{category}</li>
        )}
        </ul>
      </div>

     );
}
 
export default Categories;