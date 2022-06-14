import React, { Component } from 'react';
import './App.css';
import { getOrders, postOrder, deleteOrder } from '../../apiCalls';
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

  removeOrder = (id) => {
    deleteOrder(id)
      .then(getOrders()
    .then(updatedOrders => this.setState({ orders: updatedOrders.orders }))
    .catch(err => console.error('Error posting and fetching:', err)))
    .catch(error => console.log(error))
  }

  render() {
    return (
      <main className="App">
        <header>
          <h1>Burrito Builder</h1>
          <OrderForm submitOrder={this.submitOrder} />
        </header>

        <Orders orders={this.state.orders} removeOrder={this.removeOrder} />
      </main>
    );
  }
}


export default App;
