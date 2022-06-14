import React, { Component } from 'react';
import './App.css';
import { getOrders, postOrder } from '../../apiCalls';
import Orders from '../../components/Orders/Orders';
import OrderForm from '../../components/OrderForm/OrderForm';

class App extends Component {
  constructor() {
    super()
    this.state = {
      orders: []
    }
  }

  componentDidMount() {
    getOrders()
      .then(orderData => this.setState({ orders: orderData.orders }))
      .catch(err => console.error('Error fetching:', err));
  }

  submitOrder = (orderData) => {
    postOrder(orderData)
      .then(getOrders()
        .then(updatedOrders => this.setState({ orders: updatedOrders.orders }))
        .catch(err => console.error('Error posting and fetching:', err)))


  }

  render() {
    return (
      <main className="App">
        <header>
          <h1>Burrito Builder</h1>
          <OrderForm submitOrder={this.submitOrder} />
        </header>

        <Orders orders={this.state.orders} />
      </main>
    );
  }
}


export default App;
