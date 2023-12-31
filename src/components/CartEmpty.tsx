import React from 'react';
import emptyLogo from '../assets/img/empty-cart.png'
import { Link } from 'react-router-dom';

const CartEmpty: React.FC = () => {
    return ( 
        <div className="cart cart--empty">
            <h2>Корзина пустая <span>😕</span></h2>
            <p>
              Кажется Вы ещё ничего не заказали.<br/>
              Для того, чтобы заказать пиццу, перейдите на главную страницу.
            </p>
            <img src={emptyLogo} alt="Empty cart"/>
            <Link to="/" className="button button--black">
              <span>Вернуться назад</span>
            </Link>
        </div>
     );
}
 
export default CartEmpty;