import React, { Component } from "react";
import styled from "styled-components";
import formatCurrency from "../util";

export default class Cart extends Component {
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
        </div>
        {cartItems.length !== 0 && (
          <div className="cart">
            <Total>
              <div>
                Total:{" "}
                {formatCurrency(
                  cartItems.reduce((a, c) => a + c.price * c.count, 0)
                )}
              </div>
              <Button>
                <button className="button primary">Proceed</button>
              </Button>
            </Total>
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
