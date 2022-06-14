import React, { Component } from 'react';
import './OrderForm.css'

class OrderForm extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    //do I need this props line? 

    this.state = {
      name: '',
      ingredients: [],
      submitted: false
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleIngredientChange = this.handleIngredientChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
    this.clearInputs = this.clearInputs.bind(this)
  }


  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({submitted: true})
    if(this.state.name && this.state.ingredients.length){
      this.props.submitOrder({name: this.state.name, ingredients: this.state.ingredients})
      this.clearInputs();
    }
    
  }

  clearInputs = () => {
    this.setState({name: '', ingredients: [], submitted: false});
  }
  
  handleNameChange = (e) => {
    this.setState({name: e.target.value});

  }

  handleIngredientChange = (e) => {
    e.preventDefault();
    this.setState({ingredients: [...this.state.ingredients, e.target.name] })


  }

  render() {
    const possibleIngredients = ['beans', 'steak', 'carnitas', 'sofritas', 'lettuce', 'queso fresco', 'pico de gallo', 'hot sauce', 'guacamole', 'jalapenos', 'cilantro', 'sour cream'];
    const ingredientButtons = possibleIngredients.map(ingredient => {
      return (
        <button key={ingredient} name={ingredient} onClick={e => this.handleIngredientChange(e)}>
          {ingredient}
        </button>
      )
    });

    return (
      <form>
        <input
          type='text'
          placeholder='Name'
          name='name'
          value={this.state.name}
          onChange={e => this.handleNameChange(e)}
        />
        {this.state.submitted && !this.state.name ? <span className="order-error-msg">Please add a name for your order!</span> : null}
        { ingredientButtons }

        <p>Order: { this.state.ingredients.join(', ') || 'Nothing selected' }</p>
        {this.state.submitted && !this.state.ingredients.length ? <span className="order-error-msg">Please add ingredients to your order!</span> : null}
        
        <button className="form-submit" onClick={e => this.handleSubmit(e)}>
          Submit Order
        </button>
      </form>
    )
  }
}

export default OrderForm;
