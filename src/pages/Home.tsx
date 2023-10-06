import React from 'react';
import { useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import qs from 'qs';

import Categories from '../components/Categories';
import Sort from '../components/Sort'
import PizzaBlock from '../components/PizzaBlock'
import Skeleton from '../components/PizzaBlock/Skeleton';
import { list } from '../components/Sort';
import '../scss/app.scss'
import Pagination from '../components/Pagination';
import { IFilterSliceState, IFilterState, setCategoryId, setCurrentPage, setWindowSearch } from '../redux/slices/filterSlice';
import { IPizzaState, fetchPizzas } from '../redux/slices/pizzaSlice';
import ErrorPage from './ErrorPage';
import { useAppDispatch } from '../redux/store';

type TPizzaItem = {
    title: string; 
    price: number;
    imageUrl: string;
    sizes: number[]; 
    types: number[];
    id:string
  
}

const Home: React.FC = () => {
    const {items, status} = useSelector((state: IPizzaState) => state.pizza)
    const searchInput = useSelector((state: IFilterState) => state.filter.searchInput)
    const categoryId = useSelector((state: IFilterState) => state.filter.categoryId)
    const sortType = useSelector((state: IFilterState) => state.filter.sort)
    const currentPage = useSelector((state: IFilterState) => state.filter.currentPage)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const searched = React.useRef(false)
    const isMounted = React.useRef(false)

    console.log('home render')

    const setActiveCategory = React.useCallback((id: number) => {
        dispatch(setCategoryId(id))
    }, [])

    const onChangePage = (num: number) => {
        dispatch(setCurrentPage(num))
    }

    const getPizzas = async () => {
        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const search = searchInput ? `&search=${searchInput}` : '';

        //  try/catch func in fetchPizzas in redux
        dispatch(  
            fetchPizzas({
                currentPage,
                category,
                sortType,
                search
        }))
    }
    React.useEffect(()=>{
        if(window.location.search) {
            const params = qs.parse(window.location.search.substring(1))
            const sort = list.find((obj) => obj.sortProp === params.sortType)
            dispatch(setWindowSearch({
                ...params,
                sort                                
                
            } as IFilterSliceState))
            searched.current = true
        }
    }, [])

    React.useEffect(() =>{
        if(!searched.current){
            getPizzas()
        }
        searched.current = false
        window.scrollTo(0, 0)
    }, [categoryId, sortType, searchInput, currentPage])

    React.useEffect(() => {
        if(isMounted.current){const queryString = qs.stringify({
            sortType: sortType.sortProp,
            categoryId,
            currentPage
        })
        navigate(`?${queryString}`)}
        isMounted.current = true
    }, [categoryId, sortType, currentPage])

    const pizzas = items
    .map((pizza: TPizzaItem)=> 
        <PizzaBlock
        key={pizza.id}
        {...pizza}
        />)

    return ( 
        <>
            <div className="container">
                <div className="content__top">
                    <Categories value={categoryId} onClickCategory={(id) => setActiveCategory(id)}/>
                    <Sort value={sortType}/>
                </div>
                <h2 className="content__title">Все пиццы</h2>
                {status === 'error' ? <ErrorPage/> :
                <div className="content__items">
                {status === 'loading'
                    ? [...new Array(6)].map((_, i) => <Skeleton key={i}/>)
                    : pizzas
                }
                </div>}
                <Pagination onChangePage={onChangePage} />
            </div>
        </>
     );
}
 
export default Home;