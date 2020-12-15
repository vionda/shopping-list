import React from "react";
import data from "./data.json";
import styled from "styled-components";

import Products from "./components/Products";

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

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: data.products,
      size: "",
      sort: "",
    };
  }
  render() {
    return (
      <Container>
        <Header>
          <Link href="/">React Shopping Cart</Link>
        </Header>
        <Main>
          <Content>
            <Product>
              <Products products={this.state.products}></Products>
            </Product>
            <Sidebar>Sidebar</Sidebar>
          </Content>
        </Main>
        <Footer>All right's reserved</Footer>
      </Container>
    );
  }
}

export default App;
