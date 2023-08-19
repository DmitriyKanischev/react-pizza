import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Categories from '../components/Categories';
import Sort from '../components/Sort'
import PizzaBlock from '../components/PizzaBlock'
import Skeleton from '../components/PizzaBlock/Skeleton';
import '../scss/app.scss'
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';
import { setCategoryId } from '../redux/slices/filterSlice';

const Home = () => {
    const [items, setItems] = React.useState([])
    const [loading, setLoading] = React.useState(true)
    const [currentPage, setCurrentPage] = React.useState(1)
    const {searchInput, setSearchInput} = React.useContext(SearchContext)
    // const [sortType, setSortType] = React.useState({
    //     name: 'популярности',
    //     sortProp: 'rating'
    // })
    const activeCategory = useSelector((state) => state.filter.categoryId)
    const sortType = useSelector((state) => state.filter.sort)
    const dispatch = useDispatch()
    console.log(sortType)

    const setActiveCategory = (id) => {
        dispatch(setCategoryId(id))
    }

    React.useEffect(() =>{
        setLoading(true)
        const category = activeCategory > 0 ? `category=${activeCategory}` : '';
        const search = searchInput ? `&search=${searchInput}` : ''
      fetch(`https://64c0907c0d8e251fd11231b2.mockapi.io/items?&p=${currentPage}&l=4&${category}&sortBy=${sortType.sortProp}&order=desc${search}`)
        .then((res) => res.json())
        .then((arr)=> {
          setItems(arr)
          setLoading(false)
        })
        window.scrollTo(0, 0)
    }, [activeCategory, sortType, searchInput, currentPage])

    const pizzas = items
    .map(pizza => 
        <PizzaBlock
        key={pizza.id}
        {...pizza}
        />)

    return ( 
        <>
            <div className="container">
                <div className="content__top">
                    <Categories value={activeCategory} onClickCategory={(id) => setActiveCategory(id)}/>
                    <Sort />
                </div>
                <h2 className="content__title">Все пиццы</h2>
                <div className="content__items">
                {loading ? [...new Array(6)].map((_, i) => <Skeleton key={i}/>) : pizzas
                }
                </div>
                <Pagination onChangePage={number => setCurrentPage(number)} />
            </div>
        </>
     );
}
 
export default Home;