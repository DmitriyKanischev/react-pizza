import React from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort'
import PizzaBlock from '../components/PizzaBlock'
import Skeleton from '../components/PizzaBlock/Skeleton';
import '../scss/app.scss'


const Home = () => {
    const [items, setItems] = React.useState([])
    const [loading, setLoading] = React.useState(true)
  
    React.useEffect(() =>{
      fetch('https://64c0907c0d8e251fd11231b2.mockapi.io/items')
        .then((res) => res.json())
        .then((arr)=> {
          setItems(arr)
          setLoading(false)
        })
        window.scrollTo(0, 0)
    }, [])
    
    return ( 
        <>
            <div className="container">
                <div className="content__top">
                    <Categories/>
                    <Sort/>
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