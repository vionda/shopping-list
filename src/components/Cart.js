import React, { Component } from "react";
import styled from "styled-components";
import formatCurrency from "../util";
import Modal from "react-modal";
import Fade from "react-reveal/Fade";
import Zoom from "react-reveal/Zoom";
import { connect } from "react-redux";
import { removeFromCart } from "../actions/cartActions";
import { createOrder, clearOrder } from "../actions/orderActions";

class Cart extends Component {
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
      total: this.props.cartItems.reduce((a, c) => a + c.price * c.count, 0),
    };
    //save the order object
    this.props.createOrder(order);
  };

  closeModal = () => {
    this.props.clearOrder();
  };

  render() {
    const { cartItems, order } = this.props;
    return (
      <div>
        {cartItems.length === 0 ? (
          <CartStyle className="cart-header"> Cart is empty </CartStyle>
        ) : (
          <CartStyle className="cart-header">
            You have {cartItems.length} in the cart
          </CartStyle>
        )}
        {order && (
          <Modal isOpen={true} onRequestClose={this.closeModal}>
            <Zoom>
              <button className="close-modal" onClick={this.closeModal}>
                x
              </button>
              <div className="order-details">
                <h3 className="success-message">Your order has been placed.</h3>
                <h2>Order number</h2>
                <ul>
                  <li>
                    <div>Name:</div>
                    <div>{order.name}</div>
                  </li>
                  <li>
                    <div>Email:</div>
                    <div>{order.email}</div>
                  </li>
                  <li>
                    <div>Address:</div>
                    <div>{order.address}</div>
                  </li>
                  <li>
                    <div>Total:</div>
                    <div>{formatCurrency(order.total)}</div>
                  </li>
                  <li>
                    <div>Cart Items:</div>
                    <div>
                      {order.cartItems.map((x) => (
                        <div>
                          {x.count} {" x "} {x.title}
                        </div>
                      ))}
                    </div>
                  </li>
                </ul>
              </div>
            </Zoom>
          </Modal>
        )}
        <div>
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
export default connect(
  (state) => ({
    order: state.order.order,
    cartItems: state.cart.cartItems,
  }),
  { removeFromCart, createOrder, clearOrder }
)(Cart);
