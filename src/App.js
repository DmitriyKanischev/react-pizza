import React from 'react';
import Header from './components/Header';
import './scss/app.scss'
import Home from './pages/Home';
import NotFoundPage from './pages/NotFoundPage';
import Cart from './pages/Cart';
import {Routes, Route } from 'react-router-dom';

function App() {
  const [searchInput, setSearchInput] = React.useState('')
  console.log(searchInput)
  return (
    <>
      <div className="wrapper">
      <Header searchInput={searchInput} setSearchInput={setSearchInput} />
      <div className="content">
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='*' element={<NotFoundPage/>}/>
      </Routes>
      </div>
    </div>
    </>
  );
}

export default App;
