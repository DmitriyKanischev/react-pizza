import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';

import Categories from '../components/Categories';
import Sort from '../components/Sort'
import PizzaBlock from '../components/PizzaBlock'
import Skeleton from '../components/PizzaBlock/Skeleton';
import { list } from '../components/Sort';
import '../scss/app.scss'
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';
import { setCategoryId, setCurrentPage, setSortType, setWindowSearch } from '../redux/slices/filterSlice';

const Home = () => {
    const [items, setItems] = React.useState([])
    const [loading, setLoading] = React.useState(true)
    const {searchInput} = React.useContext(SearchContext)
    const activeCategory = useSelector((state) => state.filter.categoryId)
    const sortType = useSelector((state) => state.filter.sort)
    const currentPage = useSelector((state) => state.filter.currentPage)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const searched = React.useRef(false)
    const isMounted = React.useRef(false)

    const setActiveCategory = (id) => {
        dispatch(setCategoryId(id))
    }

    const onChangePage = num => {
        dispatch(setCurrentPage(num))
    }

    const fetchPizzas = async () => {
        setLoading(true)
        const category = activeCategory > 0 ? `category=${activeCategory}` : '';
        const search = searchInput ? `&search=${searchInput}` : '';

        try {
            const res = await axios.get(`https://64c0907c0d8e251fd11231b2.mockapi.io/items?&p=${currentPage}&l=4&${category}&sortBy=${sortType.sortProp}&order=desc${search}`)
            setItems(res.data)
        } catch (err) {
            console.log('Error:', err)
        } finally {
            setLoading(false)           //executed anyway
        }
    }

    React.useEffect(()=>{
        if(window.location.search) {
            const params = qs.parse(window.location.search.substring(1))
            const newSort = list.find((obj) => obj.sortProp === params.sortType)
            dispatch(setWindowSearch({
                ...params,
                newSort
                
            }))
            searched.current = true
        }
    }, [])

    React.useEffect(() =>{
        if(!searched.current){
            fetchPizzas()
        }
        searched.current = false
        window.scrollTo(0, 0)
    }, [activeCategory, sortType, searchInput, currentPage])

    React.useEffect(() => {
        if(isMounted.current){const queryString = qs.stringify({
            sortType: sortType.sortProp,
            activeCategory,
            currentPage
        })
        navigate(`?${queryString}`)}
        isMounted.current = true
    }, [activeCategory, sortType, currentPage])

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
                <Pagination onChangePage={onChangePage} />
            </div>
        </>
     );
}
 
export default Home;