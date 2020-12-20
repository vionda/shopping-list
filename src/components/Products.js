import React, { Component } from "react";
import styled from "styled-components";
import formatCurrency from "../util";

export default class Products extends Component {
  render() {
    return (
      <div>
        <Product>
          {this.props.products.map((product) => (
            <Li key={product._id}>
              <DivProduct>
                <Link href={"#" + product._id}>
                  <Image src={product.image} alt={product.title}></Image>
                  <p>{product.title}</p>
                </Link>
                <ProductPrice>
                  <div>{formatCurrency(product.price)}</div>
                  <Button onClick={() => this.props.addToCart(product)}>
                    Add to cart
                  </Button>
                </ProductPrice>
              </DivProduct>
            </Li>
          ))}
        </Product>
      </div>
    );
  }
}
const Product = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 0;
  margin: 0;
  list-style-type: none;
`;
const Li = styled.li`
  flex: 0 1 29rem;
  height: 47rem;
  padding: 1rem;
`;
const DivProduct = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;
const Image = styled.img`
  max-height: 37rem;
  max-width: 37rem;
`;
const ProductPrice = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 2rem;
`;
const Button = styled.button`
  padding: 1rem;
  margin: 1rem;
  border: 0.1rem #c0c0c0 solid;
  background-color: #f0c040;
  cursor: pointer;
  :hover {
    border: 0.1rem #808080 solid;
  }
`;
const Link = styled.a`
  text-decoration: none;
`;
