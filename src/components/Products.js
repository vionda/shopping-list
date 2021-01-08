import React, { Component } from "react";
import styled from "styled-components";
import formatCurrency from "../util";
import Fade from "react-reveal/Fade";
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";
import { connect } from "react-redux";
import { fetchProducts } from "../actions/productActions";

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: null,
    };
  }
  componentDidMount() {
    this.props.fetchProducts();
  }
  openModal = (product) => {
    this.setState({ product });
  };
  closeModal = () => {
    this.setState({ product: null });
  };
  render() {
    const { product } = this.state;
    return (
      <div>
        <Fade bottom cascade>
          {!this.props.products ? (
            <div>Loading...</div>
          ) : (
            <Product1>
              {this.props.products.map((product) => (
                <Li key={product._id}>
                  <DivProduct>
                    <Link
                      href={"#" + product._id}
                      onClick={() => this.openModal(product)}
                    >
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
            </Product1>
          )}
        </Fade>
        {product && (
          <Modal isOpen={true} onRequestClose={this.closeModal}>
            <Zoom>
              <button onClick={this.closeModal}>x</button>
              <ProductDetails>
                <img src={product.image} alt={product.title}></img>
                <ProductDetailsDescription>
                  <p>
                    <strong>{product.title}</strong>
                  </p>
                  <p>{product.description}</p>
                  <p>
                    Available sizes:{" "}
                    {product.availableSizes.map((x) => (
                      <span>
                        {" "}
                        <button className="button">{x}</button>
                      </span>
                    ))}
                  </p>
                  <div className="product-price">
                    <div>{formatCurrency(product.price)}</div>
                    <Button
                      className="button primary"
                      onClick={() => {
                        this.props.addToCart(product);
                        this.closeModal();
                      }}
                    >
                      {" "}
                      Add To Cart
                    </Button>
                  </div>
                </ProductDetailsDescription>
              </ProductDetails>
            </Zoom>
          </Modal>
        )}
      </div>
    );
  }
}
const Product1 = styled.ul`
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
const ProductDetails = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-height: 96vh;
  img {
    max-height: 100vh;
    max-width: 46rem;
    margin: 0 auto;
  }
`;
const ProductDetailsDescription = styled.div`
  flex: 1 1;
  margin: 1rem;
`;

export default connect((state) => ({ products: state.products.items }), {
  fetchProducts,
})(Products);
