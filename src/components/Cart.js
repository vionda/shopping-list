import React, { Component } from "react";
import styled from "styled-components";
import formatCurrency from "../util";
import Fade from "react-reveal/Fade";

export default class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      address: "",
      showCheckout: false,
    };
  }
  handleInput = (e) => {
    //get access to the name of input box and  its value and set (update) the state based on it
    this.setState({ [e.target.name]: e.target.value });
  };
  createOrder = (e) => {
    e.preventDefault(); //prevents refreshing the page when user clicks submit
    //create an order object
    const order = {
      name: this.state.name,
      email: this.state.email,
      address: this.state.address,
      cartItems: this.props.cartItems,
    };
    //save the order object
    this.props.createOrder(order);
  };
  render() {
    const { cartItems } = this.props;
    return (
      <div>
        {cartItems.length === 0 ? (
          <CartStyle className="cart-header"> Cart is empty </CartStyle>
        ) : (
          <CartStyle className="cart-header">
            You have {cartItems.length} in the cart
          </CartStyle>
        )}
        <div className="cart">
          <Fade left cascade>
            <CartItems>
              {cartItems.map((item) => (
                <li key={item._id}>
                  <div>
                    <img src={item.image} alt={item.title}></img>
                  </div>
                  <div>
                    <div>{item.title}</div>
                    <Button>
                      {formatCurrency(item.price)} x {item.count}{" "}
                      <button onClick={() => this.props.removeFromCart(item)}>
                        Remove
                      </button>
                    </Button>
                  </div>
                </li>
              ))}
            </CartItems>
          </Fade>
        </div>
        {cartItems.length !== 0 && (
          <div>
            <div className="cart">
              <Total>
                <div>
                  Total:{" "}
                  {formatCurrency(
                    cartItems.reduce((a, c) => a + c.price * c.count, 0)
                  )}
                </div>
                <Button>
                  <button
                    onClick={() => {
                      this.setState({ showCheckout: true });
                    }}
                    className="button primary"
                  >
                    Proceed
                  </button>
                </Button>
              </Total>
              {this.state.showCheckout && (
                <Fade right cascade>
                  <div className="cart">
                    <Form onSubmit={this.createOrder}>
                      <FormContainer>
                        <li>
                          <label>Email</label>
                          <input
                            name="email"
                            type="email"
                            required
                            onChange={this.handleInput}
                          ></input>
                        </li>
                        <li>
                          <label>Name</label>
                          <input
                            name="name"
                            type="name"
                            required
                            onChange={this.handleInput}
                          ></input>
                        </li>
                        <li>
                          <label>Address</label>
                          <input
                            name="address"
                            type="text"
                            required
                            onChange={this.handleInput}
                          ></input>
                        </li>
                        <li>
                          <CheckoutButton
                            className="button primary"
                            type="submit"
                          >
                            Checkout
                          </CheckoutButton>
                        </li>
                      </FormContainer>
                    </Form>
                  </div>
                </Fade>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}
const CartStyle = styled.div`
  padding: 1rem;
  margin: 1rem;
  display: flex;
  .cart-header {
    border-bottom: 0.1rem #c0c0c0 solid;
  }
`;
const CartItems = styled.ul`
  padding: 0;
  width: 100%;
  list-style-type: none;
  img {
    width: 5rem;
  }
  li {
    display: flex;
  }
  li div {
    padding: 0.5rem;
  }
  li div::last-child {
    flex: 1;
  }
`;
const Button = styled.div`
  text-align: right;
  & button {
    padding: 1rem;
    margin: 1rem;
    border: 0.1rem #c0c0c0 solid;
    /* background-color: #f0c040; */
    cursor: pointer;
    :hover {
      border: 0.1rem #808080 solid;
    }
  }
`;
const Total = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  & div {
    flex: 1;
    font-size: 2rem;
  }
`;
const Form = styled.form`
  width: 100%;
`;
const FormContainer = styled.ul`
  width: 100%;
  padding: 0;
  list-style-type: none !important;
  li {
    display: flex;
    flex-direction: column;
    padding: 1rem;
  }
  input {
    padding: 1rem;
    border: 0.1rem #c0c0c0 solid;
  }
`;
const CheckoutButton = styled.button`
  padding: 1rem;
  border: 0.1rem #c0c0c0 solid;
  background-color: #f0c040;
  cursor: pointer;
  :hover {
    border: 0.1rem #808080 solid;
  }
`;
