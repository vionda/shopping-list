import React from "react";
import data from "./data.json";
import styled from "styled-components";

import Products from "./components/Products";
import Filter from "./components/Filter";
import Cart from "./components/Cart";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: data.products,
      cartItems: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],
      size: "",
      sort: "",
    };
  }
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
  sortProducts = (event) => {
    //implement
    const sort = event.target.value;
    console.log(event.target.value);
    this.setState((state) => ({
      sort: sort,
      products: this.state.products
        .slice()
        .sort((a, b) =>
          sort === "lowest"
            ? a.price > b.price
              ? 1
              : -1
            : sort === "highest"
            ? a.price < b.price
              ? 1
              : -1
            : a._id < b._id
            ? 1
            : -1
        ),
    }));
  };
  filterProducts = (event) => {
    if (event.target.value === "") {
      this.setState({ size: event.target.value, products: data.products });
    } else {
      console.log(event.target.value);
      this.setState({
        size: event.target.value,
        products: data.products.filter(
          (product) => product.availableSizes.indexOf(event.target.value) >= 0
        ),
      });
    }
  };

  render() {
    return (
      <Container>
        <Header>
          <Link href="/">React Shopping Cart</Link>
        </Header>
        <Main>
          <Content>
            <Product>
              <Filter
                count={this.state.products.length}
                size={this.state.size}
                sort={this.state.sort}
                filterProducts={this.filterProducts}
                sortProducts={this.sortProducts}
              ></Filter>
              <Products
                products={this.state.products}
                addToCart={this.addToCart}
              ></Products>
            </Product>
            <Sidebar>
              <Cart
                cartItems={this.state.cartItems}
                removeFromCart={this.removeFromCart}
              ></Cart>
            </Sidebar>
          </Content>
        </Main>
        <Footer>All right's reserved</Footer>
      </Container>
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
