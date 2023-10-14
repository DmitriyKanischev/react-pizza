import React from 'react';
import Header from './components/Header';
import './scss/app.scss'
import Home from './pages/Home';
import {Routes, Route } from 'react-router-dom';

const Cart = React.lazy(() => import(/* webpackChunkName: "Cart" */'./pages/Cart'))
const NotFoundPage = React.lazy(() => import(/* webpackChunkName: "NotFoundPage" */'./pages/NotFoundPage'))

function App() {
  return (
    <>
      <div className="wrapper">
          <Header />
          <div className="content">
            <Routes>
              <Route path='/' element={<Home />}/>
              <Route path='/cart' element=
              {
                <React.Suspense fallback={<div>Идёт загрузка...</div>}>
                    <Cart/>
                </React.Suspense>
              }
              />
              <Route path='*' element={
                <React.Suspense fallback={<div>Идёт загрузка...</div>}>
                  <NotFoundPage/>
                </React.Suspense>
              }/>
            </Routes>
          </div>
      </div>
    </>
  );
}

export default App;
