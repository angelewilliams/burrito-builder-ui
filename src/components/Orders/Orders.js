import React from 'react';
import './Orders.css';

const Orders = ({ orders , removeOrder}) => {

  const orderComplete = (e) => {
    e.preventDefault();
    removeOrder(e.target.id);
  }

  const orderEls = orders.map((order)=> {
    
    return (
      <div className="order" key={order.id}>
        <h3>{order.name}</h3>
        <ul className="ingredient-list">
          {order.ingredients.map(ingredient => {
            return <li>{ingredient}</li>
          })}
        </ul>
        <button id={order.id} className="order-complete" onClick={e => orderComplete(e)}>Order Complete</button>
      </div>
    )
  });

  return (
    <section className="orders-section">
      { orderEls.length ? orderEls : <p>No orders yet!</p> }
    </section>
  )
}

export default Orders;