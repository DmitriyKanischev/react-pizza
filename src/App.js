import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort'
import PizzaBlock from './components/PizzaBlock'
import './scss/app.scss'



function App() {
  return (
    <>
      <div class="wrapper">
      <Header/>
      <div class="content">
        <div class="container">
          <div class="content__top">
            <Categories/>
            <Sort/>
          </div>
          <h2 class="content__title">Все пиццы</h2>
          <div class="content__items">
            <PizzaBlock
              title='Мексикана'
              price='450'
            />
            <PizzaBlock
              title='Пепперони'
              price='400'
            />
            <PizzaBlock
              title='Чизбургер-пицца'
              price='350'
            />
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default App;
