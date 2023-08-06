import React from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort'
import PizzaBlock from '../components/PizzaBlock'
import Skeleton from '../components/PizzaBlock/Skeleton';
import '../scss/app.scss'


const Home = () => {
    const [items, setItems] = React.useState([])
    const [loading, setLoading] = React.useState(true)
    const [activeCategory, setActiveCategory] = React.useState(0)
    const [sortType, setSortType] = React.useState({
        name: 'популярности',
        sortProp: 'rating'
    })

    React.useEffect(() =>{
        setLoading(true)
      fetch(`https://64c0907c0d8e251fd11231b2.mockapi.io/items?${activeCategory > 0 ? `category=${activeCategory}` : ''}&sortBy=${sortType.sortProp}&order=desc`)
        .then((res) => res.json())
        .then((arr)=> {
          setItems(arr)
          setLoading(false)
        })
        window.scrollTo(0, 0)
    }, [activeCategory, sortType])

    return ( 
        <>
            <div className="container">
                <div className="content__top">
                    <Categories value={activeCategory} onClickCategory={(id) => setActiveCategory(id)}/>
                    <Sort value={sortType} onClickSort={(id) => setSortType(id)}/>
                </div>
                <h2 className="content__title">Все пиццы</h2>
                <div className="content__items">
                {loading ? [...new Array(6)].map((_, i) => <Skeleton key={i}/>) : items.map(pizza => 
                    <PizzaBlock
                    key={pizza.id}
                    {...pizza}
                    />
                )}
                </div>
            </div>
        </>
     );
}
 
export default Home;