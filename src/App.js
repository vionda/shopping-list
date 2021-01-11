import React from "react";
import styled from "styled-components";
import { Provider } from "react-redux";

import Products from "./components/Products";
import Filter from "./components/Filter";
import Cart from "./components/Cart";
import store from "./store";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      cartItems: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],
    };
  }
  createOrder = (order) => {
    alert("Need to save order for " + order.name);
  };
  removeFromCart = (product) => {
    //create an instance of cart items
    const cartItems = this.state.cartItems.slice();
    this.setState({
      //filter based on id is not equal to product id
      cartItems: cartItems.filter((x) => x._id !== product._id),
    });
    localStorage.setItem(
      "cartItems",
      JSON.stringify(cartItems.filter((x) => x._id !== product._id))
    );
  };
  addToCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    let alreadyInCart = false;
    cartItems.forEach((item) => {
      if (item._id === product._id) {
        item.count++;
      }
    });
    if (!alreadyInCart) {
      cartItems.push({ ...product, count: 1 });
    }
    this.setState({ cartItems });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

  render() {
    return (
      <Provider store={store}>
        <Container>
          <Header>
            <Link href="/">React Shopping Cart</Link>
          </Header>
          <Main>
            <Content>
              <Product>
                <Filter></Filter>
                <Products addToCart={this.addToCart}></Products>
              </Product>
              <Sidebar>
                <Cart
                  cartItems={this.state.cartItems}
                  removeFromCart={this.removeFromCart}
                  createOrder={this.createOrder}
                ></Cart>
              </Sidebar>
            </Content>
          </Main>
          <Footer>All right's reserved</Footer>
        </Container>
      </Provider>
    );
  }
}

export default App;
const Container = styled.div`
  display: grid;
  grid-template-areas: "header" "main" "footer";
  grid-template-rows: 5rem 1fr 5rem;
  grid-template-columns: 1fr;
  height: 100%;
`;
const Header = styled.header`
  grid-area: header;
  background-color: #203040;
  color: #ffffff;
  display: flex;
  align-items: center;
  padding: 0.5rem;
`;
const Link = styled.a`
  color: #ffffff;
  text-decoration: none;
  :hover {
    color: #ff8000;
  }
`;
const Main = styled.main`
  grid-area: main;
`;
const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const Product = styled.div`
  flex: 3 60rem;
`;
const Sidebar = styled.div`
  flex: 1 20rem;
`;

const Footer = styled.footer`
  grid-area: footer;
  background-color: #203040;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
`;
