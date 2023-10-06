import React from 'react';

type TCategories = {
  value: number;
  onClickCategory: (i: number) => void;
}

const Categories: React.FC<TCategories> = React.memo(({value, onClickCategory}) => {
  const categories = ["Все", "Мясные", "Вегетарианская", "Гриль", "Острые", "Закрытые"]
  console.log('Categories render')
    return ( 
        <div className="categories">
        <ul>
        {categories.map((category, i) => 
          <li key={i} onClick={() => onClickCategory(i)} className={value === i ? "active" : ""}>{category}</li>
        )}
        </ul>
      </div>

     );
})
 
export default Categories;